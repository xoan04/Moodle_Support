'use client'

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ExternalLink, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMoodleStatisticsController, LoadingState } from '@/features/statics/controller'
import { CourseStatistics } from '@/features/statics/dto/dto_receive_finally'
import Sidebar from '../components/Sidebar'

const Page = () => {
    const router = useRouter()
    const {
        coursesWithSort,
        coursesWithSortLoading,
        coursesWithSortError,
        getCoursesWithSort
    } = useMoodleStatisticsController()

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(100)
    const [sortBy, setSortBy] = useState('completion_rate')
    const [sortOrder, setSortOrder] = useState('desc')

    useEffect(() => {
        fetchCourses()
    }, [currentPage, perPage, sortBy, sortOrder])

    const fetchCourses = async () => {
        try {
            await getCoursesWithSort(sortBy, sortOrder, currentPage, perPage)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePerPageChange = (value: string) => {
        setPerPage(Number(value))
        setCurrentPage(1) // Reset to first page when changing items per page
    }


    const totalPages = coursesWithSort?.meta?.max_page || 1
    const totalItems = coursesWithSort?.meta?.count || 0
    const startItem = (currentPage - 1) * perPage + 1
    const endItem = Math.min(currentPage * perPage, totalItems)

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 7 // Aumentado para mostrar más páginas
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        // Ajustar si no hay suficientes páginas
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // Agregar primera página si no está incluida
        if (startPage > 1) {
            pages.push(1)
            if (startPage > 2) {
                pages.push('...')
            }
        }

        // Agregar páginas del rango
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        // Agregar última página si no está incluida
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...')
            }
            pages.push(totalPages)
        }

        return pages
    }

    if (coursesWithSortLoading === LoadingState.LOADING) {
        return (
            <div className="min-h-screen bg-white flex">
                <Sidebar />
                <div className="flex-1 ml-72">
                    <Card className="border-2 border-olive-dark/20 shadow-md m-6">
                        <CardHeader className="bg-pistachio/20 rounded-t-lg">
                            <CardTitle className="text-lg text-olive-dark">Lista de Cursos con Estadísticas</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 bg-white">
                            <div className="flex flex-col justify-center items-center h-64 space-y-4">
                                {/* Spinner animado */}
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-pistachio/30 border-t-olive-dark rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-pistachio rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                                </div>
                                
                                {/* Texto de carga */}
                                <div className="text-center space-y-2">
                                    <p className="text-lg font-medium text-olive-dark">Cargando cursos...</p>
                                    <p className="text-sm text-olive-dark/60">Obteniendo estadísticas de los cursos</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (coursesWithSortLoading === LoadingState.ERROR && coursesWithSortError) {
        return (
            <div className="min-h-screen bg-white flex">
                <Sidebar />
                <div className="flex-1 ml-72">
                    <Card className="border-2 border-olive-dark/20 shadow-md m-6">
                        <CardHeader className="bg-pistachio/20 rounded-t-lg">
                            <CardTitle className="text-lg text-olive-dark">Lista de Cursos con Estadísticas</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 bg-white">
                            <div className="flex justify-center items-center h-32">
                                <p className="text-red-600">Error: {coursesWithSortError.message}</p>
                            </div>
                        </CardContent>
                    </Card>
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
                        <h1 className="text-xl font-semibold text-olive-dark">Cursos</h1>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Card className="border-2 border-olive-dark/20 shadow-md">
                        <CardHeader className="bg-pistachio/20 rounded-t-lg">
                            <CardTitle className="text-lg text-olive-dark">Lista de Cursos con Estadísticas</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 bg-white">
                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-olive-dark font-medium">Por página:</label>
                                    <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
                                        <SelectTrigger className="w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="15">15</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-olive-dark/20">
                                            <th className="text-left p-3 text-olive-dark font-semibold">Curso</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Categoría</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Inscritos</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Completados</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Tasa (%)</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Calificación</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Actividades</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Estado</th>
                                            <th className="text-left p-3 text-olive-dark font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coursesWithSort?.data?.map((course: CourseStatistics) => (
                                            <tr key={course.course_id} className="border-b border-olive-dark/10 hover:bg-pistachio/5">
                                                <td className="p-3 text-olive-dark font-medium">{course.course_name}</td>
                                                <td className="p-3 text-olive-dark/70">{course.category_name}</td>
                                                <td className="p-3 text-olive-dark">{course.total_enrolled}</td>
                                                <td className="p-3 text-olive-dark">{course.completed_count}</td>
                                                <td className="p-3 text-olive-dark">{course.completion_rate_percent.toFixed(1)}%</td>
                                                <td className="p-3 text-olive-dark">{course.avg_final_grade.toFixed(1)}</td>
                                                <td className="p-3 text-olive-dark">{course.total_activities}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${course.is_visible === 1
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {course.is_visible === 1 ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <button
                                                        onClick={() => router.push(`/course/${course.course_id}`)}
                                                        className="flex items-center gap-2 px-3 py-1 bg-olive-dark text-white rounded-md hover:bg-olive-dark/90 transition-colors text-sm"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        Ver Detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-olive-dark/20">
                                    <div className="text-sm text-olive-dark">
                                        Mostrando {startItem} a {endItem} de {totalItems} cursos
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(1)}
                                            disabled={currentPage === 1}
                                            className="text-olive-dark border-olive-dark/20 hover:bg-pistachio/10"
                                        >
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="text-olive-dark border-olive-dark/20 hover:bg-pistachio/10"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        
                                        {getPageNumbers().map((page, index) => (
                                            <React.Fragment key={index}>
                                                {typeof page === 'number' ? (
                                                    <Button
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handlePageChange(page)}
                                                        className={currentPage === page 
                                                            ? "bg-olive-dark text-white hover:bg-olive-dark/90" 
                                                            : "text-olive-dark border-olive-dark/20 hover:bg-pistachio/10"
                                                        }
                                                    >
                                                        {page}
                                                    </Button>
                                                ) : (
                                                    <span className="px-3 py-2 text-olive-dark/60">...</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="text-olive-dark border-olive-dark/20 hover:bg-pistachio/10"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="text-olive-dark border-olive-dark/20 hover:bg-pistachio/10"
                                        >
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page
