import React from "react";
import { Box, SxProps } from "@mui/material";

interface PolygonProps {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width?: string;
    opacity?: number;
    blur?: number;
    zIndex?: number;
    sx?: SxProps; // Дополнительные стили
}

export const Polygon: React.FC<PolygonProps> = ({
                                                    top,
                                                    bottom,
                                                    left,
                                                    right,
                                                    width = "300px",
                                                    opacity = 0.7,
                                                    blur = 10,
                                                    zIndex = 10,
                                                    sx,
                                                }) => {
    return (
        <Box
            component="img"
            src="/polygon.png"
            alt="Полигон"
            sx={{
                position: "absolute",
                top,
                bottom,
                left,
                right,
                width,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
                pointerEvents: "none",
                ...sx, // Применяем дополнительные стили
            }}
        />
    );
};
