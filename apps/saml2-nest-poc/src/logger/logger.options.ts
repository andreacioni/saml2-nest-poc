export interface LoggerModuleOptions {
  mode?: 'JSON' | 'SIMPLE_COLORIZED';
  serviceName: string;
  level?: 'info' | 'debug' | 'warn' | 'error';
  printBody?: boolean;
}
