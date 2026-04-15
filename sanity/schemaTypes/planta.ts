export const planta = {
  name: 'planta',
  title: 'Planta Ornamental',
  type: 'document',
  fields: [
    { name: 'galeria', title: 'Galería Fotográfica', type: 'array', of: [{ type: 'image' }] },
    { name: 'nombres_comunes', title: 'Nombres Comunes', type: 'string' },
    { name: 'nombre_cientifico', title: 'Nombre Científico', type: 'string' },
    { name: 'familia', title: 'Familia Botánica', type: 'string' },
    { name: 'origen', title: 'Origen', type: 'string' },
    { name: 'habito', title: 'Hábito de Crecimiento', type: 'string', description: 'Ej: Árbol, Arbusto, Caña, Hierba...' },
    { name: 'caracteres_diagnosticos', title: 'Caracteres Diagnósticos', type: 'text', description: 'Rasgos clave que permiten identificar la especie (ej: hojas alternas, espinas en el tallo, etc.)' },
    { name: 'tipo_flor', title: 'Tipo de Flor', type: 'string', description: 'Morfología de la flor (ej: tubular, acampanada, labiada, etc.)' },
    { name: 'color_flor', title: 'Color de Flor principal', type: 'string' },
    { name: 'tipo_fruto', title: 'Tipo de Fruto', type: 'string' },
    { name: 'tipo_inflorescencia', title: 'Tipo de Inflorescencia', type: 'string', description: 'Ej: Racimo, Panícula, Umbela, etc.' },
    { name: 'tipo_semilla', title: 'Tipo de Semilla', type: 'string' },
    { name: 'tipo_infrutescencia', title: 'Tipo de Infrutescencia', type: 'string', description: 'Ej: Sicono, Sorosis (piña), racimo de bayas (uva), etc.' },
    { name: 'exudado', title: 'Tipo y Color de Exudado', type: 'string' },
    { name: 'valor_ornamental', title: 'Valor Ornamental', type: 'text' },
    { name: 'descripcion', title: 'Descripción Morfológica Básica', type: 'text' },
    { name: 'usos_urbanos', title: 'Usos Urbanos', type: 'text' },
  ]
}
