import { InjectionToken } from '@angular/core';
import { ApiTransport } from './api-transport';

export const API_TRANSPORT = new InjectionToken<ApiTransport>('API_TRANSPORT');
