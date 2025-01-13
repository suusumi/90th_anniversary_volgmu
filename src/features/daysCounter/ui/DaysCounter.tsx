import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getDaysCounter} from "../model/getDaysCounter.ts";
import {Gauge} from "@mui/x-charts";
import {gsap} from "gsap";
import './DaysCounter.sass';

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
            const obj = {value: 0};

            gsap.to(obj, {
                duration: 1.2,
                value: collectedDays,
                ease: "power3.inOut",
                onUpdate: () => {
                    setAnimatedValue(obj.value);
                },
            });
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
            <Box sx={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
                <Typography
                    variant="h6"
                    sx={{
                        marginBottom: "15px",
                        fontWeight: "bold",
                        position: "relative",
                        zIndex: 2, // Текст всегда поверх
                    }}
                >
                    Осталось дней
                </Typography>
                <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Gauge
                        sx={{fontSize: "24px"}}
                        innerRadius="70%"
                        width={200}
                        height={200}
                        value={animatedValue}
                        valueMax={90}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            position: "absolute",
                            fontWeight: "bold",
                        }}
                    >
                        {Math.round(animatedValue)} {/* Тут Gauge показывает 11,012 (тысячные значения), поэтому скрыто значение Gauge и тут используется Math для округления */}
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};
