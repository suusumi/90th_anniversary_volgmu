import {Box, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {getRemainingBlood} from "../model/getRemainingBlood.ts";

export const ContributionCard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [remainingBlood, setRemainingBlood] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false); // Состояние для видимости компонента

    useEffect(() => {
        // Наблюдение за видимостью компонента
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {threshold: 0.5} // 50% видимости компонента
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
        if (isVisible) {
            const ctx = gsap.context(() => {
                const messages = gsap.utils.toArray(".message");

                gsap.from(messages, {
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.5, // Задержка между элементами
                });
            }, containerRef);

            return () => ctx.revert();
        }
    }, [isVisible]);

    useEffect(() => {
        // Загрузка данных о "remaining"
        const fetchRemainingBlood = async () => {
            try {
                const data = await getRemainingBlood();
                setRemainingBlood(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchRemainingBlood();
    }, []);

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
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            {/* Заголовок */}
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "15px",
                    position: "relative",
                    zIndex: 2, // Текст всегда поверх
                }}
            >
                Внеси свой вклад
            </Typography>

            {/* Сообщение "Сколько осталось собрать?" */}
            <Box
                className="message"
                sx={{
                    backgroundColor: "#CCFFE9",
                    color: "#10633F",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    maxWidth: "80%",
                    alignSelf: "flex-start",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                }}
            >
                Сколько осталось собрать?
            </Box>

            {/* Ответ: "69,4 литров!" */}
            <Box
                className="message"
                sx={{
                    backgroundColor: "#CCFFE9",
                    color: "#10633F",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    maxWidth: "80%",
                    alignSelf: "flex-end",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                <Typography sx={{fontSize: "16px", fontWeight: "bold", fontFamily: "Manrope"}}>
                    {remainingBlood !== null
                        ? `${remainingBlood.toFixed(1)} литров!`
                        : "Загрузка..."}
                </Typography>
                <Typography component="span" sx={{fontSize: "16px"}}>
                    🔥🔥🔥
                </Typography>
            </Box>
        </Box>
    );
};
