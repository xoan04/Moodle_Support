export interface CourseStatistics {
  course_id: number;
  course_name: string;
  category_name: string;
  created_at: string;
  is_visible: number;
  total_enrolled: number;
  completed_count: number;
  completion_rate_percent: number;
  avg_final_grade: number;
  last_access: string;
  total_activities: number;
  participation_status: string;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  max_page: number;
  count: number;
}

export interface CourseStatisticsResponse {
  status: boolean;
  message: string;
  data: CourseStatistics[];
  meta: PaginationMeta;
}
