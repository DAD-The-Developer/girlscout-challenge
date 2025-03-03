'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  LocationOn,
  Email,
  CalendarToday,
} from '@mui/icons-material';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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
        setFormData({
          name: data.user.name || '',
          bio: data.user.bio || '',
          location: data.user.location || '',
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Reset form data if canceling edit
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
      });
    }
    setEditMode(!editMode);
    setSaveError('');
    setSaveSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      // This would be replaced with an actual API call in a real app
      // For now, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update local user state to reflect changes
      setUser((prev) => ({
        ...prev,
        ...formData,
      }));
      
      setEditMode(false);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError('Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}
        
        {saveError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {saveError}
          </Alert>
        )}
        
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Profile Avatar and Basic Info */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {user?.name?.charAt(0) || <Person />}
                  </Avatar>
                  
                  {!editMode ? (
                    <Typography variant="h5" align="center" gutterBottom>
                      {user?.name || 'User'}
                    </Typography>
                  ) : (
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  )}
                  
                  <Box sx={{ mt: 1, mb: 3, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                    
                    {user?.createdAt && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Member since {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {!editMode ? (
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={handleEditToggle}
                      fullWidth
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleEditToggle}
                        fullWidth
                        color="error"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        type="submit"
                        fullWidth
                        disabled={saveLoading}
                      >
                        {saveLoading ? <CircularProgress size={24} /> : 'Save'}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              {/* Profile Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                
                {!editMode ? (
                  <Typography variant="body1" paragraph>
                    {user?.bio || 'No bio provided yet.'}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                )}
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Location
                </Typography>
                
                {!editMode ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {user?.location || 'No location provided yet.'}
                    </Typography>
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Your city or neighborhood"
                  />
                )}
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Activity
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`${user?.reportedIssues?.length || 0} Reported Issues`} 
                    variant="outlined" 
                    onClick={() => router.push('/dashboard')}
                  />
                  <Chip 
                    label={`${user?.votedIssues?.length || 0} Voted Issues`} 
                    variant="outlined"
                    onClick={() => router.push('/dashboard')}
                  />
                  <Chip 
                    label={`${user?.commentedIssues?.length || 0} Commented Issues`} 
                    variant="outlined"
                    onClick={() => router.push('/dashboard')}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
} 