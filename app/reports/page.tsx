"use client"

import React from 'react'

import { Card,  CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, HelpCircle } from 'lucide-react'
import Sidebar from '../components/Sidebar'

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex">


      {/* Main Content */}
      <div className="flex-1 ">
    

        {/* Page Content */}
        <div className="">
          <div className="space-y-8">
            <Card className="border-2 border-olive-dark/20 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-olive-dark to-olive-dark/90 text-white rounded-t-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img src="/tasqui-logo.png" alt="Tasqui Logo" className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold">Formulario de Soporte Moodle</CardTitle>
              </CardHeader>
            </Card>


          </div>
        </div>
      </div>
    </div>
  )
}
