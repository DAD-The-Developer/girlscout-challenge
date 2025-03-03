'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({
    email: '',
    secretKey: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/admin/make-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to make user an admin');
      }

      setStatus({
        loading: false,
        success: true,
        error: '',
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Admin Setup
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Make a user an administrator for Town Together
          </Typography>

          {status.error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {status.error}
            </Alert>
          )}

          {status.success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              User has been successfully made an admin!
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="secretKey"
              label="Admin Secret Key"
              type="password"
              id="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={status.loading}
              sx={{ mb: 2 }}
            >
              {status.loading ? <CircularProgress size={24} /> : 'Make Admin'}
            </Button>

            <Typography variant="caption" color="text.secondary" align="center" display="block">
              This utility is for initial setup only. For security reasons, it should be disabled in production.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 