"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Search, Mail, Phone, Calendar } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

// Mock data for users
const users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "123-456-7890",
    role: "Estudiante",
    status: "Activo",
    lastActive: "2024-03-20"
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    phone: "234-567-8901",
    role: "Profesor",
    status: "Activo",
    lastActive: "2024-03-19"
  },
  // Add more mock users as needed
]

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="space-y-8">
          <Card className="border-2 border-olive-dark/20 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
              </div>
              <CardTitle className="text-2xl font-bold">Gestión de Usuarios</CardTitle>
            </CardHeader>
          </Card>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-dark/60" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2 border-2 border-olive-dark/20 rounded-lg focus:outline-none focus:border-olive-dark"
              />
            </div>
            <select className="px-4 py-2 border-2 border-olive-dark/20 rounded-lg focus:outline-none focus:border-olive-dark">
              <option value="">Todos los roles</option>
              <option value="student">Estudiante</option>
              <option value="teacher">Profesor</option>
              <option value="admin">Administrador</option>
            </select>
            <select className="px-4 py-2 border-2 border-olive-dark/20 rounded-lg focus:outline-none focus:border-olive-dark">
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {/* Users Table */}
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-pistachio/20">
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Nombre</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Teléfono</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Rol</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Estado</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Última Actividad</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-olive-dark">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-olive-dark/10">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-pistachio/10">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-olive-dark/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-olive-dark" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-olive-dark">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-olive-dark">
                            <Mail className="h-4 w-4 mr-2" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-olive-dark">
                            <Phone className="h-4 w-4 mr-2" />
                            {user.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-pistachio/20 text-olive-dark">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'Activo' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-olive-dark">
                            <Calendar className="h-4 w-4 mr-2" />
                            {user.lastActive}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 rounded hover:bg-pistachio/20 text-olive-dark">
                              Editar
                            </button>
                            <button className="p-1 rounded hover:bg-pistachio/20 text-olive-dark">
                              Ver detalles
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 