"use client"

import React from 'react'
import { 
  Home,
  Users,
  MessageSquare,
  Dumbbell,
  LogOut,
  ChevronDown,
  User,
  Bell,
  HelpCircle,
  Building2,
  Users2
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-72 bg-olive-dark text-white flex flex-col h-screen fixed">
      <div className="p-6 border-b border-white/10">
        <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-8 w-auto" />
      </div>

      {/* User Profile in Sidebar */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-pistachio/20">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Juan Pérez</p>
            <p className="text-xs text-white/70 truncate">juan.perez@ejemplo.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link 
          href="/dashboard" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            isActive('/dashboard') 
              ? 'bg-pistachio/20 text-white' 
              : 'text-white/70 hover:bg-pistachio/20 hover:text-white'
          } transition-colors`}
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link 
          href="/users" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            isActive('/users') 
              ? 'bg-pistachio/20 text-white' 
              : 'text-white/70 hover:bg-pistachio/20 hover:text-white'
          } transition-colors`}
        >
          <Users className="h-5 w-5" />
          <span>Usuarios</span>
        </Link>
        
        {/* PQRS Section */}
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              PQRS
            </h3>
          </div>
          <Link 
            href="/pqrs/internal" 
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              isActive('/pqrs/internal') 
                ? 'bg-pistachio/20 text-white' 
                : 'text-white/70 hover:bg-pistachio/20 hover:text-white'
            } transition-colors`}
          >
            <Building2 className="h-5 w-5" />
            <span>PQRS Internos</span>
          </Link>
          <Link 
            href="/pqrs/external" 
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              isActive('/pqrs/external') 
                ? 'bg-pistachio/20 text-white' 
                : 'text-white/70 hover:bg-pistachio/20 hover:text-white'
            } transition-colors`}
          >
            <Users2 className="h-5 w-5" />
            <span>PQRS Externos</span>
          </Link>
        </div>

        <Link 
          href="/sports-reports" 
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            isActive('/sports-reports') 
              ? 'bg-pistachio/20 text-white' 
              : 'text-white/70 hover:bg-pistachio/20 hover:text-white'
          } transition-colors`}
        >
          <Dumbbell className="h-5 w-5" />
          <span>Reportes por curso</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-pistachio/20 hover:text-white transition-colors w-full">
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
} 