import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getDaysCounter} from "../model/getDaysCounter.ts";
import {Gauge} from "@mui/x-charts";


export const DaysCounter: React.FC = () => {
    const collectedDays = getDaysCounter();

    const [animatedValue, setAnimatedValue] = useState(0); // значение для анимации

    useEffect(() => {
        let animationFrame: number;
        const duration = 1200; // продолжительность анимации в миллисекундах
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // ограничиваем progress в диапазоне [0, 1]
            const value = Math.round(progress * collectedDays); // вычисляем текущее значение
            setAnimatedValue(value);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame); // очищаем анимацию при размонтировании
    }, [collectedDays]);

    return (
        <Box sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            backgroundColor: "white",
            padding: "15px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: '350px',
            boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",

        }}>
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
                <Gauge sx={{fontSize: '24px'}}
                       innerRadius="70%"
                       width={200}
                       height={200}
                       value={animatedValue}
                       valueMax={90}/>
            </Box>
        </Box>
    );
};
