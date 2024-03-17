"use client"
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { DRAWER_WIDTH } from '@/utils/ConstantData';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const MobileDrawerProps = {
    open: mobileOpen,
    onTransitionEnd: handleDrawerTransitionEnd,
    onClose: handleDrawerClose,
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }
  const DesktopDrawerProps = {
    open: true,
  }

  return (
    <Box height={'100vh'} width={'100vw'} sx={{ display: 'flex', backgroundColor: "#E2E8F0" }}>
      <Header
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant={hidden ? "temporary" : "permanent"}
          {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          PaperProps={{ style: { border: 'none' } }}
        >
          {<Sidebar />}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout