export interface MoodleStatisticsData {
  total_courses: number;
  active_courses: number;
  inactive_courses: number;
  total_enrollments: number;
  total_completions: number;
  average_completion_rate: number;
  average_final_grade: number;
  total_activities: number;
  courses_with_low_users: number;
  courses_inactive_30_days: number;
}

export interface MoodleStatisticsResponse {
  status: boolean;
  message: string;
  data: MoodleStatisticsData;
}
