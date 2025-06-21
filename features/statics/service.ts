import { ApiService } from '../../utils/service_standart';
import { MOODLE_API } from './api';
import { MoodleStatisticsResponse } from './dto/dto_receive_statics';
import { MoodleCoursesResponse } from './dto/dto_receive_course';
import { CourseByIdResponse } from './dto/dto_receive_by_id';
import { CourseStatisticsResponse } from './dto/dto_receive_finally';

/**
 * Moodle Statistics Service
 * Handles all statistics-related API calls
 */
export class MoodleStatisticsService {
  /**
   * Get Moodle platform statistics
   * @returns Promise<MoodleStatisticsResponse> - Statistics data
   */
  static async getStatistics(): Promise<MoodleStatisticsResponse> {
    try {
      const response = await ApiService.get<MoodleStatisticsResponse>(MOODLE_API.STATS);
      return response.data;
    } catch (error) {
      console.error('Error fetching Moodle statistics:', error);
      throw error;
    }
  }

  /**
   * Get Moodle courses with pagination
   * @param page - Page number (default: 1)
   * @param per_page - Items per page (default: 10)
   * @returns Promise<MoodleCoursesResponse> - Courses data with pagination
   */
  static async getCourses(page: number = 1, per_page: number = 10): Promise<MoodleCoursesResponse> {
    try {
      const endpoint = `${MOODLE_API.COURSES.BASE}?page=${page}&per_page=${per_page}`;
      const response = await ApiService.get<MoodleCoursesResponse>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching Moodle courses:', error);
      throw error;
    }
  }

  /**
   * Get a specific course by ID
   * @param id - Course ID
   * @returns Promise<CourseByIdResponse> - Course data
   */
  static async getCourseById(id: number): Promise<CourseByIdResponse> {
    try {
      const response = await ApiService.get<CourseByIdResponse>(MOODLE_API.COURSES.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get Moodle courses with sorting and pagination
   * @param sort_by - Field to sort by (completion_rate, avg_final_grade, total_enrolled)
   * @param sort_order - Sort order (asc, desc)
   * @param page - Page number (default: 1)
   * @param per_page - Items per page (default: 15)
   * @returns Promise<CourseStatisticsResponse> - Courses data with sorting and pagination
   */
  static async getCoursesWithSort(
    sort_by: string,
    sort_order: string,
    page: number = 1,
    per_page: number = 15
  ): Promise<CourseStatisticsResponse> {
    try {
      const response = await ApiService.get<CourseStatisticsResponse>(
        MOODLE_API.COURSES.WITH_SORT(sort_by, sort_order, page, per_page)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Moodle courses with sorting:', error);
      throw error;
    }
  }
}
