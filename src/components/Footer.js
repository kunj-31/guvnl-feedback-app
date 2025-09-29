import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  WhatsApp,
  Instagram,
  Lightbulb,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Lightbulb sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700}>
                GUVNL Feedback System
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
              Empowering citizens to help improve Gujarat's power infrastructure 
              and ensure reliable electricity services for all. Together, we build 
              a brighter, safer future for Gujarat.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/submit-feedback" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Report Issue
              </Link>
              <Link href="/issues" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                View Issues
              </Link>
              <Link href="/dashboard" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Dashboard
              </Link>
              <Link href="/login" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Login
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, opacity: 0.8 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>Emergency</Typography>
                  <Typography variant="body2" opacity={0.8}>1912</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, opacity: 0.8 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>Customer Care</Typography>
                  <Typography variant="body2" opacity={0.8}>1800-233-4343</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, opacity: 0.8 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>Email</Typography>
                  <Typography variant="body2" opacity={0.8}>feedback@guvnl.com</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, opacity: 0.8, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>Head Office</Typography>
                  <Typography variant="body2" opacity={0.8} sx={{ lineHeight: 1.4 }}>
                    Sardar Patel Vidyut Bhavan, Race Course, Vadodara - 390007, Gujarat
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Emergency Contacts */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Emergency Contacts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Power Emergency
                </Typography>
                <Typography variant="body2" opacity={0.8}>
                  24/7 Helpline: 1912
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Safety Hazard
                </Typography>
                <Typography variant="body2" opacity={0.8}>
                  Toll Free: 1800-1912
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  WhatsApp Support
                </Typography>
                <Typography variant="body2" opacity={0.8}>
                  +91 98765 43210
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<WhatsApp />}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Quick Help on WhatsApp
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" opacity={0.8}>
            © {new Date().getFullYear()} Gujarat Urja Vikas Nigam Limited (GUVNL). 
            All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, fontSize: '0.875rem', '&:hover': { opacity: 1 } }}>
              Disclaimer
            </Link>
          </Box>
        </Box>

        {/* Emergency Banner */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            borderRadius: 3,
            p: 2,
            mt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            🚨 In case of electrical emergency or life-threatening situation, 
            call 1912 immediately. Stay safe!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;