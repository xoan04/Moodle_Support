"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Award,
  BookOpen,
  Clock,
  Target,
  Code,
  LineChart as LineChartIcon,
  Brain
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

interface CourseStats {
  totalStudents: number
  activeStudents: number
  completionRate: number
  averageScore: number
  satisfactionRate: number
  engagementRate: number
}

interface MonthlyData {
  month: string
  students: number
  newEnrollments: number
}

interface ProgressData {
  week: string
  completed: number
  inProgress: number
}

interface ResourceData {
  resource: string
  usage: number
}

interface CourseData {
  generalStats: CourseStats
  monthlyEnrollment: MonthlyData[]
  studentProgress: ProgressData[]
  resourceUtilization: ResourceData[]
}

interface CourseDataMap {
  [key: string]: CourseData
}

// Mock data for different courses
const courseData: CourseDataMap = {
  "Matemáticas Avanzadas": {
    generalStats: {
      totalStudents: 150,
      activeStudents: 120,
      completionRate: 85,
      averageScore: 88,
      satisfactionRate: 92,
      engagementRate: 78
    },
    monthlyEnrollment: [
      { month: 'Ene', students: 45, newEnrollments: 15 },
      { month: 'Feb', students: 52, newEnrollments: 12 },
      { month: 'Mar', students: 48, newEnrollments: 8 },
      { month: 'Abr', students: 55, newEnrollments: 10 },
      { month: 'May', students: 60, newEnrollments: 12 },
      { month: 'Jun', students: 65, newEnrollments: 15 }
    ],
    studentProgress: [
      { week: 'Sem 1', completed: 85, inProgress: 15 },
      { week: 'Sem 2', completed: 75, inProgress: 25 },
      { week: 'Sem 3', completed: 65, inProgress: 35 },
      { week: 'Sem 4', completed: 55, inProgress: 45 },
      { week: 'Sem 5', completed: 45, inProgress: 55 },
      { week: 'Sem 6', completed: 35, inProgress: 65 }
    ],
    resourceUtilization: [
      { resource: 'Material Didáctico', usage: 95 },
      { resource: 'Videos', usage: 85 },
      { resource: 'Ejercicios', usage: 75 },
      { resource: 'Foros', usage: 65 },
      { resource: 'Evaluaciones', usage: 90 }
    ]
  },
  "Física Básica": {
    generalStats: {
      totalStudents: 180,
      activeStudents: 150,
      completionRate: 78,
      averageScore: 82,
      satisfactionRate: 88,
      engagementRate: 75
    },
    monthlyEnrollment: [
      { month: 'Ene', students: 55, newEnrollments: 18 },
      { month: 'Feb', students: 62, newEnrollments: 15 },
      { month: 'Mar', students: 58, newEnrollments: 10 },
      { month: 'Abr', students: 65, newEnrollments: 12 },
      { month: 'May', students: 70, newEnrollments: 14 },
      { month: 'Jun', students: 75, newEnrollments: 16 }
    ],
    studentProgress: [
      { week: 'Sem 1', completed: 90, inProgress: 10 },
      { week: 'Sem 2', completed: 80, inProgress: 20 },
      { week: 'Sem 3', completed: 70, inProgress: 30 },
      { week: 'Sem 4', completed: 60, inProgress: 40 },
      { week: 'Sem 5', completed: 50, inProgress: 50 },
      { week: 'Sem 6', completed: 40, inProgress: 60 }
    ],
    resourceUtilization: [
      { resource: 'Laboratorios Virtuales', usage: 92 },
      { resource: 'Simulaciones', usage: 88 },
      { resource: 'Problemas Prácticos', usage: 82 },
      { resource: 'Tutorías', usage: 75 },
      { resource: 'Evaluaciones', usage: 85 }
    ]
  },
  "Programación Web": {
    generalStats: {
      totalStudents: 200,
      activeStudents: 180,
      completionRate: 92,
      averageScore: 90,
      satisfactionRate: 95,
      engagementRate: 88
    },
    monthlyEnrollment: [
      { month: 'Ene', students: 65, newEnrollments: 20 },
      { month: 'Feb', students: 72, newEnrollments: 18 },
      { month: 'Mar', students: 68, newEnrollments: 12 },
      { month: 'Abr', students: 75, newEnrollments: 15 },
      { month: 'May', students: 80, newEnrollments: 16 },
      { month: 'Jun', students: 85, newEnrollments: 18 }
    ],
    studentProgress: [
      { week: 'Sem 1', completed: 95, inProgress: 5 },
      { week: 'Sem 2', completed: 85, inProgress: 15 },
      { week: 'Sem 3', completed: 75, inProgress: 25 },
      { week: 'Sem 4', completed: 65, inProgress: 35 },
      { week: 'Sem 5', completed: 55, inProgress: 45 },
      { week: 'Sem 6', completed: 45, inProgress: 55 }
    ],
    resourceUtilization: [
      { resource: 'Proyectos Prácticos', usage: 98 },
      { resource: 'Code Reviews', usage: 92 },
      { resource: 'Documentación', usage: 88 },
      { resource: 'Foros Técnicos', usage: 85 },
      { resource: 'Evaluaciones', usage: 95 }
    ]
  },
  "Marketing Digital": {
    generalStats: {
      totalStudents: 220,
      activeStudents: 200,
      completionRate: 88,
      averageScore: 85,
      satisfactionRate: 90,
      engagementRate: 82
    },
    monthlyEnrollment: [
      { month: 'Ene', students: 75, newEnrollments: 22 },
      { month: 'Feb', students: 82, newEnrollments: 20 },
      { month: 'Mar', students: 78, newEnrollments: 15 },
      { month: 'Abr', students: 85, newEnrollments: 18 },
      { month: 'May', students: 90, newEnrollments: 20 },
      { month: 'Jun', students: 95, newEnrollments: 22 }
    ],
    studentProgress: [
      { week: 'Sem 1', completed: 88, inProgress: 12 },
      { week: 'Sem 2', completed: 78, inProgress: 22 },
      { week: 'Sem 3', completed: 68, inProgress: 32 },
      { week: 'Sem 4', completed: 58, inProgress: 42 },
      { week: 'Sem 5', completed: 48, inProgress: 52 },
      { week: 'Sem 6', completed: 38, inProgress: 62 }
    ],
    resourceUtilization: [
      { resource: 'Casos de Estudio', usage: 96 },
      { resource: 'Herramientas Digitales', usage: 94 },
      { resource: 'Análisis de Mercado', usage: 90 },
      { resource: 'Redes Sociales', usage: 88 },
      { resource: 'Evaluaciones', usage: 92 }
    ]
  }
}

const COLORS = ['#4A6741', '#8BA888', '#C4D4C4', '#E8F0E8', '#F5F9F5']

export default function CourseReportsPage() {
  const [selectedCourse, setSelectedCourse] = useState('Matemáticas Avanzadas')

  const getCourseIcon = (course: string) => {
    switch (course) {
      case 'Matemáticas Avanzadas':
        return <LineChartIcon className="h-8 w-8 text-olive-dark/60" />
      case 'Física Básica':
        return <Brain className="h-8 w-8 text-olive-dark/60" />
      case 'Programación Web':
        return <Code className="h-8 w-8 text-olive-dark/60" />
      case 'Marketing Digital':
        return <BookOpen className="h-8 w-8 text-olive-dark/60" />
      default:
        return <BookOpen className="h-8 w-8 text-olive-dark/60" />
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-olive-dark">Reportes por Curso</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              className="px-4 py-2 border border-olive-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-dark/50"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="Matemáticas Avanzadas">Matemáticas Avanzadas</option>
              <option value="Física Básica">Física Básica</option>
              <option value="Programación Web">Programación Web</option>
              <option value="Marketing Digital">Marketing Digital</option>
            </select>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <div className="space-y-8">
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold">Reporte de Curso: {selectedCourse}</CardTitle>
              </CardHeader>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Estudiantes Activos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{courseData[selectedCourse].generalStats.activeStudents}</div>
                    <Users className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">de {courseData[selectedCourse].generalStats.totalStudents} totales</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Tasa de Completitud</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{courseData[selectedCourse].generalStats.completionRate}%</div>
                    <Target className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">Promedio del curso</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Satisfacción</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{courseData[selectedCourse].generalStats.satisfactionRate}%</div>
                    <Award className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">Encuestas de estudiantes</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Engagement</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">{courseData[selectedCourse].generalStats.engagementRate}%</div>
                    {getCourseIcon(selectedCourse)}
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">Participación activa</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Enrollment */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Matrículas Mensuales</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={courseData[selectedCourse].monthlyEnrollment}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis dataKey="month" stroke="#4A6741" />
                        <YAxis stroke="#4A6741" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                        />
                        <Bar dataKey="students" fill="#4A6741" radius={[4, 4, 0, 0]} name="Total Estudiantes" />
                        <Bar dataKey="newEnrollments" fill="#8BA888" radius={[4, 4, 0, 0]} name="Nuevas Matrículas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Student Progress */}
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Progreso de Estudiantes</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={courseData[selectedCourse].studentProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis dataKey="week" stroke="#4A6741" />
                        <YAxis stroke="#4A6741" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                        />
                        <Line type="monotone" dataKey="completed" stroke="#4A6741" name="Completados" />
                        <Line type="monotone" dataKey="inProgress" stroke="#8BA888" name="En Progreso" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Utilization */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <CardTitle className="text-lg text-olive-dark">Utilización de Recursos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={courseData[selectedCourse].resourceUtilization}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                      <XAxis type="number" stroke="#4A6741" />
                      <YAxis 
                        type="category" 
                        dataKey="resource" 
                        stroke="#4A6741"
                        width={120}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #4A6741',
                          borderRadius: '4px'
                        }}
                      />
                      <Bar 
                        dataKey="usage" 
                        fill="#4A6741"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 