import apartment from '@/assets/images/residencia-referencia.jpg';
import office from '@/assets/images/escritorio-aplicacao.jpg';
import shop from '@/assets/images/comercio-referencia.jpg';
import detail from '@/assets/images/escritorio-referencia.jpg';
import type { ImageMetadata } from 'astro';

export interface EditorialPhoto {
  image: ImageMetadata;
  alt: string;
  author: string;
  provider: 'Unsplash' | 'Pexels';
  sourceUrl: string;
  licenseUrl: string;
  disclaimer: string;
}

const referenceNotice = 'Cenário ilustrativo. Não é um projeto da Entrear.';

/** Fontes e licenças conferidas na curadoria de 06/11/2026. */
export const editorialMedia = {
  apartment: {
    image: apartment,
    alt: 'Split branco sobre painel ripado em sala de apartamento, com marcenaria clara e passagem lateral.',
    author: 'Caroline Badran', provider: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/BsHycOlU6Bg',
    licenseUrl: 'https://unsplash.com/license', disclaimer: referenceNotice,
  },
  office: {
    image: office,
    alt: 'Escritório compacto com mesa compartilhada, duas cadeiras, janelas altas e split na parede.',
    author: 'Max Vakhtbovych', provider: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/modern-design-for-the-office-interior-7534232/',
    licenseUrl: 'https://www.pexels.com/license/', disclaimer: referenceNotice,
  },
  shop: {
    image: shop,
    alt: 'Pequena cafeteria com mesas de madeira, banco azul junto à janela e luz natural sobre o piso.',
    author: 'Vicky Tran', provider: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/interior-of-modern-cafe-with-tables-sofas-and-chairs-7541176/',
    licenseUrl: 'https://www.pexels.com/license/', disclaimer: referenceNotice,
  },
  detail: {
    image: detail,
    alt: 'Detalhe dos nichos de marcenaria clara, com luz natural sobre a madeira e a parede de um escritório.',
    author: 'Caroline Badran', provider: 'Unsplash',
    sourceUrl: 'https://unsplash.com/photos/ePhpXlJ6H2g',
    licenseUrl: 'https://unsplash.com/license',
    disclaimer: 'Detalhe de ambiente de referência. Não representa uma sede ou serviço da Entrear.',
  },
} as const satisfies Record<string, EditorialPhoto>;
