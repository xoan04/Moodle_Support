export interface CoursePromedio {
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

export interface MetaData {
  page: number;
  per_page: number;
  max_page: number;
  count: number;
}

export interface DtoReceivePromedio {
  status: boolean;
  message: string;
  data: CoursePromedio[];
  meta: MetaData;
}
