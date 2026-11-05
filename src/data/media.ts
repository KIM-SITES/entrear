import residence from '@/assets/images/residencia-referencia.jpg';
import office from '@/assets/images/escritorio-referencia.jpg';
import type { LicensedImage, MediaId } from '@/types/content';

export const media = {
  'residencia-referencia': {
    id: 'residencia-referencia', image: residence,
    alt: 'Ar-condicionado branco integrado a um ambiente residencial com painel ripado.',
    author: 'Caroline Badran', sourceUrl: 'https://unsplash.com/photos/BsHycOlU6Bg',
    licenseName: 'Unsplash License', licenseUrl: 'https://unsplash.com/license',
    originalReference: 'prototipos/assets/ambiente-climatizado.jpg',
    disclaimer: 'Ambiente de referência. Não representa um serviço da Entrear.',
  },
  'escritorio-referencia': {
    id: 'escritorio-referencia', image: office,
    alt: 'Ar-condicionado branco em escritório com marcenaria clara, bancada e teto geométrico.',
    author: 'Caroline Badran', sourceUrl: 'https://unsplash.com/photos/ePhpXlJ6H2g',
    licenseName: 'Unsplash License', licenseUrl: 'https://unsplash.com/license',
    originalReference: 'prototipos/assets/escritorio-climatizado-c.jpg',
    disclaimer: 'Ambiente de referência. Não representa um serviço da Entrear.',
  },
} as const satisfies Record<MediaId, LicensedImage>;
