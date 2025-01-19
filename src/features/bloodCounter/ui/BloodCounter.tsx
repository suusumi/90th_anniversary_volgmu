import React, {useEffect, useRef, useState} from "react";
import {Box, Typography} from "@mui/material";
import {getBloodCounter} from "../model/getBloodCounter";

export const BloodCounter: React.FC = () => {
    const waveRef = useRef<HTMLDivElement>(null);
    const [collectedBlood, setCollectedBlood] = useState<number | null>(null); // Состояние для данных
    const goal = 90; // Цель в литрах

    useEffect(() => {
        const fetchBloodCounter = async () => {
            try {
                const data = await getBloodCounter();
                setCollectedBlood(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchBloodCounter();
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (waveRef.current && typeof window !== "undefined" && window.Wave) {
            if (collectedBlood !== null && waveRef.current.parentElement) {
                const parentHeight = waveRef.current.parentElement.offsetHeight; // Высота родительского контейнера
                const waveHeight = Math.min(collectedBlood / goal, 1) * parentHeight; // Пропорциональная высота

                // @ts-ignore
                const waveInstance = new window.Wave(waveRef.current, {
                    height: waveHeight / parentHeight, // Пропорция высоты для волны
                    number: 1,
                    smooth: 10,
                    velocity: 1.6,
                    colors: ["#CC3D3F"],
                    opacity: 0.9,
                    position: "bottom",
                });

                waveInstance.animate?.();

                return () => {
                    waveInstance.pause();
                };
            }
        }
    }, [collectedBlood]);


    if (collectedBlood === null) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    padding: "20px",
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
                borderRadius: "25px",
                backgroundColor: "white",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
                height: {sm: "100%", md: "380px"},

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
                    height: "100%",
                    zIndex: 1, // Волна под текстом

                }}
            ></div>
        </Box>
    );
};
