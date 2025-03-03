"use client";

import React from 'react';
import { Typography, Box, TextField, MenuItem, Button, Paper, Grid, FormControl, FormLabel, FormHelperText } from '@mui/material';
import Layout from '@/components/Layout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function ReportIssuePage() {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/issues"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Issues
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Report an Issue
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Help improve your community by reporting issues that need attention. Be specific and include as much detail as possible.
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Issue Title */}
          <Grid item xs={12}>
            <TextField
              required
              id="issue-title"
              label="Issue Title"
              fullWidth
              helperText="Provide a clear, concise title for the issue"
            />
          </Grid>
          
          {/* Category */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="issue-category"
              select
              label="Category"
              fullWidth
              defaultValue=""
              helperText="Select the category that best describes the issue"
            >
              <MenuItem value="infrastructure">Infrastructure</MenuItem>
              <MenuItem value="safety">Safety</MenuItem>
              <MenuItem value="environment">Environment</MenuItem>
              <MenuItem value="community">Community</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
          
          {/* Location */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="issue-location"
              label="Location"
              fullWidth
              helperText="Enter the address or description of the location"
              InputProps={{
                endAdornment: (
                  <Button 
                    size="small" 
                    startIcon={<LocationOnIcon />}
                    sx={{ ml: 1 }}
                  >
                    Map
                  </Button>
                ),
              }}
            />
          </Grid>
          
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              required
              id="issue-description"
              label="Description"
              multiline
              rows={6}
              fullWidth
              helperText="Describe the issue in detail. What is the problem? Why is it important? How does it affect the community?"
            />
          </Grid>
          
          {/* Image Upload */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="issue-image">Upload Images (Optional)</FormLabel>
              <Box
                sx={{
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 3,
                  mt: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <input
                  type="file"
                  id="issue-image"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <label htmlFor="issue-image" style={{ cursor: 'pointer', display: 'block' }}>
                  <CloudUploadIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag and drop images here, or click to browse
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload photos of the issue to help others understand the problem (max 5 images, 5MB each)
                  </Typography>
                </label>
              </Box>
              <FormHelperText>Images help others understand the issue better</FormHelperText>
            </FormControl>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your contact information will not be publicly displayed. It may be used by town officials to follow up on the issue if needed.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              id="contact-name"
              label="Your Name"
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              id="contact-email"
              label="Email Address"
              type="email"
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              id="contact-phone"
              label="Phone Number (Optional)"
              fullWidth
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/issues"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
              >
                Submit Report
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
} 