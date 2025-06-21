"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useLoginController } from "@/features/login/controller"
import TokenManager from "@/utils/cookies_standart"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const { toast } = useToast()
  const { login, isLoading, isSuccess, error, data } = useLoginController()

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      })
      return
    }

    const success = await login({
      email: formData.email,
      password: formData.password
    })

    if (success) {
      toast({
        title: "Login exitoso",
        description: "Bienvenido al sistema",
      })
      // Here you can redirect to dashboard or handle successful login
      // router.push('/dashboard')
    }
  }

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error de autenticación",
        description: error,
        variant: "destructive"
      })
    }
  }, [error, toast])

  // Debug function to check token status
  const debugToken = () => {
    TokenManager.debugToken();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo y título */}
       
        {/* Card del formulario */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de usuario */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu email"
                    className="pl-10 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="pl-10 pr-10 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Opciones adicionales */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Recordarme
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-green-600 hover:text-green-700 p-0 h-auto"
                  disabled={isLoading}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>

              {/* Botón de login */}
              <Button
                type="submit"
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Footer */}
       
      </div>
    </div>
  )
}
