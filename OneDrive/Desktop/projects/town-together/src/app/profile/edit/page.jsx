'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Person,
  PhotoCamera,
  Save,
  ArrowBack,
} from '@mui/icons-material';
import Layout from '@/components/Layout';

export default function ProfileEditPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    avatar: '',
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

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
          avatar: data.user.avatar || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveError('');

    try {
      // This would be replaced with an actual API call in a real app
      // For now, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect back to profile page
      router.push('/profile');
    } catch (error) {
      setSaveError('Failed to update profile. Please try again.');
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/profile')}
            sx={{ mr: 2 }}
          >
            Back to Profile
          </Button>
          <Typography variant="h4" component="h1">
            Edit Profile
          </Typography>
        </Box>
        
        {saveError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {saveError}
          </Alert>
        )}
        
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Avatar Upload */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        mb: 2,
                        bgcolor: 'primary.main',
                      }}
                      src={formData.avatar || ''}
                    >
                      {!formData.avatar && (user?.name?.charAt(0) || <Person />)}
                    </Avatar>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 0,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          bgcolor: 'background.paper',
                        },
                      }}
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    Upload a new profile picture
                  </Typography>
                </Box>
              </Grid>
              
              {/* Profile Form */}
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                
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
                
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  margin="normal"
                  placeholder="Your city or neighborhood"
                />
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/profile')}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    type="submit"
                    disabled={saveLoading}
                  >
                    {saveLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
} 