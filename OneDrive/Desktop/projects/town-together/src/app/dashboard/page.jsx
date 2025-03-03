'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Person,
  Edit,
  ReportProblem,
  ThumbUp,
  Comment,
  Logout,
} from '@mui/icons-material';
import IssueCard from '../../components/IssueCard';
import DatabaseStatus from '../../components/DatabaseStatus';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [issues, setIssues] = useState({
    reported: [],
    voted: [],
    commented: [],
  });

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // If not authenticated, redirect to login
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);

        // Fetch user's issues (this would be replaced with actual API calls)
        // For now, we'll use mock data
        setIssues({
          reported: getMockIssues(3),
          voted: getMockIssues(2),
          commented: getMockIssues(4),
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      setError('Failed to logout');
    }
  };

  // Mock data generator
  const getMockIssues = (count) => {
    const categories = ['infrastructure', 'safety', 'environment', 'community', 'other'];
    const statuses = ['open', 'in-progress', 'resolved', 'closed'];
    
    return Array(count)
      .fill(0)
      .map((_, index) => ({
        id: `issue-${index}`,
        title: `Issue ${index + 1}`,
        description: `This is a description for issue ${index + 1}. It contains details about the problem that needs to be addressed.`,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        location: 'Main Street, Downtown',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        createdBy: { 
          id: 'user-1',
          name: 'Current User', 
          avatar: '' 
        },
        votes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 5),
        userVoted: Math.random() > 0.5,
      }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Database Status Section - Admin Only */}
      {user?.role === 'admin' && (
        <Box sx={{ mb: 4 }}>
          <DatabaseStatus />
        </Box>
      )}
      
      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {user?.name?.charAt(0) || <Person />}
              </Avatar>
              
              <Typography variant="h5" gutterBottom>
                {user?.name || 'User'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email || 'email@example.com'}
              </Typography>
              
              <Button
                variant="outlined"
                startIcon={<Edit />}
                size="small"
                sx={{ mt: 1 }}
                onClick={() => router.push('/profile/edit')}
              >
                Edit Profile
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box>
              <Typography variant="h6" gutterBottom>
                User Stats
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Reported Issues"
                    secondary={issues.reported.length}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Voted Issues"
                    secondary={issues.voted.length}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Commented Issues"
                    secondary={issues.commented.length}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Member Since"
                    secondary={
                      user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'
                    }
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<ReportProblem />}
                onClick={() => router.push('/issues/report')}
              >
                Report New Issue
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* User Issues Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              My Issues
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="issue tabs"
                variant="fullWidth"
              >
                <Tab
                  icon={<ReportProblem />}
                  label="Reported"
                  id="tab-0"
                  aria-controls="tabpanel-0"
                />
                <Tab
                  icon={<ThumbUp />}
                  label="Voted"
                  id="tab-1"
                  aria-controls="tabpanel-1"
                />
                <Tab
                  icon={<Comment />}
                  label="Commented"
                  id="tab-2"
                  aria-controls="tabpanel-2"
                />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              {issues.reported.length > 0 ? (
                <Grid container spacing={3}>
                  {issues.reported.map((issue) => (
                    <Grid item xs={12} key={issue.id}>
                      <IssueCard issue={issue} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't reported any issues yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ReportProblem />}
                    sx={{ mt: 2 }}
                    onClick={() => router.push('/issues/report')}
                  >
                    Report an Issue
                  </Button>
                </Box>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              {issues.voted.length > 0 ? (
                <Grid container spacing={3}>
                  {issues.voted.map((issue) => (
                    <Grid item xs={12} key={issue.id}>
                      <IssueCard issue={issue} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't voted on any issues yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => router.push('/issues')}
                  >
                    Browse Issues
                  </Button>
                </Box>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              {issues.commented.length > 0 ? (
                <Grid container spacing={3}>
                  {issues.commented.map((issue) => (
                    <Grid item xs={12} key={issue.id}>
                      <IssueCard issue={issue} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    You haven't commented on any issues yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => router.push('/issues')}
                  >
                    Browse Issues
                  </Button>
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
} 