import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const token = import.meta.env.VITE_SANITY_TOKEN

export const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-03-28',
  token,
})

export const urlFor = (source: any) => {
  if (!source?.asset?._ref) return ''
  const ref = source.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
