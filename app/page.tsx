"use client"

import React from 'react'
import MoodleSupportForm from "../moodle-support-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, HelpCircle } from 'lucide-react'
import Sidebar from './components/Sidebar'

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top Bar */}
        <div className="h-16 border-b border-olive-dark/10 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-olive-dark">Inicio</h1>
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
        <div className="p-6">
          <div className="space-y-8">
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold">Formulario de Soporte Moodle</CardTitle>
              </CardHeader>
            </Card>

            <MoodleSupportForm />
          </div>
        </div>
      </div>
    </div>
  )
}
