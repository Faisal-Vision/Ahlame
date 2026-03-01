import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  // Create env
  const env: any = new EnvService();

  // Read environment variables from browser window
  const browserWindow: any = window || {};
  const browserWindowEnv: { [key: string]: any } = browserWindow['__env'] || {};

  // Assign environment variables from browser window to env
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = browserWindowEnv[key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
