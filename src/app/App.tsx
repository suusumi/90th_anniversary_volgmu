import {Container, Typography} from "@mui/material";
import {Header} from "../shared/header";
import {MainPage} from "../pages/main";
import {Footer} from "../shared/footer";

function App() {

  return (
    <Container maxWidth="lg">
        <Header/>
        <MainPage/>
        {/*<Footer/>*/}
        {/*<Typography>sdfok</Typography>*/}
    </Container>
  )
}

export default App
