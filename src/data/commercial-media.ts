import room from '@/assets/images/ambiente-horizontal.jpg';
import maintenance from '@/assets/images/manutencao-referencia.jpg';

export const commercialMedia = {
  room: {
    image: room,
    alt: 'Split branco instalado na parede de uma sala integrada à cozinha, com marcenaria clara e portas de vidro.',
    author: 'Max Vakhtbovych',
    provider: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/contemporary-apartment-with-living-room-and-kitchen-7019013/',
    licenseUrl: 'https://www.pexels.com/license/',
    originalUrl: 'https://images.pexels.com/photos/7019013/pexels-photo-7019013.jpeg?w=1800',
    disclaimer: 'Imagem de referência, sem vínculo com a Entrear.',
  },
  maintenance: {
    image: maintenance,
    alt: 'Detalhe de mãos e instrumento durante a inspeção de uma unidade externa de ar-condicionado.',
    author: 'José Andrés Pacheco Cortes',
    provider: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/man-repairing-an-aircon-5463580/',
    licenseUrl: 'https://www.pexels.com/license/',
    originalUrl: 'https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?w=1800',
    disclaimer: 'Imagem ilustrativa; não retrata equipe da Entrear.',
  },
} as const;

export type CommercialCredit = Pick<typeof commercialMedia.room, 'author' | 'provider' | 'sourceUrl'>;
