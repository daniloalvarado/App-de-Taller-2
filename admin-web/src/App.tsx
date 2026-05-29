import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser, useAuth } from '@clerk/clerk-react'
import { XCircle } from 'lucide-react'
import { esES } from '@clerk/localizations'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import DashboardPage from '@/pages/DashboardPage'
import ValidacionesPage from '@/pages/ValidacionesPage'
import PlantaDetailPage from '@/pages/PlantaDetailPage'
import MapaPage from '@/pages/MapaPage'
import FiltrosPage from '@/pages/FiltrosPage'
import '@/index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function RoleCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { signOut } = useAuth();
  
  if (!user) return null;
  
  const role = user.publicMetadata.role as string | undefined;
  
  if (role !== 'admin' && role !== 'profesor_validador') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] p-4 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mb-6">
          <XCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          Tu cuenta ({user.primaryEmailAddress?.emailAddress}) no tiene permisos de administrador o profesor validador para acceder a este panel.
        </p>
        <button
          onClick={() => signOut()}
          className="px-6 py-3 bg-[#1FC451] hover:bg-[#19a343] text-white font-bold rounded-lg transition-colors cursor-pointer"
        >
          Cerrar sesión y volver
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      localization={{
        ...esES,
        signIn: {
          ...esES.signIn,
          start: {
            ...esES.signIn?.start,
            title: 'Bienvenido',
            subtitle: 'Inicia sesión con tu correo o cuenta de Google',
            actionText: '',
            actionLink: ''
          }
        }
      }}
      appearance={{
        variables: {
          colorPrimary: '#1FC451',
          colorBackground: '#0a0a0a',
          colorText: '#ffffff',
          colorInputBackground: '#121212',
          colorInputText: '#ffffff',
          borderRadius: '0.75rem',
        },
        elements: {
          card: "shadow-2xl border border-zinc-800 w-full max-w-[400px] p-8 bg-[#0a0a0a]",
          header: "hidden",
          headerTitle: "text-2xl font-bold text-center text-white",
          headerSubtitle: "text-center text-zinc-400",
          socialButtonsBlockButton: "border-2 border-zinc-600 bg-transparent hover:bg-white/5 transition-colors py-2.5",
          socialButtonsBlockButtonText: "!text-white font-medium",
          formButtonPrimary: "bg-[#1FC451] hover:bg-[#19a343] text-black font-bold shadow-none py-2.5 transition-colors",
          formFieldLabel: "text-zinc-300 font-medium",
          formFieldInput: "bg-black border-zinc-800 text-white focus:border-[#1FC451] py-2.5",
          footerAction: "hidden",
          dividerLine: "bg-zinc-800",
          dividerText: "text-zinc-500",
          identityPreviewText: "text-white",
          identityPreviewEditButtonIcon: "text-[#1FC451]",
          formFieldInputShowPasswordButton: "text-zinc-400 hover:text-white"
        }
      }}
    >
      <BrowserRouter>
        <SignedOut>
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] p-4">
            {/* Custom Header matching the screenshot style */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#1FC451]/10 rounded-xl flex items-center justify-center border border-[#1FC451]/20">
                <span className="text-xl leading-none">🌿</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">PLANT-OR</span>
            </div>
            
            <SignIn 
              routing="hash" 
              appearance={{
                elements: {
                  dividerRow: "hidden",
                  formFieldRow: "hidden",
                  formButtonPrimary: "hidden"
                }
              }}
            />
          </div>
        </SignedOut>

        <SignedIn>
          <RoleCheck>
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
                  <Route path="/filtros" element={<FiltrosPage />} />
                  <Route path="/planta/:id" element={<PlantaDetailPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
          </RoleCheck>
        </SignedIn>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App
