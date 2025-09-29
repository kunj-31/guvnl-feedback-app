import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  AdminPanelSettings,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  People,
  LocationOn,
  Build,
  Edit,
  Delete,
  Refresh,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import StatusBadge from '../components/StatusBadge';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    if (user && user.email === 'admin@guvnl.com') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const q = query(
        collection(db, 'feedback'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const feedbacksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));

      setFeedbacks(feedbacksData);
      calculateStats(feedbacksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const statsData = {
      total: data.length,
      pending: data.filter(f => f.status === 'pending').length,
      inProgress: data.filter(f => f.status === 'in-progress').length,
      resolved: data.filter(f => f.status === 'resolved').length,
      critical: data.filter(f => f.urgency === 'critical').length,
      highPriority: data.filter(f => f.urgency === 'high').length,
    };
    setStats(statsData);
  };

  const handleStatusUpdate = async (feedbackId, newStatus) => {
    try {
      const feedbackRef = doc(db, 'feedback', feedbackId);
      await updateDoc(feedbackRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
      
      // Update local state
      setFeedbacks(prev => prev.map(f => 
        f.id === feedbackId ? { ...f, status: newStatus, updatedAt: new Date() } : f
      ));
      
      // Recalculate stats
      calculateStats(feedbacks);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteDoc(doc(db, 'feedback', feedbackId));
        setFeedbacks(prev => prev.filter(f => f.id !== feedbackId));
        calculateStats(feedbacks.filter(f => f.id !== feedbackId));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    switch (activeTab) {
      case 0: return feedback.status === 'pending';
      case 1: return feedback.status === 'in-progress';
      case 2: return feedback.status === 'resolved';
      case 3: return feedback.urgency === 'critical' || feedback.urgency === 'high';
      default: return true;
    }
  });

  if (!user || user.email !== 'admin@guvnl.com') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body2">
            You don't have permission to access the admin panel.
          </Typography>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading admin panel...
        </Typography>
      </Container>
    );
  }

  const StatCard = ({ title, value, icon, color, change }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight={700}>
              {value}
            </Typography>
            {change && (
              <Typography variant="body2" color={change > 0 ? 'success.main' : 'error.main'}>
                {change > 0 ? '+' : ''}{change} from last week
              </Typography>
            )}
          </Box>
          <Box sx={{ color: `${color}.main`, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          <AdminPanelSettings sx={{ mr: 2, verticalAlign: 'middle' }} />
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage and monitor all power utility feedback reports
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Reports"
            value={stats.total}
            icon={<TrendingUp />}
            color="primary"
            change={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Pending Review"
            value={stats.pending}
            icon={<Schedule />}
            color="warning"
            change={-3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={<Build />}
            color="info"
            change={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={<CheckCircle />}
            color="success"
            change={8}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Critical Issues"
            value={stats.critical}
            icon={<Warning />}
            color="error"
            change={2}
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<Schedule />} 
            label={`Pending (${stats.pending})`} 
            iconPosition="start" 
          />
          <Tab 
            icon={<Build />} 
            label={`In Progress (${stats.inProgress})`} 
            iconPosition="start" 
          />
          <Tab 
            icon={<CheckCircle />} 
            label={`Resolved (${stats.resolved})`} 
            iconPosition="start" 
          />
          <Tab 
            icon={<Warning />} 
            label={`High Priority (${stats.critical + stats.highPriority})`} 
            iconPosition="start" 
          />
          <Tab 
            icon={<People />} 
            label={`All Reports (${stats.total})`} 
            iconPosition="start" 
          />
        </Tabs>
      </Paper>

      {/* Actions Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {activeTab === 0 && 'Pending Reviews'}
          {activeTab === 1 && 'Issues In Progress'}
          {activeTab === 2 && 'Resolved Issues'}
          {activeTab === 3 && 'High Priority Issues'}
          {activeTab === 4 && 'All Reports'}
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={fetchData}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {/* Feedback Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFeedbacks.map((feedback) => (
              <TableRow 
                key={feedback.id}
                sx={{ 
                  '&:hover': { backgroundColor: '#f8fafc' },
                  backgroundColor: feedback.urgency === 'critical' ? '#fff5f5' : 'inherit'
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {feedback.id.substring(0, 8)}...
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {feedback.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={feedback.category} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <StatusBadge status={feedback.status} />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={feedback.urgency} 
                    size="small"
                    color={
                      feedback.urgency === 'critical' ? 'error' :
                      feedback.urgency === 'high' ? 'error' :
                      feedback.urgency === 'medium' ? 'warning' : 'success'
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2">
                      {feedback.address ? feedback.address.substring(0, 20) + '...' : 'Not specified'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {feedback.createdAt.toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      select
                      size="small"
                      value={feedback.status}
                      onChange={(e) => handleStatusUpdate(feedback.id, e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="under-review">Under Review</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </TextField>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteFeedback(feedback.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredFeedbacks.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body1">
            No issues found in this category.
          </Typography>
        </Alert>
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
          onClick={() => setSelectedFeedback(null)}
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
            <Typography variant="h5" gutterBottom>
              Feedback Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ID: {selectedFeedback.id}
              </Typography>
            </Box>
            {/* Add detailed feedback view here */}
            <Button 
              onClick={() => setSelectedFeedback(null)}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default AdminPanel;