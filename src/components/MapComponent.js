// src/components/MapComponent.js (Simplified)
import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { LocationOn, MyLocation, Place } from '@mui/icons-material';

const MapComponent = ({ onLocationSelect, initialLocation, height = 400, readOnly = false }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapError, setMapError] = useState('');
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    // Simple map initialization without Google Maps for now
    setLoading(false);
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        handleLocationChange(location);
        setLoading(false);
      },
      (error) => {
        setMapError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1 }} />
            {readOnly ? 'Issue Location' : 'Select Location'}
          </Typography>
          
          {!readOnly && (
            <Button
              startIcon={<MyLocation />}
              onClick={getCurrentLocation}
              variant="outlined"
              size="small"
              disabled={loading}
            >
              Use My Location
            </Button>
          )}
        </Box>

        {mapError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setMapError('')}>
            {mapError}
          </Alert>
        )}

        <Box
          ref={mapRef}
          sx={{
            height: height,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography color="text.secondary">
              Map functionality will be implemented with Google Maps API
            </Typography>
          )}
        </Box>

        {selectedLocation && (
          <Box sx={{ mt: 2, p: 2, background: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="body2" fontWeight={600}>
              📍 Selected Location
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Lat: {selectedLocation.lat?.toFixed(6)}, Lng: {selectedLocation.lng?.toFixed(6)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MapComponent;