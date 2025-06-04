"use client"

import React from 'react'
import Sidebar from './Sidebar'
import { Bell, HelpCircle } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
} 