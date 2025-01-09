import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { getBloodCounter } from "../model/getBloodCounter";

export const BloodCounter: React.FC = () => {
    const waveRef = useRef<HTMLDivElement>(null);
    const collectedBlood = getBloodCounter();
    const goal = 90; // Цель в литрах

    useEffect(() => {
        if (waveRef.current && window.Wave) {
            const waveHeight = Math.min(collectedBlood / goal, 1); // Высота волны как доля от цели
            const waveInstance = new window.Wave(waveRef.current, {
                height: waveHeight,
                number: 1,
                smooth: 50,
                velocity: 1.6,
                colors: ["#CC3D3F"],
                opacity: 0.9,
                position: "bottom",
            });
            if (waveInstance.animate) {
                waveInstance.animate();
            }

            // Очистка анимации при размонтировании
            return () => {
                waveInstance.pause();
            };
        }
    }, [collectedBlood]);

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                backgroundColor: "white",
                padding: "15px",
                textAlign: "center",

            }}
        >
            {/* Заголовок */}
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    position: "relative",
                    zIndex: 2, // Текст всегда поверх
                }}
            >
                Собрали
            </Typography>

            {/* Количество собранной крови */}
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    position: "relative",
                    zIndex: 2, // Текст всегда поверх
                }}
            >
                {collectedBlood.toFixed(1)} литров
            </Typography>

            {/* Контейнер для волны */}
            <div
                ref={waveRef}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100px",
                    zIndex: 1, // Волна под текстом
                }}
            ></div>
        </Box>
    );
};
