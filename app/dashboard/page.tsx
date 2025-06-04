"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { 
  Users, 
  BookOpen, 
  Clock, 
  Award, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Bell,
  HelpCircle
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

// Mock data - Replace with real data from your backend
const topCourses = [
  { 
    name: 'Matemáticas Avanzadas',
    students: 120,
    growth: 15,
    completion: 85,
    category: 'Ciencias Exactas'
  },
  { 
    name: 'Física Cuántica',
    students: 98,
    growth: 12,
    completion: 82,
    category: 'Ciencias Exactas'
  },
  { 
    name: 'Programación Web',
    students: 85,
    growth: 25,
    completion: 78,
    category: 'Tecnología'
  },
  { 
    name: 'Marketing Digital',
    students: 75,
    growth: 18,
    completion: 80,
    category: 'Negocios'
  },
  { 
    name: 'Inteligencia Artificial',
    students: 65,
    growth: 30,
    completion: 75,
    category: 'Tecnología'
  },
]

const dropoutData = [
  { name: 'Matemáticas Avanzadas', rate: 15 },
  { name: 'Física Cuántica', rate: 12 },
  { name: 'Química Orgánica', rate: 10 },
  { name: 'Historia Antigua', rate: 8 },
  { name: 'Literatura Clásica', rate: 7 },
  { name: 'Biología Molecular', rate: 6.5 },
  { name: 'Cálculo Diferencial', rate: 6 },
  { name: 'Programación Avanzada', rate: 5.8 },
  { name: 'Economía Internacional', rate: 5.5 },
  { name: 'Psicología Social', rate: 5.2 },
  { name: 'Derecho Constitucional', rate: 5 },
  { name: 'Ingeniería de Software', rate: 4.8 },
  { name: 'Marketing Digital', rate: 4.5 },
  { name: 'Contabilidad Financiera', rate: 4.2 },
  { name: 'Arquitectura Moderna', rate: 4 },
  { name: 'Medicina Preventiva', rate: 3.8 },
  { name: 'Educación Especial', rate: 3.5 },
  { name: 'Administración Pública', rate: 3.2 },
  { name: 'Filosofía Contemporánea', rate: 3 },
  { name: 'Lingüística Aplicada', rate: 2.8 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-olive-dark">Dashboard</h1>
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
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold">Dashboard de Estadísticas</CardTitle>
              </CardHeader>
            </Card>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Total Estudiantes</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">1,234</div>
                    <Users className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">+12% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Cursos Activos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">45</div>
                    <BookOpen className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">+3 nuevos este mes</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">PQRS Pendientes</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">23</div>
                    <FileText className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">-5 desde ayer</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Certificados Emitidos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-olive-dark">567</div>
                    <Award className="h-8 w-8 text-olive-dark/60" />
                  </div>
                  <p className="text-sm text-olive-dark/70 mt-2">+45 este mes</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Top 5 Cursos más Utilizados</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topCourses}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#4A6741"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={70}
                          />
                          <YAxis stroke="#4A6741" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white',
                              border: '1px solid #4A6741',
                              borderRadius: '4px'
                            }}
                            formatter={(value, name) => {
                              if (name === 'students') return [`${value} estudiantes`, 'Total Estudiantes']
                              if (name === 'growth') return [`+${value}%`, 'Crecimiento']
                              if (name === 'completion') return [`${value}%`, 'Tasa de Completación']
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
                    
                    <div className="mt-6">
                      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-olive-dark/20 scrollbar-track-transparent">
                        {topCourses.map((course, index) => (
                          <div 
                            key={course.name}
                            className="p-4 rounded-lg border border-olive-dark/20 hover:bg-pistachio/10 transition-colors flex flex-col min-w-[280px] max-w-[280px] snap-center"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-olive-dark/70 bg-pistachio/20 px-2 py-1 rounded-full">
                                #{index + 1}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-pistachio/20 text-olive-dark">
                                {course.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-olive-dark mb-3 line-clamp-2 min-h-[3rem]">
                              {course.name}
                            </h3>
                            <div className="space-y-2 mt-auto">
                              <div className="flex items-center justify-between text-sm bg-white/50 p-2 rounded">
                                <span className="text-olive-dark/70">Estudiantes</span>
                                <span className="font-medium text-olive-dark">{course.students}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm bg-white/50 p-2 rounded">
                                <span className="text-olive-dark/70">Crecimiento</span>
                                <span className="font-medium text-green-600 flex items-center">
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  +{course.growth}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm bg-white/50 p-2 rounded">
                                <span className="text-olive-dark/70">Completación</span>
                                <span className="font-medium text-olive-dark">{course.completion}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Tasa de Deserción por Curso</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="h-[600px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dropoutData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A6741" opacity={0.2} />
                        <XAxis type="number" stroke="#4A6741" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          stroke="#4A6741"
                          width={140}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #4A6741',
                            borderRadius: '4px'
                          }}
                          formatter={(value) => [`${value}%`, 'Tasa de Deserción']}
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
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Usuarios con Mayor Tiempo Conectado</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">Juan Pérez</span>
                      <span className="font-medium text-olive-dark">156 horas</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">María García</span>
                      <span className="font-medium text-olive-dark">142 horas</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">Carlos López</span>
                      <span className="font-medium text-olive-dark">128 horas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-olive-dark/20 shadow-md">
                <CardHeader className="bg-pistachio/20 rounded-t-lg">
                  <CardTitle className="text-lg text-olive-dark">Uso Total de la Plataforma</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">Horas Totales</span>
                      <span className="font-medium text-olive-dark">12,456</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">Promedio Diario</span>
                      <span className="font-medium text-olive-dark">415 horas</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-pistachio/10 rounded">
                      <span className="text-olive-dark">Pico de Usuarios</span>
                      <span className="font-medium text-olive-dark">1,234 usuarios</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 