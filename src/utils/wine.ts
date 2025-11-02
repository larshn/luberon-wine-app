import type { StorageRecommendation, Wine } from '../types/wine';

export const getStorageLabel = (recommendation: StorageRecommendation): string => {
  const labels: Record<StorageRecommendation, string> = {
    'drink-now': 'Drikk nå',
    'drink-soon': 'Drikk snart (innen 1 år)',
    'short-term': 'Kortsiktig (1-3 år)',
    'medium-term': 'Mellomlang (3-7 år)',
    'long-term': 'Langsiktig (7+ år)'
  };
  return labels[recommendation];
};

export const getStorageColor = (recommendation: StorageRecommendation): string => {
  const colors: Record<StorageRecommendation, string> = {
    'drink-now': 'bg-red-100 text-red-800 border-red-200',
    'drink-soon': 'bg-orange-100 text-orange-800 border-orange-200',
    'short-term': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'medium-term': 'bg-blue-100 text-blue-800 border-blue-200',
    'long-term': 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[recommendation];
};

export const getWineColorClass = (color: Wine['color']): string => {
  const classes: Record<Wine['color'], string> = {
    'red': 'bg-red-700',
    'white': 'bg-yellow-100',
    'rosé': 'bg-pink-300'
  };
  return classes[color];
};

export const getCurrentAge = (vintageYear: number): number => {
  return new Date().getFullYear() - vintageYear;
};

export const isInDrinkingWindow = (wine: Wine): boolean => {
  const age = getCurrentAge(wine.year);
  return age >= wine.optimalDrinkingWindow.start && age <= wine.optimalDrinkingWindow.end;
};

export const getDrinkingWindowStatus = (wine: Wine): 'too-young' | 'ready' | 'past-peak' => {
  const age = getCurrentAge(wine.year);
  if (age < wine.optimalDrinkingWindow.start) return 'too-young';
  if (age > wine.optimalDrinkingWindow.end) return 'past-peak';
  return 'ready';
};
