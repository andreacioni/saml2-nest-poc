import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  mode: process.env.LOGGER_MODE,
  serviceName: process.env.LOGGER_SERVICE_NAME,
  level: process.env.LOGGER_LEVEL,
  printBody: process.env.LOGGER_PRINT_BODY?.toLocaleLowerCase() === 'true',
}));
