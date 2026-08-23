import { appConfig } from '../config/app-config';

export const ApiRoutes = {
  news: 'news',
  initiatives: 'initiatives',
  services: 'services',
  leaders: 'leaders',
  achievements: 'achievements',
  auth: 'auth',
} as const;

export const BackendUrls = {
  baseUrl: appConfig.apiBaseUrl,
  news: `${appConfig.apiBaseUrl}/${ApiRoutes.news}`,
  initiatives: `${appConfig.apiBaseUrl}/${ApiRoutes.initiatives}`,
  services: `${appConfig.apiBaseUrl}/${ApiRoutes.services}`,
  leaders: `${appConfig.apiBaseUrl}/${ApiRoutes.leaders}`,
  achievements: `${appConfig.apiBaseUrl}/${ApiRoutes.achievements}`,
  auth: `${appConfig.apiBaseUrl}/${ApiRoutes.auth}`,
} as const;
