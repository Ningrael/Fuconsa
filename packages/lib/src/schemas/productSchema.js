import { z } from 'zod';

export const localizedTextSchema = z.object({
  es: z.string().min(1, 'El nombre en español es obligatorio'),
  ca: z.string().min(1, 'El nombre en catalán es obligatorio'),
  en: z.string().min(1, 'El nombre en inglés es obligatorio')
});

export const productSchema = z.object({
  id: z.string().min(1, 'ID obligatorio'),
  channel: z.string().optional().default('general'),
  sector: z.string().min(1, 'Sector obligatorio'),
  section: z.string().min(1, 'Sección obligatoria'),
  brand: z.string().min(1, 'Marca obligatoria'),
  name: localizedTextSchema,
  format: z.string().min(1, 'Formato obligatorio'),
  unitPrice: z.number().nullable().optional().default(null),
  boxPrice: z.number().nullable().optional().default(null),
  priceText: z.string().default(''),
  hasPhoto: z.boolean().default(false),
  imagePath: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val ?? '')
});

export const catalogFilterSchema = z.object({
  sector: z.string().optional(),
  section: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  lang: z.enum(['es', 'ca', 'en']).default('es'),
  onlyWithPhoto: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => val === true || val === 'true')
});

export function validateProduct(data) {
  return productSchema.parse(data);
}

export function safeValidateProduct(data) {
  return productSchema.safeParse(data);
}

export function validateCatalog(products) {
  return z.array(productSchema).parse(products);
}

export function validateFilter(params) {
  return catalogFilterSchema.parse(params || {});
}
