import { useState, useCallback } from 'react';
import { MoodleStatisticsService } from './service';
import { MoodleStatisticsResponse } from './dto/dto_receive_statics';
import { MoodleCoursesResponse } from './dto/dto_receive_course';
import { CourseByIdResponse } from './dto/dto_receive_by_id';
import { CourseStatisticsResponse } from './dto/dto_receive_finally';

// Loading states enum
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Error interface
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

/**
 * Moodle Statistics Controller
 * Manages state and provides methods for all statistics operations
 */
export const useMoodleStatisticsController = () => {
  // Statistics state
  const [statistics, setStatistics] = useState<MoodleStatisticsResponse | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [statisticsError, setStatisticsError] = useState<ApiError | null>(null);

  // Courses state
  const [courses, setCourses] = useState<MoodleCoursesResponse | null>(null);
  const [coursesLoading, setCoursesLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [coursesError, setCoursesError] = useState<ApiError | null>(null);

  // Course by ID state
  const [courseById, setCourseById] = useState<CourseByIdResponse | null>(null);
  const [courseByIdLoading, setCourseByIdLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [courseByIdError, setCourseByIdError] = useState<ApiError | null>(null);

  // Courses with sort state
  const [coursesWithSort, setCoursesWithSort] = useState<CourseStatisticsResponse | null>(null);
  const [coursesWithSortLoading, setCoursesWithSortLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [coursesWithSortError, setCoursesWithSortError] = useState<ApiError | null>(null);

  /**
   * Get Moodle platform statistics
   */
  const getStatistics = useCallback(async () => {
    try {
      setStatisticsLoading(LoadingState.LOADING);
      setStatisticsError(null);
      
      const data = await MoodleStatisticsService.getStatistics();
      setStatistics(data);
      setStatisticsLoading(LoadingState.SUCCESS);
      
      return data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'Error fetching Moodle statistics',
        status: error.status,
        details: error
      };
      setStatisticsError(apiError);
      setStatisticsLoading(LoadingState.ERROR);
      throw apiError;
    }
  }, []);

  /**
   * Get Moodle courses with pagination
   */
  const getCourses = useCallback(async (page: number = 1, per_page: number = 10) => {
    try {
      setCoursesLoading(LoadingState.LOADING);
      setCoursesError(null);
      
      const data = await MoodleStatisticsService.getCourses(page, per_page);
      setCourses(data);
      setCoursesLoading(LoadingState.SUCCESS);
      
      return data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'Error fetching Moodle courses',
        status: error.status,
        details: error
      };
      setCoursesError(apiError);
      setCoursesLoading(LoadingState.ERROR);
      throw apiError;
    }
  }, []);

  /**
   * Get a specific course by ID
   */
  const getCourseById = useCallback(async (id: number) => {
    try {
      setCourseByIdLoading(LoadingState.LOADING);
      setCourseByIdError(null);
      
      const data = await MoodleStatisticsService.getCourseById(id);
      setCourseById(data);
      setCourseByIdLoading(LoadingState.SUCCESS);
      
      return data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || `Error fetching course with ID ${id}`,
        status: error.status,
        details: error
      };
      setCourseByIdError(apiError);
      setCourseByIdLoading(LoadingState.ERROR);
      throw apiError;
    }
  }, []);

  /**
   * Get Moodle courses with sorting and pagination
   */
  const getCoursesWithSort = useCallback(async (
    sort_by: string,
    sort_order: string,
    page: number = 1,
    per_page: number = 15
  ) => {
    try {
      setCoursesWithSortLoading(LoadingState.LOADING);
      setCoursesWithSortError(null);
      
      const data = await MoodleStatisticsService.getCoursesWithSort(sort_by, sort_order, page, per_page);
      setCoursesWithSort(data);
      setCoursesWithSortLoading(LoadingState.SUCCESS);
      
      return data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'Error fetching Moodle courses with sorting',
        status: error.status,
        details: error
      };
      setCoursesWithSortError(apiError);
      setCoursesWithSortLoading(LoadingState.ERROR);
      throw apiError;
    }
  }, []);

  /**
   * Reset all states
   */
  const resetAllStates = useCallback(() => {
    setStatistics(null);
    setStatisticsLoading(LoadingState.IDLE);
    setStatisticsError(null);
    
    setCourses(null);
    setCoursesLoading(LoadingState.IDLE);
    setCoursesError(null);
    
    setCourseById(null);
    setCourseByIdLoading(LoadingState.IDLE);
    setCourseByIdError(null);
    
    setCoursesWithSort(null);
    setCoursesWithSortLoading(LoadingState.IDLE);
    setCoursesWithSortError(null);
  }, []);

  /**
   * Reset specific state
   */
  const resetStatistics = useCallback(() => {
    setStatistics(null);
    setStatisticsLoading(LoadingState.IDLE);
    setStatisticsError(null);
  }, []);

  const resetCourses = useCallback(() => {
    setCourses(null);
    setCoursesLoading(LoadingState.IDLE);
    setCoursesError(null);
  }, []);

  const resetCourseById = useCallback(() => {
    setCourseById(null);
    setCourseByIdLoading(LoadingState.IDLE);
    setCourseByIdError(null);
  }, []);

  const resetCoursesWithSort = useCallback(() => {
    setCoursesWithSort(null);
    setCoursesWithSortLoading(LoadingState.IDLE);
    setCoursesWithSortError(null);
  }, []);

  return {
    // Statistics
    statistics,
    statisticsLoading,
    statisticsError,
    getStatistics,
    resetStatistics,

    // Courses
    courses,
    coursesLoading,
    coursesError,
    getCourses,
    resetCourses,

    // Course by ID
    courseById,
    courseByIdLoading,
    courseByIdError,
    getCourseById,
    resetCourseById,

    // Courses with sort
    coursesWithSort,
    coursesWithSortLoading,
    coursesWithSortError,
    getCoursesWithSort,
    resetCoursesWithSort,

    // Global reset
    resetAllStates,

    // Loading state helpers
    isLoading: {
      statistics: statisticsLoading === LoadingState.LOADING,
      courses: coursesLoading === LoadingState.LOADING,
      courseById: courseByIdLoading === LoadingState.LOADING,
      coursesWithSort: coursesWithSortLoading === LoadingState.LOADING,
      any: [
        statisticsLoading,
        coursesLoading,
        courseByIdLoading,
        coursesWithSortLoading
      ].includes(LoadingState.LOADING)
    },

    // Success state helpers
    isSuccess: {
      statistics: statisticsLoading === LoadingState.SUCCESS,
      courses: coursesLoading === LoadingState.SUCCESS,
      courseById: courseByIdLoading === LoadingState.SUCCESS,
      coursesWithSort: coursesWithSortLoading === LoadingState.SUCCESS
    },

    // Error state helpers
    hasError: {
      statistics: statisticsLoading === LoadingState.ERROR,
      courses: coursesLoading === LoadingState.ERROR,
      courseById: courseByIdLoading === LoadingState.ERROR,
      coursesWithSort: coursesWithSortLoading === LoadingState.ERROR
    }
  };
};
