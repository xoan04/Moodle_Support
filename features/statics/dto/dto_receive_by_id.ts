export interface CourseByIdResponse {
  status: boolean;
  message: string;
  data: CourseData;
}

export interface CourseData {
  course_id: number;
  course_name: string;
  shortname: string;
  category_name: string;
  created_at: string;
  is_visible: number;
  format: string;
  summary: string;
  total_enrolled: number;
  completed_count: number;
  completion_rate_percent: number;
  avg_final_grade: number;
  last_access: string;
  total_activities: number;
  participation_status: string;
  course_image_url: string;
  teachers: string;
}
