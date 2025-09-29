import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Pagination,
  Alert,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Clear, 
  Emergency,
  Warning,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import FeedbackCard from '../components/FeedbackCard';
import StatusBadge from '../components/StatusBadge';
import { CATEGORIES, URGENCY_LEVELS, STATUS_TYPES } from '../utils/constants';

const ViewIssues = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      let q = query(
        collection(db, 'feedback'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const feedbacksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));

      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || feedback.category === categoryFilter;
    const matchesStatus = !statusFilter || feedback.status === statusFilter;
    const matchesUrgency = !urgencyFilter || feedback.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesUrgency;
  });

  const paginatedFeedbacks = filteredFeedbacks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categories = [...new Set(feedbacks.map(f => f.category).filter(Boolean))];
  const statuses = STATUS_TYPES;
  const urgencyLevels = URGENCY_LEVELS;

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
    setUrgencyFilter('');
    setPage(1);
  };

  const getStatusCount = (status) => {
    return feedbacks.filter(f => f.status === status).length;
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseDetails = () => {
    setSelectedFeedback(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading issues...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Reported Issues
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track the status of power utility issues across Gujarat
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {feedbacks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight={700}>
                {getStatusCount('pending') + getStatusCount('under-review')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h4" color="info.main" fontWeight={700}>
                {getStatusCount('in-progress')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                {getStatusCount('resolved')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList />
            Filters & Search
          </Typography>
          <Button
            startIcon={<Clear />}
            onClick={clearFilters}
            size="small"
            disabled={!searchTerm && !categoryFilter && !statusFilter && !urgencyFilter}
          >
            Clear All
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status.value} value={status.value}>
                    <StatusBadge status={status.value} size="small" />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Urgency</InputLabel>
              <Select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                label="Urgency"
              >
                <MenuItem value="">All Urgency</MenuItem>
                {urgencyLevels.map(level => (
                  <MenuItem key={level.value} value={level.value}>
                    <Chip 
                      label={level.label} 
                      size="small"
                      color={level.color}
                      variant="outlined"
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                defaultValue="newest"
                label="Sort By"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="urgency">Urgency</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Active Filters */}
        {(searchTerm || categoryFilter || statusFilter || urgencyFilter) && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                size="small"
              />
            )}
            {categoryFilter && (
              <Chip
                label={`Category: ${categoryFilter}`}
                onDelete={() => setCategoryFilter('')}
                size="small"
              />
            )}
            {statusFilter && (
              <Chip
                label={`Status: ${statusFilter}`}
                onDelete={() => setStatusFilter('')}
                size="small"
              />
            )}
            {urgencyFilter && (
              <Chip
                label={`Urgency: ${urgencyLevels.find(u => u.value === urgencyFilter)?.label}`}
                onDelete={() => setUrgencyFilter('')}
                size="small"
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {paginatedFeedbacks.length} of {filteredFeedbacks.length} issues
        </Typography>
        <Chip
          icon={<FilterList />}
          label={`${filteredFeedbacks.length} issues found`}
          variant="outlined"
        />
      </Box>

      {/* Feedback Cards */}
      {paginatedFeedbacks.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            No issues found matching your criteria
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {feedbacks.length === 0 
              ? "No issues have been reported yet. Be the first to report an issue!"
              : "Try adjusting your filters or search terms."
            }
          </Typography>
          {feedbacks.length === 0 && (
            <Button 
              variant="contained" 
              onClick={() => window.location.href = '/submit-feedback'}
              sx={{ mt: 1 }}
            >
              Report First Issue
            </Button>
          )}
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedFeedbacks.map((feedback) => (
              <Grid item xs={12} key={feedback.id}>
                <FeedbackCard 
                  feedback={feedback} 
                  onViewDetails={handleViewDetails}
                  showActions={true}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {filteredFeedbacks.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredFeedbacks.length / itemsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            p: 2,
          }}
          onClick={handleCloseDetails}
        >
          <Paper
            sx={{
              maxWidth: 800,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              p: 3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FeedbackCard 
              feedback={selectedFeedback} 
              showActions={false}
            />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button onClick={handleCloseDetails} variant="contained">
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ViewIssues;