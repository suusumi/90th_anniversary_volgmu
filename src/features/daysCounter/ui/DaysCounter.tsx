import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getDaysCounter} from "../model/getDaysCounter.ts";
import {Gauge} from "@mui/x-charts";

export const DaysCounter: React.FC = () => {
    const [collectedDays, setCollectedDays] = useState<number | null>(null); // Значение дней
    const [animatedValue, setAnimatedValue] = useState(0); // Значение для анимации

    useEffect(() => {
        const fetchDaysCounter = async () => {
            try {
                const data = await getDaysCounter();
                setCollectedDays(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchDaysCounter();
    }, []);

    useEffect(() => {
        if (collectedDays !== null) {
            let animationFrame: number;
            const duration = 1200; // Продолжительность анимации в миллисекундах
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1); // Ограничиваем progress в диапазоне [0, 1]
                const value = Math.round(progress * collectedDays); // Вычисляем текущее значение
                setAnimatedValue(value);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            // Очистка анимации при размонтировании
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [collectedDays]);

    if (collectedDays === null) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
                    maxWidth: "350px",
                }}
            >
                <Typography variant="h6">Загрузка данных...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                backgroundColor: "white",
                padding: "15px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "350px",
                boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "15px",
                    fontWeight: "bold",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                Осталось дней
            </Typography>
            <Box>
                <Gauge
                    sx={{fontSize: "24px"}}
                    innerRadius="70%"
                    width={200}
                    height={200}
                    value={animatedValue}
                    valueMax={90}
                />
            </Box>
        </Box>
    );
};
