import { Card, Typography } from '@mui/joy';
import { ItemClass } from './ItemModel';

export function ItemSmall(props: { item: ItemClass }) {
    return (
        <Card variant="outlined" sx={{ width: 320 }}>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {props.item.name}
            </Typography>
            <Typography level="body2">April 24 to May 02, 2021</Typography>
        </Card>
    )
}
