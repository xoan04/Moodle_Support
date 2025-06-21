// Moodle API endpoints
export const MOODLE_API = {
  // Stats endpoint
  STATS: '/api/moodle/stats',
  
  // Courses endpoints
  COURSES: {
    BASE: '/api/moodle/courses',
    BY_ID: (id: number) => `/api/moodle/courses/${id}`,
    
    // Pagination
    WITH_PAGINATION: (page: number, per_page: number) => 
      `/api/moodle/courses?page=${page}&per_page=${per_page}`,
    
    // Status filters
    BY_STATUS: (status: string, page: number, per_page: number) => 
      `/api/moodle/courses?status=${status}&page=${page}&per_page=${per_page}`,
    
    // Sorting
    WITH_SORT: (sort_by: string, sort_order: string, page: number, per_page: number) => 
      `/api/moodle/courses?sort_by=${sort_by}&sort_order=${sort_order}&page=${page}&per_page=${per_page}`,
  }
};

// Specific course status constants
export const COURSE_STATUS = {
  INACTIVE: 'inactive',
  LOW_USERS: 'low_users'
} as const;

// Sorting options
export const SORT_OPTIONS = {
  COMPLETION_RATE: 'completion_rate',
  AVG_FINAL_GRADE: 'avg_final_grade',
  TOTAL_ENROLLED: 'total_enrolled'
} as const;

// Sort order constants
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const;
