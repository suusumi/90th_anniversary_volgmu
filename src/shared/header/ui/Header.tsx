import {
    AppBar,
    Box,
    Typography,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import logo from "/volggmuLogo.svg";

export const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
        setDrawerOpen(false);
    };


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: {xs: '#F5F4F2', md: "#F5F4F2"},
                    boxShadow: "none",
                    padding: "5px 16px",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Логотип */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={logo}
                            alt="Логотип"
                            style={{
                                width: "70px",
                                height: "70px",
                            }}
                        />
                    </Box>

                    {/* Меню для больших экранов */}
                    <Box
                        sx={{
                            display: {xs: "none", md: "flex"},
                            gap: "20px",
                            alignItems: "center",
                            fontSize: "14px",
                            fontFamily: "Manrope, sans-serif",
                            textTransform: "uppercase",
                            color: "#4f4f4f",
                        }}
                    >
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontFamily: "Manrope, sans-serif", fontSize: "14px",
                            }}
                            onClick={() => scrollToSection("information-text")}
                        >
                            О проекте
                        </Typography>
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontFamily: "Manrope, sans-serif", fontSize: "14px",
                            }}
                            onClick={() => scrollToSection("statistic")}
                        >
                            Статистика
                        </Typography>
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontFamily: "Manrope, sans-serif", fontSize: "14px",
                            }}
                            onClick={() => scrollToSection("information-text")}
                        >
                            Где сдать
                        </Typography>
                    </Box>

                    {/* Кнопка меню для маленьких экранов */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        sx={{
                            display: {xs: "flex", md: "none"},
                            color: "#4f4f4f",
                        }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    {/* Акция */}
                    <Typography
                        sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: {xs: "12px", md: "16px"},
                            fontWeight: "bold",
                            color: "#000000",
                            display: {xs: "none", sm: "block"},
                        }}
                    >
                        Акция к 90-летию ВолгГМУ
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Добавляем отступ для основного контента */}
            <Box sx={{marginTop: {xs: "64px", sm: "56px"}}}></Box>

            {/* Боковое меню для маленьких экранов */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        width: 150,
                        padding: "56px",
                        backgroundColor: "#F6F5F4",
                        height: "100%",

                    }}
                >
                    <List>
                        {/*@ts-ignore*/}
                        <ListItem button onClick={() => scrollToSection("information-text")}>
                            <ListItemText primary="О проекте" primaryTypographyProps={{
                                sx: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                },
                            }}/>
                        </ListItem>
                        {/*@ts-ignore*/}
                        <ListItem button onClick={() => scrollToSection("statistic")}>
                            <ListItemText primary="Статистика" primaryTypographyProps={{
                                sx: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                },
                            }}/>
                        </ListItem>
                        {/*@ts-ignore*/}
                        <ListItem button onClick={() => scrollToSection("information-text")}>
                            <ListItemText primary="Где сдать" primaryTypographyProps={{
                                sx: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                },
                            }}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

        </>
    );
};
