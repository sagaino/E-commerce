"use client"

import { NAV_ITEM, NavItemType } from '@/utils/ConstantData';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { ElementType } from 'react';

const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderRadius: '6px',
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div>
      <Toolbar>
        <ShoppingBasketIcon sx={{ mr: 4, color: "common.black" }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: 'flex',
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: 'common.black',
          }}
        >
          E-Commerce
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          NAV_ITEM.map((data: NavItemType, index: number) => (
            <ListItem key={index} >
              <Link href={`${data.href}`} style={{ width: '100%', textDecoration: 'none' }}>
                <MenuNavLink className={`${pathname.includes(data.href) ? 'active' : ''}`}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <StoreIcon /> : <ShoppingCartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={data.title} />
                </MenuNavLink>
              </Link>
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default Sidebar