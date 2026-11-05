/** Rótulos da prancha; os valores de execução são definidos em tokens.css. */
export const palette = [
  { name: 'Azul-ardósia', token: '--color-ink', hex: '#253D4A', role: 'Texto, marca e superfícies de contraste', inverse: true },
  { name: 'Cobre', token: '--color-copper', hex: '#A64B32', role: 'Ações e escolhas do visitante', inverse: true },
  { name: 'Branco frio', token: '--color-paper', hex: '#EEF1F1', role: 'Base e espaço de leitura', inverse: false },
  { name: 'Cinza de leitura', token: '--color-slate', hex: '#50616B', role: 'Informações complementares', inverse: true },
  { name: 'Vidro', token: '--color-glass', hex: '#CEDBE0', role: 'Superfícies de apoio', inverse: false },
] as const;

export const spacing = [
  { token: '--space-1', pixels: 4 }, { token: '--space-2', pixels: 8 },
  { token: '--space-3', pixels: 12 }, { token: '--space-4', pixels: 16 },
  { token: '--space-5', pixels: 24 }, { token: '--space-6', pixels: 32 },
  { token: '--space-7', pixels: 48 }, { token: '--space-8', pixels: 64 },
  { token: '--space-9', pixels: 96 }, { token: '--space-10', pixels: 128 },
] as const;

export const motion = [
  { name: 'Microinteração', token: '--motion-duration-micro', duration: '180 ms' },
  { name: 'Interface', token: '--motion-duration-interface', duration: '220 ms' },
  { name: 'Abertura', token: '--motion-duration-aperture', duration: '420 ms' },
  { name: 'Revelação', token: '--motion-duration-reveal', duration: '560 ms' },
] as const;
