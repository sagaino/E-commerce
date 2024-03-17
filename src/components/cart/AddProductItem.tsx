"use client"
import { ProductType } from '@/services/type/product';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

type AddProductItemType = {
  data: ProductType,
  onIncreastQuantity: () => void,
  onDecreastQuantity: () => void,
}

const AddProductItem: React.FC<AddProductItemType> = (props: AddProductItemType) => {
  return (
    <Box py={'2px'} display={'flex'} alignItems={'center'} gap={'10px'}>
      <Image
        alt='img-product'
        width={200}
        height={200}
        src={props.data.image ?? ''}
      />
      <Box width={'60%'}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: '5px' }}>
          {props.data.title}
        </Typography>
        <Typography sx={{ mb: '5px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal' }}>
          {props.data.description}
        </Typography>
        <Typography sx={{ mb: '5px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal' }}>
          {`Price: $${props.data.price}`}
        </Typography>
      </Box>

      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <IconButton aria-label="fingerprint" color="default" onClick={props.onDecreastQuantity}>
          <RemoveIcon />
        </IconButton>
        <Box mx={'25px'}>
          {props.data.quantity ?? 0}
        </Box>
        <IconButton aria-label="fingerprint" color="default" onClick={props.onIncreastQuantity}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default AddProductItem