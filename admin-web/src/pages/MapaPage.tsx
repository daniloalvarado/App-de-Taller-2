import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { usePlantas } from '@/hooks/use-plantas'
import { EstadoBadge } from '@/components/EstadoBadge'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import type { Planta } from '@/types/planta'

const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'Validado': return '#1FC451'
    case 'En revisión': return '#FACC15'
    case 'Observado': return '#FB923C'
    case 'Rechazado': return '#EF4444'
    default: return '#6B7280'
  }
}

const createMarkerIcon = (estado: string) => {
  const color = getStatusColor(estado)
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  })
}

export default function MapaPage() {
  const { plantas, loading } = usePlantas()
  const [mapPlantas, setMapPlantas] = useState<Planta[]>([])

  useEffect(() => {
    // Filter only plants with valid coordinates
    setMapPlantas(plantas.filter(p => p.latitud && p.longitud))
  }, [plantas])

  if (loading) {
    return <div className="flex items-center justify-center h-96 text-muted-foreground">Cargando mapa...</div>
  }

  // Default to Iquitos
  const center: [number, number] = mapPlantas.length > 0
    ? [mapPlantas[0].latitud!, mapPlantas[0].longitud!]
    : [-3.74912, -73.25383]

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mapa del Catálogo</h1>
        <p className="text-muted-foreground mt-1">
          Mostrando {mapPlantas.length} registro(s) geolocalizado(s)
        </p>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-border bg-card relative z-0">
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {/* Use a nice dark map tile if we want to match the dark theme, but standard OSM is fine. */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {mapPlantas.map(p => (
            <Marker 
              key={p._id} 
              position={[p.latitud!, p.longitud!]}
              icon={createMarkerIcon(p.estado_revision)}
            >
              <Popup>
                <div className="text-sm p-1">
                  <p className="font-bold text-black mb-1">{p.nombre_cientifico || 'Desconocido'}</p>
                  <p className="text-xs text-gray-600 mb-2">{p.nombres_comunes}</p>
                  <div className="mb-2">
                    <EstadoBadge estado={p.estado_revision} />
                  </div>
                  <p className="text-xs text-gray-700 mb-2">Por: {p.registrador_nombre}</p>
                  <Link to={`/planta/${p._id}`} className="text-green-600 hover:underline text-sm font-semibold">
                    Ver Detalles &rarr;
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
