"use client"
import CardLayout from '@/components/card';
import DialogProduct from '@/components/dialog';
import ProductService from '@/services/productServices';
import { ProductType } from '@/services/type/product';
import CustomToast from '@/utils/ui/toast';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

type OpenDialogType = {
  isOpen: boolean,
  type: 'filter' | 'product'
}

type CheckedType = {
  checked: string | null,
  isFetching: boolean,
}

const ProductsPage: React.FC = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ProductType[]>([]);
  const [dataCategory, setDataCategory] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [open, setOpen] = useState<OpenDialogType>({ isOpen: false, type: 'product' })
  const [idItem, setIdItem] = useState<number>(0)
  const [checkedState, setCheckedState] = useState<CheckedType>({
    checked: null,
    isFetching: false,
  });

  useEffect(() => {
    fetchCategory()
    fetchProduct()
  }, [])

  const fetchCategory = async () => {
    try {
      const response: string[] = await ProductService.getCategory()
      setDataCategory(response)
    } catch (error: any) {
      console.log('error : ', error);
    }
  }

  const fetchProduct = async () => {
    try {
      const response: ProductType[] = await ProductService.getProduct()
      setData(response)
      setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE))
    } catch (error: any) {
      console.log('error : ', error);
    }
  }

  const fetchFilterProduct = async () => {
    try {
      const response: ProductType[] = await ProductService.getFilterProduct(checkedState.checked ?? '')
      setData(response)
      setTotalPages(Math.ceil(response.length / ITEMS_PER_PAGE))
    } catch (error: any) {
      console.log('error : ', error);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenDialog = ({ idItem, type }: { idItem?: number, type: 'filter' | 'product' }) => {
    if (idItem) setIdItem(() => data.findIndex((e) => e.id === idItem));
    setOpen((prevData) => ({
      isOpen: true,
      type: type,
    }))
  }
  const handleCloseDialog = (isReset: boolean) => {
    setOpen((prevData) => ({
      ...prevData,
      isOpen: false,
    }));
    if (open.type === 'filter' && (!checkedState.isFetching || isReset)) setCheckedState((prevData) => ({
      checked: null,
      isFetching: false,
    }))
  }

  const onDelete = (idItem: number) => {
    setData((prevData) => (prevData.filter((val) => val.id != idItem)))
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE))
    CustomToast.Success('Successfully delete product')
  }

  const handleChangeCheckbox = (category: string) => {
    setCheckedState((prevData) => ({
      ...prevData,
      checked: category === checkedState.checked ? null : category
    }));
  };

  const handleSaveFilter = () => {
    if (checkedState.checked) {
      setCheckedState((prevData) => ({
        ...prevData,
        isFetching: true,
      }))
      fetchFilterProduct()
    }
    handlePageChange(1)
    setOpen((prevData) => ({
      ...prevData,
      isOpen: false,
    }));
  }

  const handleResetFilter = () => {
    fetchProduct()
    handlePageChange(1)
    handleCloseDialog(true)
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const slicedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box flexGrow={1} bgcolor={"#E2E8F0"} padding={3}>
      <Button onClick={() => handleOpenDialog({
        type: 'filter',
      })} sx={{ mb: '20px', backgroundColor: '#fff' }}>
        <FilterListIcon sx={{ mr: "5px" }} />
        <Typography variant='body1'>
          Filter
        </Typography>
      </Button>
      
      <Grid container spacing={2}>
        {slicedData.map((item: ProductType, index: number) => (
          <Grid key={item.id} xs={4}>
            <CardLayout
              data={item}
              onClickCard={() => handleOpenDialog({
                idItem: (item.id ?? 0),
                type: 'product',
              })}
              onDelete={() => onDelete(item.id ?? 0)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ py: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Box>

      <DialogProduct
        isOpen={open.isOpen}
        handleClose={() => handleCloseDialog(false)}
        title={open.type === "product" ? data[idItem]?.title ?? '' : 'Filter Product'}
        contentComponent={
          open.type === "product" ?
            <Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ pb: '20px' }}>
                <Image
                  width={450}
                  height={450}
                  alt='image'
                  src={data[idItem]?.image!}

                />
              </Box>
              <Typography variant='body1'>
                Description :
              </Typography>
              <Typography variant='body2'>
                {data[idItem]?.description}
              </Typography>
            </Box> :
            <Box width={"450px"}>
              <FormControl component="fieldset" variant="standard">
                {dataCategory.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={category === checkedState.checked}
                        onChange={() => handleChangeCheckbox(category)}
                        name={category}
                      />
                    }
                    label={category}
                  />
                ))}
              </FormControl>
              <Box paddingTop={"10px"} display={'flex'} justifyContent={'space-between'}>
                <Box>
                  <Button onClick={handleResetFilter} sx={{ mr: '10px', border: '1px solid #ff1744', color: '#ff1744' }}>
                    Reset
                  </Button>
                  <Button variant="contained" onClick={handleSaveFilter}>
                    Save
                  </Button>
                </Box>
                <Button onClick={() => handleCloseDialog(false)} sx={{ border: '1px solid' }}>
                  Cancel
                </Button>
              </Box>
            </Box>
        }
      />
    </Box >
  )
}

export default ProductsPage