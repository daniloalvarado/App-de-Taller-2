import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import DashboardPage from '@/pages/DashboardPage'
import ValidacionesPage from '@/pages/ValidacionesPage'
import PlantaDetailPage from '@/pages/PlantaDetailPage'
import '@/index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <SignedOut>
          <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl">🌿</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">PLANT-OR</h1>
                <p className="text-muted-foreground text-sm">Panel Administrativo para Profesores</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <SignIn routing="hash" />
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/validaciones" element={<ValidacionesPage />} />
                  <Route path="/aprobados" element={<ValidacionesPage filtroEstado="Validado" />} />
                  <Route path="/catalogo" element={<ValidacionesPage />} />
                  <Route path="/planta/:id" element={<PlantaDetailPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </SignedIn>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App
