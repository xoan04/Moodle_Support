"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  Users, 
  BookOpen, 
  Clock, 
  Award, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Activity,
  Eye,
  EyeOff,
  Calendar,
  Target,
  BarChart3,
  User,
  CheckCircle,
  Star,
  CalendarDays,
  Tag,
  Info,
  Hash,
  Globe,
  Settings,
  BarChart,
  Percent,
  Timer,
  Zap,
  BookMarked,
  GraduationCap,
  TrendingDown,
  AlertCircle
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useMoodleStatisticsController } from '@/features/statics/controller'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = Number(params.id)

  const {
    courseById,
    courseByIdLoading,
    courseByIdError,
    getCourseById,
    isLoading,
    hasError
  } = useMoodleStatisticsController()

  // Cargar datos del curso al montar el componente
  useEffect(() => {
    if (courseId) {
      getCourseById(courseId)
    }
  }, [courseId, getCourseById])

  // Función para limpiar y formatear la descripción HTML
  const formatDescription = (html: string) => {
    if (!html) return null
    
    // Remover etiquetas HTML problemáticas y limpiar el contenido
    const cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .trim()
    
    return cleanHtml
  }

  // Función para calcular el tiempo transcurrido desde la creación
  const getTimeSinceCreation = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffInMs = now.getTime() - created.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    if (diffInYears > 0) {
      return `${diffInYears} año${diffInYears > 1 ? 's' : ''}`
    } else if (diffInMonths > 0) {
      return `${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`
    } else if (diffInDays > 0) {
      return `${diffInDays} día${diffInDays > 1 ? 's' : ''}`
    } else {
      return 'Hoy'
    }
  }

  // Función para obtener el estado de actividad basado en el último acceso
  const getActivityStatus = (lastAccess: string) => {
    if (!lastAccess) return { status: 'inactive', text: 'Sin actividad', color: 'text-red-600' }
    
    const last = new Date(lastAccess)
    const now = new Date()
    const diffInMs = now.getTime() - last.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays <= 1) {
      return { status: 'very-active', text: 'Muy activo', color: 'text-green-600' }
    } else if (diffInDays <= 7) {
      return { status: 'active', text: 'Activo', color: 'text-blue-600' }
    } else if (diffInDays <= 30) {
      return { status: 'moderate', text: 'Moderadamente activo', color: 'text-yellow-600' }
    } else {
      return { status: 'inactive', text: 'Inactivo', color: 'text-red-600' }
    }
  }

  if (isLoading.courseById) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive-dark"></div>
            <p className="mt-4 text-olive-dark">Cargando detalles del curso...</p>
          </div>
        </div>
      </div>
    )
  }

  if (hasError.courseById) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error al cargar el curso</h2>
            <p className="text-gray-600 mb-4">{courseByIdError?.message || 'No se pudo cargar la información del curso.'}</p>
            <Button 
              onClick={() => router.back()}
              className="bg-olive-dark hover:bg-olive-dark/90"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!courseById?.data) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <div className="text-center">
            <Info className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Curso no encontrado</h2>
            <p className="text-gray-600 mb-4">El curso solicitado no existe o no está disponible.</p>
            <Button 
              onClick={() => router.back()}
              className="bg-olive-dark hover:bg-olive-dark/90"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const course = courseById.data
  const formattedDescription = formatDescription(course.summary)
  const timeSinceCreation = getTimeSinceCreation(course.created_at)
  const activityStatus = getActivityStatus(course.last_access)

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-olive-dark hover:bg-pistachio/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-olive-dark">Detalles del Curso</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-olive-dark text-olive-dark">
              ID: {course.course_id}
            </Badge>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Course Header */}
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold">{course.course_name}</CardTitle>
                    <p className="text-pistachio/90 mt-2">{course.shortname}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="secondary" className="bg-pistachio/20 text-pistachio">
                        {course.category_name}
                      </Badge>
                      <Badge variant="secondary" className="bg-pistachio/20 text-pistachio">
                        {course.format}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        course.is_visible === 1 
                          ? 'bg-green-500/20 text-green-100' 
                          : 'bg-red-500/20 text-red-100'
                      }`}
                    >
                      {course.is_visible === 1 ? 'Activo' : 'Inactivo'}
                    </Badge>
                    <Badge variant="secondary" className={`bg-pistachio/20 text-pistachio ${activityStatus.color}`}>
                      {activityStatus.text}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Image and Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Image */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Imagen del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  {course.course_image_url ? (
                    <div className="relative">
                      <img 
                        src={course.course_image_url} 
                        alt={course.course_name}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Basic Statistics */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="border-2 border-olive-dark/20 shadow-md">
                  <CardHeader className="bg-pistachio/20 rounded-t-lg">
                    <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Estadísticas Principales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-pistachio/10 rounded-lg hover:bg-pistachio/20 transition-colors">
                        <Users className="h-8 w-8 text-olive-dark mx-auto mb-2" />
                        <div className="text-2xl font-bold text-olive-dark">{course.total_enrolled.toLocaleString()}</div>
                        <div className="text-sm text-olive-dark/70">Inscritos</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{course.completed_count.toLocaleString()}</div>
                        <div className="text-sm text-green-600/70">Completados</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                        <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{course.completion_rate_percent.toFixed(1)}%</div>
                        <div className="text-sm text-blue-600/70">Tasa de Completación</div>
                      </div>
                      
                      <div className="text-center p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors">
                        <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-yellow-600">{course.avg_final_grade.toFixed(1)}</div>
                        <div className="text-sm text-yellow-600/70">Calificación Promedio</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-olive-dark/20 shadow-md">
                  <CardHeader className="bg-pistachio/20 rounded-t-lg">
                    <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Información del Curso
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 hover:bg-pistachio/10 rounded transition-colors">
                        <Tag className="h-5 w-5 text-olive-dark" />
                        <div>
                          <div className="text-sm text-olive-dark/70">Categoría</div>
                          <div className="font-medium text-olive-dark">{course.category_name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 hover:bg-pistachio/10 rounded transition-colors">
                        <BookOpen className="h-5 w-5 text-olive-dark" />
                        <div>
                          <div className="text-sm text-olive-dark/70">Formato</div>
                          <div className="font-medium text-olive-dark">{course.format}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 hover:bg-pistachio/10 rounded transition-colors">
                        <CalendarDays className="h-5 w-5 text-olive-dark" />
                        <div>
                          <div className="text-sm text-olive-dark/70">Fecha de Creación</div>
                          <div className="font-medium text-olive-dark">
                            {new Date(course.created_at).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-olive-dark/50">Hace {timeSinceCreation}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 hover:bg-pistachio/10 rounded transition-colors">
                        <Activity className="h-5 w-5 text-olive-dark" />
                        <div>
                          <div className="text-sm text-olive-dark/70">Total Actividades</div>
                          <div className="font-medium text-olive-dark">{course.total_activities.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Course Description */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Descripción del Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                {formattedDescription ? (
                  <div className="prose max-w-none">
                    <div 
                      className="text-olive-dark leading-relaxed text-base"
                      dangerouslySetInnerHTML={{ __html: formattedDescription }}
                      style={{
                        lineHeight: '1.6',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-olive-dark/70 italic">No hay descripción disponible para este curso.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teachers */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Profesores
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-olive-dark" />
                    <div className="text-olive-dark">
                      {course.teachers || 'No hay profesores asignados'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participation Status */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Estado de Participación
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-olive-dark" />
                    <div className="text-olive-dark">
                      {course.participation_status || 'No disponible'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity and Access Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Last Access Information */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Último Acceso
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-olive-dark" />
                      <div>
                        <div className="text-sm text-olive-dark/70">Fecha y Hora</div>
                        <div className="font-medium text-olive-dark">
                          {course.last_access ? 
                            new Date(course.last_access).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 
                            'No hay registros de acceso'
                          }
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-olive-dark" />
                      <div>
                        <div className="text-sm text-olive-dark/70">Estado de Actividad</div>
                        <div className={`font-medium ${activityStatus.color}`}>
                          {activityStatus.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Performance Metrics */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Métricas de Rendimiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Percent className="h-5 w-5 text-blue-600" />
                        <span className="text-olive-dark">Tasa de Completación</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {course.completion_rate_percent.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <span className="text-olive-dark">Calificación Promedio</span>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {course.avg_final_grade.toFixed(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-pistachio/10 rounded">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-green-600" />
                        <span className="text-olive-dark">Actividades por Estudiante</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {course.total_enrolled > 0 ? (course.total_activities / course.total_enrolled).toFixed(1) : '0'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Status and Alerts */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <CardTitle className="text-lg text-olive-dark flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Estado y Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${
                    course.is_visible === 1 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      {course.is_visible === 1 ? (
                        <Eye className="h-5 w-5 text-green-600" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium text-olive-dark">Visibilidad</span>
                    </div>
                    <p className={`text-sm ${
                      course.is_visible === 1 ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {course.is_visible === 1 ? 'Curso visible para estudiantes' : 'Curso oculto para estudiantes'}
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    course.total_enrolled > 0 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-orange-200 bg-orange-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-olive-dark">Inscripciones</span>
                    </div>
                    <p className={`text-sm ${
                      course.total_enrolled > 0 ? 'text-blue-700' : 'text-orange-700'
                    }`}>
                      {course.total_enrolled > 0 
                        ? `${course.total_enrolled} estudiantes inscritos` 
                        : 'Sin estudiantes inscritos'
                      }
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    course.completion_rate_percent >= 70 
                      ? 'border-green-200 bg-green-50' 
                      : course.completion_rate_percent >= 50 
                      ? 'border-yellow-200 bg-yellow-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-olive-dark">Completación</span>
                    </div>
                    <p className={`text-sm ${
                      course.completion_rate_percent >= 70 
                        ? 'text-green-700' 
                        : course.completion_rate_percent >= 50 
                        ? 'text-yellow-700' 
                        : 'text-red-700'
                    }`}>
                      {course.completion_rate_percent >= 70 
                        ? 'Excelente tasa de completación' 
                        : course.completion_rate_percent >= 50 
                        ? 'Tasa de completación moderada' 
                        : 'Baja tasa de completación'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 