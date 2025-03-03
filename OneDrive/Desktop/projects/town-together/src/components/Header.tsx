"use client";

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Container, 
  Box, 
  Menu, 
  MenuItem,
  Avatar,
  Tooltip,
  Divider,
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Hide AppBar on scroll
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');

  // Check if user is logged in
  useEffect(() => {
    // Check for authentication in both localStorage and cookies
    const checkAuth = async () => {
      // Check localStorage first (client-side auth)
      const token = localStorage.getItem('authToken');
      
      if (token) {
        setIsLoggedIn(true);
      }
      
      // If no token in localStorage, check with the server
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Important for cookies
        });
        
        if (response.ok) {
          // User is authenticated via cookies
          const data = await response.json();
          if (data.success && data.user) {
            setIsLoggedIn(true);
            setUserName(data.user.name || '');
            setUserInitial(data.user.name ? data.user.name.charAt(0).toUpperCase() : '');
            
            // Optionally sync with localStorage for consistency
            if (data.token) {
              localStorage.setItem('authToken', data.token);
            }
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      }
    };
    
    checkAuth();
    
    // Add event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    });
    
    return () => {
      window.removeEventListener('storage', () => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
      });
    };
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear the cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      handleCloseUserMenu();
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const pages = [
    { title: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
    { title: 'Issues', path: '/issues', icon: <ReportProblemIcon fontSize="small" /> },
    { title: 'Map', path: '/map', icon: <MapIcon fontSize="small" /> },
    { title: 'About', path: '/about', icon: <InfoIcon fontSize="small" /> },
  ];

  const userMenuItems = isLoggedIn 
    ? [
        { title: 'Profile', path: '/profile' },
        { title: 'My Issues', path: '/my-issues' },
        { title: 'Settings', path: '/settings' },
        { title: 'Logout', action: handleLogout },
      ]
    : [
        { title: 'Login', path: '/login' },
        { title: 'Sign Up', path: '/signup' },
      ];

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                letterSpacing: '.1rem',
              }}
            >
              Town Together
            </Typography>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.title} 
                    onClick={handleCloseNavMenu} 
                    component={Link} 
                    href={page.path}
                    selected={pathname === page.path}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {page.icon}
                      <Typography sx={{ ml: 1 }}>{page.title}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              Town Together
            </Typography>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    mx: 1.5, 
                    color: pathname === page.path ? 'primary.main' : 'text.primary',
                    fontWeight: pathname === page.path ? 600 : 400,
                    borderBottom: pathname === page.path ? '2px solid' : 'none',
                    borderRadius: 0,
                    paddingBottom: '4px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                      borderBottom: '2px solid',
                    }
                  }}
                  startIcon={page.icon}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* User menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={isLoggedIn ? "Account settings" : "Login or sign up"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} aria-label="user menu">
                  {isLoggedIn && userInitial ? (
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      {userInitial}
                    </Avatar>
                  ) : (
                    <Avatar sx={{ bgcolor: 'grey.200', width: 40, height: 40 }}>
                      <AccountCircleIcon sx={{ color: 'grey.700' }} />
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 2,
                  sx: {
                    minWidth: 180,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                    mt: 1.5,
                  },
                }}
              >
                {isLoggedIn && (
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {userName || 'User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Logged in
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                )}
                
                {userMenuItems.map((item) => (
                  item.action ? (
                    <MenuItem key={item.title} onClick={item.action} sx={{ minHeight: 48 }}>
                      <Typography>{item.title}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem 
                      key={item.title} 
                      onClick={handleCloseUserMenu} 
                      component={Link} 
                      href={item.path}
                      sx={{ minHeight: 48 }}
                    >
                      <Typography>{item.title}</Typography>
                    </MenuItem>
                  )
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header; 