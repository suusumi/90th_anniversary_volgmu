import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getDonationCount } from "../model/getDonationCount.ts";

export const DonorCounter: React.FC = () => {
    const [donationCount, setDonationCount] = useState<number | null>(null);
    const [animatedValue, setAnimatedValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDonationCount = async () => {
            try {
                const count = await getDonationCount();
                setDonationCount(count);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchDonationCount();
    }, []);

    useEffect(() => {
        const setupObserver = () => {
            if (containerRef.current) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setIsVisible(true);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                observer.observe(containerRef.current);

                return () => observer.disconnect();
            } else {
                console.error("Container Ref is null!");
            }
        };

        const interval = setInterval(() => {
            setupObserver();
            if (containerRef.current) clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Анимация
    useEffect(() => {
        if (donationCount !== null && isVisible && !hasAnimated) {
            const obj = { value: 0 };

            gsap.to(obj, {
                duration: 1.2,
                value: donationCount,
                ease: "power3.inOut",
                onUpdate: () => {
                    setAnimatedValue(Math.round(obj.value));
                },
            });

            setHasAnimated(true);
        }
    }, [donationCount, isVisible, hasAnimated]);

    // Логирование
    useEffect(() => {
        console.log("Donation Count:", donationCount);
        console.log("Is Visible:", isVisible);
        console.log("Container Ref:", containerRef.current);
    }, [donationCount, isVisible, containerRef.current]);

    if (donationCount === null) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
                }}
            >
                <Typography variant="h6">Загрузка данных...</Typography>
            </Box>
        );
    }

    return (
        <div ref={containerRef} style={{ minHeight: "200px" }}>
            <Box
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
                <Typography
                    variant="h6"
                    sx={{
                        marginBottom: "15px",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    Столько раз сдали кровь
                </Typography>

                <Box
                    sx={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        backgroundColor: "#CCFFE9",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#10633F",
                            fontWeight: "bold",
                        }}
                    >
                        {animatedValue}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};
