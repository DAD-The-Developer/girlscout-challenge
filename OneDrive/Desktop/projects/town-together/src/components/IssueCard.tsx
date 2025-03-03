"use client";

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, IconButton, Avatar } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

// Define the issue type
export interface IssueType {
  id: string;
  title: string;
  description: string;
  category: 'infrastructure' | 'safety' | 'environment' | 'community' | 'other';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  location: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  votes: number;
  comments: number;
  image?: string;
  userVoted?: boolean;
}

// Define category and status display information
const categoryInfo = {
  infrastructure: { label: 'Infrastructure', className: 'issue-card__category--infrastructure' },
  safety: { label: 'Safety', className: 'issue-card__category--safety' },
  environment: { label: 'Environment', className: 'issue-card__category--environment' },
  community: { label: 'Community', className: 'issue-card__category--community' },
  other: { label: 'Other', className: 'issue-card__category--other' },
};

const statusInfo = {
  'open': { label: 'Open', className: 'issue-card__status--open' },
  'in-progress': { label: 'In Progress', className: 'issue-card__status--in-progress' },
  'resolved': { label: 'Resolved', className: 'issue-card__status--resolved' },
  'closed': { label: 'Closed', className: 'issue-card__status--closed' },
};

interface IssueCardProps {
  issue: IssueType;
  onVote?: (id: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onVote }) => {
  const { id, title, description, category, status, location, createdAt, createdBy, votes, comments, image, userVoted } = issue;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Handle vote click
  const handleVoteClick = () => {
    if (onVote) {
      onVote(id);
    }
  };

  // Truncate description if it's too long
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="issue-card">
      <CardContent>
        <Box className="issue-card__header">
          <Chip 
            label={categoryInfo[category].label} 
            size="small" 
            className={`issue-card__category ${categoryInfo[category].className}`}
          />
          <Chip 
            label={statusInfo[status].label} 
            size="small" 
            className={`issue-card__status ${statusInfo[status].className}`}
          />
        </Box>
        
        <Typography variant="h6" component="h3" className="issue-card__title">
          {title}
        </Typography>
        
        <Box className="issue-card__meta">
          <Box className="issue-card__meta-item">
            <LocationOnIcon className="icon" fontSize="small" />
            <Typography variant="body2">{location}</Typography>
          </Box>
          <Box className="issue-card__meta-item">
            <AccessTimeIcon className="icon" fontSize="small" />
            <Typography variant="body2">{formattedDate}</Typography>
          </Box>
          <Box className="issue-card__meta-item">
            <PersonIcon className="icon" fontSize="small" />
            <Typography variant="body2">{createdBy.name}</Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" className="issue-card__description">
          {truncateDescription(description)}
        </Typography>
        
        {image && (
          <Box className="issue-card__image">
            <img src={image} alt={title} />
          </Box>
        )}
      </CardContent>
      
      <CardActions className="issue-card__actions">
        <Box className="issue-card__vote">
          <IconButton 
            onClick={handleVoteClick} 
            size="small" 
            color={userVoted ? 'primary' : 'default'}
            aria-label={userVoted ? "Remove vote" : "Vote for this issue"}
          >
            {userVoted ? <ThumbUpIcon className="icon icon--active" /> : <ThumbUpOutlinedIcon className="icon" />}
          </IconButton>
          <Typography variant="body2" className="count">{votes}</Typography>
        </Box>
        
        <Button 
          component={Link}
          href={`/issues/${id}`}
          size="small" 
          endIcon={<ChatBubbleOutlineIcon />}
          className="issue-card__comments"
        >
          {comments} Comments
        </Button>
        
        <Button 
          component={Link}
          href={`/issues/${id}`}
          variant="outlined" 
          size="small"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default IssueCard; 