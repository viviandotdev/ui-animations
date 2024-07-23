import { z } from 'zod';

export const registryEntrySchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  type: z.enum(['components:ui', 'components:component', 'components:example']),
  component: z.function().args(z.any()).returns(z.any()).optional(),
});

export const registrySchema = z.record(registryEntrySchema);

export type RegistryEntry = z.infer<typeof registryEntrySchema>;

export type Registry = z.infer<typeof registrySchema>;
