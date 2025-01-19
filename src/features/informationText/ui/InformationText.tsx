import {useEffect, useRef} from "react";
import {Typography, Box, Container} from "@mui/material";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const InformationText = () => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const lines = gsap.utils.toArray<HTMLDivElement>(".line"); // Находим все строки
            gsap.fromTo(
                lines,
                {color: "#B0B0B0"}, // Начальное состояние (серый цвет)
                {
                    color: "#000000", // Конечное состояние (черный цвет)
                    stagger: 0.5, // Задержка между строками
                    duration: 1.2, // Длительность анимации одной строки
                    scrollTrigger: {
                        trigger: textRef.current, // Триггер — весь блок текста
                        start: "top 80%", // Когда верх блока достигает 80% высоты окна
                        end: "bottom 20%", // Когда нижний край блока достигает 20% высоты окна
                        toggleActions: "play none none none", // Запуск анимации один раз
                    },
                }
            );
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <Box
                ref={textRef}
                sx={{
                    textAlign: "left",
                    marginBottom: "20px",
                    lineHeight: "1.6", // Устанавливаем расстояние между строками

                }}
            >
                <Typography className="line"
                            sx={{
                                lineHeight: "1.3",
                                fontSize: {md: '60px', xs: '30px'},
                                fontFamily: 'Manrope',
                                textAlign: {xs: 'center', md: 'left'},
                                marginBottom: {md: "60px", xs: "45px"}
                            }}>
                    Цель проекта - собрать 90 литров донорской крови 🤩
                </Typography>


                <Typography variant="h2" className="line"
                            sx={{
                                marginBottom: "40px",
                                lineHeight: "1.3",
                                fontSize: {md: '60px', xs: '30px'},
                                textAlign: {xs: 'center', md: 'left'}
                            }}>
                    Мы просим каждого сдать кровь в центре переливания крови:
                </Typography>
                <Typography variant="h2" className="line"
                            sx={{
                                marginBottom: "60px",
                                lineHeight: "1.3",
                                fontSize: {md: '60px', xs: '30px'},
                                textAlign: {xs: 'center', md: 'left'}
                            }}>
                    ул. Голубинская 9А, получатель -
                    ВолгГМУ 🙌
                </Typography>

            </Box>
        </Container>

    );
};
