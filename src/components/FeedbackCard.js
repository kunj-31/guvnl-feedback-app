import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Grid,
  Avatar,
  Tooltip,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  LocationOn,
  Schedule,
  Warning,
  CheckCircle,
  Build,
  Visibility,
  ChatBubble,
  Share,
} from '@mui/icons-material';
import { URGENCY_LEVELS } from '../utils/constants';

const FeedbackCard = ({ feedback, onViewDetails, showActions = true }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageModal, setImageModal] = useState({ open: false, image: '' });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'default';
      case 'under-review': return 'primary';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Schedule />;
      case 'under-review': return <Visibility />;
      case 'in-progress': return <Build />;
      case 'resolved': return <CheckCircle />;
      case 'closed': return <CheckCircle />;
      default: return <Schedule />;
    }
  };

  const getUrgencyColor = (urgency) => {
    const level = URGENCY_LEVELS.find(u => u.value === urgency);
    return level ? level.color : 'default';
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageClick = (imageUrl) => {
    setImageModal({ open: true, image: imageUrl });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 2,
          borderLeft: `4px solid ${
            feedback.urgency === 'critical' ? '#dc3545' :
            feedback.urgency === 'high' ? '#d32f2f' :
            feedback.urgency === 'medium' ? '#ed6c02' : '#2e7d32'
          }`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {feedback.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, alignItems: 'center' }}>
                <Chip
                  icon={getStatusIcon(feedback.status)}
                  label={feedback.status?.replace('-', ' ') || 'Pending'}
                  size="small"
                  color={getStatusColor(feedback.status)}
                  variant="outlined"
                />
                
                <Chip
                  icon={<Warning />}
                  label={feedback.urgency || 'medium'}
                  size="small"
                  color={getUrgencyColor(feedback.urgency)}
                  variant="outlined"
                />
                
                <Chip
                  label={feedback.category || 'General'}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderColor: '#bbdefb',
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {formatDate(feedback.createdAt)}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title={expanded ? "Show less" : "Show more"}>
                  <IconButton 
                    size="small" 
                    onClick={handleExpandClick}
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </Tooltip>
                
                {showActions && (
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => onViewDetails && onViewDetails(feedback)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>

          {/* Description Preview */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
            }}
          >
            {feedback.description}
          </Typography>

          {/* Collapsible Content */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {/* Location Information */}
            {feedback.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.5, background: '#f8fafc', borderRadius: 2 }}>
                <LocationOn color="primary" sx={{ fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Issue Location
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lat: {feedback.location.lat?.toFixed(6)}, Lng: {feedback.location.lng?.toFixed(6)}
                  </Typography>
                  {feedback.address && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {feedback.address}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Contact Information */}
            {feedback.contact && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feedback.contact}
                </Typography>
              </Box>
            )}

            {/* Images Gallery */}
            {feedback.images && feedback.images.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Attached Images ({feedback.images.length})
                </Typography>
                <Grid container spacing={1}>
                  {feedback.images.slice(0, 3).map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                        onClick={() => handleImageClick(image)}
                      >
                        <img
                          src={image}
                          alt={`Issue evidence ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                  {feedback.images.length > 3 && (
                    <Grid item xs={4}>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0',
                        }}
                        onClick={() => setExpanded(true)}
                      >
                        +{feedback.images.length - 3}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {/* Action Buttons */}
            {showActions && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ChatBubble />}
                  onClick={() => onViewDetails && onViewDetails(feedback)}
                >
                  Comment
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Share />}
                >
                  Share
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 'auto' }}
                  onClick={() => onViewDetails && onViewDetails(feedback)}
                >
                  View Full Details
                </Button>
              </Box>
            )}
          </Collapse>

          {/* Footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
            <Typography variant="caption" color="text.secondary">
              ID: {feedback.id?.substring(0, 8)}...
            </Typography>
            
            {feedback.updatedAt && feedback.updatedAt !== feedback.createdAt && (
              <Typography variant="caption" color="text.secondary">
                Updated: {formatDate(feedback.updatedAt)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Image Modal */}
      {imageModal.open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            p: 2,
          }}
          onClick={() => setImageModal({ open: false, image: '' })}
        >
          <img
            src={imageModal.image}
            alt="Full size preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default FeedbackCard;