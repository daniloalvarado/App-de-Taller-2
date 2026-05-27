import React, { useState, useEffect, useCallback } from 'react'
import { client } from '@/lib/sanity'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SlidersHorizontal, Plus, Trash2, ToggleLeft, ToggleRight, RefreshCw, Filter } from 'lucide-react'
import { CustomSelect } from '@/components/CustomSelect'

const CATEGORIAS = ['Hábito', 'Tipo de vida', 'Forma', 'Color', 'Tamaño', 'Textura', 'Estructura']

interface Filtro {
  _id: string
  nombre_filtro: string
  categoria: string
  dato_tecnico: string
  icono?: string
  activo: boolean
}

const EMPTY_FORM = { nombre_filtro: '', categoria: CATEGORIAS[0], dato_tecnico: '', icono: '' }

export default function FiltrosPage() {
  const [filtros, setFiltros] = useState<Filtro[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchFiltros = useCallback(async () => {
    setLoading(true)
    try {
      const data = await client.fetch(
        `*[_type == "filtro"] | order(categoria asc, nombre_filtro asc) {
          _id, nombre_filtro, categoria, dato_tecnico, icono, activo
        }`
      )
      setFiltros(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchFiltros() }, [fetchFiltros])

  const handleCreate = async () => {
    setFormError('')
    if (!form.nombre_filtro.trim() || !form.dato_tecnico.trim()) {
      setFormError('El nombre visible y el dato técnico son obligatorios.')
      return
    }
    setSaving(true)
    try {
      await client.create({
        _type: 'filtro',
        nombre_filtro: form.nombre_filtro.trim(),
        categoria: form.categoria,
        dato_tecnico: form.dato_tecnico.trim(),
        icono: form.icono.trim() || undefined,
        activo: true,
      })
      setForm(EMPTY_FORM)
      setShowForm(false)
      await fetchFiltros()
    } catch (e) {
      setFormError('Error al crear el filtro. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  const toggleActivo = async (filtro: Filtro) => {
    try {
      await client.patch(filtro._id).set({ activo: !filtro.activo }).commit()
      setFiltros(prev => prev.map(f => f._id === filtro._id ? { ...f, activo: !f.activo } : f))
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este filtro definitivamente?')) return
    setDeletingId(id)
    try {
      await client.delete(id)
      setFiltros(prev => prev.filter(f => f._id !== id))
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingId(null)
    }
  }

  const categorias = ['Todas', ...CATEGORIAS]
  const filtrosFiltrados = categoriaSeleccionada === 'Todas'
    ? filtros
    : filtros.filter(f => f.categoria === categoriaSeleccionada)

  const activosCount = filtros.filter(f => f.activo).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-primary" />
            Módulo de Filtros Dinámicos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Crea y gestiona los filtros de búsqueda que verán los usuarios en la app móvil.
            Traduce datos técnicos a lenguaje simple.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={fetchFiltros}
            className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Recargar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-sm font-bold rounded-lg hover:bg-[#1FC451] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(31,196,81,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Nuevo filtro
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total filtros', value: filtros.length, color: 'text-foreground' },
          { label: 'Activos', value: activosCount, color: 'text-primary' },
          { label: 'Inactivos', value: filtros.length - activosCount, color: 'text-muted-foreground' },
          { label: 'Categorías', value: new Set(filtros.map(f => f.categoria)).size, color: 'text-foreground' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Explanation card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-semibold text-primary mb-1">¿Cómo funciona este módulo?</p>
        <p>
          Los estudiantes registran datos técnicos (ej. <code className="bg-white/10 px-1 rounded">Ramificación verticilada</code>).
          Tú defines aquí cómo se verá ese valor en la app: <strong className="text-foreground">Nombre visible</strong> (ej. "Ramas como hélice"),
          a qué <strong className="text-foreground">Categoría</strong> pertenece, y puedes activarlo o desactivarlo.
        </p>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Crear nuevo filtro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Nombre visible (para el usuario) *
              </label>
              <input
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Ramas hacia arriba"
                value={form.nombre_filtro}
                onChange={e => setForm(f => ({ ...f, nombre_filtro: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Dato técnico (en base de datos) *
              </label>
              <input
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Erecta"
                value={form.dato_tecnico}
                onChange={e => setForm(f => ({ ...f, dato_tecnico: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Categoría *
              </label>
              <CustomSelect
                value={form.categoria}
                onChange={(val) => setForm(f => ({ ...f, categoria: val }))}
                options={CATEGORIAS.map(c => ({ value: c, label: c }))}
                placeholder="Seleccionar categoría..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ícono (MaterialCommunityIcons, opcional)
              </label>
              <input
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. tree-outline"
                value={form.icono}
                onChange={e => setForm(f => ({ ...f, icono: e.target.value }))}
              />
            </div>
          </div>

          {formError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {formError}
            </p>
          )}

          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setFormError('') }}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              disabled={saving}
              className="px-6 py-2 text-sm bg-primary text-black font-bold rounded-lg hover:bg-[#1FC451] transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Crear filtro'}
            </button>
          </div>
        </div>
      )}

      {/* Filter by category */}
      <div className="flex flex-wrap gap-2">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
              categoriaSeleccionada === cat
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {cat}
            {cat !== 'Todas' && (
              <span className="ml-1 text-muted-foreground">
                ({filtros.filter(f => f.categoria === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters list */}
      {loading ? (
        <LoadingSpinner text="Cargando filtros..." />
      ) : filtrosFiltrados.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">No hay filtros en esta categoría</p>
          <p className="text-sm mt-1">Crea tu primer filtro con el botón de arriba.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Group by categoria */}
          {(categoriaSeleccionada === 'Todas' ? CATEGORIAS.filter(c => filtros.some(f => f.categoria === c)) : [categoriaSeleccionada]).map(cat => {
            const items = filtrosFiltrados.filter(f => f.categoria === cat)
            if (items.length === 0) return null
            return (
              <div key={cat} className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pt-3 pb-1 px-1">{cat}</p>
                {items.map(filtro => (
                  <div
                    key={filtro._id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      filtro.activo
                        ? 'bg-card border-border'
                        : 'bg-card/50 border-border/50 opacity-60'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {filtro.nombre_filtro}
                        </p>
                        {filtro.activo ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 flex-shrink-0">Activo</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 flex-shrink-0">Inactivo</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Dato técnico: <code className="bg-white/5 px-1 rounded">{filtro.dato_tecnico}</code>
                        {filtro.icono && <> · Ícono: <code className="bg-white/5 px-1 rounded">{filtro.icono}</code></>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle active */}
                      <button
                        onClick={() => toggleActivo(filtro)}
                        className={`p-2 rounded-lg transition-colors ${
                          filtro.activo
                            ? 'text-primary hover:bg-primary/10'
                            : 'text-muted-foreground hover:bg-white/5'
                        }`}
                        title={filtro.activo ? 'Desactivar' : 'Activar'}
                      >
                        {filtro.activo
                          ? <ToggleRight className="w-5 h-5" />
                          : <ToggleLeft className="w-5 h-5" />
                        }
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(filtro._id)}
                        disabled={deletingId === filtro._id}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-40"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
