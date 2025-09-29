// Application Constants

export const CATEGORIES = [
  'Pole Damage',
  'Line Fault',
  'Transformer Issue',
  'Meter Problem',
  'Safety Concern',
  'Voltage Fluctuation',
  'New Connection Request',
  'Billing Issue',
  'Tree Branch Hazard',
  'Street Light Issue',
  'Power Outage',
  'Other'
];

export const URGENCY_LEVELS = [
  { 
    value: 'low', 
    label: 'Low', 
    color: 'success',
    description: 'Minor issue that can be addressed during regular maintenance'
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    color: 'warning',
    description: 'Moderate issue requiring attention within 24-48 hours'
  },
  { 
    value: 'high', 
    label: 'High', 
    color: 'error',
    description: 'Serious issue requiring immediate attention within 12-24 hours'
  },
  { 
    value: 'critical', 
    label: 'Critical', 
    color: 'error',
    description: 'Emergency situation requiring immediate response (within 2-6 hours)'
  }
];

export const STATUS_TYPES = [
  { value: 'pending', label: 'Pending', color: 'default' },
  { value: 'under-review', label: 'Under Review', color: 'primary' },
  { value: 'in-progress', label: 'In Progress', color: 'warning' },
  { value: 'resolved', label: 'Resolved', color: 'success' },
  { value: 'closed', label: 'Closed', color: 'default' }
];

export const GUJARAT_DISTRICTS = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
  'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
  'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch',
  'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
  'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
  'Tapi', 'Vadodara', 'Valsad'
];

export const FEEDBACK_TYPES = [
  'Complaint',
  'Suggestion',
  'Appreciation',
  'Safety Concern',
  'Service Request'
];

export const POWER_ISSUE_TYPES = [
  'Complete Power Cut',
  'Partial Power Cut',
  'Voltage Fluctuation',
  'Frequent Tripping',
  'Equipment Damage',
  'Safety Hazard',
  'Meter Issue',
  'Billing Query'
];

export const RESPONSE_TIME_TARGETS = {
  critical: '2-6 hours',
  high: '12-24 hours',
  medium: '24-48 hours',
  low: '3-5 days'
};

export const CONTACT_INFO = {
  emergency: '1912',
  customerCare: '1800-233-4343',
  safetyHotline: '1800-1912',
  email: 'feedback@guvnl.com',
  headquarters: 'GUVNL Head Office, Sardar Patel Vidyut Bhavan, Race Course, Vadodara - 390007'
};

export const ADMIN_EMAILS = [
  'admin@guvnl.com',
  'supervisor@guvnl.com',
  'manager@guvnl.com'
];

// Default coordinates for Gujarat
export const DEFAULT_LOCATION = {
  lat: 22.2587,
  lng: 71.1924
};

// Map configuration
export const MAP_CONFIG = {
  center: [22.2587, 71.1924],
  zoom: 7,
  minZoom: 6,
  maxZoom: 18
};

// File upload constraints
export const UPLOAD_CONFIG = {
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
};

// Pagination settings
export const PAGINATION_CONFIG = {
  itemsPerPage: 10,
  maxVisiblePages: 5
};

// Export all constants
export default {
  CATEGORIES,
  URGENCY_LEVELS,
  STATUS_TYPES,
  GUJARAT_DISTRICTS,
  FEEDBACK_TYPES,
  POWER_ISSUE_TYPES,
  RESPONSE_TIME_TARGETS,
  CONTACT_INFO,
  ADMIN_EMAILS,
  DEFAULT_LOCATION,
  MAP_CONFIG,
  UPLOAD_CONFIG,
  PAGINATION_CONFIG
};