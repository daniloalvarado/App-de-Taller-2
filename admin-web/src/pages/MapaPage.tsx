import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { usePlantas } from '@/hooks/use-plantas'
import { useNavigate } from 'react-router-dom'
import { Leaf, MapPin, Filter } from 'lucide-react'
import type { Planta } from '@/types/planta'

const STATUS_COLORS: Record<string, string> = {
  'Validado':    '#1FC451',
  'En revisión': '#FBBF24',
  'Observado':   '#FB923C',
  'Rechazado':   '#EF4444',
}

const STATUS_LABELS: Record<string, string> = {
  'Validado':    'Validado',
  'En revisión': 'En revisión',
  'Observado':   'Observado',
  'Rechazado':   'Rechazado',
}

const ALL_STATES = Object.keys(STATUS_COLORS)

export default function MapaPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const navigate = useNavigate()
  const { plantas, loading } = usePlantas()

  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedPlanta, setSelectedPlanta] = useState<Planta | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})

  const mapPlantas = plantas.filter(p => p.latitud && p.longitud)

  // Count by status
  useEffect(() => {
    const c: Record<string, number> = { all: mapPlantas.length }
    ALL_STATES.forEach(s => {
      c[s] = mapPlantas.filter(p => p.estado_revision === s).length
    })
    setCounts(c)
  }, [mapPlantas.length])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    const center: [number, number] = [-73.25383, -3.74912] // Iquitos [lng, lat]

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center,
      zoom: 13,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left')
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right'
    )

    mapInstanceRef.current = map

    return () => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Add/update markers when data or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Remove old markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const filtered = activeFilter === 'all'
      ? mapPlantas
      : mapPlantas.filter(p => p.estado_revision === activeFilter)

    filtered.forEach(planta => {
      const color = STATUS_COLORS[planta.estado_revision] ?? '#6B7280'

      // Create custom marker element
      const el = document.createElement('div')
      el.style.cssText = `
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid rgba(255,255,255,0.9);
        box-shadow: 0 0 12px ${color}80, 0 2px 6px rgba(0,0,0,0.5);
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      `
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.4)'
        el.style.boxShadow = `0 0 20px ${color}, 0 2px 10px rgba(0,0,0,0.6)`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = `0 0 12px ${color}80, 0 2px 6px rgba(0,0,0,0.5)`
      })

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([planta.longitud!, planta.latitud!])
        .addTo(map)

      el.addEventListener('click', (e) => {
        e.stopPropagation()
        setSelectedPlanta(planta)
      })

      markersRef.current.push(marker)
    })

    // Fit map to markers if any
    if (filtered.length > 0 && filtered.length <= 200) {
      const bounds = new maplibregl.LngLatBounds()
      filtered.forEach(p => bounds.extend([p.longitud!, p.latitud!]))
      map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 800 })
    }
  }, [mapPlantas, activeFilter])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Leaf className="w-8 h-8 text-primary animate-pulse" />
          <p className="text-sm">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mapa del Catálogo</h1>
          <p className="text-muted-foreground mt-1">
            {counts[activeFilter] ?? 0} registro(s) geolocalizado(s)
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'all'
                ? 'bg-white/10 border-white/30 text-white'
                : 'border-white/10 text-muted-foreground hover:border-white/20 hover:text-white'
            }`}
          >
            Todos ({counts['all'] ?? 0})
          </button>
          {ALL_STATES.map(state => (
            <button
              key={state}
              onClick={() => setActiveFilter(state)}
              style={activeFilter === state ? { borderColor: STATUS_COLORS[state] + '80', color: STATUS_COLORS[state], backgroundColor: STATUS_COLORS[state] + '15' } : {}}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeFilter === state
                  ? ''
                  : 'border-white/10 text-muted-foreground hover:border-white/20 hover:text-white'
              }`}
            >
              {STATUS_LABELS[state]} ({counts[state] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-border">
        <div ref={mapRef} className="w-full h-full" />

        {/* Legend */}
        <div className="absolute bottom-8 left-4 bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 p-3 space-y-1.5 z-10">
          {ALL_STATES.map(state => (
            <div key={state} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: STATUS_COLORS[state], boxShadow: `0 0 6px ${STATUS_COLORS[state]}80` }}
              />
              <span className="text-xs text-zinc-300">{STATUS_LABELS[state]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side panel for selected plant */}
      {selectedPlanta && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPlanta(null)}>
          <div
            className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Estado pill */}
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: (STATUS_COLORS[selectedPlanta.estado_revision] ?? '#6B7280') + '20',
                  color: STATUS_COLORS[selectedPlanta.estado_revision] ?? '#6B7280',
                  border: `1px solid ${(STATUS_COLORS[selectedPlanta.estado_revision] ?? '#6B7280')}50`
                }}
              >
                {selectedPlanta.estado_revision}
              </span>
              <button onClick={() => setSelectedPlanta(null)} className="text-zinc-500 hover:text-white text-lg leading-none">×</button>
            </div>

            {/* Name */}
            <div>
              <p className="text-white font-bold text-lg italic leading-tight">
                {selectedPlanta.nombre_cientifico || 'Sin nombre científico'}
              </p>
              {selectedPlanta.nombres_comunes && (
                <p className="text-zinc-400 text-sm mt-0.5">{selectedPlanta.nombres_comunes}</p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-2 border-t border-zinc-800 pt-3">
              {selectedPlanta.habito && (
                <div className="flex items-center gap-2 text-sm">
                  <Leaf className="w-4 h-4 text-[#1FC451] flex-shrink-0" />
                  <span className="text-zinc-400">Hábito:</span>
                  <span className="text-white font-medium">{selectedPlanta.habito}</span>
                </div>
              )}
              {selectedPlanta.registrador_nombre && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span className="text-zinc-400">Registrado por:</span>
                  <span className="text-white font-medium truncate">{selectedPlanta.registrador_nombre}</span>
                </div>
              )}
              {selectedPlanta.latitud && selectedPlanta.longitud && (
                <p className="text-xs text-zinc-600 font-mono">
                  {selectedPlanta.latitud.toFixed(5)}, {selectedPlanta.longitud.toFixed(5)}
                </p>
              )}
            </div>

            {/* Action */}
            <button
              onClick={() => navigate(`/planta/${selectedPlanta._id}`)}
              className="w-full py-2.5 rounded-xl bg-[#1FC451] text-black text-sm font-bold hover:bg-[#1FC451]/90 shadow-[0_0_15px_rgba(31,196,81,0.25)] transition-all"
            >
              Ver Detalles Completos →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
