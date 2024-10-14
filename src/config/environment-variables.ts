import { IsEnum, IsString } from 'class-validator';

export enum NodeEnv {
  development = 'development',
  production = 'production',
}

export class EnvVariables {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @IsString()
  JWT_SECRET: string;
}
