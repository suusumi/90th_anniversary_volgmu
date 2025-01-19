import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getDaysCounter } from "../model/getDaysCounter.ts";
import { Gauge } from "@mui/x-charts";
import { gsap } from "gsap";
import './DaysCounter.sass';

export const DaysCounter: React.FC = () => {
    const [collectedDays, setCollectedDays] = useState<number | null>(null);
    const [animatedValue, setAnimatedValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Наблюдение за видимостью
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log("Intersection Observer:", entry.isIntersecting);
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchDaysCounter = async () => {
            try {
                const data = await getDaysCounter();
                console.log("Fetched Days:", data);
                setCollectedDays(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchDaysCounter();
    }, []);

    useEffect(() => {
        console.log("Animation Trigger - collectedDays:", collectedDays, "isVisible:", isVisible);

        if (collectedDays !== null && isVisible) {
            const obj = { value: 0 };

            gsap.to(obj, {
                duration: 1.2,
                value: collectedDays,
                ease: "power3.inOut",
                onUpdate: () => {
                    setAnimatedValue(obj.value);
                },
            });
        }
    }, [collectedDays, isVisible]);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "25px",
                backgroundColor: "white",
                padding: "15px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: "15px", position: "relative", zIndex: 2 }}>
                    Осталось дней
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Gauge
                        className="gauge"
                        sx={{ fontSize: "24px" }}
                        innerRadius="70%"
                        width={140}
                        height={140}
                        value={animatedValue}
                        valueMax={90}
                    />
                    <Typography variant="h6" sx={{ position: "absolute" }}>
                        {Math.round(animatedValue)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
