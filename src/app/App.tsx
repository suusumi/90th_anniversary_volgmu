import {Box, Container} from "@mui/material";
import { Header } from "../shared/header";
import { MainPage } from "../pages/main";
import { Footer } from "../shared/footer";
import { Polygon } from "../features/polygon";

function App() {
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden", // Скрыть лишние части
            }}
        >
            {/* Полигоны */}
            <Polygon
                top="-100px"
                left="-50px"
                width="500px"
                opacity={0.5}
                blur={0}
                zIndex={-1}
                sx={{
                    position: "fixed", // Фиксированное позиционирование
                    display: {xs: "none", }
                }}
            />
            <Polygon
                top="200px"
                right="-120px"
                width="400px"
                opacity={1}
                blur={0}
                zIndex={-1}
                sx={{
                    position: "fixed", // Фиксированное позиционирование
                    transform: "scale(-1, -1)", // Зеркальное отображение
                }}
            />

            {/* Контейнер */}
            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Header />
                <MainPage />

                <Box sx={{marginTop: '60px'}}>
                    <Footer />
                </Box>

            </Container>
        </Box>
    );
}

export default App;
