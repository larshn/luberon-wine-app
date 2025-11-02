export interface ChipsFlavor {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  // Flavor profile tags to help match with wines
  profile: {
    salty: number; // 1-5
    acidic: number; // 1-5
    creamy: number; // 1-5
    spicy: number; // 1-5
    smoky: number; // 1-5
    herbal: number; // 1-5
    sweet: number; // 1-5
  };
  // Wine color preferences
  preferredWineColors?: ('red' | 'white' | 'rosé')[];
  // Suggested wine characteristics
  wineCharacteristics?: string[];
}
