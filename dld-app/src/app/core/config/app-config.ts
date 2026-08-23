import { environment } from '../../../environments/environment';

export interface AppConfig {
  production: boolean;
  useMockData: boolean;
  apiBaseUrl: string;
}

export const appConfig: AppConfig = {
  production: environment.production,
  useMockData: environment.useMockData,
  apiBaseUrl: environment.apiBaseUrl.replace(/\/$/, ''),
};

export function assertValidAppConfig(config: AppConfig = appConfig): void {
  if (config.production && config.useMockData) {
    throw new Error('Mock data cannot be enabled in production.');
  }
  if (!config.apiBaseUrl.startsWith('/')) {
    throw new Error('The Angular API base URL must use the public gateway path.');
  }
}
