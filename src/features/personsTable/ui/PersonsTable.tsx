import { useEffect, useState, useRef } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { gsap } from "gsap";
import { getDonationCount } from "../model/getPersonTable.ts";

export const PersonsTable = () => {
    const [donors, setDonors] = useState<{ name: string; amount: number }[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const donorData = await getDonationCount();
                setDonors(donorData);
            } catch (error) {
                console.error("Ошибка при загрузке данных о донорах:", error);
            }
        };

        fetchDonors();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
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
        if (isVisible) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
            );
        }
    }, [isVisible]);

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
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "15px",
                    fontFamily: "Manrope, sans-serif",
                }}
            >
                Доноры
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "Manrope, sans-serif" }}>Имя</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "Manrope, sans-serif" }}>Количество крови (л)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donors.map((donor, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ fontFamily: "Manrope, sans-serif" }}>{donor.name}</TableCell>
                                <TableCell sx={{ fontFamily: "Manrope, sans-serif" }}>{donor.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
