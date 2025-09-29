import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  Send,
  LocationOn,
  Description,
  Category,
  PriorityHigh,
  ContactPhone,
  Home,
  AddPhotoAlternate,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MapComponent from '../components/MapComponent';
import ImageUpload from '../components/ImageUpload';
import { CATEGORIES, URGENCY_LEVELS } from '../utils/constants';

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    contact: '',
    address: '',
  });

  const steps = [
    { label: 'Basic Information', icon: <Description /> },
    { label: 'Category & Priority', icon: <Category /> },
    { label: 'Location Details', icon: <LocationOn /> },
    { label: 'Images & Contact', icon: <ContactPhone /> },
    { label: 'Review & Submit', icon: <CheckCircle /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.title.trim() && formData.description.trim();
      case 1:
        return formData.category && formData.urgency;
      case 2:
        return selectedLocation !== null;
      case 3:
        return true; // Images and contact are optional
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Upload images
      const imageUrls = [];
      for (const image of images) {
        if (typeof image === 'string') {
          // Already uploaded image
          imageUrls.push(image);
        } else {
          // New image to upload
          const imageRef = ref(storage, `feedback-images/${Date.now()}-${image.name}`);
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
        }
      }

      // Save to Firestore
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        location: selectedLocation,
        images: imageUrls,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setMessage({ 
        type: 'success', 
        text: 'Thank you! Your feedback has been submitted successfully. Our team will review it shortly.' 
      });
      
      // Reset form
      setTimeout(() => {
        navigate('/issues');
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Error submitting feedback. Please try again. If the problem persists, contact support.' 
      });
    }
    setLoading(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Issue Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Brief, descriptive title of the issue"
              helperText="Example: Broken electric pole near main road"
            />

            <TextField
              fullWidth
              label="Detailed Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              placeholder="Please provide detailed information about the issue, including any safety concerns..."
              helperText="Be specific about what you observed and any potential risks"
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Urgency Level</InputLabel>
              <Select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                label="Urgency Level"
              >
                {URGENCY_LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={level.label} 
                        size="small" 
                        color={level.color}
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {level.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <MapComponent
              onLocationSelect={handleLocationSelect}
              initialLocation={selectedLocation}
              height={400}
            />
            
            <TextField
              fullWidth
              label="Address/Landmark"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nearby landmark, street name, or full address"
              helperText="This helps our team locate the issue faster"
              sx={{ mt: 2 }}
            />

            {!selectedLocation && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Please select the issue location on the map above
              </Alert>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ImageUpload
              onImagesChange={handleImagesChange}
              existingImages={images}
              maxFiles={5}
            />

            <TextField
              fullWidth
              label="Contact Information (Optional)"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Email or phone number for updates"
              helperText="We'll use this to send you status updates about your report"
            />
          </Box>
        );

      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Description />
                  Issue Details
                </Typography>
                <Typography><strong>Title:</strong> {formData.title}</Typography>
                <Typography><strong>Description:</strong> {formData.description}</Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Category />
                  Classification
                </Typography>
                <Typography><strong>Category:</strong> {formData.category}</Typography>
                <Typography>
                  <strong>Urgency:</strong> 
                  <Chip 
                    label={URGENCY_LEVELS.find(u => u.value === formData.urgency)?.label || 'Medium'} 
                    size="small" 
                    color={URGENCY_LEVELS.find(u => u.value === formData.urgency)?.color || 'default'}
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  Location
                </Typography>
                <Typography><strong>Address:</strong> {formData.address || 'Not specified'}</Typography>
                {selectedLocation && (
                  <Typography variant="body2" color="text.secondary">
                    Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddPhotoAlternate />
                  Media & Contact
                </Typography>
                <Typography><strong>Images:</strong> {images.length} attached</Typography>
                <Typography><strong>Contact:</strong> {formData.contact || 'Not provided'}</Typography>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight={700}>
          Report Power Utility Issue
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Help us maintain and improve Gujarat's power infrastructure
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: activeStep >= index ? 'primary.main' : '#e2e8f0',
                    color: activeStep >= index ? 'white' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                  }}
                >
                  {activeStep > index ? <CheckCircle fontSize="small" /> : step.icon}
                </Box>
              )}>
                <Typography variant="h6" fontWeight={600}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                {getStepContent(index)}
                <Box sx={{ mb: 2, mt: 3 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!validateStep(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Submit Report' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Ready to Submit!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Review your information above and submit your report.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ px: 4, py: 1.5 }}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SubmitFeedback;