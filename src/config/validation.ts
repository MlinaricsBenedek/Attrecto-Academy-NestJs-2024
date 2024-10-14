import { plainToInstance } from 'class-transformer';
import { EnvVariables } from './environment-variables';
import { validateSync } from 'class-validator';

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if(errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
