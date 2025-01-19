import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import vk from "/vk.svg";

export const Footer: React.FC = () => {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box
            sx={{
                color: "#777777",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Grid container justifyContent="center" spacing={4}>
                <Grid item>
                    <Typography
                        variant="body2"
                        sx={{ cursor: "pointer", textTransform: "uppercase" }}
                        onClick={() => scrollToSection("information-text")}
                    >
                        О проекте
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="body2"
                        sx={{ cursor: "pointer", textTransform: "uppercase" }}
                        onClick={() => scrollToSection("statistic")}
                    >
                        Статистика
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="body2"
                        sx={{ cursor: "pointer", textTransform: "uppercase" }}
                        onClick={() => scrollToSection("information-text")}
                    >
                        Где сдать
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
                <a href="https://volgmed.ru" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{color: "#777777"}}>
                        <PublicIcon/>
                    </IconButton>
                </a>

                <a href="https://vk.com/volggmu" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{color: "#777777"}}>
                        <img
                            src={vk}
                            alt="Логотип"
                            style={{color: "#777777"}}
                        />
                    </IconButton>
                </a>
            </Box>

            <Typography variant="caption">
                Copyright © 2025 ВолгГМУ - Все права защищены
            </Typography>
        </Box>
    );
};
