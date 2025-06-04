"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Plus, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

// Mock data for PQRS
const pqrsItems = {
  pendientes: [
    {
      id: 1,
      title: "Problema con acceso a curso",
      description: "No puedo acceder al curso de matemáticas",
      user: "Juan Pérez",
      date: "2024-03-20",
      priority: "Alta"
    },
    {
      id: 2,
      title: "Solicitud de certificado",
      description: "Necesito el certificado del curso de física",
      user: "María García",
      date: "2024-03-19",
      priority: "Media"
    }
  ],
  enProceso: [
    {
      id: 3,
      title: "Error en calificación",
      description: "La calificación no se actualizó correctamente",
      user: "Carlos López",
      date: "2024-03-18",
      priority: "Alta"
    }
  ],
  resueltos: [
    {
      id: 4,
      title: "Problema con video",
      description: "El video de la clase no se reproduce",
      user: "Ana Martínez",
      date: "2024-03-17",
      priority: "Baja"
    }
  ]
}

export default function PQRSPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="space-y-8">
          <Card className="border-2 border-olive-dark/20 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
              </div>
              <CardTitle className="text-2xl font-bold">Gestión de PQRS</CardTitle>
            </CardHeader>
          </Card>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pendientes */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-olive-dark">Pendientes</CardTitle>
                  <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                    {pqrsItems.pendientes.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {pqrsItems.pendientes.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg border border-olive-dark/20 hover:bg-pistachio/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-olive-dark">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-olive-dark/70">{item.user}</span>
                        <span className="text-olive-dark/70">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* En Proceso */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-olive-dark">En Proceso</CardTitle>
                  <span className="px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                    {pqrsItems.enProceso.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {pqrsItems.enProceso.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg border border-olive-dark/20 hover:bg-pistachio/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-olive-dark">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-olive-dark/70">{item.user}</span>
                        <span className="text-olive-dark/70">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resueltos */}
            <Card className="border-2 border-olive-dark/20 shadow-md">
              <CardHeader className="bg-pistachio/20 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-olive-dark">Resueltos</CardTitle>
                  <span className="px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                    {pqrsItems.resueltos.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {pqrsItems.resueltos.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg border border-olive-dark/20 hover:bg-pistachio/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-olive-dark">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-olive-dark/70">{item.user}</span>
                        <span className="text-olive-dark/70">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add New PQRS Button */}
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 bg-olive-dark text-white rounded-lg hover:bg-olive-dark/90 transition-colors">
              <Plus className="h-5 w-5" />
              <span>Nuevo PQRS</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 