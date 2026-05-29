export const certificado = {
  name: 'certificado',
  title: 'Certificados Digitales',
  type: 'document',
  fields: [
    {
      name: 'codigo',
      title: 'Código Único',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'usuario_id',
      title: 'ID del Usuario (Clerk)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'usuario_nombre',
      title: 'Nombre del Estudiante',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fecha_emision',
      title: 'Fecha de Emisión',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'codigo',
      subtitle: 'usuario_nombre'
    }
  }
}
