"use client";

import React from 'react';
import { Typography, Box, Grid, TextField, InputAdornment, MenuItem, FormControl, InputLabel, Select, Button, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Layout from '@/components/Layout';
import IssueCard, { IssueType } from '@/components/IssueCard';
import Link from 'next/link';

// Mock data for issues
const mockIssues: IssueType[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'There is a large pothole on Main Street near the intersection with Oak Avenue. It\'s causing damage to vehicles and is a safety hazard, especially at night when it\'s hard to see.',
    category: 'infrastructure',
    status: 'open',
    location: 'Main Street & Oak Avenue',
    createdAt: '2023-06-15T10:30:00Z',
    createdBy: {
      id: 'user1',
      name: 'John Smith',
    },
    votes: 24,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    userVoted: true,
  },
  {
    id: '2',
    title: 'Broken Streetlight',
    description: 'The streetlight at the corner of Pine Street and 3rd Avenue has been out for over a week. This area is quite dark at night and is creating safety concerns for pedestrians.',
    category: 'safety',
    status: 'in-progress',
    location: 'Pine Street & 3rd Avenue',
    createdAt: '2023-06-18T14:45:00Z',
    createdBy: {
      id: 'user2',
      name: 'Sarah Johnson',
    },
    votes: 18,
    comments: 5,
    userVoted: false,
  },
  {
    id: '3',
    title: 'Illegal Dumping at River Park',
    description: 'Someone has been dumping trash and construction materials at the north end of River Park. This is polluting our park and potentially harming local wildlife.',
    category: 'environment',
    status: 'open',
    location: 'River Park, North Entrance',
    createdAt: '2023-06-20T09:15:00Z',
    createdBy: {
      id: 'user3',
      name: 'Michael Brown',
    },
    votes: 32,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    userVoted: true,
  },
  {
    id: '4',
    title: 'Community Garden Proposal',
    description: 'I would like to propose creating a community garden in the vacant lot on Maple Street. This would beautify the area and provide fresh produce for local residents.',
    category: 'community',
    status: 'open',
    location: 'Maple Street, Vacant Lot',
    createdAt: '2023-06-22T16:20:00Z',
    createdBy: {
      id: 'user4',
      name: 'Emily Wilson',
    },
    votes: 45,
    comments: 20,
    userVoted: false,
  },
  {
    id: '5',
    title: 'Graffiti on Public Library',
    description: 'There is extensive graffiti on the north wall of the public library. This vandalism detracts from one of our town\'s most important buildings.',
    category: 'other',
    status: 'resolved',
    location: 'Public Library, 500 Center Street',
    createdAt: '2023-06-10T11:00:00Z',
    createdBy: {
      id: 'user5',
      name: 'David Lee',
    },
    votes: 15,
    comments: 7,
    image: 'https://images.unsplash.com/photo-1621251524311-1d2adc7e6313?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    userVoted: true,
  },
  {
    id: '6',
    title: 'Playground Equipment Needs Repair',
    description: 'Several pieces of equipment at the Central Park playground are broken or damaged. The slide has a crack, and two swings are missing.',
    category: 'infrastructure',
    status: 'in-progress',
    location: 'Central Park Playground',
    createdAt: '2023-06-25T13:10:00Z',
    createdBy: {
      id: 'user6',
      name: 'Jessica Martinez',
    },
    votes: 28,
    comments: 9,
    userVoted: false,
  },
];

export default function IssuesPage() {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Community Issues
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            component={Link}
            href="/issues/report"
          >
            Report Issue
          </Button>
        </Box>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse, vote, and comment on issues reported by your community. Help prioritize what matters most to your town.
        </Typography>
      </Box>
      
      {/* Filters and Search */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <TextField
          placeholder="Search issues..."
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              label="Category"
              defaultValue="all"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="infrastructure">Infrastructure</MenuItem>
              <MenuItem value="safety">Safety</MenuItem>
              <MenuItem value="environment">Environment</MenuItem>
              <MenuItem value="community">Community</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              label="Status"
              defaultValue="all"
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="sort-filter-label">Sort By</InputLabel>
            <Select
              labelId="sort-filter-label"
              id="sort-filter"
              label="Sort By"
              defaultValue="votes"
            >
              <MenuItem value="votes">Most Votes</MenuItem>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="comments">Most Comments</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      {/* Issues Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockIssues.map((issue) => (
          <Grid item xs={12} md={6} lg={4} key={issue.id}>
            <IssueCard issue={issue} />
          </Grid>
        ))}
      </Grid>
      
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Layout>
  );
} 