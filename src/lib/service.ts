import type { ServiceId } from '../types/content';

export function isServiceId(value: unknown): value is ServiceId {
  return value === 'instalacao' || value === 'manutencao';
}

export function serviceFromSearch(search: string): ServiceId {
  const value = new URLSearchParams(search).get('servico');
  return isServiceId(value) ? value : 'instalacao';
}

export interface ServiceState {
  get(): ServiceId;
  set(value: ServiceId): void;
  subscribe(listener: (value: ServiceId) => void): () => void;
}

export function createServiceState(initial: ServiceId): ServiceState {
  let value = initial;
  const listeners = new Set<(value: ServiceId) => void>();
  return {
    get: () => value,
    set(next) {
      if (next === value) return;
      value = next;
      listeners.forEach(listener => listener(value));
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(value);
      return () => { listeners.delete(listener); };
    },
  };
}
