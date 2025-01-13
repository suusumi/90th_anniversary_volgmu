import {Box, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {BloodCounter} from "../../../features/bloodCounter";
import {InformationText} from "../../../features/informationText";
import {DaysCounter} from "../../../features/daysCounter";
import {ContributionCard} from "../../../features/contributionCard";
import {DonorCounter} from "../../../features/donorCounter/ui/DonorCounter.tsx";

export const MainPage = () => {
    return (
        <>
            <Box sx={{marginBottom: '175px'}}>
                <InformationText/>
            </Box>
            <Grid container spacing={2} sx={{height: "100%"}}>
                {/* Левая колонка с BloodCounter */}
                <Grid size={{xs: 12, md: 6}}>
                    <BloodCounter/>
                </Grid>

                {/* Правая колонка */}
                <Grid
                    container
                    size={{xs: 12, md: 6}}
                    direction="column"
                    sx={{height: "100%"}}
                    spacing={2}
                >
                    {/* ContributionCard */}
                    <Grid size={{xs: 12, md: 12}} sx={{flex: 1}}>
                        <ContributionCard/>
                    </Grid>

                    {/* DaysCounter и DonorCounter */}
                    <Grid container size={{xs: 12, md: 12}} spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <DaysCounter/>
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <DonorCounter/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>

    );
};
