import React, { useState } from 'react'
import { usePlantas, updatePlantaEstado } from '@/hooks/use-plantas'
import { EstadoBadge } from '@/components/EstadoBadge'
import { Leaf, Search, Eye, CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp, ChevronsUpDown, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import type { Planta } from '@/types/planta'

interface ValidacionesPageProps {
  filtroEstado?: string
}

export default function ValidacionesPage({ filtroEstado }: ValidacionesPageProps) {
  const { plantas, loading, refetch } = usePlantas()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState(filtroEstado || '')
  const [filterHabito, setFilterHabito] = useState('')
  const [sortField, setSortField] = useState<keyof Planta>('_createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [observarId, setObservarId] = useState<string | null>(null)
  const [motivoTexto, setMotivoTexto] = useState('')
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = (field: keyof Planta) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const filtered = plantas
    .filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || [p.nombre_cientifico, p.nombres_comunes, p.registrador_nombre, p.registrador_curso]
        .some(v => v?.toLowerCase().includes(q))
      const matchEstado = !filterEstado || p.estado_revision === filterEstado
      const matchHabito = !filterHabito || p.habito === filterHabito
      return matchSearch && matchEstado && matchHabito
    })
    .sort((a, b) => {
      const av = (a as any)[sortField] ?? ''
      const bv = (b as any)[sortField] ?? ''
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

  const SortIcon = ({ field }: { field: keyof Planta }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3 h-3 text-muted-foreground ml-1" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-primary ml-1" />
      : <ChevronDown className="w-3 h-3 text-primary ml-1" />
  }

  const handleAprobar = async (id: string) => {
    setLoadingAction(id + '-aprobar')
    await updatePlantaEstado(id, 'Validado')
    await refetch()
    setLoadingAction(null)
  }

  const handleRechazar = async (id: string) => {
    if (!confirm('¿Estás seguro de rechazar este registro?')) return
    setLoadingAction(id + '-rechazar')
    await updatePlantaEstado(id, 'Rechazado')
    await refetch()
    setLoadingAction(null)
  }

  const handleObservar = async () => {
    if (!observarId || !motivoTexto.trim()) return
    setLoadingAction(observarId + '-observar')
    await updatePlantaEstado(observarId, 'Observado', motivoTexto.trim())
    await refetch()
    setObservarId(null)
    setMotivoTexto('')
    setLoadingAction(null)
  }

  const habitosUnicos = [...new Set(plantas.map(p => p.habito).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {filtroEstado === 'Validado' ? 'Registros Aprobados' : 'Bandeja de Validación'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, estudiante, curso..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
            <select
              value={filterEstado}
              onChange={e => setFilterEstado(e.target.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Todos los estados</option>
              <option value="En revisión">En revisión</option>
              <option value="Validado">Validado</option>
              <option value="Observado">Observado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
            <select
              value={filterHabito}
              onChange={e => setFilterHabito(e.target.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Todos los hábitos</option>
              {habitosUnicos.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <button
              onClick={() => { setFilterEstado(''); setFilterHabito(''); setSearch('') }}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Leaf className="w-6 h-6 text-primary animate-pulse" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  {[
                    { label: 'Planta', field: 'nombre_cientifico' as keyof Planta },
                    { label: 'Hábito', field: 'habito' as keyof Planta },
                    { label: 'Estudiante', field: 'registrador_nombre' as keyof Planta },
                    { label: 'Curso', field: 'registrador_curso' as keyof Planta },
                    { label: 'Fecha', field: '_createdAt' as keyof Planta },
                    { label: 'Estado', field: 'estado_revision' as keyof Planta },
                  ].map(col => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center">
                        {col.label}
                        <SortIcon field={col.field} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-border hover:bg-secondary/20 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground italic">{p.nombre_cientifico || '—'}</p>
                      <p className="text-xs text-muted-foreground">{p.nombres_comunes || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.habito || '—'}</td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{p.registrador_nombre || '—'}</p>
                      <p className="text-xs text-muted-foreground">{p.registrador_dni || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{p.registrador_curso || '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {p._createdAt ? format(new Date(p._createdAt), 'dd/MM/yy', { locale: es }) : '—'}
                    </td>
                    <td className="px-4 py-3"><EstadoBadge estado={p.estado_revision} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/planta/${p._id}`)}
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          title="Ver detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {p.estado_revision !== 'Validado' && (
                          <button
                            onClick={() => handleAprobar(p._id)}
                            disabled={loadingAction === p._id + '-aprobar'}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                            title="Aprobar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {p.estado_revision !== 'Observado' && p.estado_revision !== 'Rechazado' && (
                          <button
                            onClick={() => setObservarId(p._id)}
                            className="p-1.5 rounded-lg hover:bg-orange-500/10 text-muted-foreground hover:text-orange-400 transition-colors"
                            title="Observar"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                        {p.estado_revision !== 'Rechazado' && (
                          <button
                            onClick={() => handleRechazar(p._id)}
                            disabled={loadingAction === p._id + '-rechazar'}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                            title="Rechazar"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Leaf className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No hay registros que coincidan</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Observar Modal */}
      {observarId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Observar registro</h3>
              <p className="text-sm text-muted-foreground mt-1">El estudiante verá este mensaje en su aplicación móvil.</p>
            </div>
            <textarea
              value={motivoTexto}
              onChange={e => setMotivoTexto(e.target.value)}
              placeholder="Describe lo que falta o debe corregirse..."
              rows={4}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-400 resize-none"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setObservarId(null); setMotivoTexto('') }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleObservar}
                disabled={!motivoTexto.trim() || !!loadingAction}
                className="px-4 py-2 text-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors disabled:opacity-50"
              >
                Enviar observación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
