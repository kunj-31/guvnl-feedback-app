import React from 'react';
import { Chip } from '@mui/material';
import {
  Schedule,
  Visibility,
  Build,
  CheckCircle,
  Block,
  Warning,
  Error,
} from '@mui/icons-material';

const StatusBadge = ({ status, size = 'medium', showIcon = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'pending': {
        label: 'Pending',
        color: 'default',
        icon: <Schedule />,
        description: 'Waiting for review'
      },
      'under-review': {
        label: 'Under Review',
        color: 'primary',
        icon: <Visibility />,
        description: 'Being evaluated by team'
      },
      'in-progress': {
        label: 'In Progress',
        color: 'warning',
        icon: <Build />,
        description: 'Work in progress'
      },
      'resolved': {
        label: 'Resolved',
        color: 'success',
        icon: <CheckCircle />,
        description: 'Issue has been resolved'
      },
      'closed': {
        label: 'Closed',
        color: 'default',
        icon: <Block />,
        description: 'Ticket closed'
      },
      'critical': {
        label: 'Critical',
        color: 'error',
        icon: <Error />,
        description: 'Emergency situation'
      },
      'high': {
        label: 'High',
        color: 'error',
        icon: <Warning />,
        description: 'High priority issue'
      },
      'medium': {
        label: 'Medium',
        color: 'warning',
        icon: <Warning />,
        description: 'Medium priority'
      },
      'low': {
        label: 'Low',
        color: 'success',
        icon: <Schedule />,
        description: 'Low priority'
      }
    };

    return configs[status] || configs.pending;
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      icon={showIcon ? config.icon : undefined}
      label={config.label}
      color={config.color}
      size={size}
      variant="outlined"
      sx={{
        fontWeight: 600,
        textTransform: 'capitalize',
        ...(status === 'critical' && {
          animation: 'pulse 2s infinite',
          borderWidth: '2px',
        }),
        ...(status === 'high' && {
          borderWidth: '2px',
        }),
      }}
      title={config.description}
    />
  );
};

export default StatusBadge;