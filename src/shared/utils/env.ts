import { z } from 'zod';

const required_envSchema = z.object({
  VITE_TEST_KEY: z
    .string({
      message: 'VITE_TEST_KEY environment variable is required',
    })
    .min(1, 'VITE_TEST_KEY must not be empty'),
});

const rawEnv: Record<string, unknown> = {
  VITE_TEST_KEY: import.meta.env.VITE_TEST_KEY,
};

const _env = required_envSchema.safeParse(rawEnv);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error);
  throw new Error('Missing required environment variables');
}

export const IDENTIFIER = {
  ..._env.data,
  // Add non required Env variables
};
