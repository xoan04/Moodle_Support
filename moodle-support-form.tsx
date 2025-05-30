"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function MoodleSupportForm() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    rolSolicitante: "",
    tipoSolicitud: "",
    // Conditional fields
    listaNombresCorreos: "",
    rolEspecifico: "",
    cursoDestino: "",
    rolCurso: "",
    nombreCurso: "",
    detalleSolicitud: "",
    categoriaAcademica: "",
    responsableCurso: "",
    cursoNuevoReemplaza: "",
    cursoAfectado: "",
    descripcionProblema: "",
    desdeCuando: "",
    usuariosAfectados: "",
    justificacion: "",
    descripcionRequerimiento: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
    // Aquí iría la lógica para enviar el formulario
  }

  const renderConditionalSection = () => {
    switch (formData.tipoSolicitud) {
      case "crear-usuarios":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para crear usuario(s)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="listaNombresCorreos" className="text-dark-gray font-medium">
                  Lista de nombres completos y correos electrónicos
                </Label>
                <Textarea
                  id="listaNombresCorreos"
                  placeholder="Ejemplo:&#10;Juan Pérez - juan.perez@email.com&#10;María García - maria.garcia@email.com"
                  value={formData.listaNombresCorreos}
                  onChange={(e) => handleInputChange("listaNombresCorreos", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="rolEspecifico" className="text-dark-gray font-medium">
                  ¿Asignar algún rol específico?
                </Label>
                <Select
                  value={formData.rolEspecifico}
                  onValueChange={(value) => handleInputChange("rolEspecifico", value)}
                >
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="profesor-sin-edicion">Profesor sin edición</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case "matricular-usuarios":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para matricular usuario(s)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="listaNombresCorreos" className="text-dark-gray font-medium">
                  Nombres y correos a matricular
                </Label>
                <Textarea
                  id="listaNombresCorreos"
                  placeholder="Lista los nombres y correos de los usuarios a matricular"
                  value={formData.listaNombresCorreos}
                  onChange={(e) => handleInputChange("listaNombresCorreos", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="cursoDestino" className="text-dark-gray font-medium">
                  Curso donde serán matriculados
                </Label>
                <Input
                  id="cursoDestino"
                  placeholder="Nombre del curso"
                  value={formData.cursoDestino}
                  onChange={(e) => handleInputChange("cursoDestino", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="rolCurso" className="text-dark-gray font-medium">
                  Rol dentro del curso
                </Label>
                <Select value={formData.rolCurso} onValueChange={(value) => handleInputChange("rolCurso", value)}>
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Selecciona el rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="profesor-sin-edicion">Profesor sin edición</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case "crear-matricular-usuarios":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para crear y matricular usuario(s)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="listaNombresCorreos" className="text-dark-gray font-medium">
                  Lista de usuarios con nombre y correo
                </Label>
                <Textarea
                  id="listaNombresCorreos"
                  placeholder="Ejemplo:&#10;Juan Pérez - juan.perez@email.com&#10;María García - maria.garcia@email.com"
                  value={formData.listaNombresCorreos}
                  onChange={(e) => handleInputChange("listaNombresCorreos", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="cursoDestino" className="text-dark-gray font-medium">
                  Curso destino
                </Label>
                <Input
                  id="cursoDestino"
                  placeholder="Nombre del curso donde serán matriculados"
                  value={formData.cursoDestino}
                  onChange={(e) => handleInputChange("cursoDestino", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="rolCurso" className="text-dark-gray font-medium">
                  Rol a asignar
                </Label>
                <Select value={formData.rolCurso} onValueChange={(value) => handleInputChange("rolCurso", value)}>
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Selecciona el rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="profesor-sin-edicion">Profesor sin edición</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case "revision-consulta-curso":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles de revisión o consulta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="nombreCurso" className="text-dark-gray font-medium">
                  Nombre del curso
                </Label>
                <Input
                  id="nombreCurso"
                  placeholder="Nombre exacto del curso"
                  value={formData.nombreCurso}
                  onChange={(e) => handleInputChange("nombreCurso", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="detalleSolicitud" className="text-dark-gray font-medium">
                  Detalla tu solicitud
                </Label>
                <Textarea
                  id="detalleSolicitud"
                  placeholder="Describe qué necesitas revisar o consultar sobre el curso"
                  value={formData.detalleSolicitud}
                  onChange={(e) => handleInputChange("detalleSolicitud", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        )

      case "crear-nuevo-curso":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para crear nuevo curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="nombreCurso" className="text-dark-gray font-medium">
                  Nombre del curso
                </Label>
                <Input
                  id="nombreCurso"
                  placeholder="Nombre del nuevo curso"
                  value={formData.nombreCurso}
                  onChange={(e) => handleInputChange("nombreCurso", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="categoriaAcademica" className="text-dark-gray font-medium">
                  Categoría o área académica
                </Label>
                <Input
                  id="categoriaAcademica"
                  placeholder="Ej: Matemáticas, Historia, Ciencias"
                  value={formData.categoriaAcademica}
                  onChange={(e) => handleInputChange("categoriaAcademica", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="responsableCurso" className="text-dark-gray font-medium">
                  Responsable del curso (nombre y correo)
                </Label>
                <Input
                  id="responsableCurso"
                  placeholder="Nombre completo - correo@email.com"
                  value={formData.responsableCurso}
                  onChange={(e) => handleInputChange("responsableCurso", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label className="text-dark-gray font-medium">¿El curso es nuevo o reemplaza otro?</Label>
                <RadioGroup
                  value={formData.cursoNuevoReemplaza}
                  onValueChange={(value) => handleInputChange("cursoNuevoReemplaza", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nuevo" id="nuevo" />
                    <Label htmlFor="nuevo">Es un curso completamente nuevo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reemplaza" id="reemplaza" />
                    <Label htmlFor="reemplaza">Reemplaza un curso existente</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )

      case "problemas-tecnicos":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles del problema técnico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="cursoAfectado" className="text-dark-gray font-medium">
                  Curso afectado
                </Label>
                <Input
                  id="cursoAfectado"
                  placeholder="Nombre del curso con problemas"
                  value={formData.cursoAfectado}
                  onChange={(e) => handleInputChange("cursoAfectado", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="descripcionProblema" className="text-dark-gray font-medium">
                  Descripción del problema
                </Label>
                <Textarea
                  id="descripcionProblema"
                  placeholder="Describe detalladamente el problema técnico"
                  value={formData.descripcionProblema}
                  onChange={(e) => handleInputChange("descripcionProblema", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="desdeCuando" className="text-dark-gray font-medium">
                  ¿Desde cuándo ocurre?
                </Label>
                <Input
                  id="desdeCuando"
                  placeholder="Fecha aproximada o tiempo transcurrido"
                  value={formData.desdeCuando}
                  onChange={(e) => handleInputChange("desdeCuando", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="usuariosAfectados" className="text-dark-gray font-medium">
                  ¿A cuántos usuarios afecta?
                </Label>
                <Input
                  id="usuariosAfectados"
                  placeholder="Número aproximado de usuarios afectados"
                  value={formData.usuariosAfectados}
                  onChange={(e) => handleInputChange("usuariosAfectados", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
            </CardContent>
          </Card>
        )

      case "asignar-roles":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para asignar roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="listaNombresCorreos" className="text-dark-gray font-medium">
                  Nombre(s) y correo(s)
                </Label>
                <Textarea
                  id="listaNombresCorreos"
                  placeholder="Lista los usuarios a los que se asignará el rol"
                  value={formData.listaNombresCorreos}
                  onChange={(e) => handleInputChange("listaNombresCorreos", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="cursoDestino" className="text-dark-gray font-medium">
                  Curso donde se asignará el rol
                </Label>
                <Input
                  id="cursoDestino"
                  placeholder="Nombre del curso"
                  value={formData.cursoDestino}
                  onChange={(e) => handleInputChange("cursoDestino", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="rolCurso" className="text-dark-gray font-medium">
                  Rol a asignar
                </Label>
                <Select value={formData.rolCurso} onValueChange={(value) => handleInputChange("rolCurso", value)}>
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Selecciona el rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="profesor-sin-edicion">Profesor sin edición</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case "desmatricular-usuarios":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para desmatricular usuarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="listaNombresCorreos" className="text-dark-gray font-medium">
                  Nombre(s) y correo(s)
                </Label>
                <Textarea
                  id="listaNombresCorreos"
                  placeholder="Lista los usuarios que deben ser desmatriculados"
                  value={formData.listaNombresCorreos}
                  onChange={(e) => handleInputChange("listaNombresCorreos", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="cursoDestino" className="text-dark-gray font-medium">
                  Curso del que deben ser removidos
                </Label>
                <Input
                  id="cursoDestino"
                  placeholder="Nombre del curso"
                  value={formData.cursoDestino}
                  onChange={(e) => handleInputChange("cursoDestino", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
            </CardContent>
          </Card>
        )

      case "eliminar-curso":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Detalles para eliminar curso o contenido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="nombreCurso" className="text-dark-gray font-medium">
                  Nombre exacto del curso o sección
                </Label>
                <Input
                  id="nombreCurso"
                  placeholder="Nombre exacto del curso o contenido a eliminar"
                  value={formData.nombreCurso}
                  onChange={(e) => handleInputChange("nombreCurso", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="justificacion" className="text-dark-gray font-medium">
                  Justificación
                </Label>
                <Textarea
                  id="justificacion"
                  placeholder="Explica por qué es necesario eliminar este curso o contenido"
                  value={formData.justificacion}
                  onChange={(e) => handleInputChange("justificacion", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        )

      case "otro":
        return (
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/20 rounded-t-lg">
              <CardTitle className="text-lg text-olive-dark">Descripción del requerimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="descripcionRequerimiento" className="text-dark-gray font-medium">
                  Descripción del requerimiento
                </Label>
                <Textarea
                  id="descripcionRequerimiento"
                  placeholder="Describe detalladamente tu solicitud"
                  value={formData.descripcionRequerimiento}
                  onChange={(e) => handleInputChange("descripcionRequerimiento", e.target.value)}
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-olive-dark/20 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold">Formulario: Solicitud de soporte Moodle</CardTitle>
            <CardDescription className="text-white/90">
              Complete todos los campos requeridos para procesar su solicitud de soporte
            </CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información General */}
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/30 rounded-t-lg">
              <CardTitle className="text-xl text-olive-dark">Información general</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 bg-white">
              <div>
                <Label htmlFor="nombreCompleto" className="text-dark-gray font-medium">
                  Nombre completo del solicitante *
                </Label>
                <Input
                  id="nombreCompleto"
                  placeholder="Ingrese su nombre completo"
                  value={formData.nombreCompleto}
                  onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
                  required
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="correoElectronico" className="text-dark-gray font-medium">
                  Correo electrónico de contacto *
                </Label>
                <Input
                  id="correoElectronico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correoElectronico}
                  onChange={(e) => handleInputChange("correoElectronico", e.target.value)}
                  required
                  className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20"
                />
              </div>
              <div>
                <Label htmlFor="rolSolicitante" className="text-dark-gray font-medium">
                  Rol del solicitante *
                </Label>
                <Select
                  value={formData.rolSolicitante}
                  onValueChange={(value) => handleInputChange("rolSolicitante", value)}
                  required
                >
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Seleccione su rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="docente">Docente</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="soporte-tecnico">Soporte técnico</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Separator className="bg-olive-dark/30" />

          {/* Tipo de Solicitud */}
          <Card className="border-2 border-olive-dark/20 shadow-md">
            <CardHeader className="bg-pistachio/30 rounded-t-lg">
              <CardTitle className="text-xl text-olive-dark">Tipo de solicitud</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
              <div>
                <Label htmlFor="tipoSolicitud" className="text-dark-gray font-medium">
                  Seleccione el tipo de solicitud *
                </Label>
                <Select
                  value={formData.tipoSolicitud}
                  onValueChange={(value) => handleInputChange("tipoSolicitud", value)}
                  required
                >
                  <SelectTrigger className="border-olive-dark/30 focus:border-olive-dark focus:ring-olive-dark/20">
                    <SelectValue placeholder="Seleccione el tipo de solicitud" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-olive-dark/30">
                    <SelectItem value="crear-usuarios">Crear usuario(s)</SelectItem>
                    <SelectItem value="matricular-usuarios">Matricular usuario(s)</SelectItem>
                    <SelectItem value="crear-matricular-usuarios">Crear y matricular usuario(s)</SelectItem>
                    <SelectItem value="revision-consulta-curso">Revisión o consulta de curso</SelectItem>
                    <SelectItem value="crear-nuevo-curso">Crear nuevo curso</SelectItem>
                    <SelectItem value="problemas-tecnicos">Problemas técnicos en curso</SelectItem>
                    <SelectItem value="asignar-roles">Asignar roles a usuarios</SelectItem>
                    <SelectItem value="desmatricular-usuarios">Desmatricular usuarios</SelectItem>
                    <SelectItem value="eliminar-curso">Eliminar curso o contenido</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sección Condicional */}
          {formData.tipoSolicitud && (
            <div className="space-y-4">
              <Separator className="bg-olive-dark/30" />
              {renderConditionalSection()}
            </div>
          )}

          {/* Botón de Envío */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="px-8 bg-olive-dark hover:bg-olive-dark/90 text-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Enviar solicitud de soporte
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
