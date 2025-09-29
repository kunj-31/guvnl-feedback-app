import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

const LoadingSpinner = ({ 
  loading = true, 
  message = 'Loading...',
  fullScreen = false,
  size = 40,
  color = 'primary'
}) => {
  if (!loading) return null;

  const spinnerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress 
        size={size} 
        color={color}
        sx={{
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      {message && (
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Backdrop
        open={loading}
        sx={{
          zIndex: 1300,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {spinnerContent}
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {spinnerContent}
    </Box>
  );
};

// Specific loading components for different scenarios
export const PageLoading = ({ message = 'Loading page...' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 3,
    }}
  >
    <CircularProgress size={60} />
    <Typography variant="h6" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export const ButtonLoading = ({ size = 20 }) => (
  <CircularProgress size={size} color="inherit" />
);

export const SkeletonLoader = ({ count = 3, height = 100 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box
        key={index}
        sx={{
          height,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
    ))}
  </Box>
);

export default LoadingSpinner;