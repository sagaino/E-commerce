"use client"
import AddProductItem from '@/components/cart/AddProductItem';
import ProductDetailItem from '@/components/cart/ProductDetailItem';
import DialogProduct from '@/components/dialog';
import CartService from '@/services/cartServices';
import ProductService from '@/services/productServices';
import { CartType, DetailDataProductType, Product, payloadAddProductType } from '@/services/type/cart';
import { ProductType } from '@/services/type/product';
import { COLUMNS } from '@/utils/ConstantData';
import Helper from '@/utils/helper';
import CustomDatePicker from '@/utils/ui/input/date';
import CustomToast from '@/utils/ui/toast';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

const CardPage: React.FC = () => {
  const ROW_PER_PAGE = 5;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false)
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [dataAddProduct, setDataAddProduct] = useState<ProductType[]>([]);
  const [dataCart, setDataCart] = useState<CartType[]>([])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDialogFilter, setOpenDialogFilter] = useState<boolean>(false)
  const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false)
  const [localDate, setLocalDate] = useState<{ start: Date, end: Date }>({
    start: new Date(),
    end: new Date()
  })
  const [detailProduct, setDetailProduct] = useState<DetailDataProductType>({
    data: [],
    quantity: [],
  })
  const [filter, setFilter] = useState<{
    startdate: string | null,
    enddate: string | null,
  }>({
    startdate: null,
    enddate: null
  })

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    fetchCart()
  }, [filter])

  const fetchProduct = async () => {
    try {
      const response: ProductType[] = await ProductService.getProduct()
      setDataAddProduct(response)
      setDataProduct(response)
    } catch (error: any) {
      console.log('error : ', error);
    }
  }

  const fetchCart = async () => {
    try {
      const response: CartType[] = await CartService.getCart(filter)
      setDataCart(response)
    } catch (error: any) {
      console.log('error : ', error)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenDialog = (data: Product[]) => {
    setDetailProduct(() => ({
      data: dataProduct.filter(el => data.find(e => e.productId === el.id)),
      quantity: data.filter(el => dataProduct.find(e => e.id === el.productId)).map(e => e.quantity)
    }))
    setOpenDialog(() => true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(() => false)
  }

  const handleOpenDialogFilter = () => {
    setOpenDialogFilter(() => true)
  }

  const handleCloseDialogFilter = () => {
    setOpenDialogFilter(() => false)
  }

  const handleOpenDialogAdd = () => {
    setDataAddProduct((prevData) => prevData.map(item => ({ ...item, quantity: 0 })))
    setOpenDialogAdd(() => true)
  }

  const onChangeDate = (date: Date, type: string) => {
    if (type === "start") {
      setLocalDate({
        ...localDate,
        start: date
      })
    } else {
      setLocalDate({
        ...localDate,
        end: date
      })
    }
  }

  const onResetFilter = () => {
    const resetData = {
      startdate: null,
      enddate: null,
    }
    setPage(() => 0);
    setLocalDate({
      start: new Date(),
      end: new Date(),
    })
    setFilter({
      ...filter,
      ...resetData,
    })
    handleCloseDialogFilter()
  }

  const onSubmitFilter = () => {
    const { start, end } = localDate
    setPage(() => 0);
    setFilter({
      ...filter,
      enddate: Helper.dateToDate(end, 'yyyy-MM-dd'),
      startdate: Helper.dateToDate(start, 'yyyy-MM-dd'),
    })
    handleCloseDialogFilter()
  }

  const onSetQuantity = (idItem: number, type: string) => {
    if (type === 'up') {
      setDataAddProduct((prevData) => prevData.map(item => (item.id === idItem ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item)))
    } else {
      setDataAddProduct((prevData) => prevData.map(item => ((item.id === idItem && (item.quantity ?? 0) > 0) ? { ...item, quantity: (item.quantity ?? 0) - 1 } : item)))
    }
  }

  const onSaveAddCart = async () => {
    try {
      setLoading(() => true)
      const payload: payloadAddProductType = {
        userId: 1,
        date: new Date(),
        products: dataAddProduct.filter(item => (item.quantity ?? 0) > 0).map(item => ({ productId: item.id, quantity: item.quantity })),
      }
      if (payload.products.length === 0) return
      const response: CartType = await CartService.addCart(payload)

      setDataCart((prevData) => ([response, ...prevData]))
      setOpenDialogAdd(() => false)
      CustomToast.Success('Success add cart')
    } catch (error: any) {
      console.log('error : ', error)
    } finally {
      setLoading(() => false)
    }
  }

  return (
    <Box width={'100%'} height={'100%'} bgcolor={"#E2E8F0"}>
      <Box width={'95%'} display={'flex'} justifyContent={'space-between'}>
        <Button onClick={() => handleOpenDialogFilter()} sx={{ m: '20px', backgroundColor: '#fff' }}>
          <FilterListIcon sx={{ mr: "5px" }} />
          <Typography variant='body1'>
            Filter
          </Typography>
        </Button>
        <Button onClick={handleOpenDialogAdd} sx={{ m: '20px', backgroundColor: '#fff' }}>
          <AddIcon sx={{ mr: "5px" }} />
          <Typography variant='body1'>
            Create
          </Typography>
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: 440, background: '#fff', mx: "20px", width: '95%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCart
              .slice(page * ROW_PER_PAGE, page * ROW_PER_PAGE + ROW_PER_PAGE)
              .map((row, idx) => {
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1} sx={{ cursor: "pointer" }}>
                    <TableCell align={'left'} onClick={() => handleOpenDialog(row.products ?? [])}>
                      {row.id}
                    </TableCell>
                    <TableCell align={'left'} onClick={() => handleOpenDialog(row.products ?? [])}>
                      {row.userId}
                    </TableCell>
                    <TableCell align={'right'} onClick={() => handleOpenDialog(row.products ?? [])}>
                      {Helper.dateToString(`${row.date}`)}
                    </TableCell>
                    <TableCell align={'right'} onClick={() => handleOpenDialog(row.products ?? [])}>
                      {row.products?.length}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={dataCart.length}
        rowsPerPage={ROW_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
        sx={{
          width: '95%'
        }}
      />
      <DialogProduct
        isOpen={openDialogFilter}
        title='Filter'
        handleClose={handleCloseDialogFilter}
        contentComponent={
          <Box pt={'10px'}>
            <Box display={'flex'} alignItems={'center'}>
              <CustomDatePicker
                initDate={localDate.start}
                onChange={(e) => onChangeDate(e, 'start')}
              />
              <Typography sx={{ mx: '10px' }}>
                -
              </Typography>
              <CustomDatePicker
                initDate={localDate.end}
                onChange={(e) => onChangeDate(e, 'end')}
              />
            </Box>
            <Box paddingTop={"10px"} display={'flex'} justifyContent={'space-between'}>
              <Button onClick={onResetFilter} sx={{ mr: '10px', border: '1px solid #ff1744', color: '#ff1744' }}>
                Reset
              </Button>
              <Button variant="contained" onClick={onSubmitFilter}>
                Save
              </Button>
            </Box>
          </Box>
        }
      />
      <DialogProduct
        isOpen={openDialog}
        handleClose={handleCloseDialog}
        title='Detail Product'
        maxWidth='md'
        fullWidth={true}
        contentComponent={
          <Box>
            {detailProduct.data.map((data, index) => (
              <ProductDetailItem
                key={index}
                data={data}
                quantity={detailProduct.quantity[index] ?? 0}
              />
            ))}
          </Box>
        }
      />
      <DialogProduct
        isOpen={openDialogAdd}
        title='Add Cart'
        fullWidth={true}
        maxWidth='md'
        contentComponent={
          <Box>
            {dataAddProduct.map((data, index) => (
              <AddProductItem
                key={index}
                data={data}
                onDecreastQuantity={() => onSetQuantity(data.id ?? 0, 'down')}
                onIncreastQuantity={() => onSetQuantity(data.id ?? 0, 'up')}
              />
            ))}
          </Box>
        }
        buttonComponent={
          <Box display={'flex'}>
            <Button onClick={() => setOpenDialogAdd(() => false)} sx={{ mr: '10px', border: '1px solid #ff1744', color: '#ff1744' }}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="outlined"
              onClick={onSaveAddCart}
            >
              Save
            </LoadingButton>
          </Box>
        }
      />
    </Box>
  );
}

export default CardPage