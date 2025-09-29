import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  BugReport,
  CheckCircle,
  Schedule,
  TrendingUp,
  Warning,
  Lightbulb,
  Add,
  Visibility,
  Emergency,
  Build,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user's feedbacks
      const q = query(
        collection(db, 'feedback'),
        where('contact', '==', user.email),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const feedbacks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));

      setUserFeedbacks(feedbacks);

      // Calculate stats
      const statsData = {
        total: feedbacks.length,
        pending: feedbacks.filter(f => f.status === 'pending').length,
        inProgress: feedbacks.filter(f => f.status === 'in-progress').length,
        resolved: feedbacks.filter(f => f.status === 'resolved').length,
        critical: feedbacks.filter(f => f.urgency === 'critical').length,
      };
      setStats(statsData);

      // Generate recent activity
      const activity = feedbacks.slice(0, 5).map(feedback => ({
        id: feedback.id,
        title: feedback.title,
        status: feedback.status,
        category: feedback.category,
        date: feedback.createdAt,
        urgency: feedback.urgency,
      }));
      setRecentActivity(activity);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card className="stat-card" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="h3" component="div" fontWeight={700} color={`${color}.main`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            color: `${color}.main`, 
            fontSize: 48,
            opacity: 0.8,
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, onClick, color = 'primary' }) => (
    <Card 
      className="quick-action-card" 
      sx={{ height: '100%', cursor: 'pointer' }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Box 
          sx={{ 
            color: `${color}.main`,
            fontSize: 40,
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your dashboard...
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please log in to view your dashboard
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Alert>
      </Container>
    );
  }

  const resolutionRate = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          My Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back! Here's an overview of your reported issues and activities.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Reports"
            value={stats.total || 0}
            icon={<BugReport />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Pending"
            value={stats.pending || 0}
            icon={<Schedule />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="In Progress"
            value={stats.inProgress || 0}
            icon={<Build />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Resolved"
            value={stats.resolved || 0}
            icon={<CheckCircle />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Critical"
            value={stats.critical || 0}
            icon={<Emergency />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Resolution Progress */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Resolution Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={resolutionRate} 
            sx={{ 
              flexGrow: 1, 
              height: 8, 
              borderRadius: 4,
              backgroundColor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: resolutionRate >= 80 ? '#2e7d32' : 
                                resolutionRate >= 50 ? '#ed6c02' : '#1976d2',
                borderRadius: 4,
              }
            }}
          />
          <Typography variant="body1" fontWeight={600}>
            {resolutionRate}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {stats.resolved} out of {stats.total} issues resolved
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Recent Activity */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp />
              Recent Activity
            </Typography>
            {recentActivity.length === 0 ? (
              <Alert severity="info">
                <Typography variant="body1" gutterBottom>
                  You haven't submitted any reports yet.
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Start by reporting an issue to help improve Gujarat's power infrastructure.
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => navigate('/submit-feedback')}
                >
                  Report First Issue
                </Button>
              </Alert>
            ) : (
              <List>
                {recentActivity.map((activity) => (
                  <ListItem 
                    key={activity.id} 
                    divider
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>
                            {activity.title}
                          </Typography>
                          <StatusBadge status={activity.status} size="small" />
                          {activity.urgency === 'critical' && (
                            <Chip 
                              icon={<Emergency />}
                              label="Critical" 
                              size="small" 
                              color="error"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {activity.category} • {activity.date.toLocaleDateString()}
                          </Typography>
                          <Button 
                            size="small" 
                            startIcon={<Visibility />}
                            onClick={() => navigate('/issues')}
                          >
                            View
                          </Button>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>

          {/* Urgent Issues */}
          {stats.critical > 0 && (
            <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#dc2626' }}>
                <Emergency />
                Critical Issues Need Attention
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#dc2626' }}>
                You have {stats.critical} critical issue(s) that require immediate attention. 
                Our team is working on resolving them as quickly as possible.
              </Typography>
              <Button 
                variant="contained" 
                color="error"
                startIcon={<Visibility />}
                onClick={() => navigate('/issues')}
              >
                View Critical Issues
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb />
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <QuickActionCard
                  title="Report New Issue"
                  description="Submit a new power utility issue with location and photos"
                  icon={<Add />}
                  onClick={() => navigate('/submit-feedback')}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <QuickActionCard
                  title="View All Issues"
                  description="Browse all reported issues across Gujarat"
                  icon={<Visibility />}
                  onClick={() => navigate('/issues')}
                  color="secondary"
                />
              </Grid>
              {user.email === 'admin@guvnl.com' && (
                <Grid item xs={12}>
                  <QuickActionCard
                    title="Admin Panel"
                    description="Manage issues, users, and system settings"
                    icon={<Warning />}
                    onClick={() => navigate('/admin')}
                    color="warning"
                  />
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Tips & Guidelines */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📝 Tips for Effective Reporting
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                • Provide clear, well-lit photos of the issue
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Be specific about the exact location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Include relevant landmarks for easy identification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Mention urgency level accurately
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Keep contact information updated
              </Typography>
            </Box>
          </Paper>

          {/* Emergency Contact */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mt: 4,
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Emergency />
              Emergency Contact
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
              🚨 Call 1912
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              For immediate assistance with life-threatening electrical emergencies
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;