'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Chip, CircularProgress, Paper } from '@mui/material';
import { CheckCircle, Error, Sync } from '@mui/icons-material';

export default function DatabaseStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/db-status');
        const data = await response.json();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to check database status');
      } finally {
        setLoading(false);
      }
    };

    // Check on component mount
    checkDbStatus();

    // Set up interval to check every 30 seconds
    const interval = setInterval(checkDbStatus, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && !status) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={16} />
        <Typography variant="body2">Checking database connection...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Error color="error" fontSize="small" />
        <Typography variant="body2" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!status) {
    return null;
  }

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Database Status
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Connection:</Typography>
          {status.connected ? (
            <Chip
              icon={<CheckCircle fontSize="small" />}
              label="Connected"
              size="small"
              color="success"
              variant="outlined"
            />
          ) : (
            <Chip
              icon={<Error fontSize="small" />}
              label={status.status}
              size="small"
              color="error"
              variant="outlined"
            />
          )}
        </Box>
        
        {status.connected && (
          <>
            <Typography variant="body2">
              Database: {status.database}
            </Typography>
            
            <Typography variant="body2">
              Collections: {status.collections}
            </Typography>
            
            <Typography variant="body2">
              Documents: {status.documents}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Sync fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                Last checked: {new Date(status.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
} 