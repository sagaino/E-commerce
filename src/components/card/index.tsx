import React from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ProductType } from '@/services/type/product'
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

type CardLayoutType = {
  data: ProductType,
  onClickCard: () => void,
  onDelete: () => void,
}

const CardLayout: React.FC<CardLayoutType> = (props: CardLayoutType) => {
  return (
    <Card>
      <CardActionArea
        onClick={props.onClickCard}
        sx={{
          minHeight: "320px"
        }}>
        <CardMedia component="img" height="150" alt='img' sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} image={props.data.image} />
        <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            {props.data.title}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>{`$${props.data.price}`}</Typography>
          {/* <Typography variant='body2'>
            {props.data.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <Box display={"flex"} justifyContent={"end"}>
        <Button onClick={props.onDelete} sx={{ m: 3, backgroundColor: '#ff1744', color: '#fff' }}>
          Delete
        </Button>
      </Box>
    </Card>
  )
}

export default CardLayout