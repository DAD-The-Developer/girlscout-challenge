"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Link as MuiLink, 
  Grid, 
  Divider, 
  IconButton,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const footerLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Issues', path: '/issues' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: <EmailIcon fontSize="small" />, text: 'contact@towntogether.com' },
    { icon: <PhoneIcon fontSize="small" />, text: '(555) 123-4567' },
    { icon: <LocationOnIcon fontSize="small" />, text: 'Anytown, USA' },
  ];

  return (
    <Paper 
      component="footer" 
      elevation={0}
      square
      sx={{ 
        mt: 8, 
        py: 6, 
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                mb: 2,
                letterSpacing: '.1rem'
              }}
            >
              Town Together
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ maxWidth: 300 }}
            >
              Empowering small towns through civic engagement and community collaboration.
            </Typography>
            
            {/* Social Media Icons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(25, 118, 210, 0.04)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Quick Links
            </Typography>
            <Grid container spacing={isMobile ? 1 : 2}>
              {footerLinks.map((link, index) => (
                <Grid item xs={6} key={link.title}>
                  <Link href={link.path} passHref>
                    <MuiLink
                      color="text.secondary"
                      underline="hover"
                      sx={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {link.title}
                    </MuiLink>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {contactInfo.map((info, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5 
                  }}
                >
                  <Box sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {info.icon}
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.9rem' }}
                  >
                    {info.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? 1 : 0
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            align={isMobile ? "center" : "left"}
            sx={{ fontSize: '0.85rem' }}
          >
            © {currentYear} Town Together. All rights reserved.
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            align={isMobile ? "center" : "right"}
            sx={{ fontSize: '0.85rem' }}
          >
            Made with ❤️ for small towns
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer; 