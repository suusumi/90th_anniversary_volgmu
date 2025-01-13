import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { getDonationCount } from "../model/getDonationCount.ts";

export const DonorCounter: React.FC = () => {
    const [donationCount, setDonationCount] = useState<number | null>(null); // Значение количества доноров
    const [animatedValue, setAnimatedValue] = useState(0); // Значение для анимации

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
        if (donationCount !== null) {
            const obj = { value: 0 };

            gsap.to(obj, {
                duration: 1.2,
                value: donationCount,
                ease: "power3.inOut",
                onUpdate: () => {
                    setAnimatedValue(Math.round(obj.value)); // Анимация с округлением
                },
            });
        }
    }, [donationCount]);

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
                // height: "100%",
                boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.10)",
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
                Столько раз сдали кровь
            </Typography>

            {/* Анимационный круг */}
            <Box
                sx={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    backgroundColor: "#CCFFE9", // Светло-зеленый фон
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: "#10633F", // Темно-зеленый цвет текста
                        fontWeight: "bold",
                    }}
                >
                    {animatedValue}
                </Typography>
            </Box>
        </Box>
    );
};
