import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: "Manrope, sans-serif",
        fontWeightRegular: 400,
        fontWeightBold: 700,
        body1: {fontFamily: "Austin Cyr"},
    },
    palette: {
        primary: {
            main: "#3DCC6F",
        },
    },
});
