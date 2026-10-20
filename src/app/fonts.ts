import { Archivo } from 'next/font/google';

// One family, three voices (display wide, text normal, map labels condensed): the width axis does the work.
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
