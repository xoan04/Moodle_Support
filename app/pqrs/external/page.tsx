"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MessageSquare, 
  User, 
  Calendar, 
  AlertTriangle,
  Plus,
  Mail
} from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Sidebar from '../../components/Sidebar'

// Mock data - Replace with real data from your backend
const initialPqrsItems = {
  pendientes: [
    {
      id: '1',
      title: 'Solicitud de información',
      description: 'Necesito información sobre los cursos disponibles',
      user: 'Juan Pérez',
      email: 'juan.perez@ejemplo.com',
      date: '2024-03-15',
      priority: 'Alta'
    },
    {
      id: '2',
      title: 'Problema con el acceso',
      description: 'No puedo acceder a mi cuenta',
      user: 'María García',
      email: 'maria.garcia@ejemplo.com',
      date: '2024-03-14',
      priority: 'Media'
    }
  ],
  enProceso: [
    {
      id: '3',
      title: 'Solicitud de certificado',
      description: 'Necesito un certificado de participación',
      user: 'Carlos López',
      email: 'carlos.lopez@ejemplo.com',
      date: '2024-03-13',
      priority: 'Baja'
    }
  ],
  resueltos: [
    {
      id: '4',
      title: 'Cambio de contraseña',
      description: 'Solicitud de cambio de contraseña completada',
      user: 'Ana Martínez',
      email: 'ana.martinez@ejemplo.com',
      date: '2024-03-12',
      priority: 'Alta'
    }
  ]
}

export default function ExternalPQRSPage() {
  const [pqrsItems, setPqrsItems] = useState(initialPqrsItems)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId
    const sourceItems = [...pqrsItems[sourceColumn as keyof typeof pqrsItems]]
    const destItems = sourceColumn === destColumn 
      ? sourceItems 
      : [...pqrsItems[destColumn as keyof typeof pqrsItems]]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)

    setPqrsItems({
      ...pqrsItems,
      [sourceColumn]: sourceItems,
      [destColumn]: destItems
    })
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-olive-dark">PQRS Externos</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-pistachio/10 text-olive-dark">
              <AlertTriangle className="h-5 w-5" />
            </button>
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
                <CardTitle className="text-2xl font-bold">Gestión de PQRS Externos</CardTitle>
              </CardHeader>
            </Card>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna Pendientes */}
                <Card className="border-2 border-olive-dark/20 shadow-md">
                  <CardHeader className="bg-pistachio/20 rounded-t-lg">
                    <CardTitle className="text-lg text-olive-dark flex justify-between items-center">
                      <span>Pendientes</span>
                      <span className="text-sm bg-olive-dark text-white px-2 py-1 rounded-full">
                        {pqrsItems.pendientes.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Droppable droppableId="pendientes">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4 min-h-[200px]"
                        >
                          {pqrsItems.pendientes.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="p-4 bg-white rounded-lg border border-olive-dark/20 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-olive-dark">{item.title}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                                      item.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {item.priority}
                                    </span>
                                  </div>
                                  <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                                  <div className="flex items-center justify-between text-xs text-olive-dark/60">
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1" />
                                      {item.user}
                                    </div>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-1" />
                                      {item.email}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-end text-xs text-olive-dark/60 mt-2">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {item.date}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>

                {/* Columna En Proceso */}
                <Card className="border-2 border-olive-dark/20 shadow-md">
                  <CardHeader className="bg-pistachio/20 rounded-t-lg">
                    <CardTitle className="text-lg text-olive-dark flex justify-between items-center">
                      <span>En Proceso</span>
                      <span className="text-sm bg-olive-dark text-white px-2 py-1 rounded-full">
                        {pqrsItems.enProceso.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Droppable droppableId="enProceso">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4 min-h-[200px]"
                        >
                          {pqrsItems.enProceso.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="p-4 bg-white rounded-lg border border-olive-dark/20 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-olive-dark">{item.title}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                                      item.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {item.priority}
                                    </span>
                                  </div>
                                  <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                                  <div className="flex items-center justify-between text-xs text-olive-dark/60">
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1" />
                                      {item.user}
                                    </div>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-1" />
                                      {item.email}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-end text-xs text-olive-dark/60 mt-2">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {item.date}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>

                {/* Columna Resueltos */}
                <Card className="border-2 border-olive-dark/20 shadow-md">
                  <CardHeader className="bg-pistachio/20 rounded-t-lg">
                    <CardTitle className="text-lg text-olive-dark flex justify-between items-center">
                      <span>Resueltos</span>
                      <span className="text-sm bg-olive-dark text-white px-2 py-1 rounded-full">
                        {pqrsItems.resueltos.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Droppable droppableId="resueltos">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4 min-h-[200px]"
                        >
                          {pqrsItems.resueltos.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="p-4 bg-white rounded-lg border border-olive-dark/20 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-olive-dark">{item.title}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      item.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                                      item.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {item.priority}
                                    </span>
                                  </div>
                                  <p className="text-sm text-olive-dark/70 mb-3">{item.description}</p>
                                  <div className="flex items-center justify-between text-xs text-olive-dark/60">
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1" />
                                      {item.user}
                                    </div>
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-1" />
                                      {item.email}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-end text-xs text-olive-dark/60 mt-2">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {item.date}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            </DragDropContext>

            {/* Botón para agregar nuevo PQRS */}
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-olive-dark text-white rounded-lg hover:bg-olive-dark/90 transition-colors">
                <Plus className="h-5 w-5" />
                <span>Nuevo PQRS Externo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 