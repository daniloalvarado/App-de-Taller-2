import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import DashboardPage from '@/pages/DashboardPage'
import ValidacionesPage from '@/pages/ValidacionesPage'
import PlantaDetailPage from '@/pages/PlantaDetailPage'
import MapaPage from '@/pages/MapaPage'
import '@/index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      localization={{
        ...esES,
        signIn: {
          start: {
            title: 'Bienvenido',
            subtitle: 'Inicia sesión con tu Email o cuenta de Google',
          }
        }
      }}
    >
      <BrowserRouter>
        <SignedOut>
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f5] p-4">
            {/* Custom Header matching the screenshot style */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-lg leading-none">🌿</span>
              </div>
              <span className="text-xl font-medium text-black">PLANT-OR</span>
            </div>
            
            <SignIn 
              routing="hash" 
              appearance={{
                variables: {
                  colorPrimary: '#0a0a0a',
                  colorBackground: '#ffffff',
                  colorText: '#000000',
                  colorInputBackground: '#ffffff',
                  colorInputText: '#000000',
                  borderRadius: '0.5rem',
                },
                elements: {
                  card: "shadow-sm border border-gray-200 w-full max-w-[400px] p-8",
                  header: "hidden",
                  headerTitle: "text-2xl font-bold text-center text-black",
                  headerSubtitle: "text-center text-gray-500",
                  socialButtonsBlockButton: "border border-gray-200 text-black font-medium py-2.5",
                  formButtonPrimary: "bg-[#0a0a0a] hover:bg-black text-white shadow-none py-2.5",
                  formFieldLabel: "text-black font-medium",
                  formFieldInput: "bg-white border-gray-200 text-black py-2.5",
                  footerActionText: "text-gray-600",
                  footerActionLink: "text-black hover:underline font-medium",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500"
                }
              }}
            />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6 pt-20 md:p-8 md:pt-8 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/validaciones" element={<ValidacionesPage key="pendientes" filtroEstado="En revisión" />} />
                  <Route path="/aprobados" element={<ValidacionesPage key="aprobados" filtroEstado="Validado" />} />
                  <Route path="/catalogo" element={<ValidacionesPage key="catalogo" />} />
                  <Route path="/mapa" element={<MapaPage />} />
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
