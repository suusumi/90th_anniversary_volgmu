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
        <Container maxWidth="md">
            <Box
                ref={textRef}
                sx={{
                    textAlign: "left",
                    marginBottom: "20px",
                    lineHeight: "1.6", // Устанавливаем расстояние между строками

                }}
            >
                <Typography className="line"
                            sx={{marginBottom: {md: "60px", xs: "45px"}, lineHeight: "1.3", fontSize: {md: '60px', xs: '40px'}}}>
                    Цель проекта - собрать 90 литров донорской крови <br/> для мира во всем мире 🤩
                </Typography>

                <Typography variant="h2" className="line"
                            sx={{marginBottom: "60px", lineHeight: "1.3", fontSize: {md: '60px', xs: '40px'}}}>
                    Мы просим каждого сдать кровь в центре переливания крови: <br/> ул. Голубинская 9А, получатель -
                    ВолгГМУ 🙌
                </Typography>

            </Box>
        </Container>

    );
};
