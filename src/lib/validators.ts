import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().trim().email().max(320),
  source: z.string().trim().max(120).optional(),
  website: z.string().trim().max(0).optional(),
  formStartedAt: z.number().int().positive().optional()
});
