/**
 * "Your basket" Standalone Application & Produce Dataset Engine
 * Uses Mixborder Typography, Real Public Photography Dataset & Zero Emojis.
 * Copyright (c) Smissenbroek
 */

// --- DATASETS & REGIONAL CONSTANTS ---
const REGIONS = [
  { id: 'we_eu', name: 'Western & Central Europe (FR, BE, NL, DE, CH, AT)', lat: 48.8, default: true },
  { id: 'med_eu', name: 'Mediterranean Europe (ES, IT, PT, GR, South FR)', lat: 40.4 },
  { id: 'uk_ie', name: 'UK & Ireland', lat: 52.5 },
  { id: 'nordic', name: 'Northern Europe & Baltics (SE, NO, DK, FI)', lat: 59.3 },
  { id: 'ee_eu', name: 'Eastern Europe & Balkans (PL, CZ, SK, HU, RO, BG)', lat: 52.2 },
  { id: 'us_ne', name: 'US Northeast & Midwest (NY, MA, IL, PA)', lat: 41.8 },
  { id: 'us_wc', name: 'US West Coast & Pacific NW (WA, OR, CA North)', lat: 45.5 },
  { id: 'us_ca', name: 'US Sunbelt & California South', lat: 34.0 },
  { id: 'asia_east', name: 'East & Southeast Asia (JP, KR, CN, TW)', lat: 35.6 },
  { id: 'oceania', name: 'Oceania & Southern Hemisphere (AU, NZ)', lat: -33.8 }
];

const BUILTIN_CITIES = [
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, regionId: 'we_eu' },
  { name: 'Lyon', country: 'France', lat: 45.7640, lon: 4.8357, regionId: 'we_eu' },
  { name: 'Bordeaux', country: 'France', lat: 44.8378, lon: -0.5792, regionId: 'we_eu' },
  { name: 'Marseille', country: 'France', lat: 43.2965, lon: 5.3698, regionId: 'med_eu' },
  { name: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517, regionId: 'we_eu' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, regionId: 'we_eu' },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050, regionId: 'we_eu' },
  { name: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.5820, regionId: 'we_eu' },
  { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738, regionId: 'we_eu' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, regionId: 'we_eu' },
  { name: 'Warsaw', country: 'Poland', lat: 52.2297, lon: 21.0122, regionId: 'ee_eu' },
  { name: 'Prague', country: 'Czechia', lat: 50.0755, lon: 14.4378, regionId: 'ee_eu' },
  { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402, regionId: 'ee_eu' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, regionId: 'uk_ie' },
  { name: 'Edinburgh', country: 'United Kingdom', lat: 55.9533, lon: -3.1883, regionId: 'uk_ie' },
  { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603, regionId: 'uk_ie' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, regionId: 'med_eu' },
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734, regionId: 'med_eu' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, regionId: 'med_eu' },
  { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.1900, regionId: 'med_eu' },
  { name: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275, regionId: 'med_eu' },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393, regionId: 'med_eu' },
  { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686, regionId: 'nordic' },
  { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522, regionId: 'nordic' },
  { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683, regionId: 'nordic' },
  { name: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384, regionId: 'nordic' },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, regionId: 'us_ne' },
  { name: 'Boston', country: 'United States', lat: 42.3601, lon: -71.0589, regionId: 'us_ne' },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298, regionId: 'us_ne' },
  { name: 'Seattle', country: 'United States', lat: 47.6062, lon: -122.3321, regionId: 'us_wc' },
  { name: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194, regionId: 'us_ca' },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, regionId: 'us_ca' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, regionId: 'asia_east' },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, regionId: 'oceania' }
];

function mapCoordinatesToRegion(lat, lon) {
  if (lat < 0) return 'oceania';
  if (lon > 100) return 'asia_east';
  if (lon < -50) {
    if (lon < -115) {
      if (lat >= 42) return 'us_wc';
      return 'us_ca';
    }
    return 'us_ne';
  }
  if (lat >= 56) return 'nordic';
  if (lat >= 51 && lon >= -10 && lon <= 2) return 'uk_ie';
  if (lat < 44 || (lat <= 45 && lon < -2)) return 'med_eu';
  if (lon >= 14 && lat >= 42) return 'ee_eu';
  return 'we_eu';
}

const CATEGORIES = [
  { id: 'all', name: 'All Produce' },
  { id: 'vegetable', name: 'Vegetables' },
  { id: 'fruit', name: 'Fruits' },
  { id: 'herb', name: 'Herbs & Edibles' },
  { id: 'nut', name: 'Nuts & Roots' }
];

// Fallback high-res produce image
const FALLBACK_PRODUCE_IMG = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';

const PRODUCE_DATA = [
  {
    id: 'asparagus-green',
    name: 'Green Asparagus',
    latinName: 'Asparagus officinalis',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'ee_eu'],
    harvestWeeks: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    peakWeeks: [17, 18, 19, 20, 21, 22],
    storageWeeks: [],
    nutrition: 'High in Folate (B9), Vitamin K, and antioxidants like Glutathione.',
    carbonRating: 'A+',
    storageTip: 'Store stalks standing upright in a jar with 1 inch of water in the fridge for up to 5 days.',
    culinaryPairs: ['Poached Eggs', 'Hollandaise', 'Parmesan', 'Lemon Zest', 'Butter'],
    funFact: 'Asparagus spears can grow up to 10 cm (4 inches) in a single warm day!',
    prepTips: 'Snap off the woody bottom end naturally where it bends.'
  },
  {
    id: 'asparagus-white',
    name: 'White Asparagus',
    latinName: 'Asparagus officinalis var. albicans',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a67?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'nordic', 'ee_eu'],
    harvestWeeks: [16, 17, 18, 19, 20, 21, 22, 23, 24],
    peakWeeks: [18, 19, 20, 21],
    storageWeeks: [],
    nutrition: 'Rich in fiber, potassium, and anti-inflammatory saponins.',
    carbonRating: 'A+',
    storageTip: 'Wrap in a damp cloth in the vegetable drawer for 3–4 days.',
    culinaryPairs: ['Melted Butter', 'Cooked Ham', 'Hard-boiled Eggs', 'Chervil', 'New Potatoes'],
    funFact: 'Grown entirely underground shielded from sunlight to prevent chlorophyll synthesis.',
    prepTips: 'Peel thoroughly from just below the tip down to the stem base.'
  },
  {
    id: 'salsify-black',
    name: 'Black Salsify (Scorzonera)',
    latinName: 'Scorzonera hispanica',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'ee_eu', 'nordic'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2],
    storageWeeks: [11, 12, 13, 14, 15],
    nutrition: 'Exceptionably rich in prebiotic Inulin, Iron, Potassium, and B-vitamins.',
    carbonRating: 'A+',
    storageTip: 'Store unwashed in cold damp sand or crisper box for up to 3 months.',
    culinaryPairs: ['Heavy Cream', 'Nutmeg', 'White Wine', 'Butter', 'Lemon Juice'],
    funFact: 'Nicknamed "Winter Asparagus" or "Oyster Plant" due to its delicate, subtle savory flavor.',
    prepTips: 'Peel under running water or with gloves to prevent sticky white latex sap from staining hands.'
  },
  {
    id: 'sunchoke',
    name: 'Jerusalem Artichoke (Sunchoke)',
    latinName: 'Helianthus tuberosus',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'us_ne', 'us_wc', 'ee_eu', 'nordic'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [13, 14, 15],
    nutrition: 'Packed with gut-supporting Inulin fiber, Thiamine (B1), and Iron.',
    carbonRating: 'A+',
    storageTip: 'Store in a cool dark pantry or fridge crisper wrapped in paper towels.',
    culinaryPairs: ['Thyme', 'Garlic', 'Hazelnut Oil', 'Heavy Cream', 'Roast Poultry'],
    funFact: 'A native North American sunflower tuber, neither from Jerusalem nor an artichoke!',
    prepTips: 'Scrub thoroughly with a stiff brush; peeling is optional as skin is edible and nutritious.'
  },
  {
    id: 'kohlrabi',
    name: 'Kohlrabi (Turnip Cabbage)',
    latinName: 'Brassica oleracea var. gongylodes',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'ee_eu', 'nordic', 'us_ne', 'asia_east'],
    harvestWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [24, 25, 26, 27, 28, 29, 30, 34, 35, 36, 37],
    storageWeeks: [45, 46, 47, 48],
    nutrition: 'Contains 140% DV Vitamin C per 100g, plus Vitamin B6 and Copper.',
    carbonRating: 'A+',
    storageTip: 'Remove leaves and keep bulb in crisper drawer for up to 3 weeks.',
    culinaryPairs: ['Dill', 'Sour Cream', 'Apple', 'Lemon', 'Mustard Seeds'],
    funFact: 'Name comes from German "Kohl" (cabbage) and "Rübe" (turnip).',
    prepTips: 'Peel off the tough outer fibrous skin before slicing raw or roasting.'
  },
  {
    id: 'celeriac',
    name: 'Celeriac (Root Celery)',
    latinName: 'Apium graveolens var. rapaceum',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a67?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'ee_eu', 'nordic', 'us_ne'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [13, 14, 15, 16],
    nutrition: 'High in Vitamin K, Vitamin C, Phosphorus, and low glycemic carbs.',
    carbonRating: 'A+',
    storageTip: 'Keep in crisper drawer or unheated cellar for up to 6 months.',
    culinaryPairs: ['Dijon Mustard', 'Mayonnaise', 'Walnuts', 'Green Apples', 'Butter'],
    funFact: 'Classic ingredient in French Remoulade salad.',
    prepTips: 'Slice top and bottom off first to stabilize root before carving away knobby skin.'
  },
  {
    id: 'swiss-chard',
    name: 'Swiss Chard (Rainbow Chard)',
    latinName: 'Beta vulgaris subsp. vulgaris',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca', 'ee_eu', 'oceania'],
    harvestWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [24, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39],
    storageWeeks: [],
    nutrition: 'Exceptional source of Vitamin K (300%+ DV), Vitamin A, Magnesium, and Iron.',
    carbonRating: 'A+',
    storageTip: 'Wrap leaves loosely in a damp paper towel and refrigerate for up to 5 days.',
    culinaryPairs: ['Garlic', 'Olive Oil', 'Pine Nuts', 'Raisins', 'Feta Cheese'],
    funFact: 'Despite its name, Swiss Chard originated in the Mediterranean, not Switzerland.',
    prepTips: 'Separate thick stems from tender greens; cook stems first as they need 3-5 extra minutes.'
  },
  {
    id: 'chicory-witloof',
    name: 'Witloof Chicory (Belgian Endive)',
    latinName: 'Cichorium intybus var. foliosum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'ee_eu'],
    harvestWeeks: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8],
    storageWeeks: [15, 16],
    nutrition: 'Rich in Intybin digestive bitters, Folate, and Vitamin K.',
    carbonRating: 'A+',
    storageTip: 'Store in darkness in the fridge to prevent leaves from turning green and extra bitter.',
    culinaryPairs: ['Roquefort Cheese', 'Walnuts', 'Béchamel Sauce', 'Ham', 'Apples'],
    funFact: 'Discovered by accident in Belgium in 1830 when roots left in a dark cellar sprouted pale heads.',
    prepTips: 'Cut a small cone out of the stem base to reduce intense bitterness.'
  },
  {
    id: 'radicchio',
    name: 'Radicchio (Italian Red Chicory)',
    latinName: 'Cichorium intybus var. silvestre',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a67?auto=format&fit=crop&w=600&q=80',
    regions: ['med_eu', 'we_eu', 'us_wc'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    peakWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2],
    storageWeeks: [],
    nutrition: 'High in Intybin bitters, Anthocyanin antioxidants, and Copper.',
    carbonRating: 'A+',
    storageTip: 'Store whole head unwashed in crisper drawer for up to 2 weeks.',
    culinaryPairs: ['Balsamic Glaze', 'Gorgonzola', 'Olive Oil', 'Risotto', 'Prosciutto'],
    funFact: 'Grilling or roasting caramelizes its sugars, mellowing bitterness into rich nutty complexity.',
    prepTips: 'Quarter and brush with olive oil before searing on high heat.'
  },
  {
    id: 'wild-garlic',
    name: 'Wild Garlic (Ramsons)',
    latinName: 'Allium ursinum',
    category: 'herb',
    image: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'nordic', 'ee_eu'],
    harvestWeeks: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    peakWeeks: [13, 14, 15, 16, 17],
    storageWeeks: [],
    nutrition: 'Contains active Allicin, Vitamin C, Chlorophyll, and Magnesium.',
    carbonRating: 'A+',
    storageTip: 'Place stems in a jar of cold water or blend into pesto with olive oil to freeze.',
    culinaryPairs: ['Pine Nuts', 'Parmesan', 'Pasta', 'Butter', 'Spring Soups'],
    funFact: 'Also called Bear Garlic because brown bears feast on it after winter hibernation.',
    prepTips: 'Crush leaves gently between fingers to verify garlic aroma (distinguishes from poisonous Lily of the Valley).'
  },
  {
    id: 'quince',
    name: 'Quince',
    latinName: 'Cydonia oblonga',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'ee_eu', 'us_wc', 'asia_east'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    peakWeeks: [41, 42, 43, 44, 45],
    storageWeeks: [49, 50, 51, 52, 1, 2],
    nutrition: 'Extremely high in Pectin, Vitamin C, Copper, and Catechin polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Store in a cool ventilated spot away from other fruits, as intense fragrance will perfume surroundings.',
    culinaryPairs: ['Manchego Cheese', 'Honey', 'Cinnamon', 'Star Anise', 'Roast Pork'],
    funFact: 'Too hard and astringent to eat raw; slow cooking turns flesh from pale yellow to deep ruby red.',
    prepTips: 'Poach gently in sugar syrup with spices for 1-2 hours until soft and fragrant.'
  },
  {
    id: 'persimmon',
    name: 'Persimmon (Kaki / Sharon Fruit)',
    latinName: 'Diospyros kaki',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80',
    regions: ['med_eu', 'us_ca', 'asia_east'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50],
    storageWeeks: [1, 2, 3],
    nutrition: 'High in Beta-Carotene, Vitamin C, Manganese, and Cryptoxanthin.',
    carbonRating: 'A+',
    storageTip: 'Store astringent varieties at room temperature until soft like jelly; non-astringent Fuyu can be eaten crisp.',
    culinaryPairs: ['Goat Cheese', 'Walnuts', 'Prosciutto', 'Pomegranate', 'Honey'],
    funFact: 'Scientific name Diospyros means "Fruit of the Gods" in ancient Greek.',
    prepTips: 'Slice crisp Fuyu into salads or spoon soft Hachiya directly from skin.'
  },
  {
    id: 'sweet-chestnut',
    name: 'Sweet Chestnut',
    latinName: 'Castanea sativa',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1541857754-557a44522bec?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'ee_eu', 'us_ne', 'asia_east'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    peakWeeks: [41, 42, 43, 44, 45, 46, 47, 48],
    storageWeeks: [1, 2, 3, 4],
    nutrition: 'Unlike other nuts, low in fat and high in complex carbohydrates, Vitamin C, and Folate.',
    carbonRating: 'A+',
    storageTip: 'Store in perforated plastic bag in fridge for up to 1 month.',
    culinaryPairs: ['Brussels Sprouts', 'Wild Game', 'Vanilla', 'Butter', 'Red Wine'],
    funFact: 'A staple starchy food in European mountain villages before the introduction of the potato.',
    prepTips: 'Cut an "X" on flat side of shell before oven roasting or boiling to prevent explosive bursting.'
  },
  {
    id: 'fig-fresh',
    name: 'Fresh Black Mission & Turkey Figs',
    latinName: 'Ficus carica',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1601379327928-1fdad75d7b57?auto=format&fit=crop&w=600&q=80',
    regions: ['med_eu', 'us_ca', 'asia_east', 'oceania'],
    harvestWeeks: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    peakWeeks: [28, 29, 30, 35, 36, 37, 38, 39],
    storageWeeks: [],
    nutrition: 'Rich in dietary fiber, Calcium, Potassium, Magnesium, and Polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Highly perishable; store on paper-lined plate in fridge for 2-3 days max.',
    culinaryPairs: ['Blue Cheese', 'Prosciutto', 'Honey', 'Thyme', 'Walnuts'],
    funFact: 'Botanically an inverted flower cluster (syconium), not a true fruit!',
    prepTips: 'Wipe gently with damp cloth; stem is trimmed, skin is completely edible.'
  },
  {
    id: 'strawberry',
    name: 'Field Strawberries',
    latinName: 'Fragaria × ananassa',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca', 'ee_eu', 'asia_east', 'oceania'],
    harvestWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    peakWeeks: [22, 23, 24, 25, 26, 27],
    storageWeeks: [],
    nutrition: 'Packed with Vitamin C (more per gram than oranges), manganese, and ellagic acid.',
    carbonRating: 'A+',
    storageTip: 'Do not wash until immediately before eating. Store dry in paper-lined container in fridge.',
    culinaryPairs: ['Fresh Cream', 'Balsamic Vinegar', 'Mint', 'Dark Chocolate', 'Rhubarb'],
    funFact: 'Strawberries are the only fruit with seeds on the outside—an average strawberry has ~200 seeds!',
    prepTips: 'Hull with a small knife or straw rather than cutting the top off to preserve juice.'
  },
  {
    id: 'rhubarb',
    name: 'Garden Rhubarb',
    latinName: 'Rheum rhabarbarum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1593280406085-d603a110a30b?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'ee_eu'],
    harvestWeeks: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    peakWeeks: [17, 18, 19, 20, 21],
    storageWeeks: [],
    nutrition: 'Excellent source of dietary fiber, calcium, and Anthocyanins.',
    carbonRating: 'A+',
    storageTip: 'Wrap unwashed stalks tightly in foil and keep in fridge up to 2 weeks.',
    culinaryPairs: ['Strawberries', 'Vanilla', 'Ginger', 'Custard', 'Pork Tenderloin'],
    funFact: 'Botanically a vegetable, but legally defined as a fruit in the US in 1947 due to culinary usage.',
    prepTips: 'Discard leaves completely as they contain high concentrations of toxic oxalic acid.'
  },
  {
    id: 'pumpkin-hokkaido',
    name: 'Hokkaido Red Kuri Squash',
    latinName: 'Cucurbita maxima',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'ee_eu', 'asia_east'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4],
    peakWeeks: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    storageWeeks: [5, 6, 7, 8, 9, 10, 11, 12],
    nutrition: 'Exceptionally rich in Beta-Carotene (Vitamin A precursor), Potassium, and Fiber.',
    carbonRating: 'A+',
    storageTip: 'Store whole in cool dark pantry (10-15°C) for up to 5 months.',
    culinaryPairs: ['Nutmeg', 'Coconut Milk', 'Sage', 'Roast Garlic', 'Ginger'],
    funFact: 'Thin orange skin is 100% edible when cooked, requiring zero peeling!',
    prepTips: 'Halve, scoop out seeds, slice with skin on, roast at 200°C for 25 minutes.'
  },
  {
    id: 'walnut',
    name: 'Fresh English Walnut',
    latinName: 'Juglans regia',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'ee_eu', 'us_wc', 'us_ca', 'asia_east'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [41, 42, 43, 44, 45, 46, 47, 48],
    storageWeeks: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    nutrition: 'Highest concentration of plant omega-3 ALA fatty acids among all nuts, plus Polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Store shelled walnuts in airtight container in fridge or freezer to prevent oil rancidity.',
    culinaryPairs: ['Pears', 'Roquefort Cheese', 'Honey', 'Bitter Greens', 'Pasta'],
    funFact: 'Walnut trees produce juglone, a natural herbicide preventing competing vegetation around roots.',
    prepTips: 'Toast gently in dry skillet for 3-5 minutes to accentuate buttery aroma.'
  }
];

// --- APP STATE persistent in localStorage ---
const STORAGE_KEY = 'your_basket_saved_items_v2';

let state = {
  selectedRegion: localStorage.getItem('your_basket_region') || 'we_eu',
  selectedWeek: getISOWeek(new Date()),
  selectedCategory: 'all',
  searchQuery: '',
  activeView: 'visual', // 'visual' | 'compact'
  myBasket: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
};

function getISOWeek(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getWeekDateRangeStr(weekNum) {
  const year = new Date().getFullYear();
  const simple = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - (simple.getDay() - 1));
  else ISOweekStart.setDate(simple.getDate() + (8 - simple.getDay()));
  const ISOweekEnd = new Date(ISOweekStart);
  ISOweekEnd.setDate(ISOweekStart.getDate() + 6);
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `(${monthNames[ISOweekStart.getMonth()]} ${ISOweekStart.getDate()} – ${monthNames[ISOweekEnd.getMonth()]} ${ISOweekEnd.getDate()})`;
}

function saveBasket() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.myBasket));
}

// --- DOM ELEMENTS ---
let selectRegionEl, locationSearchInputEl, btnClearLocationEl, locationDropdownResultsEl, btnGeolocateEl;
let weekRangeSliderEl, weekDisplayTitleEl, weekDateRangeEl, btnCurrentWeekEl, seasonBtns;
let categoryChipsEl, searchInputEl;
let btnViewVisualEl, btnViewCompactEl;
let visualViewContainerEl, compactViewContainerEl, compactTableBodyWrapEl;
let bannerRegionNameEl, bannerWeekNameEl, bannerCountEl;
let btnOpenRecipesEl, modalRecipesOverlayEl, btnCloseRecipesEl, modalRecipesContentEl;
let btnOpenDrawerEl, drawerOverlayEl, btnCloseDrawerEl, drawerBasketItemsEl, drawerTotalCountEl, drawerCarbonSavingEl, btnDrawerPrintEl, btnDrawerClearEl;
let btnPrintActionEl, btnCompactPrintEl;
let modalDetailOverlayEl, btnCloseDetailEl, modalTitleEl, modalDetailContentEl;
let basketBadgeCountEl;
let btnOpenContributeEl, modalContributeOverlayEl, btnCloseContributeEl, btnGenerateJsonEl, btnCopyJsonEl, jsonOutputWrapEl, jsonOutputCodeEl;

function initApp() {
  // Bind DOM elements
  selectRegionEl = document.getElementById('select-region');
  locationSearchInputEl = document.getElementById('location-search-input');
  btnClearLocationEl = document.getElementById('btn-clear-location');
  locationDropdownResultsEl = document.getElementById('location-dropdown-results');
  btnGeolocateEl = document.getElementById('btn-geolocate');

  weekRangeSliderEl = document.getElementById('week-range-slider');
  weekDisplayTitleEl = document.getElementById('week-display-title');
  weekDateRangeEl = document.getElementById('week-date-range');
  btnCurrentWeekEl = document.getElementById('btn-current-week');
  seasonBtns = document.querySelectorAll('.season-btn');

  categoryChipsEl = document.getElementById('category-chips');
  searchInputEl = document.getElementById('search-input');

  btnViewVisualEl = document.getElementById('btn-view-visual');
  btnViewCompactEl = document.getElementById('btn-view-compact');

  visualViewContainerEl = document.getElementById('visual-view-container');
  compactViewContainerEl = document.getElementById('compact-view-container');
  compactTableBodyWrapEl = document.getElementById('compact-table-body-wrap');

  bannerRegionNameEl = document.getElementById('banner-region-name');
  bannerWeekNameEl = document.getElementById('banner-week-name');
  bannerCountEl = document.getElementById('banner-count');

  btnOpenRecipesEl = document.getElementById('btn-open-recipes');
  modalRecipesOverlayEl = document.getElementById('modal-recipes-overlay');
  btnCloseRecipesEl = document.getElementById('btn-close-recipes');
  modalRecipesContentEl = document.getElementById('modal-recipes-content');

  btnOpenDrawerEl = document.getElementById('btn-open-drawer');
  drawerOverlayEl = document.getElementById('drawer-overlay');
  btnCloseDrawerEl = document.getElementById('btn-close-drawer');
  drawerBasketItemsEl = document.getElementById('drawer-basket-items');
  drawerTotalCountEl = document.getElementById('drawer-total-count');
  drawerCarbonSavingEl = document.getElementById('drawer-carbon-saving');
  btnDrawerPrintEl = document.getElementById('btn-drawer-print');
  btnDrawerClearEl = document.getElementById('btn-drawer-clear');

  btnPrintActionEl = document.getElementById('btn-print-action');
  btnCompactPrintEl = document.getElementById('btn-compact-print');

  modalDetailOverlayEl = document.getElementById('modal-detail-overlay');
  btnCloseDetailEl = document.getElementById('btn-close-detail');
  modalTitleEl = document.getElementById('modal-title');
  modalDetailContentEl = document.getElementById('modal-detail-content');

  basketBadgeCountEl = document.getElementById('basket-badge-count');

  // How to Contribute modal DOM elements
  btnOpenContributeEl = document.getElementById('btn-open-contribute');
  modalContributeOverlayEl = document.getElementById('modal-contribute-overlay');
  btnCloseContributeEl = document.getElementById('btn-close-contribute');
  btnGenerateJsonEl = document.getElementById('btn-generate-json');
  btnCopyJsonEl = document.getElementById('btn-copy-json');
  jsonOutputWrapEl = document.getElementById('json-output-wrap');
  jsonOutputCodeEl = document.getElementById('json-output-code');

  populateRegionSelect();
  renderCategoryChips();

  if (weekRangeSliderEl) weekRangeSliderEl.value = state.selectedWeek;
  updateWeekDisplay();

  setupEventListeners();
  setupLocationSearch();
  setupContributionModal();

  renderApp();
}

function populateRegionSelect() {
  if (!selectRegionEl) return;
  selectRegionEl.innerHTML = REGIONS.map(r => 
    `<option value="${r.id}" ${r.id === state.selectedRegion ? 'selected' : ''}>${r.name}</option>`
  ).join('');
}

function renderCategoryChips() {
  if (!categoryChipsEl) return;
  categoryChipsEl.innerHTML = CATEGORIES.map(c => 
    `<button class="chip ${c.id === state.selectedCategory ? 'active' : ''}" data-category="${c.id}">${c.name}</button>`
  ).join('');
}

function filterProduce() {
  const currentWeek = state.selectedWeek;
  const currentRegion = state.selectedRegion;
  const cat = state.selectedCategory;
  const q = state.searchQuery.toLowerCase().trim();

  return PRODUCE_DATA.filter(item => {
    if (!item.regions.includes(currentRegion)) return false;
    if (cat !== 'all' && item.category !== cat) return false;

    const isHarvest = item.harvestWeeks.includes(currentWeek);
    const isStorage = item.storageWeeks && item.storageWeeks.includes(currentWeek);
    if (!isHarvest && !isStorage) return false;

    if (q) {
      const matchName = item.name.toLowerCase().includes(q);
      const matchLatin = item.latinName.toLowerCase().includes(q);
      const matchNutrition = item.nutrition ? item.nutrition.toLowerCase().includes(q) : false;
      const matchPairs = item.culinaryPairs ? item.culinaryPairs.some(p => p.toLowerCase().includes(q)) : false;
      if (!matchName && !matchLatin && !matchNutrition && !matchPairs) return false;
    }

    return true;
  });
}

function renderApp() {
  const filtered = filterProduce();
  const currentRegionObj = REGIONS.find(r => r.id === state.selectedRegion) || REGIONS[0];
  
  if (bannerRegionNameEl) bannerRegionNameEl.textContent = currentRegionObj.name.split('(')[0].trim();
  if (bannerWeekNameEl) bannerWeekNameEl.textContent = `Week ${state.selectedWeek}`;
  if (bannerCountEl) bannerCountEl.textContent = `${filtered.length} items available local`;

  const totalBasketCount = Object.values(state.myBasket).reduce((a, b) => a + b, 0);
  if (basketBadgeCountEl) basketBadgeCountEl.textContent = totalBasketCount;

  if (state.activeView === 'visual') {
    if (visualViewContainerEl) visualViewContainerEl.style.display = 'grid';
    if (compactViewContainerEl) compactViewContainerEl.style.display = 'none';
    renderVisualView(filtered);
  } else {
    if (visualViewContainerEl) visualViewContainerEl.style.display = 'none';
    if (compactViewContainerEl) compactViewContainerEl.style.display = 'block';
    renderCompactView(filtered);
  }
}

function renderVisualView(items) {
  if (!visualViewContainerEl) return;
  if (items.length === 0) {
    visualViewContainerEl.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; color: var(--muted); background: var(--paper); border: 1px dashed var(--line); border-radius: var(--radius-lg);">
        <h4 style="font-family: var(--font-serif); font-size: 18px; color: var(--accent); margin-bottom: 8px;">No Local Harvest Items Found</h4>
        <p style="font-size: 14px; max-width: 480px; margin: 0 auto;">Try adjusting your location, expanding the week slider, or switching categories to discover seasonal produce.</p>
      </div>`;
    return;
  }

  const currentWeek = state.selectedWeek;
  visualViewContainerEl.innerHTML = items.map(item => {
    const isPeak = item.peakWeeks.includes(currentWeek);
    const isStorage = item.storageWeeks && item.storageWeeks.includes(currentWeek);
    const inBasketQty = state.myBasket[item.id] || 0;

    let badgeMarkup = '';
    if (isPeak) {
      badgeMarkup = `<span class="produce-badge badge-peak">Peak Season</span>`;
    } else if (isStorage) {
      badgeMarkup = `<span class="produce-badge badge-storage">Local Cellar Storage</span>`;
    } else {
      badgeMarkup = `<span class="produce-badge badge-fresh">Fresh Harvest</span>`;
    }

    return `
      <div class="produce-card" data-id="${item.id}">
        <div class="card-photo-hero">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
          <div class="card-badge-row">
            ${badgeMarkup}
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-group">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-latin">${item.latinName}</span>
          </div>
          <p class="card-nutrition">${item.nutrition}</p>
          <div class="card-footer">
            <button class="btn btn-add-basket ${inBasketQty > 0 ? 'added' : ''}" data-id="${item.id}">
              ${inBasketQty > 0 ? `In Basket (${inBasketQty})` : 'Add to Basket'}
            </button>
            <button class="btn btn-detail" data-id="${item.id}">Detail</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderCompactView(items) {
  if (!compactTableBodyWrapEl) return;

  const grouped = {};
  CATEGORIES.filter(c => c.id !== 'all').forEach(c => grouped[c.id] = []);
  items.forEach(item => {
    if (grouped[item.category]) grouped[item.category].push(item);
    else grouped['vegetable'].push(item);
  });

  const currentWeek = state.selectedWeek;
  let html = '';

  Object.keys(grouped).forEach(catId => {
    const catItems = grouped[catId];
    if (catItems.length === 0) return;
    const catName = (CATEGORIES.find(c => c.id === catId) || {}).name || catId;

    html += `
      <div class="category-group-header">
        <span>${catName} (${catItems.length})</span>
      </div>
      <table class="compact-table">
        <thead>
          <tr>
            <th style="width: 32px;">Select</th>
            <th>Produce & Latin Name</th>
            <th>Season Status</th>
            <th>Carbon Impact</th>
            <th>Nutritional Highlights</th>
            <th style="width: 90px; text-align: right;">My Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${catItems.map(item => {
            const isPeak = item.peakWeeks.includes(currentWeek);
            const isStorage = item.storageWeeks && item.storageWeeks.includes(currentWeek);
            const qty = state.myBasket[item.id] || 0;
            const isChecked = qty > 0;

            let statusStr = '<span style="color: var(--accent); font-weight: 600;">Fresh Harvest</span>';
            if (isPeak) statusStr = '<span style="color: var(--accent); font-weight: 700;">Peak Season</span>';
            else if (isStorage) statusStr = '<span style="color: #d97706; font-weight: 600;">Cellar Storage</span>';

            return `
              <tr>
                <td>
                  <input type="checkbox" class="compact-chk" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
                </td>
                <td>
                  <div class="table-produce-cell">
                    <img src="${item.image}" alt="${item.name}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1px solid var(--line2);" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
                    <div class="table-name-wrap">
                      <span class="table-name">${item.name}</span>
                      <span class="table-latin">${item.latinName}</span>
                    </div>
                  </div>
                </td>
                <td>${statusStr}</td>
                <td><span style="font-weight: 700; color: var(--accent);">${item.carbonRating || 'A+'}</span></td>
                <td style="color: var(--muted); font-size: 12px;">${item.nutrition}</td>
                <td style="text-align: right;">
                  <div class="table-qty-control" style="justify-content: flex-end;">
                    <button class="qty-btn btn-qty-dec" data-id="${item.id}">-</button>
                    <span class="qty-val">${qty}</span>
                    <button class="qty-btn btn-qty-inc" data-id="${item.id}">+</button>
                  </div>
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  });

  compactTableBodyWrapEl.innerHTML = html;
}

function openDetailModal(id) {
  const item = PRODUCE_DATA.find(p => p.id === id);
  if (!item || !modalDetailOverlayEl) return;

  if (modalTitleEl) modalTitleEl.textContent = item.name;

  const currentWeek = state.selectedWeek;
  const isPeak = item.peakWeeks.includes(currentWeek);
  const isStorage = item.storageWeeks && item.storageWeeks.includes(currentWeek);

  let seasonStatusStr = 'Fresh Local Harvest';
  if (isPeak) seasonStatusStr = 'Peak Season (Highest Flavor & Nutrient Density)';
  else if (isStorage) seasonStatusStr = 'Local Cellar Storage (Eco-friendly Winter Stock)';

  if (modalDetailContentEl) {
    modalDetailContentEl.innerHTML = `
      <div class="detail-hero-box" style="padding: 0; overflow: hidden;">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 220px; object-fit: cover;" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
      </div>
      <div style="padding: 0 4px;">
        <div style="margin-bottom: 12px;">
          <h3 style="font-family: var(--font-serif); font-size: 22px; color: var(--accent);">${item.name}</h3>
          <span style="font-size: 13px; font-style: italic; color: var(--muted);">${item.latinName}</span>
        </div>
        <div class="detail-section" style="margin-bottom: 12px;">
          <span class="detail-section-title">Season Status (Week ${currentWeek})</span>
          <p style="font-size: 13.5px; font-weight: 600; color: var(--accent);">${seasonStatusStr}</p>
        </div>
        <div class="detail-section" style="margin-bottom: 12px;">
          <span class="detail-section-title">Nutritional Highlights</span>
          <p style="font-size: 13.5px; color: var(--ink);">${item.nutrition}</p>
        </div>
        <div class="detail-section" style="margin-bottom: 12px;">
          <span class="detail-section-title">Eco & Storage Advice</span>
          <p style="font-size: 13.5px; color: var(--ink);">${item.storageTip}</p>
        </div>
        <div class="detail-section" style="margin-bottom: 12px;">
          <span class="detail-section-title">Culinary Pairings</span>
          <div class="pairs-tags">
            ${(item.culinaryPairs || []).map(p => `<span class="pair-tag">${p}</span>`).join('')}
          </div>
        </div>
        ${item.prepTips ? `
          <div class="detail-section">
            <span class="detail-section-title">Preparation Tip</span>
            <p style="font-size: 13px; color: var(--muted);">${item.prepTips}</p>
          </div>` : ''}
      </div>`;
  }

  modalDetailOverlayEl.classList.add('open');
}

function openRecipesModal() {
  if (!modalRecipesOverlayEl || !modalRecipesContentEl) return;

  const currentItems = filterProduce().slice(0, 6);
  if (currentItems.length === 0) {
    modalRecipesContentEl.innerHTML = `<p style="color: var(--muted);">Select a week with active harvest items to generate seasonal recipes.</p>`;
  } else {
    modalRecipesContentEl.innerHTML = `
      <p style="font-size: 13.5px; color: var(--muted); margin-bottom: 16px;">
        Curated seasonal recipes based on produce harvested in <b>Week ${state.selectedWeek}</b>:
      </p>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 16px;">
          <h4 style="font-family: var(--font-serif); font-size: 16px; color: var(--accent); margin-bottom: 6px;">
            Warm Harvest Pan-Roast of ${currentItems[0] ? currentItems[0].name : 'Seasonal Roots'}
          </h4>
          <p style="font-size: 13px; color: var(--ink); line-height: 1.5;">
            Toss chopped seasonal roots and greens with extra virgin olive oil, garlic, sea salt, and fresh thyme. Roast at 200°C for 25 minutes until caramelized.
          </p>
        </div>
        <div style="background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 16px;">
          <h4 style="font-family: var(--font-serif); font-size: 16px; color: var(--accent); margin-bottom: 6px;">
            Rustic Local Produce Tart with ${currentItems[1] ? currentItems[1].name : 'Herbs'}
          </h4>
          <p style="font-size: 13px; color: var(--ink); line-height: 1.5;">
            Layer thin slices of fresh produce over puff pastry with goat cheese, cracked black pepper, and honey. Bake until golden and crisp.
          </p>
        </div>
      </div>`;
  }

  modalRecipesOverlayEl.classList.add('open');
}

function renderBasketDrawer() {
  if (!drawerBasketItemsEl) return;

  const itemIds = Object.keys(state.myBasket);
  if (itemIds.length === 0) {
    drawerBasketItemsEl.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: var(--muted);">
        <p style="font-size: 14px;">Your weekly basket is currently empty.</p>
        <p style="font-size: 12px; margin-top: 6px;">Click "Add to Basket" on any produce item to build your checklist.</p>
      </div>`;
    if (drawerTotalCountEl) drawerTotalCountEl.textContent = '0';
    if (drawerCarbonSavingEl) drawerCarbonSavingEl.textContent = '0.0 kg CO2e';
    return;
  }

  let totalItemsCount = 0;
  let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';

  itemIds.forEach(id => {
    const qty = state.myBasket[id];
    totalItemsCount += qty;
    const item = PRODUCE_DATA.find(p => p.id === id) || { name: id, image: FALLBACK_PRODUCE_IMG, latinName: '' };

    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
          <div>
            <div style="font-family: var(--font-serif); font-weight: 600; font-size: 14px;">${item.name}</div>
            <div style="font-size: 11px; color: var(--muted); font-style: italic;">${item.latinName}</div>
          </div>
        </div>
        <div class="table-qty-control">
          <button class="qty-btn btn-qty-dec" data-id="${id}">-</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn btn-qty-inc" data-id="${id}">+</button>
        </div>
      </div>`;
  });

  html += '</div>';
  drawerBasketItemsEl.innerHTML = html;

  if (drawerTotalCountEl) drawerTotalCountEl.textContent = totalItemsCount;
  const carbonSaving = (totalItemsCount * 0.45).toFixed(1);
  if (drawerCarbonSavingEl) drawerCarbonSavingEl.textContent = `${carbonSaving} kg CO2e`;
}

function updateWeekDisplay() {
  state.selectedWeek = parseInt(weekRangeSliderEl.value, 10);
  if (weekDisplayTitleEl) weekDisplayTitleEl.textContent = `Week ${state.selectedWeek}`;
  if (weekDateRangeEl) weekDateRangeEl.textContent = getWeekDateRangeStr(state.selectedWeek);

  if (seasonBtns) {
    seasonBtns.forEach(btn => {
      const w = parseInt(btn.dataset.week, 10);
      if (Math.abs(w - state.selectedWeek) <= 6) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }
}

function setupLocationSearch() {
  if (!locationSearchInputEl) return;

  const handleSearch = (q) => {
    if (!q || q.length < 2) {
      if (locationDropdownResultsEl) locationDropdownResultsEl.style.display = 'none';
      if (btnClearLocationEl) btnClearLocationEl.style.display = 'none';
      return;
    }

    if (btnClearLocationEl) btnClearLocationEl.style.display = 'block';

    const matches = BUILTIN_CITIES.filter(c => 
      c.name.toLowerCase().includes(q.toLowerCase()) || 
      c.country.toLowerCase().includes(q.toLowerCase())
    );

    if (locationDropdownResultsEl) {
      if (matches.length > 0) {
        locationDropdownResultsEl.innerHTML = matches.map(c => `
          <div class="location-dropdown-item" data-region="${c.regionId}" data-name="${c.name}, ${c.country}">
            <b>${c.name}</b>, ${c.country}
          </div>
        `).join('');
        locationDropdownResultsEl.style.display = 'block';
      } else {
        locationDropdownResultsEl.innerHTML = `
          <div class="location-dropdown-item" style="color: var(--muted); cursor: default;">
            Press Enter to geocode "${q}" via OpenStreetMap...
          </div>`;
        locationDropdownResultsEl.style.display = 'block';
      }
    }
  };

  locationSearchInputEl.addEventListener('input', (e) => handleSearch(e.target.value));

  if (btnClearLocationEl) {
    btnClearLocationEl.addEventListener('click', () => {
      locationSearchInputEl.value = '';
      locationDropdownResultsEl.style.display = 'none';
      btnClearLocationEl.style.display = 'none';
    });
  }

  if (locationDropdownResultsEl) {
    locationDropdownResultsEl.addEventListener('click', (e) => {
      const item = e.target.closest('.location-dropdown-item');
      if (!item || !item.dataset.region) return;

      state.selectedRegion = item.dataset.region;
      localStorage.setItem('your_basket_region', state.selectedRegion);
      if (selectRegionEl) selectRegionEl.value = state.selectedRegion;
      locationSearchInputEl.value = item.dataset.name || '';
      locationDropdownResultsEl.style.display = 'none';
      renderApp();
    });
  }

  if (btnGeolocateEl) {
    btnGeolocateEl.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }
      btnGeolocateEl.textContent = 'Detecting...';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const regionId = mapCoordinatesToRegion(pos.coords.latitude, pos.coords.longitude);
          state.selectedRegion = regionId;
          localStorage.setItem('your_basket_region', state.selectedRegion);
          if (selectRegionEl) selectRegionEl.value = state.selectedRegion;
          btnGeolocateEl.textContent = 'Locate Me';
          if (locationSearchInputEl) locationSearchInputEl.value = 'Detected Geolocation';
          renderApp();
        },
        () => {
          btnGeolocateEl.textContent = 'Locate Me';
          alert('Could not retrieve your location.');
        }
      );
    });
  }
}

// How to Contribute Modal logic & JSON generator helper
function setupContributionModal() {
  if (btnOpenContributeEl && modalContributeOverlayEl) {
    btnOpenContributeEl.addEventListener('click', () => {
      modalContributeOverlayEl.classList.add('open');
    });
  }

  if (btnCloseContributeEl && modalContributeOverlayEl) {
    btnCloseContributeEl.addEventListener('click', () => {
      modalContributeOverlayEl.classList.remove('open');
    });
  }

  if (modalContributeOverlayEl) {
    modalContributeOverlayEl.addEventListener('click', (e) => {
      if (e.target === modalContributeOverlayEl) modalContributeOverlayEl.classList.remove('open');
    });
  }

  if (btnGenerateJsonEl) {
    btnGenerateJsonEl.addEventListener('click', () => {
      const id = (document.getElementById('contrib-id').value || 'new-produce').trim();
      const name = (document.getElementById('contrib-name').value || 'New Produce').trim();
      const latinName = (document.getElementById('contrib-latin').value || '').trim();
      const category = document.getElementById('contrib-category').value;
      const image = (document.getElementById('contrib-image').value || FALLBACK_PRODUCE_IMG).trim();
      const nutrition = (document.getElementById('contrib-nutrition').value || 'Rich in essential nutrients.').trim();
      const storageTip = (document.getElementById('contrib-storage').value || 'Store in a cool dry place.').trim();
      const pairsRaw = document.getElementById('contrib-pairs').value || '';
      const pairs = pairsRaw.split(',').map(s => s.trim()).filter(Boolean);

      const checkedRegions = Array.from(document.querySelectorAll('#contrib-regions input:checked')).map(cb => cb.value);

      const parseWeeks = (str) => {
        if (!str) return [];
        const result = [];
        const parts = str.split(',');
        parts.forEach(p => {
          if (p.includes('-')) {
            const [start, end] = p.split('-').map(n => parseInt(n.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              if (start <= end) {
                for (let w = start; w <= end; w++) result.push(w);
              } else {
                for (let w = start; w <= 52; w++) result.push(w);
                for (let w = 1; w <= end; w++) result.push(w);
              }
            }
          } else {
            const num = parseInt(p.trim(), 10);
            if (!isNaN(num)) result.push(num);
          }
        });
        return [...new Set(result)].sort((a, b) => a - b);
      };

      const harvestWeeks = parseWeeks(document.getElementById('contrib-harvest').value || '20-30');
      const peakWeeks = parseWeeks(document.getElementById('contrib-peak').value || '22-26');

      const entry = {
        id,
        name,
        latinName,
        category,
        image,
        regions: checkedRegions.length > 0 ? checkedRegions : ['we_eu'],
        harvestWeeks,
        peakWeeks,
        storageWeeks: [],
        nutrition,
        carbonRating: 'A+',
        storageTip,
        culinaryPairs: pairs.length > 0 ? pairs : ['Olive Oil', 'Sea Salt']
      };

      const jsonStr = JSON.stringify(entry, null, 2);
      if (jsonOutputCodeEl) jsonOutputCodeEl.textContent = jsonStr;
      if (jsonOutputWrapEl) jsonOutputWrapEl.style.display = 'block';
      if (btnCopyJsonEl) btnCopyJsonEl.style.display = 'inline-block';
    });
  }

  if (btnCopyJsonEl) {
    btnCopyJsonEl.addEventListener('click', () => {
      if (!jsonOutputCodeEl) return;
      navigator.clipboard.writeText(jsonOutputCodeEl.textContent).then(() => {
        btnCopyJsonEl.textContent = 'Copied to Clipboard!';
        setTimeout(() => { btnCopyJsonEl.textContent = 'Copy JSON to Clipboard'; }, 2000);
      });
    });
  }
}

function setupEventListeners() {
  if (selectRegionEl) {
    selectRegionEl.addEventListener('change', (e) => {
      state.selectedRegion = e.target.value;
      localStorage.setItem('your_basket_region', state.selectedRegion);
      renderApp();
    });
  }

  if (weekRangeSliderEl) {
    weekRangeSliderEl.addEventListener('input', () => {
      updateWeekDisplay();
      renderApp();
    });
  }

  if (btnCurrentWeekEl) {
    btnCurrentWeekEl.addEventListener('click', () => {
      state.selectedWeek = getISOWeek(new Date());
      if (weekRangeSliderEl) weekRangeSliderEl.value = state.selectedWeek;
      updateWeekDisplay();
      renderApp();
    });
  }

  if (seasonBtns) {
    seasonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.dataset.week, 10);
        state.selectedWeek = w;
        if (weekRangeSliderEl) weekRangeSliderEl.value = w;
        updateWeekDisplay();
        renderApp();
      });
    });
  }

  if (categoryChipsEl) {
    categoryChipsEl.addEventListener('click', (e) => {
      const chipBtn = e.target.closest('.chip');
      if (!chipBtn) return;

      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chipBtn.classList.add('active');
      state.selectedCategory = chipBtn.dataset.category;
      renderApp();
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderApp();
    });
  }

  if (btnViewVisualEl) {
    btnViewVisualEl.addEventListener('click', () => {
      btnViewVisualEl.classList.add('active');
      if (btnViewCompactEl) btnViewCompactEl.classList.remove('active');
      state.activeView = 'visual';
      renderApp();
    });
  }

  if (btnViewCompactEl) {
    btnViewCompactEl.addEventListener('click', () => {
      btnViewCompactEl.classList.add('active');
      if (btnViewVisualEl) btnViewVisualEl.classList.remove('active');
      state.activeView = 'compact';
      renderApp();
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-add-basket')) {
      const btn = e.target.closest('.btn-add-basket');
      const id = btn.dataset.id;
      state.myBasket[id] = (state.myBasket[id] || 0) + 1;
      saveBasket();
      renderApp();
      if (drawerOverlayEl && drawerOverlayEl.classList.contains('open')) renderBasketDrawer();
    }

    if (e.target.closest('.btn-detail')) {
      const btn = e.target.closest('.btn-detail');
      openDetailModal(btn.dataset.id);
    }

    if (e.target.classList.contains('btn-qty-inc')) {
      const id = e.target.dataset.id;
      state.myBasket[id] = (state.myBasket[id] || 0) + 1;
      saveBasket();
      renderApp();
      if (drawerOverlayEl && drawerOverlayEl.classList.contains('open')) renderBasketDrawer();
    }

    if (e.target.classList.contains('btn-qty-dec')) {
      const id = e.target.dataset.id;
      if (state.myBasket[id] > 1) {
        state.myBasket[id] -= 1;
      } else {
        delete state.myBasket[id];
      }
      saveBasket();
      renderApp();
      if (drawerOverlayEl && drawerOverlayEl.classList.contains('open')) renderBasketDrawer();
    }

    if (e.target.classList.contains('compact-chk')) {
      const id = e.target.dataset.id;
      if (e.target.checked) {
        state.myBasket[id] = 1;
      } else {
        delete state.myBasket[id];
      }
      saveBasket();
      renderApp();
    }
  });

  if (btnCloseDetailEl && modalDetailOverlayEl) {
    btnCloseDetailEl.addEventListener('click', () => modalDetailOverlayEl.classList.remove('open'));
  }
  if (btnOpenRecipesEl) btnOpenRecipesEl.addEventListener('click', openRecipesModal);
  if (btnCloseRecipesEl && modalRecipesOverlayEl) {
    btnCloseRecipesEl.addEventListener('click', () => modalRecipesOverlayEl.classList.remove('open'));
  }

  if (btnOpenDrawerEl && drawerOverlayEl) {
    btnOpenDrawerEl.addEventListener('click', () => {
      renderBasketDrawer();
      drawerOverlayEl.classList.add('open');
    });
  }

  if (btnCloseDrawerEl && drawerOverlayEl) {
    btnCloseDrawerEl.addEventListener('click', () => drawerOverlayEl.classList.remove('open'));
  }

  if (btnDrawerClearEl) {
    btnDrawerClearEl.addEventListener('click', () => {
      state.myBasket = {};
      saveBasket();
      renderApp();
      renderBasketDrawer();
    });
  }

  if (modalDetailOverlayEl) {
    modalDetailOverlayEl.addEventListener('click', (e) => {
      if (e.target === modalDetailOverlayEl) modalDetailOverlayEl.classList.remove('open');
    });
  }
  if (modalRecipesOverlayEl) {
    modalRecipesOverlayEl.addEventListener('click', (e) => {
      if (e.target === modalRecipesOverlayEl) modalRecipesOverlayEl.classList.remove('open');
    });
  }
  if (drawerOverlayEl) {
    drawerOverlayEl.addEventListener('click', (e) => {
      if (e.target === drawerOverlayEl) drawerOverlayEl.classList.remove('open');
    });
  }

  const handlePrint = () => {
    if (state.activeView !== 'compact') {
      state.activeView = 'compact';
      if (btnViewCompactEl) btnViewCompactEl.classList.add('active');
      if (btnViewVisualEl) btnViewVisualEl.classList.remove('active');
      renderApp();
    }
    window.print();
  };

  if (btnPrintActionEl) btnPrintActionEl.addEventListener('click', handlePrint);
  if (btnCompactPrintEl) btnCompactPrintEl.addEventListener('click', handlePrint);
  if (btnDrawerPrintEl) btnDrawerPrintEl.addEventListener('click', handlePrint);
}

// Start app on DOMContentLoaded or immediate execution if DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
