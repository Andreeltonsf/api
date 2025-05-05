import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbUrl: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
});

validateSync(env);

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(
    `Environment variables validation error: ${JSON.stringify(errors, null, 2)}`,
  );
}
