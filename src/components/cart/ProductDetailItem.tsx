"use client"
import { ProductType } from '@/services/type/product';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

type AddProductItemType = {
  data: ProductType,
  quantity: number,
}

const ProductDetailItem: React.FC<AddProductItemType> = (props: AddProductItemType) => {
  return (
    <Box py={'2px'} display={'flex'} alignItems={'center'} gap={'10px'}>
      <Image
        alt='img-product'
        width={200}
        height={200}
        src={props.data.image ?? ''}
      />
      <Box width={'75%'}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: '5px' }}>
          {props.data.title}
        </Typography>
        <Typography sx={{ mb: '5px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal' }}>
          {props.data.description}
        </Typography>
        <Typography sx={{ mb: '5px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal' }}>
          {`Price: $${props.data.price}`}
        </Typography>
        <Typography sx={{ mb: '5px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal' }}>
          {`Quantity: ${props.quantity}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProductDetailItem