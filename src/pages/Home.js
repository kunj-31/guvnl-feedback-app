import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Lightbulb,
  Security,
  TrendingUp,
  Report,
  Visibility,
  Speed,
  Emergency,
  Build,
  VerifiedUser,
  ArrowForward,
  LocationOn,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Features Data
  const features = [
    {
      icon: <Report sx={{ fontSize: 40 }} />,
      title: 'Quick Issue Reporting',
      description: 'Report power line issues, pole damage, or safety concerns in minutes with our simple interface.',
      color: '#1976d2',
    },
    {
      icon: <Visibility sx={{ fontSize: 40 }} />,
      title: 'Real-time Tracking',
      description: 'Monitor your reported issues with live updates and progress notifications.',
      color: '#ff6b35',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Safety First',
      description: 'Immediately report potential safety hazards to prevent accidents in the power network.',
      color: '#2e7d32',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Service Improvement',
      description: 'Your feedback helps GUVNL enhance service quality across Gujarat.',
      color: '#ed6c02',
    },
  ];

  // Statistics Data
  const stats = [
    { number: '15K+', label: 'Issues Resolved', icon: <CheckCircle />, color: '#2e7d32' },
    { number: '75+', label: 'Cities Covered', icon: <LocationOn />, color: '#1976d2' },
    { number: '24/7', label: 'Monitoring', icon: <Speed />, color: '#ed6c02' },
    { number: '98%', label: 'Satisfaction', icon: <VerifiedUser />, color: '#9c27b0' },
  ];

  // Process Steps Data
  const processSteps = [
    {
      step: 1,
      title: 'Report Issue',
      description: 'Submit detailed issue with photos and precise location',
      icon: '📝',
      color: '#1976d2'
    },
    {
      step: 2,
      title: 'Quick Review',
      description: 'Our team assesses and prioritizes your report',
      icon: '👀',
      color: '#ff6b35'
    },
    {
      step: 3,
      title: 'Track Progress',
      description: 'Monitor real-time updates on resolution progress',
      icon: '📊',
      color: '#2e7d32'
    },
    {
      step: 4,
      title: 'Issue Resolved',
      description: 'Get notified when your issue is completely resolved',
      icon: '✅',
      color: '#9c27b0'
    }
  ];

  // Hero Section Component
  const HeroSection = () => (
    <Paper 
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 0,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" sx={{ py: { xs: 6, md: 10 } }}>
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            {/* Badge */}
            <Box 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                px: 2,
                py: 1,
                mb: 3,
              }}
            >
              <Box sx={{ 
                width: 8, 
                height: 8, 
                background: '#ffd700', 
                borderRadius: '50%',
                mr: 1,
              }} />
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                ⚡ Powering Gujarat's Future
              </Typography>
            </Box>

            {/* Main Heading */}
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Together We Build
              <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(45deg, #ffd700, #ff6b35)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                }}
              >
                A Safer Gujarat
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 300,
                lineHeight: 1.6,
                mb: 4,
                maxWidth: 500,
              }}
            >
              Join hands with GUVNL to enhance power utility services and ensure 
              reliable electricity across Gujarat through collaborative feedback.
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/submit-feedback')}
                endIcon={<ArrowForward />}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
                  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(255, 107, 53, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Report an Issue
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/issues')}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem',
                  borderColor: 'rgba(255,255,255,0.5)', 
                  color: 'white',
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Issues
              </Button>
            </Box>

            {/* Emergency Alert */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mt: 3,
                p: 2,
                background: 'rgba(220, 53, 69, 0.2)',
                border: '1px solid rgba(220, 53, 69, 0.3)',
                borderRadius: 2,
                maxWidth: 300,
              }}
            >
              <Emergency sx={{ color: '#ff6b6b', fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  Emergency: 1912
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  24/7 Power Emergency Line
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Visual */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', position: 'relative', height: 400 }}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Main Icon */}
                <Lightbulb 
                  sx={{ 
                    fontSize: { xs: 120, md: 200 },
                    color: 'rgba(255,255,255,0.9)',
                    filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.3))',
                  }} 
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );

  // Process Steps Component
  const ProcessStepsSection = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          How It Works
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            fontWeight: 400,
          }}
        >
          Simple steps to report and track power utility issues across Gujarat
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {processSteps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={step.step}>
            <Card 
              sx={{ 
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {/* Step Number */}
                <Box 
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    mx: 'auto',
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  {step.icon}
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.primary',
                  }}
                >
                  {step.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  // Features Section Component
  const FeaturesSection = () => (
    <Box sx={{ background: '#f8fafc', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Why Choose Our Platform
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Designed to make power utility feedback simple, fast, and effective
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    {/* Icon */}
                    <Box 
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    {/* Content */}
                    <Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary',
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );

    // Stats Section Component
    const StatsSection = () => (
      <Paper 
        sx={{ 
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #303f9f 100%)',
          color: 'white',
          py: 8,
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      fontSize: 48, 
                      mb: 2,
                      color: stat.color,
                      opacity: 0.9,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800,
                      mb: 1,
                      color: 'white',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      opacity: 0.9,
                      fontWeight: 400,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
    );

    // Emergency Section Component
    const EmergencySection = () => (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            color: 'white',
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Emergency sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Electrical Emergency?
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, fontWeight: 400 }}>
            Immediate assistance for life-threatening situations
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#dc3545',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                '&:hover': {
                  background: '#f8f9fa',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              🚨 Call 1912
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                },
                transition: 'all 0.3s ease',
              }}
            >
              ⚡ Safety: 1800-1912
            </Button>
          </Box>
        </Paper>
      </Container>
    );

    // Final CTA Section Component
    const CTASection = () => (
      <Box sx={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Your feedback helps us maintain Gujarat's power infrastructure at its best. 
            Join thousands of citizens contributing to a safer power network.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/submit-feedback')}
            endIcon={<ArrowForward />}
            sx={{ 
              px: 6, 
              py: 2, 
              fontSize: '1.1rem',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
              boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(255, 107, 53, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Report an Issue Now
          </Button>
        </Container>
      </Box>
    );

    // Main Component Render
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <HeroSection />
        <ProcessStepsSection />
        <FeaturesSection />
        <StatsSection />
        <EmergencySection />
        <CTASection />
      </Box>
    );
  };

  export default Home;