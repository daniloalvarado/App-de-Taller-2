export const filtro = {
  name: 'filtro',
  title: 'Filtros Dinámicos',
  type: 'document',
  fields: [
    {
      name: 'nombre_filtro',
      title: 'Nombre del Filtro Visible',
      type: 'string',
      description: 'Ej: Ramas hacia arriba, Hojas acorazonadas...',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          'Hábito', 'Tipo de vida', 'Forma', 'Color', 'Tamaño', 'Textura', 'Estructura'
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dato_tecnico',
      title: 'Dato Técnico Asociado',
      type: 'string',
      description: 'El valor exacto en la base de datos (Ej: Erecta, Alterna dística)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icono',
      title: 'Nombre de Ícono (opcional)',
      type: 'string',
      description: 'Nombre del icono en MaterialCommunityIcons',
    },
    {
      name: 'activo',
      title: 'Filtro Activo',
      type: 'boolean',
      initialValue: true,
    }
  ]
}
