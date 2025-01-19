import { Box, Typography } from "@mui/material";
import bloodDrop from '/blood_drop.svg'
import './TitleBlock.sass'

export const TitleBlock: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            {/* Верхний текстовый блок */}
            <Box
                sx={{
                    display: 'inline-block',
                    padding: '15px',
                    fontSize: {xs:'14px', md:'16px'},
                    backgroundColor: '#CCFFE9',
                    color: '#10633F',
                    borderRadius: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                Акция к 90-летию ВолгГМУ
            </Box>

            {/* Заголовок */}
            <Typography
                sx={{
                    fontFamily: 'Austin Cyr, serif',
                    fontSize: { xs: '80px', sm: '120px', md: '180px' },
                    color: '#288e81',
                    lineHeight: { xs: 0.8, sm: 0.8, md: 0.8 },
                    fontWeight: 'bold',
                    mt: {xs: '15px'}
                }}
            >
                90 литров
            </Typography>

            {/* Подзаголовок с каплей */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-block',
                    mt: 1,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: { xs: '34px', sm: '48px', md: '68px' },
                        color: '#288e81',
                        lineHeight: 1.2,
                    }}
                >
                    донорской крови
                </Typography>
                <img
                    src={bloodDrop}
                    alt="Капля крови"
                    className='bloodDrop'
                />
            </Box>
        </Box>
    );
};
