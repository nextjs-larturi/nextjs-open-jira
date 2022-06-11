import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

export const EntryCard = () => {
  return (
    <Card sx={{ marginBottom: '10px' }}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>Descripcion</Typography>
            </CardContent>
            <CardActions sx={{ 
                display: 'flex', 
                justifyContent: 'end',
                paddingRight: 2,
            }}>
                <Typography variant='body2'>Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
