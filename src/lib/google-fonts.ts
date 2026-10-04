export interface GoogleFont {
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting';
  weights: string;
}

export const GOOGLE_FONTS: GoogleFont[] = [
  { family: 'Inter', category: 'sans-serif', weights: '100..900' },
  { family: 'Roboto', category: 'sans-serif', weights: '100..900' },
  { family: 'Montserrat', category: 'sans-serif', weights: '100..900' },
  { family: 'Open Sans', category: 'sans-serif', weights: '300..800' },
  { family: 'Raleway', category: 'sans-serif', weights: '100..900' },
  { family: 'Oswald', category: 'sans-serif', weights: '200..700' },
  { family: 'Nunito', category: 'sans-serif', weights: '200..1000' },
  { family: 'Ubuntu', category: 'sans-serif', weights: '300..700' },
  { family: 'Exo 2', category: 'sans-serif', weights: '100..900' },
  { family: 'Fira Sans', category: 'sans-serif', weights: '100..900' },
  { family: 'Jost', category: 'sans-serif', weights: '100..900' },
  { family: 'Manrope', category: 'sans-serif', weights: '200..800' },
  { family: 'IBM Plex Sans', category: 'sans-serif', weights: '100..700' },
  { family: 'Comfortaa', category: 'display', weights: '300..700' },
  { family: 'Rubik', category: 'sans-serif', weights: '300..900' },
  { family: 'Source Sans 3', category: 'sans-serif', weights: '200..900' },
  { family: 'Noto Sans', category: 'sans-serif', weights: '100..900' },
  { family: 'Playfair Display', category: 'serif', weights: '400..900' },
  { family: 'PT Serif', category: 'serif', weights: '400..700' },
  { family: 'Lora', category: 'serif', weights: '400..700' },
  { family: 'Merriweather', category: 'serif', weights: '300..900' },
  { family: 'Bitter', category: 'serif', weights: '100..900' },
  { family: 'Cormorant Garamond', category: 'serif', weights: '300..700' },
  { family: 'Poiret One', category: 'display', weights: '400' },
  { family: 'Cuprum', category: 'sans-serif', weights: '400..700' },
  { family: 'PT Sans', category: 'sans-serif', weights: '400..700' },
  { family: 'Marmelad', category: 'sans-serif', weights: '400' },
  { family: 'Neucha', category: 'handwriting', weights: '400' },
  { family: 'Caveat', category: 'handwriting', weights: '400..700' },
  { family: 'Unbounded', category: 'display', weights: '200..900' },
];

export function getFontUrl(family: string): string {
  const encoded = family.replace(/ /g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@100;200;300;400;500;600;700;800;900&subset=latin,cyrillic&display=swap`;
}

export function getFontFallback(family: string): string {
  const font = GOOGLE_FONTS.find((f) => f.family === family);
  if (!font) return 'sans-serif';
  return font.category;
}
