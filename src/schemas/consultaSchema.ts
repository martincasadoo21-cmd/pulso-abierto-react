import { z } from 'zod';

export const consultaSchema = z.object({
  busqueda: z
    .string()
    .trim()
    .refine(
    (texto) => texto.length === 0 || texto.length >= 2,
    'Ingresá al menos 2 caracteres o dejá el campo vacío.'
  ),
  criptomoneda: z.enum(
    ['todas', 'bitcoin', 'ethereum', 'solana'],
    {
      error: 'Seleccioná una criptomoneda válida.',
    }
  ),
});

export type DatosConsulta = z.infer<typeof consultaSchema>;
