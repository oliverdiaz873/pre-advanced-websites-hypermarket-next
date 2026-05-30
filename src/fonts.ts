import localFont from 'next/font/local'

/**
 * Configuración centralizada de fuentes usando next/font/local
 *
 * Fuente: Domine (serif)
 * Uso: Marca/brand en el header y elementos destacados
 * Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
 */

export const domine = localFont({
  src: [
    {
      path: '../public/assets/fonts/Domine/domine-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Domine/domine-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Domine/domine-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Domine/domine-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-family-brand',
  display: 'swap',
})
