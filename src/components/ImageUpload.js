import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete,
  CloudUpload,
  Image,
} from '@mui/icons-material';

const ImageUpload = ({ 
  onImagesChange, 
  maxFiles = 5, 
  maxSize = 5 * 1024 * 1024, // 5MB
  existingImages = [] 
}) => {
  const [images, setImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  const handleFileSelect = (files) => {
    const fileList = Array.from(files);
    setError('');

    // Check file count
    if (images.length + fileList.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed. You can add ${maxFiles - images.length} more.`);
      return;
    }

    // Validate files
    const validFiles = [];
    const errors = [];

    fileList.forEach(file => {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, GIF allowed.`);
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name}: File too large. Maximum size is ${maxSize / 1024 / 1024}MB.`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join(' '));
    }

    if (validFiles.length > 0) {
      const newImages = [...images, ...validFiles];
      setImages(newImages);
      onImagesChange(newImages);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Upload Area */}
      <Paper
        elevation={dragOver ? 8 : 2}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleUploadClick}
        sx={{
          border: `2px dashed ${dragOver ? '#1976d2' : '#cbd5e1'}`,
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: dragOver ? '#f0f9ff' : '#f8fafc',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: '#f0f9ff',
            transform: 'scale(1.02)',
          },
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        
        <CloudUpload 
          sx={{ 
            fontSize: 48, 
            color: dragOver ? '#1976d2' : '#64748b',
            mb: 2,
          }} 
        />
        
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Upload Images
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag & drop images here or click to browse
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Supports JPG, PNG, GIF • Max {maxFiles} files • {maxSize / 1024 / 1024}MB per file
        </Typography>

        {uploading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Uploading...
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Selected Images */}
      {images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Image sx={{ mr: 1 }} />
            Selected Images ({images.length}/{maxFiles})
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2 }}>
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  aspectRatio: '1',
                }}
              >
                {typeof image === 'string' ? (
                  // Existing image URL
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  // New file with preview
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        color: 'white',
                        p: 1,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {formatFileSize(image.size)}
                      </Typography>
                    </Box>
                  </>
                )}
                
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(220, 38, 38, 0.9)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(185, 28, 28, 1)',
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
            
            {images.length < maxFiles && (
              <Box
                onClick={handleUploadClick}
                sx={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#f0f9ff',
                  },
                }}
              >
                <AddPhotoAlternate sx={{ color: '#64748b', mb: 1 }} />
                <Typography variant="caption" color="text.secondary" align="center">
                  Add More
                </Typography>
              </Box>
            )}
          </Box>

          {/* File Info Summary */}
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              icon={<AddPhotoAlternate />}
              label={`${images.length} image${images.length !== 1 ? 's' : ''} selected`}
              variant="outlined"
              size="small"
            />
            {images.some(img => typeof img !== 'string') && (
              <Chip
                label={`${images.filter(img => typeof img !== 'string').length} new`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Help Text */}
      {images.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
          💡 Clear photos help our team understand and resolve issues faster
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;