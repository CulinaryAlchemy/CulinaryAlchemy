import RestaurantRounded from "@mui/icons-material/RestaurantRounded"
import Stack from "@mui/joy/Stack"

export const Header = () => {
    return (
        <Stack padding='1em' direction='row' justifyContent='center' alignItems='center'>
            <RestaurantRounded sx={{ fontSize: '2.7em' }} />
        </Stack>
    )
}