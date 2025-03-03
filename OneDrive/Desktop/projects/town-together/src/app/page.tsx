"use client";

import React from 'react';
import { Typography, Button, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import Layout from '@/components/Layout';
import Link from 'next/link';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';

export default function Home() {
  const features = [
    {
      icon: <ReportProblemOutlinedIcon fontSize="large" color="primary" />,
      title: 'Report Issues',
      description: 'Easily report local issues like potholes, broken streetlights, or safety concerns with just a few clicks.',
    },
    {
      icon: <HowToVoteOutlinedIcon fontSize="large" color="primary" />,
      title: 'Vote on Priorities',
      description: 'Help your community decide which issues matter most by voting and commenting on reported problems.',
    },
    {
      icon: <TrackChangesOutlinedIcon fontSize="large" color="primary" />,
      title: 'Track Progress',
      description: 'Follow the status of reported issues and see how your town is addressing community concerns.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          mb: 6,
          px: 2
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Empower Your Community
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Town Together helps small towns identify, prioritize, and solve local issues through community engagement.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            href="/issues/report"
            sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
          >
            Report an Issue
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            component={Link} 
            href="/issues"
          >
            View Issues
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2, mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>
                {feature.icon}
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 6,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          mb: 6
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Join Your Community Today
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
          Sign up now to start reporting issues, voting on priorities, and making a difference in your town.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large" 
          component={Link} 
          href="/auth/signup"
          sx={{ mt: 2 }}
        >
          Sign Up for Free
        </Button>
      </Box>
    </Layout>
  );
}
