"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { 
  Users, 
  BookOpen, 
  Clock, 
  Award, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Bell,
  HelpCircle,
  Activity,
  Eye,
  EyeOff,
  Calendar,
  Target,
  BarChart3,
  ExternalLink
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useMoodleStatisticsController } from '@/features/statics/controller'
import { useRouter } from 'next/navigation'

// Colores para los gráficos
const COLORS = ['#4A6741', '#8FBC8F', '#90EE90', '#98FB98', '#F0FFF0']

export default function DashboardPage() {
  const router = useRouter()
  const {
    statistics,
    statisticsLoading,
    statisticsError,
    getStatistics,
    courses,
    coursesLoading,
    coursesError,
    getCourses,
    coursesWithSort,
    coursesWithSortLoading,
    coursesWithSortError,
    getCoursesWithSort,
    isLoading,
    isSuccess,
    hasError
  } = useMoodleStatisticsController()

  const [selectedSort, setSelectedSort] = useState({ sort_by: 'total_enrolled', sort_order: 'desc' })

  // Cargar datos al montar el componente
  useEffect(() => {
    getStatistics()
    getCourses(1, 10)
    getCoursesWithSort('total_enrolled', 'desc', 1, 15)
  }, [getStatistics, getCourses, getCoursesWithSort])

  // Preparar datos para gráficos
  const prepareTopCoursesData = () => {
    if (!coursesWithSort?.data) return []
    
    return coursesWithSort.data.slice(0, 10).map(course => ({
      name: course.course_name,
      students: course.total_enrolled,
      completion: course.completion_rate_percent,
      grade: course.avg_final_grade,
      activities: course.total_activities,
      category: course.category_name
    }))
  }

  const prepareCompletionRateData = () => {
    if (!coursesWithSort?.data) return []
    
    return coursesWithSort.data
      .filter(course => course.total_enrolled > 0)
      .slice(0, 15)
      .map(course => ({
        name: course.course_name,
        rate: course.completion_rate_percent
      }))
      .sort((a, b) => b.rate - a.rate)
  }

  const prepareGradeDistributionData = () => {
    if (!coursesWithSort?.data) return []
    
    const gradeRanges = [
      { range: '90-100', count: 0, color: '#4A6741' },
      { range: '80-89', count: 0, color: '#8FBC8F' },
      { range: '70-79', count: 0, color: '#90EE90' },
      { range: '60-69', count: 0, color: '#98FB98' },
      { range: '0-59', count: 0, color: '#F0FFF0' }
    ]

    coursesWithSort.data.forEach(course => {
      const grade = course.avg_final_grade
      if (grade >= 90) gradeRanges[0].count++
      else if (grade >= 80) gradeRanges[1].count++
      else if (grade >= 70) gradeRanges[2].count++
      else if (grade >= 60) gradeRanges[3].count++
      else gradeRanges[4].count++
    })

    return gradeRanges.filter(range => range.count > 0)
  }

  const prepareCategoryDistributionData = () => {
    if (!coursesWithSort?.data) return []
    
    const categoryCount = coursesWithSort.data.reduce((acc, course) => {
      acc[course.category_name] = (acc[course.category_name] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryCount).map(([category, count], index) => ({
      name: category,
      value: count,
      color: COLORS[index % COLORS.length]
    }))
  }

  const prepareActivityTrendData = () => {
    if (!coursesWithSort?.data) return []
    
    return coursesWithSort.data
      .sort((a, b) => b.total_activities - a.total_activities)
      .slice(0, 8)
      .map(course => ({
        name: course.course_name,
        activities: course.total_activities,
        enrolled: course.total_enrolled
      }))
  }

  // Calcular estadísticas adicionales
  const calculateAdditionalStats = () => {
    if (!coursesWithSort?.data || !statistics?.data) return null

    const courses = coursesWithSort.data
    const stats = statistics.data

    const totalStudents = courses.reduce((sum, course) => sum + course.total_enrolled, 0)
    const totalCompletions = courses.reduce((sum, course) => sum + course.completed_count, 0)
    const avgGrade = courses.reduce((sum, course) => sum + course.avg_final_grade, 0) / courses.length
    const activeCourses = courses.filter(course => course.is_visible === 1).length
    const inactiveCourses = courses.filter(course => course.is_visible === 0).length

    return {
      totalStudents,
      totalCompletions,
      avgGrade: avgGrade.toFixed(1),
      activeCourses,
      inactiveCourses,
      totalActivities: stats.total_activities,
      lowUserCourses: stats.courses_with_low_users,
      inactive30Days: stats.courses_inactive_30_days
    }
  }

  const additionalStats = calculateAdditionalStats()

  if (isLoading.any) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive-dark"></div>
            <p className="mt-4 text-olive-dark">Cargando estadísticas...</p>
          </div>
        </div>
      </div>
    )
  }

  if (hasError.statistics || hasError.courses || hasError.coursesWithSort) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error al cargar datos</h2>
            <p className="text-gray-600">No se pudieron cargar las estadísticas. Inténtalo de nuevo más tarde.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-olive-dark">Dashboard de Estadísticas</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-pistachio/10 text-olive-dark">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-pistachio/10 text-olive-dark">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="space-y-8">
            {/* Header Card */}
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold">Dashboard de Estadísticas de Moodle</CardTitle>
                <p className="text-pistachio/90">Datos en tiempo real de la plataforma educativa</p>
              </CardHeader>
            </Card>
            
            {/* Stats Grid - Estadísticas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Total Cursos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{statistics?.data?.total_courses || 0}</div>
                    <BookOpen className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <div className="flex justify-between text-sm text-olive-dark/70 mt-2">
                    <span>Activos: {statistics?.data?.active_courses || 0}</span>
                    <span>Inactivos: {statistics?.data?.inactive_courses || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Total Inscripciones</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{statistics?.data?.total_enrollments?.toLocaleString() || 0}</div>
                    <Users className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">
                    Completaciones: {statistics?.data?.total_completions?.toLocaleString() || 0}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Tasa de Completación</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{statistics?.data?.average_completion_rate?.toFixed(1) || 0}%</div>
                    <Target className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">
                    Promedio de calificación: {statistics?.data?.average_final_grade?.toFixed(1) || 0}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Total Actividades</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{statistics?.data?.total_activities?.toLocaleString() || 0}</div>
                    <Activity className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">
                    Cursos con pocos usuarios: {statistics?.data?.courses_with_low_users || 0}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Top Cursos por Inscripciones */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Top 10 Cursos por Inscripciones</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prepareTopCoursesData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#4A6741"
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="#4A6741" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value, name) => {
                            if (name === 'students') return [`${value} estudiantes`, 'Inscritos']
                            if (name === 'completion') return [`${value}%`, 'Tasa de Completación']
                            if (name === 'grade') return [`${value}`, 'Calificación Promedio']
                            return [value, name]
                          }}
                        />
                        <Bar 
                          dataKey="students" 
                          fill="#4A6741"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribución de Calificaciones */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Distribución de Calificaciones</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareGradeDistributionData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {prepareGradeDistributionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value) => [`${value} cursos`, 'Cantidad']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Segunda fila de gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tasa de Completación por Curso */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Tasa de Completación por Curso</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareCompletionRateData()}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis type="number" stroke="#4A6741" domain={[0, 100]} />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          stroke="#4A6741"
                          width={110}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value) => [`${value}%`, 'Tasa de Completación']}
                        />
                        <Bar 
                          dataKey="rate" 
                          fill="#4A6741"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribución por Categorías */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Distribución por Categorías</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareCategoryDistributionData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {prepareCategoryDistributionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value) => [`${value} cursos`, 'Cantidad']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tercera fila - Actividades y Estadísticas Detalladas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Actividades por Curso */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Actividades por Curso</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prepareActivityTrendData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#4A6741"
                          tick={{ fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="#4A6741" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value, name) => {
                            if (name === 'activities') return [`${value} actividades`, 'Total Actividades']
                            if (name === 'enrolled') return [`${value} estudiantes`, 'Inscritos']
                            return [value, name]
                          }}
                        />
                        <Bar 
                          dataKey="activities" 
                          fill="#4A6741"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas Detalladas */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Estadísticas Detalladas</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-olive-dark" />
                        <span className="text-olive-dark">Cursos Visibles</span>
                      </div>
                      <span className="font-medium text-olive-dark">{additionalStats?.activeCourses || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <EyeOff className="h-5 w-5 text-olive-dark" />
                        <span className="text-olive-dark">Cursos Ocultos</span>
                      </div>
                      <span className="font-medium text-olive-dark">{additionalStats?.inactiveCourses || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <span className="text-olive-dark">Cursos con Pocos Usuarios</span>
                      </div>
                      <span className="font-medium text-orange-600">{statistics?.data?.courses_with_low_users || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-red-500" />
                        <span className="text-olive-dark">Inactivos 30+ Días</span>
                      </div>
                      <span className="font-medium text-red-600">{statistics?.data?.courses_inactive_30_days || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <span className="text-olive-dark">Calificación Promedio</span>
                      </div>
                      <span className="font-medium text-green-600">{additionalStats?.avgGrade || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="text-olive-dark">Total Actividades</span>
                      </div>
                      <span className="font-medium text-blue-600">{statistics?.data?.total_activities?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabla de Cursos Detallada */}
        
          </div>
        </div>
      </div>
    </div>
  )
} 