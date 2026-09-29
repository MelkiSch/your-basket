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
  { id: 'us_ne', name: 'US Northeast & Midwest (NY, MA, IL, PA)', lat: 41.8 },
  { id: 'us_wc', name: 'US West Coast & Pacific NW (WA, OR, CA North)', lat: 45.5 },
  { id: 'us_ca', name: 'US Sunbelt & California South', lat: 34.0 }
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
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, regionId: 'uk_ie' },
  { name: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426, regionId: 'uk_ie' },
  { name: 'Edinburgh', country: 'United Kingdom', lat: 55.9533, lon: -3.1883, regionId: 'uk_ie' },
  { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603, regionId: 'uk_ie' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, regionId: 'med_eu' },
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734, regionId: 'med_eu' },
  { name: 'Seville', country: 'Spain', lat: 37.3891, lon: -5.9845, regionId: 'med_eu' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, regionId: 'med_eu' },
  { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.1900, regionId: 'med_eu' },
  { name: 'Florence', country: 'Italy', lat: 43.7696, lon: 11.2558, regionId: 'med_eu' },
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
  { name: 'Portland', country: 'United States', lat: 45.5152, lon: -122.6784, regionId: 'us_wc' },
  { name: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194, regionId: 'us_ca' },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, regionId: 'us_ca' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, regionId: 'us_ne' },
  { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, regionId: 'us_wc' }
];

function mapCoordinatesToRegion(lat, lon) {
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
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
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
    regions: ['we_eu', 'nordic'],
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
    id: 'strawberry',
    name: 'Field Strawberries',
    latinName: 'Fragaria × ananassa',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
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
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
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
    id: 'radish',
    name: 'Spring Radish',
    latinName: 'Raphanus sativus',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [18, 19, 20, 21, 22],
    storageWeeks: [],
    nutrition: 'High in sulforaphane, glucosinolates, and crisp hydration.',
    carbonRating: 'A+',
    storageTip: 'Remove greens immediately to retain root moisture, store in cold water in fridge.',
    culinaryPairs: ['Salted Butter', 'Crusty Bread', 'Sea Salt', 'Chives', 'Goat Cheese'],
    funFact: 'Radishes mature in as little as 3 weeks from seed to table!',
    prepTips: 'Serve sliced thinly on buttered sourdough bread with flaky sea salt.'
  },
  {
    id: 'peas-english',
    name: 'Sweet Garden Peas',
    latinName: 'Pisum sativum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    peakWeeks: [23, 24, 25, 26, 27],
    storageWeeks: [],
    nutrition: 'Abundant plant protein, fiber, lutein, and zeaxanthin for eye health.',
    carbonRating: 'A+',
    storageTip: 'Pods convert sugar to starch rapidly post-harvest; shell and eat quickly.',
    culinaryPairs: ['Fresh Mint', 'Butter', 'Pancetta', 'Ricotta', 'Lemon'],
    funFact: 'Gregor Mendel established the laws of inheritance studying pea pod traits in his monastery garden.',
    prepTips: 'Blanch in boiling salted water for just 90 seconds then shock in ice water.'
  },
  {
    id: 'zucchini',
    name: 'Courgette / Zucchini',
    latinName: 'Cucurbita pepo',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    peakWeeks: [27, 28, 29, 30, 31, 32, 33],
    storageWeeks: [],
    nutrition: 'Low calorie, rich in carotenoids (lutein, beta-carotene) and Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'Store dry in crisper drawer for up to 1 week. Avoid moisture condensation.',
    culinaryPairs: ['Garlic', 'Olive Oil', 'Basil', 'Tomatoes', 'Feta', 'Parmesan'],
    funFact: 'Courgette flowers (blossoms) are edible delicacies often stuffed with ricotta and fried.',
    prepTips: 'Salting sliced zucchini for 15 minutes draws out excess water for crisp sautéing.'
  },
  {
    id: 'tomato-heritage',
    name: 'Heritage Tomatoes',
    latinName: 'Solanum lycopersicum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
    peakWeeks: [30, 31, 32, 33, 34, 35, 36, 37],
    storageWeeks: [],
    nutrition: 'Superb source of Lycopene, Vitamin C, Potassium, and Vitamin K.',
    carbonRating: 'A+',
    storageTip: 'NEVER refrigerate raw tomatoes! Store stem-side down at room temperature to preserve flavor.',
    culinaryPairs: ['Fresh Basil', 'Extra Virgin Olive Oil', 'Mozzarella di Bufala', 'Sea Salt', 'Garlic'],
    funFact: 'Refrigeration inactivates the genes that produce tomato flavor enzymes.',
    prepTips: 'Slice with a serrated knife and sprinkle with sea salt 5 minutes before serving.'
  },
  {
    id: 'eggplant',
    name: 'Aubergine / Eggplant',
    latinName: 'Solanum melongena',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [31, 32, 33, 34, 35, 36],
    storageWeeks: [],
    nutrition: 'Loaded with Nasunin (a potent brain-cell membrane antioxidant in purple skin).',
    carbonRating: 'A+',
    storageTip: 'Keep in a cool dark pantry (~10-12°C) or front of fridge for up to 5 days.',
    culinaryPairs: ['Tahini', 'Garlic', 'Olive Oil', 'Tomatoes', 'Miso', 'Oregano'],
    funFact: 'Botanically a berry! The name "eggplant" arose because 18th-century cultivars were small and white.',
    prepTips: 'Roast whole until collapsed and smoky for baba ganoush or ratatouille.'
  },
  {
    id: 'cherry',
    name: 'Sweet Cherries',
    latinName: 'Prunus avium',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [23, 24, 25, 26, 27, 28, 29, 30],
    peakWeeks: [25, 26, 27, 28],
    storageWeeks: [],
    nutrition: 'Contains natural melatonin (promotes sleep regulation) and anthocyanin anti-inflammatories.',
    carbonRating: 'A+',
    storageTip: 'Keep cold with stems attached. Wash right before eating.',
    culinaryPairs: ['Dark Chocolate', 'Almonds', 'Kirsch', 'Duck Breast', 'Mascarpone'],
    funFact: 'A single mature cherry tree can yield up to 7,000 cherries in a single brief season!',
    prepTips: 'Pit easily by placing cherry over a bottle neck and poking through with a chopstick.'
  },
  {
    id: 'raspberry',
    name: 'Summer Raspberries',
    latinName: 'Rubus idaeus',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    peakWeeks: [26, 27, 28, 29, 34, 35],
    storageWeeks: [],
    nutrition: 'One of the highest dietary fiber fruits (8g per cup) + Vitamin C and manganese.',
    carbonRating: 'A+',
    storageTip: 'Extremely delicate. Arrange single layer on paper towel in fridge for 2-3 days max.',
    culinaryPairs: ['Peach', 'Vanilla', 'Dark Chocolate', 'Hazelnuts', 'Goat Yogurt'],
    funFact: 'Each individual bump on a raspberry is called a drupelet, containing its own tiny seed.',
    prepTips: 'Gently rinse under mist spray immediately prior to serving.'
  },
  {
    id: 'peach-nectarine',
    name: 'Yellow Peaches & Nectarines',
    latinName: 'Prunus persica',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    peakWeeks: [29, 30, 31, 32, 33, 34],
    storageWeeks: [],
    nutrition: 'Abundant in Vitamin A (beta-carotene), Vitamin C, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Ripen at room temperature stem-side down. Refrigerate only once soft.',
    culinaryPairs: ['Prosciutto', 'Burrata', 'Basil', 'Amaretto', 'Honey'],
    funFact: 'A nectarine is genetically identical to a peach except for a single recessive gene.',
    prepTips: 'Grill halves over medium heat for 3 minutes to caramelize natural sugars.'
  },
  {
    id: 'fig-fresh',
    name: 'Fresh Black & Green Figs',
    latinName: 'Ficus carica',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1601379698565-683a48e42f9e?auto=format&fit=crop&w=600&q=80',
    regions: ['med_eu', 'we_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [23, 24, 25, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    peakWeeks: [35, 36, 37, 38, 39],
    storageWeeks: [],
    nutrition: 'High dietary calcium, copper, magnesium, and prebiotic digestive enzymes.',
    carbonRating: 'A+',
    storageTip: 'Eat within 2 days of picking. Extremely perishable at room temp.',
    culinaryPairs: ['Blue Cheese / Gorgonzola', 'Walnuts', 'Honey', 'Balsamic Glaze', 'Prosciutto'],
    funFact: 'Botanically an inverted flower cluster (syconium).',
    prepTips: 'Quarter from the top without cutting through base and fill with goat cheese.'
  },
  {
    id: 'chanterelle',
    name: 'Golden Chanterelles',
    latinName: 'Cantharellus cibarius',
    category: 'herb',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'nordic', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [34, 35, 36, 37, 38, 39, 40],
    storageWeeks: [],
    nutrition: 'One of the richest natural non-animal sources of Vitamin D2 + iron and copper.',
    carbonRating: 'A+',
    storageTip: 'Keep dry in a breathable paper bag in fridge for up to 1 week. Never in plastic!',
    culinaryPairs: ['Butter', 'Shallots', 'Heavy Cream', 'Parsley', 'Tagliatelle'],
    funFact: 'Chanterelles form mycorrhizal partnerships with living tree roots and cannot be cultivated.',
    prepTips: 'Brush off dirt dry with a pastry brush instead of washing with water.'
  },
  {
    id: 'porcini',
    name: 'Wild Cèpe / Porcini',
    latinName: 'Boletus edulis',
    category: 'herb',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'nordic', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [],
    nutrition: 'Packed with umami glutamate, ergothioneine, and selenium.',
    carbonRating: 'A+',
    storageTip: 'Store in paper bag. Slice and dry surplus for long-term pantry storage.',
    culinaryPairs: ['Risotto Rice', 'Garlic', 'Thyme', 'Parmesan', 'Olive Oil'],
    funFact: 'Italian name "Porcini" translates to "piglets" due to their plump stems.',
    prepTips: 'Sauté in hot pan with oil first to evaporate moisture, then add butter and garlic.'
  },
  {
    id: 'apple-autumn',
    name: 'Main Crop Apples (Boskoop, Gala, Honeycrisp)',
    latinName: 'Malus domestica',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [39, 40, 41, 42, 43],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    nutrition: 'Pectin fiber regulates blood sugar; high concentration of polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Store in cool cellar (2-4°C) with high humidity. Keep away from potatoes.',
    culinaryPairs: ['Salted Caramel', 'Cinnamon', 'Butter Crust', 'Calvados', 'Cabbage'],
    funFact: 'Traditional apple cellars keep apples fresh for 6+ months.',
    prepTips: 'Bake whole stuffed with raisins, walnuts, and butter.'
  },
  {
    id: 'pear-conference',
    name: 'Conference & Autumn Pears',
    latinName: 'Pyrus communis',
    category: 'fruit',
    image: 'https://images.unsplash.com/photo-1514756331096-5c0f07657ad6?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    nutrition: 'High hypoallergenic fiber, copper, Vitamin C, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Pears ripen from the inside out! Check neck softness with thumb press.',
    culinaryPairs: ['Roquefort / Gorgonzola', 'Walnuts', 'Red Wine', 'Arugula / Rocket', 'Honey'],
    funFact: 'Conference pear was winner of the British Pear Conference in 1885.',
    prepTips: 'Poach whole in red wine, star anise, and cinnamon stick.'
  },
  {
    id: 'pumpkin-hokkaido',
    name: 'Hokkaido / Red Kuri Squash',
    latinName: 'Cucurbita maxima',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nutrition: 'Huge Vitamin A concentration (beta-carotene), potassium, fiber.',
    carbonRating: 'A+',
    storageTip: 'Store in dry place at 10-15°C with stem attached. Will keep up to 5 months.',
    culinaryPairs: ['Nutmeg', 'Coconut Milk', 'Ginger', 'Sage', 'Chestnuts', 'Parmesan'],
    funFact: 'Red Kuri skin is thin and completely edible when cooked.',
    prepTips: 'Roast wedges skin-on with olive oil, sea salt, and fresh sage leaves.'
  },
  {
    id: 'walnut-fresh',
    name: 'Fresh "Green" & Dry Walnuts',
    latinName: 'Juglans regia',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    nutrition: 'Highest plant Alpha-Linolenic Acid (ALA) omega-3 fatty acids of all nuts.',
    carbonRating: 'A+',
    storageTip: 'Fresh green walnuts must be eaten within days; dried walnuts keep for 1 year.',
    culinaryPairs: ['Roquefort', 'Pears', 'Honey', 'Endive', 'Balsamic'],
    funFact: 'Freshly harvested "wet" walnuts in autumn have a creamy, delicate taste.',
    prepTips: 'Peel yellow skin of fresh autumn walnuts to reveal sweet white kernels.'
  },
  {
    id: 'chestnut',
    name: 'Sweet Chestnuts (Marrons)',
    latinName: 'Castanea sativa',
    category: 'nut',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    peakWeeks: [42, 43, 44, 45, 46],
    storageWeeks: [50, 51, 52, 1, 2, 3],
    nutrition: 'Unlike other nuts, low in fat (99% starch & fiber) and rich in Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'Store in breathable bag in fridge up to 3 weeks. Do not let dry out.',
    culinaryPairs: ['Roast Brussels Sprouts', 'Bacon', 'Vanilla', 'Game Birds', 'Red Wine'],
    funFact: 'Known as the "bread tree" in mountainous Southern Europe.',
    prepTips: 'Cut an "X" on the flat side of shell before roasting at 200°C for 20 minutes.'
  },
  {
    id: 'brussels-sprouts',
    name: 'Frost-Kissed Brussels Sprouts',
    latinName: 'Brassica oleracea var. gemmifera',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1438118991616-0034a4604bb7?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [],
    nutrition: 'Massive Vitamin K content (250% DV), glucosinolates, and Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'If bought on stalk, leave attached in cold pantry for maximum fresh longevity.',
    culinaryPairs: ['Chestnuts', 'Pancetta', 'Balsamic Reduction', 'Parmesan', 'Walnuts'],
    funFact: 'Freezing autumn frost converts leaf starches to natural sugars!',
    prepTips: 'Halve and high-heat roast cut side down until deeply caramelized.'
  },
  {
    id: 'kale-lacinato',
    name: 'Cavolo Nero / Tuscan Kale',
    latinName: 'Brassica oleracea var. palmifolia',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1524179091875-bf98a9a6ae67?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4],
    storageWeeks: [],
    nutrition: 'Powerhouse nutrient index: Vitamin K, Vitamin A, Calcium, and Chlorophyll.',
    carbonRating: 'A+',
    storageTip: 'Store leaves wrapped in dry paper towel inside sealed bag in fridge crisper up to 1 week.',
    culinaryPairs: ['Cannellini Beans', 'Garlic', 'Olive Oil', 'Chorizo', 'Parmesan Crusts'],
    funFact: 'In Tuscany, Cavolo Nero is the essential spine of Ribollita bread soup.',
    prepTips: 'Strip leaves off fibrous center stem, strip and massage raw leaves with olive oil.'
  },
  {
    id: 'parsnip',
    name: 'Winter Parsnips',
    latinName: 'Pastinaca sativa',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [13, 14, 15, 16, 17, 18],
    nutrition: 'High soluble fiber, falcarinol antioxidant, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Keep in cold sand cellar or vegetable drawer for months.',
    culinaryPairs: ['Honey', 'Whole Grain Mustard', 'Roast Beef', 'Nutmeg', 'Thyme'],
    funFact: 'Before cane sugar was imported to Europe, parsnips were used as a primary sweetener.',
    prepTips: 'Roast with honey and coarse grain mustard until edges turn golden brown.'
  },
  {
    id: 'carrot-heritage',
    name: 'Main Crop & Heritage Carrots',
    latinName: 'Daucus carota subsp. sativus',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1447175008436-08417090e1f3?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    nutrition: 'Premier source of Beta-carotene (Vitamin A precursor), lutein, and biotin.',
    carbonRating: 'A+',
    storageTip: 'Cut off green tops to stop roots drying out. Keep in water bath in fridge.',
    culinaryPairs: ['Cumin', 'Coriander', 'Butter', 'Honey', 'Tarragon'],
    funFact: 'Original carrots were purple or yellow!',
    prepTips: 'Roast whole with cumin seeds and maple syrup.'
  },
  {
    id: 'chicory-witloof',
    name: 'Belgian Endive / Chicon / Witloof',
    latinName: 'Cichorium intybus var. foliosum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a67?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'uk_ie'],
    harvestWeeks: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8],
    storageWeeks: [],
    nutrition: 'Intense bitter compounds (intybin) stimulate liver bile digestion; high folate.',
    carbonRating: 'A+',
    storageTip: 'Keep stored in total darkness! Exposure to light turns leaves green and overly bitter.',
    culinaryPairs: ['Béchamel', 'Baked Ham', 'Gruyère Cheese', 'Walnuts', 'Blue Cheese', 'Oranges'],
    funFact: 'Discovered accidentally by a Belgian farmer in 1830 who stored roots in a dark cellar.',
    prepTips: 'Braise whole in butter, sugar, and lemon juice then wrap in ham, top with béchamel & cheese.'
  },
  {
    id: 'basil-sweet',
    name: 'Sweet Genovese Basil',
    latinName: 'Ocimum basilicum',
    category: 'herb',
    image: 'https://images.unsplash.com/photo-1608683238690-349f7e527b14?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34],
    storageWeeks: [],
    nutrition: 'Rich in Eugenol essential oils, Vitamin K, and antibacterial flavonoids.',
    carbonRating: 'A+',
    storageTip: 'NEVER refrigerate basil! Keep stem ends in glass of water on kitchen counter.',
    culinaryPairs: ['Tomatoes', 'Pine Nuts', 'Parmesan / Pecorino', 'Garlic', 'Olive Oil'],
    funFact: 'Genovese Basil enjoys PDO (Protected Designation of Origin) status in Liguria.',
    prepTips: 'Tear or pound in mortar & pestle for pesto rather than chopping finely with steel blade.'
  },
  {
    id: 'rosemary-common',
    name: 'Perennial Rosemary',
    latinName: 'Salvia rosmarinus',
    category: 'herb',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=80',
    regions: ['med_eu', 'we_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    peakWeeks: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    storageWeeks: [],
    nutrition: 'Carnosic acid protects brain memory; powerful antimicrobial and antioxidant pinene.',
    carbonRating: 'A+',
    storageTip: 'Wrap in dry paper towel in crisper drawer for up to 3 weeks.',
    culinaryPairs: ['Roast Potatoes', 'Lamb Chops', 'Focaccia Bread', 'Garlic', 'Olive Oil'],
    funFact: 'Associated with remembrance since ancient Greece.',
    prepTips: 'Strip needle leaves backwards off woody stem, chop finely for focaccia topping.'
  },
  {
    id: 'garlic-spring',
    name: 'Fresh Green Garlic & Hardneck Garlic',
    latinName: 'Allium sativum',
    category: 'vegetable',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    peakWeeks: [24, 25, 26, 27, 28, 29, 30],
    storageWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    nutrition: 'Allicin organosulfur compound formed when crushed; cardiovascular & immune booster.',
    carbonRating: 'A+',
    storageTip: 'Store cured garlic in cool dark pantry in mesh bag. Never in fridge!',
    culinaryPairs: ['Olive Oil', 'Everything!'],
    funFact: 'Crushing garlic and letting it sit 10 minutes maximizes Allicin enzyme activation.',
    prepTips: 'Smash clove with flat of chef knife blade to pop skin off easily.'
  }
];

function getBasketProduce(regionId, weekNum, filterCategory = 'all', searchQuery = '') {
  const normSearch = searchQuery.trim().toLowerCase();

  return PRODUCE_DATA.filter(item => {
    if (!item.regions.includes(regionId)) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;

    if (normSearch.length > 0) {
      const matchName = item.name.toLowerCase().includes(normSearch);
      const matchLatin = item.latinName.toLowerCase().includes(normSearch);
      const matchPair = item.culinaryPairs.some(p => p.toLowerCase().includes(normSearch));
      const matchNutr = item.nutrition.toLowerCase().includes(normSearch);
      if (!matchName && !matchLatin && !matchPair && !matchNutr) return false;
    }

    const isHarvest = item.harvestWeeks.includes(weekNum);
    const isStorage = item.storageWeeks.includes(weekNum);

    return isHarvest || isStorage;
  }).map(item => {
    const isPeak = item.peakWeeks.includes(weekNum);
    const isHarvest = item.harvestWeeks.includes(weekNum);
    const isStorage = item.storageWeeks.includes(weekNum);

    let status = 'harvest';
    let statusText = 'Fresh Harvest';

    if (isPeak) {
      status = 'peak';
      statusText = 'Peak Fresh Harvest';
    } else if (isHarvest) {
      status = 'harvest';
      statusText = 'Fresh Harvest';
    } else if (isStorage) {
      status = 'storage';
      statusText = 'Stored Local Harvest';
    }

    return {
      ...item,
      currentStatus: status,
      currentStatusText: statusText
    };
  });
}

function getWeekDateRange(weekNum, year = 2026) {
  const simple = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + (8 - simple.getDay()));

  const ISOweekEnd = new Date(ISOweekStart);
  ISOweekEnd.setDate(ISOweekStart.getDate() + 6);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startMonth = months[ISOweekStart.getMonth()];
  const endMonth = months[ISOweekEnd.getMonth()];
  const startDate = ISOweekStart.getDate();
  const endDate = ISOweekEnd.getDate();

  if (startMonth === endMonth) return `${startMonth} ${startDate} – ${endDate}`;
  return `${startMonth} ${startDate} – ${endMonth} ${endDate}`;
}

function getCurrentWeekNumber() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return Math.min(Math.max(weekNo, 1), 52);
}

const SEASONAL_RECIPES = [
  {
    id: 'rec-1',
    title: 'Spring White & Green Asparagus Salad',
    time: '20 mins',
    difficulty: 'Easy',
    requiredProduce: ['asparagus-green', 'asparagus-white', 'radish', 'strawberry'],
    description: 'Blanched fresh local asparagus ribbons tossed with wild sliced strawberries, crunchy radishes, and a lemon chervil vinaigrette.',
    instructions: '1. Peel white asparagus stems. 2. Blanch green and white asparagus in salted water for 2 mins. 3. Shave radishes and strawberries thin. 4. Whisk olive oil, lemon juice, salt, pepper. 5. Combine and serve with shaved parmesan.'
  },
  {
    id: 'rec-2',
    title: 'Summer Heritage Tomato & Peach Caprese',
    time: '15 mins',
    difficulty: 'Easy',
    requiredProduce: ['tomato-heritage', 'peach-nectarine', 'basil-sweet'],
    description: 'Ripe sun-warmed heirloom tomatoes sliced with fresh summer peaches, creamy buffalo mozzarella, torn sweet basil, and aged balsamic glaze.',
    instructions: '1. Slice tomatoes and peaches into thick rounds. 2. Alternate slices with fresh mozzarella on a flat plater. 3. Scatter fresh basil leaves. 4. Drizzle generous extra virgin olive oil and thick balsamic reduction. Season with sea salt.'
  },
  {
    id: 'rec-3',
    title: 'Autumn Roasted Kuri Squash & Porcini Risotto',
    time: '35 mins',
    difficulty: 'Medium',
    requiredProduce: ['pumpkin-hokkaido', 'porcini', 'rosemary-common', 'garlic-spring'],
    description: 'Velvety autumn Arborio risotto folded with roasted sweet Hokkaido pumpkin cubes, pan-seared wild porcini mushrooms, and fresh rosemary.',
    instructions: '1. Roast pumpkin cubes at 200°C for 25 mins. 2. Sauté minced garlic and sliced porcini in butter. 3. Toast risotto rice in olive oil, ladle hot vegetable stock gradually until al dente. 4. Stir in roasted pumpkin, porcini, butter, and grated parmesan.'
  },
  {
    id: 'rec-4',
    title: 'Winter Braised Belgian Endive & Leek Gratin',
    time: '45 mins',
    difficulty: 'Medium',
    requiredProduce: ['chicory-witloof', 'leek', 'brussels-sprouts'],
    description: 'Classic Northern European comfort food: whole Belgian chicory endives braised in butter and lemon, wrapped in ham, topped with leek béchamel sauce and baked until bubbling.',
    instructions: '1. Braise whole chicory heads with butter, lemon juice, salt for 15 mins. 2. Soften chopped leeks in butter and make flour-milk béchamel. 3. Wrap chicory in ham, lay in baking dish, cover with leek sauce and Gruyère cheese. 4. Bake at 190°C for 25 mins until golden.'
  }
];

// --- APPLICATION STATE ---
let savedLocation = null;
try {
  savedLocation = JSON.parse(localStorage.getItem('your_basket_location') || 'null');
} catch (e) {
  savedLocation = null;
}

const state = {
  selectedRegion: savedLocation ? savedLocation.regionId : 'we_eu',
  customLocationName: savedLocation ? savedLocation.name : '',
  selectedWeek: getCurrentWeekNumber() || 39,
  selectedCategory: 'all',
  searchQuery: '',
  activeView: 'visual',
  myBasket: JSON.parse(localStorage.getItem('your_basket_items') || '{}')
};

// --- DOM REFERENCES ---
let locationSearchInputEl, locationDropdownResultsEl, btnClearLocationEl, selectRegionEl, btnGeolocateEl;
let weekRangeSliderEl, weekDisplayTitleEl, weekDateRangeEl, btnCurrentWeekEl, categoryChipsEl, searchInputEl;
let btnViewVisualEl, btnViewCompactEl, bannerRegionNameEl, bannerWeekNameEl, bannerCountEl;
let visualViewContainerEl, compactViewContainerEl, compactTableBodyWrapEl, compactPrintableMetaEl;
let modalDetailOverlayEl, modalDetailContentEl, btnCloseDetailEl;
let modalRecipesOverlayEl, modalRecipesContentEl, btnOpenRecipesEl, btnCloseRecipesEl;
let drawerOverlayEl, drawerBasketItemsEl, drawerTotalCountEl, drawerCarbonSavingEl, btnOpenDrawerEl, btnCloseDrawerEl, basketBadgeCountEl, btnDrawerClearEl;
let btnPrintActionEl, btnCompactPrintEl, btnDrawerPrintEl, printHeaderMetaEl;

let searchDebounceTimer = null;

// --- INITIALIZATION ---
function initApp() {
  locationSearchInputEl = document.getElementById('location-search-input');
  locationDropdownResultsEl = document.getElementById('location-dropdown-results');
  btnClearLocationEl = document.getElementById('btn-clear-location');
  selectRegionEl = document.getElementById('select-region');
  btnGeolocateEl = document.getElementById('btn-geolocate');

  weekRangeSliderEl = document.getElementById('week-range-slider');
  weekDisplayTitleEl = document.getElementById('week-display-title');
  weekDateRangeEl = document.getElementById('week-date-range');
  btnCurrentWeekEl = document.getElementById('btn-current-week');
  categoryChipsEl = document.getElementById('category-chips');
  searchInputEl = document.getElementById('search-input');
  btnViewVisualEl = document.getElementById('btn-view-visual');
  btnViewCompactEl = document.getElementById('btn-view-compact');
  bannerRegionNameEl = document.getElementById('banner-region-name');
  bannerWeekNameEl = document.getElementById('banner-week-name');
  bannerCountEl = document.getElementById('banner-count');

  visualViewContainerEl = document.getElementById('visual-view-container');
  compactViewContainerEl = document.getElementById('compact-view-container');
  compactTableBodyWrapEl = document.getElementById('compact-table-body-wrap');
  compactPrintableMetaEl = document.getElementById('compact-printable-meta');

  modalDetailOverlayEl = document.getElementById('modal-detail-overlay');
  modalDetailContentEl = document.getElementById('modal-detail-content');
  btnCloseDetailEl = document.getElementById('btn-close-detail');

  modalRecipesOverlayEl = document.getElementById('modal-recipes-overlay');
  modalRecipesContentEl = document.getElementById('modal-recipes-content');
  btnOpenRecipesEl = document.getElementById('btn-open-recipes');
  btnCloseRecipesEl = document.getElementById('btn-close-recipes');

  drawerOverlayEl = document.getElementById('drawer-overlay');
  drawerBasketItemsEl = document.getElementById('drawer-basket-items');
  drawerTotalCountEl = document.getElementById('drawer-total-count');
  drawerCarbonSavingEl = document.getElementById('drawer-carbon-saving');
  btnOpenDrawerEl = document.getElementById('btn-open-drawer');
  btnCloseDrawerEl = document.getElementById('btn-close-drawer');
  basketBadgeCountEl = document.getElementById('basket-badge-count');
  btnDrawerClearEl = document.getElementById('btn-drawer-clear');

  btnPrintActionEl = document.getElementById('btn-print-action');
  btnCompactPrintEl = document.getElementById('btn-compact-print');
  btnDrawerPrintEl = document.getElementById('btn-drawer-print');
  printHeaderMetaEl = document.getElementById('print-header-meta');

  renderRegionOptions();
  renderCategoryChips();

  if (state.customLocationName && locationSearchInputEl) {
    locationSearchInputEl.value = state.customLocationName;
    if (btnClearLocationEl) btnClearLocationEl.style.display = 'block';
  }

  updateWeekUI(state.selectedWeek);
  attachEventListeners();
  renderApp();
}

// Render Region Select Options
function renderRegionOptions() {
  if (!selectRegionEl) return;
  selectRegionEl.innerHTML = REGIONS.map(r => `
    <option value="${r.id}" ${r.id === state.selectedRegion ? 'selected' : ''}>
      ${r.name}
    </option>
  `).join('');
}

// Render Category Filter Chips
function renderCategoryChips() {
  if (!categoryChipsEl) return;
  categoryChipsEl.innerHTML = CATEGORIES.map(c => `
    <button class="chip ${c.id === state.selectedCategory ? 'active' : ''}" data-category="${c.id}">
      ${c.name}
    </button>
  `).join('');
}

// Update Week Slider UI Text
function updateWeekUI(weekNum) {
  if (weekRangeSliderEl) weekRangeSliderEl.value = weekNum;
  if (weekDisplayTitleEl) weekDisplayTitleEl.textContent = `Week ${weekNum}`;
  const dateRangeStr = getWeekDateRange(weekNum);
  if (weekDateRangeEl) weekDateRangeEl.textContent = `(${dateRangeStr})`;

  const activeRegionObj = REGIONS.find(r => r.id === state.selectedRegion);
  const regionShortName = activeRegionObj ? activeRegionObj.name.split(' (')[0] : '';
  const displayLocation = state.customLocationName
    ? `${state.customLocationName} (${regionShortName})`
    : regionShortName;

  if (bannerRegionNameEl) bannerRegionNameEl.textContent = displayLocation;
  if (bannerWeekNameEl) bannerWeekNameEl.textContent = `Week ${weekNum} (${dateRangeStr})`;

  if (printHeaderMetaEl) {
    printHeaderMetaEl.textContent = `Location: ${displayLocation} | Week: ${weekNum} (${dateRangeStr}) | Date generated: Sep 2026`;
  }
}

// Save Location to LocalStorage
function saveLocation(name, regionId, lat, lon) {
  state.customLocationName = name;
  state.selectedRegion = regionId;
  localStorage.setItem('your_basket_location', JSON.stringify({ name, regionId, lat, lon }));
}

// Save Basket to LocalStorage
function saveBasket() {
  localStorage.setItem('your_basket_items', JSON.stringify(state.myBasket));
  updateBasketBadge();
}

// Update My Basket Badge Count
function updateBasketBadge() {
  const totalCount = Object.values(state.myBasket).reduce((sum, qty) => sum + qty, 0);
  if (basketBadgeCountEl) basketBadgeCountEl.textContent = totalCount;
  if (drawerTotalCountEl) drawerTotalCountEl.textContent = totalCount;
  if (drawerCarbonSavingEl) drawerCarbonSavingEl.textContent = `${(totalCount * 0.45).toFixed(1)} kg CO2e`;
}

// --- LOCATION SEARCH & GEOCODING ---
function handleLocationSearchInput(query) {
  const q = query.trim().toLowerCase();
  if (q.length === 0) {
    if (locationDropdownResultsEl) locationDropdownResultsEl.classList.remove('open');
    if (btnClearLocationEl) btnClearLocationEl.style.display = 'none';
    return;
  }

  if (btnClearLocationEl) btnClearLocationEl.style.display = 'block';

  // 1. Instant match against BUILTIN_CITIES database (0ms delay)
  const builtinMatches = BUILTIN_CITIES.filter(city =>
    city.name.toLowerCase().includes(q) || city.country.toLowerCase().includes(q)
  ).map(city => {
    const regionObj = REGIONS.find(r => r.id === city.regionId);
    return {
      displayName: `${city.name}, ${city.country}`,
      subText: `${city.lat.toFixed(2)}°N, ${city.lon.toFixed(2)}°E`,
      lat: city.lat,
      lon: city.lon,
      regionId: city.regionId,
      regionName: regionObj ? regionObj.name.split(' (')[0] : ''
    };
  });

  renderLocationDropdown(builtinMatches, true);

  // 2. Debounced API fetch to OpenStreetMap Nominatim for global coverage
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(async () => {
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=6`);
      if (!resp.ok) return;
      const data = await resp.json();

      const apiResults = data.map(item => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        const regionId = mapCoordinatesToRegion(lat, lon);
        const regionObj = REGIONS.find(r => r.id === regionId);

        return {
          displayName: item.display_name.split(',').slice(0, 3).join(','),
          subText: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`,
          lat,
          lon,
          regionId,
          regionName: regionObj ? regionObj.name.split(' (')[0] : ''
        };
      });

      const combined = [...builtinMatches];
      apiResults.forEach(res => {
        if (!combined.some(c => c.displayName.toLowerCase() === res.displayName.toLowerCase())) {
          combined.push(res);
        }
      });

      renderLocationDropdown(combined, false);
    } catch (err) {
      console.warn('Geocoding search error:', err);
    }
  }, 250);
}

function renderLocationDropdown(results) {
  if (!locationDropdownResultsEl) return;

  if (results.length === 0) {
    locationDropdownResultsEl.innerHTML = `
      <div style="padding: 12px 14px; font-size: 12px; color: var(--muted); text-align: center;">
        Searching global location database...
      </div>
    `;
    locationDropdownResultsEl.classList.add('open');
    return;
  }

  locationDropdownResultsEl.innerHTML = results.map(item => `
    <div class="location-item" data-name="${item.displayName}" data-region="${item.regionId}" data-lat="${item.lat}" data-lon="${item.lon}">
      <div>
        <div class="location-item-title">${item.displayName}</div>
        <div class="location-item-sub">${item.subText}</div>
      </div>
      <span class="location-item-zone">${item.regionName}</span>
    </div>
  `).join('');

  locationDropdownResultsEl.classList.add('open');
}

function selectLocation(name, regionId, lat, lon) {
  saveLocation(name, regionId, lat, lon);
  if (locationSearchInputEl) locationSearchInputEl.value = name;
  if (selectRegionEl) selectRegionEl.value = regionId;
  if (locationDropdownResultsEl) locationDropdownResultsEl.classList.remove('open');
  if (btnClearLocationEl) btnClearLocationEl.style.display = 'block';
  updateWeekUI(state.selectedWeek);
  renderApp();
}

// Main Render Function
function renderApp() {
  const produceList = getBasketProduce(
    state.selectedRegion,
    state.selectedWeek,
    state.selectedCategory,
    state.searchQuery
  );

  if (bannerCountEl) bannerCountEl.textContent = `${produceList.length} items local`;
  if (compactPrintableMetaEl) {
    compactPrintableMetaEl.textContent = `Showing ${produceList.length} local produce items available in Week ${state.selectedWeek} (${getWeekDateRange(state.selectedWeek)})`;
  }

  if (state.activeView === 'visual') {
    if (visualViewContainerEl) visualViewContainerEl.style.display = 'grid';
    if (compactViewContainerEl) compactViewContainerEl.style.display = 'none';
    renderVisualGrid(produceList);
  } else {
    if (visualViewContainerEl) visualViewContainerEl.style.display = 'none';
    if (compactViewContainerEl) compactViewContainerEl.style.display = 'block';
    renderCompactTable(produceList);
  }

  updateBasketBadge();
}

// --- Render Visual / Educative Card Grid ---
function renderVisualGrid(produceList) {
  if (!visualViewContainerEl) return;

  if (produceList.length === 0) {
    visualViewContainerEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--muted);">
        <h3 style="font-family: var(--font-serif); font-style: italic; font-size: 20px; color: var(--ink);">No local produce matched your filter</h3>
        <p style="font-size: 13px; margin-top: 6px;">Try adjusting your week slider, selecting another category, or clearing your search term.</p>
      </div>
    `;
    return;
  }

  visualViewContainerEl.innerHTML = produceList.map(item => {
    const isAdded = (state.myBasket[item.id] || 0) > 0;
    const qty = state.myBasket[item.id] || 0;

    const heatmapSegs = Array.from({ length: 52 }, (_, i) => {
      const w = i + 1;
      const isCurrent = w === state.selectedWeek;
      const isPeak = item.peakWeeks.includes(w);
      const isHarvest = item.harvestWeeks.includes(w);
      const isStorage = item.storageWeeks.includes(w);

      let cls = '';
      if (isPeak) cls = 'active-peak';
      else if (isHarvest) cls = 'active-harvest';
      else if (isStorage) cls = 'active-storage';

      if (isCurrent) cls += ' current-week';

      return `<div class="heatmap-seg ${cls}" title="Week ${w}"></div>`;
    }).join('');

    return `
      <div class="produce-card" data-id="${item.id}">
        <div class="card-media">
          <div class="card-badges">
            <span class="status-badge ${item.currentStatus}">
              ${item.currentStatusText}
            </span>
            <span class="carbon-badge">
              FOOTPRINT ${item.carbonRating}
            </span>
          </div>
          <img class="card-photo-hero" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
        </div>

        <div class="card-body">
          <div class="card-title-group">
            <h3 class="produce-name">${item.name}</h3>
            <span class="produce-latin">${item.latinName}</span>
          </div>

          <p class="card-nutrition">${item.nutrition}</p>

          <div class="heatmap-wrap">
            <div class="heatmap-label">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
            <div class="heatmap-bar">
              ${heatmapSegs}
            </div>
          </div>

          <div class="card-footer">
            <button class="btn btn-add-basket ${isAdded ? 'added' : ''}" data-id="${item.id}">
              ${isAdded ? `In Basket (${qty})` : '+ Add to Basket'}
            </button>
            <button class="btn btn-detail" data-id="${item.id}" title="Educational Info">
              Info
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Render Compact / Printable Table View ---
function renderCompactTable(produceList) {
  if (!compactTableBodyWrapEl) return;

  if (produceList.length === 0) {
    compactTableBodyWrapEl.innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--muted);">
        No produce found for the selected criteria.
      </div>
    `;
    return;
  }

  const grouped = {};
  CATEGORIES.forEach(c => {
    if (c.id !== 'all') grouped[c.id] = [];
  });

  produceList.forEach(item => {
    if (grouped[item.category]) {
      grouped[item.category].push(item);
    }
  });

  let html = '';

  CATEGORIES.forEach(cat => {
    if (cat.id === 'all') return;
    const items = grouped[cat.id];
    if (!items || items.length === 0) return;

    html += `
      <div class="category-group-header">
        ${cat.name} (${items.length})
      </div>
      <table class="compact-table">
        <thead>
          <tr>
            <th style="width: 40px;">Select</th>
            <th style="width: 240px;">Produce & Botanical</th>
            <th style="width: 130px;">Season Status</th>
            <th style="width: 140px;">Harvest Window</th>
            <th>Nutrition & Properties</th>
            <th style="width: 200px;">Storage Advice</th>
            <th style="width: 110px;" class="no-print">Qty Notes</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => {
            const qty = state.myBasket[item.id] || 0;
            const isChecked = qty > 0;
            const minWeek = Math.min(...item.harvestWeeks);
            const maxWeek = Math.max(...item.harvestWeeks);

            return `
              <tr>
                <td style="text-align: center;">
                  <input type="checkbox" class="compact-chk" data-id="${item.id}" ${isChecked ? 'checked' : ''}>
                </td>
                <td>
                  <div class="table-produce-cell">
                    <img class="table-photo-thumb" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
                    <div class="table-name-wrap">
                      <span class="table-name" style="font-family: var(--font-serif); font-style: italic; font-weight: 500;">${item.name}</span>
                      <span class="table-latin">${item.latinName}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="status-badge ${item.currentStatus}" style="font-size: 9.5px;">
                    ${item.currentStatusText}
                  </span>
                </td>
                <td style="font-size: 11.5px; font-weight: 500;">
                  Weeks ${minWeek} – ${maxWeek}
                </td>
                <td style="font-size: 12px; color: #444;">
                  ${item.nutrition}
                </td>
                <td style="font-size: 11.5px; color: var(--muted);">
                  ${item.storageTip}
                </td>
                <td class="no-print">
                  <div class="table-qty-control">
                    <button class="qty-btn btn-qty-dec" data-id="${item.id}">-</button>
                    <span class="qty-val">${qty}</span>
                    <button class="qty-btn btn-qty-inc" data-id="${item.id}">+</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  });

  compactTableBodyWrapEl.innerHTML = html;
}

// --- Render Educational Detail Modal ---
function openDetailModal(produceId) {
  const item = PRODUCE_DATA.find(p => p.id === produceId);
  if (!item || !modalDetailContentEl) return;

  const minWeek = Math.min(...item.harvestWeeks);
  const maxWeek = Math.max(...item.harvestWeeks);

  modalDetailContentEl.innerHTML = `
    <div class="detail-hero-box">
      <img class="detail-photo-hero" src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
      <div class="detail-title-group">
        <h3 style="font-family: var(--font-serif); font-style: italic; font-weight: 500; font-size: 24px; color: var(--accent);">${item.name}</h3>
        <div class="detail-latin">${item.latinName}</div>
        <div style="margin-top: 6px; display: flex; gap: 8px;">
          <span class="status-badge ${item.regions.includes(state.selectedRegion) ? 'peak' : 'storage'}">
            Harvest Season: Weeks ${minWeek} – ${maxWeek}
          </span>
          <span class="carbon-badge">
            FOOTPRINT ${item.carbonRating}
          </span>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Nutritional Profile & Benefits</div>
      <p style="font-size: 13.5px; color: #333;">${item.nutrition}</p>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Storage & Preservation Tip</div>
      <div style="background: var(--soft); padding: 12px 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent); font-size: 13px;">
        ${item.storageTip}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Culinary Pairings</div>
      <div class="pairs-tags">
        ${item.culinaryPairs.map(p => `<span class="pair-tag">${p}</span>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Preparation & Kitchen Guide</div>
      <p style="font-size: 13px; color: #444;">${item.prepTips}</p>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Botanical & Historical Lore</div>
      <p style="font-size: 13px; color: #555; font-style: italic;">"${item.funFact}"</p>
    </div>
  `;

  if (modalDetailOverlayEl) modalDetailOverlayEl.classList.add('open');
}

// --- Render Seasonal Recipes Modal ---
function openRecipesModal() {
  if (!modalRecipesContentEl) return;
  const activeProduceIds = Object.keys(state.myBasket);

  modalRecipesContentEl.innerHTML = SEASONAL_RECIPES.map(rec => {
    const matchedCount = rec.requiredProduce.filter(id => activeProduceIds.includes(id)).length;
    const isGoodMatch = matchedCount > 0;

    return `
      <div style="background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px; ${isGoodMatch ? 'border-color: var(--accent-border); background: var(--accent-bg);' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h4 style="font-family: var(--font-serif); font-style: italic; font-weight: 500; font-size: 18px; color: var(--accent);">${rec.title}</h4>
          <span style="font-size: 11px; padding: 2px 8px; background: var(--soft); border-radius: var(--radius-pill); border: 1px solid var(--line);">${rec.time} • ${rec.difficulty}</span>
        </div>
        <p style="font-size: 13px; margin: 8px 0; color: #444;">${rec.description}</p>
        <div style="font-size: 12px; color: var(--muted); margin-bottom: 8px;">
          <b>Key Produce Used:</b> ${rec.requiredProduce.map(id => {
            const p = PRODUCE_DATA.find(x => x.id === id);
            return p ? p.name : id;
          }).join(', ')}
        </div>
        <details style="font-size: 12.5px; color: #333; cursor: pointer;">
          <summary style="font-weight: 600; color: var(--accent);">View Step-by-Step Preparation</summary>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--line); line-height: 1.6;">
            ${rec.instructions}
          </div>
        </details>
      </div>
    `;
  }).join('');

  if (modalRecipesOverlayEl) modalRecipesOverlayEl.classList.add('open');
}

// --- Render My Basket Drawer ---
function renderBasketDrawer() {
  if (!drawerBasketItemsEl) return;
  const itemIds = Object.keys(state.myBasket);

  if (itemIds.length === 0) {
    drawerBasketItemsEl.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: var(--muted);">
        <h4 style="font-family: var(--font-serif); font-style: italic; font-size: 18px; color: var(--ink);">Your basket is currently empty</h4>
        <p style="font-size: 12.5px; margin-top: 4px;">Click "+ Add to Basket" on any local produce item to build your weekly harvest list.</p>
      </div>
    `;
    return;
  }

  drawerBasketItemsEl.innerHTML = itemIds.map(id => {
    const item = PRODUCE_DATA.find(p => p.id === id);
    if (!item) return '';
    const qty = state.myBasket[id];

    return `
      <div class="basket-item-row">
        <div class="basket-item-info">
          <img class="table-photo-thumb" src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCE_IMG}';">
          <div>
            <div style="font-family: var(--font-serif); font-style: italic; font-weight: 500; font-size: 13.5px;">${item.name}</div>
            <div style="font-size: 11px; color: var(--muted);">${item.latinName}</div>
          </div>
        </div>
        <div class="table-qty-control">
          <button class="qty-btn btn-qty-dec" data-id="${item.id}">-</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn btn-qty-inc" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
  }).join('');
}

// --- EVENT LISTENERS ---
function attachEventListeners() {
  if (locationSearchInputEl) {
    locationSearchInputEl.addEventListener('input', (e) => {
      handleLocationSearchInput(e.target.value);
    });

    locationSearchInputEl.addEventListener('focus', () => {
      if (locationSearchInputEl.value.trim().length > 0) {
        handleLocationSearchInput(locationSearchInputEl.value);
      }
    });
  }

  if (btnClearLocationEl) {
    btnClearLocationEl.addEventListener('click', () => {
      if (locationSearchInputEl) locationSearchInputEl.value = '';
      state.customLocationName = '';
      localStorage.removeItem('your_basket_location');
      if (locationDropdownResultsEl) locationDropdownResultsEl.classList.remove('open');
      btnClearLocationEl.style.display = 'none';
      updateWeekUI(state.selectedWeek);
      renderApp();
    });
  }

  if (locationDropdownResultsEl) {
    locationDropdownResultsEl.addEventListener('click', (e) => {
      const item = e.target.closest('.location-item');
      if (!item) return;

      const name = item.dataset.name;
      const regionId = item.dataset.region;
      const lat = parseFloat(item.dataset.lat);
      const lon = parseFloat(item.dataset.lon);

      selectLocation(name, regionId, lat, lon);
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.location-search-wrap') && locationDropdownResultsEl) {
      locationDropdownResultsEl.classList.remove('open');
    }
  });

  if (selectRegionEl) {
    selectRegionEl.addEventListener('change', (e) => {
      state.selectedRegion = e.target.value;
      state.customLocationName = '';
      if (locationSearchInputEl) locationSearchInputEl.value = '';
      localStorage.removeItem('your_basket_location');
      if (btnClearLocationEl) btnClearLocationEl.style.display = 'none';
      updateWeekUI(state.selectedWeek);
      renderApp();
    });
  }

  if (btnGeolocateEl) {
    btnGeolocateEl.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }
      btnGeolocateEl.textContent = 'Locating...';
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const regionId = mapCoordinatesToRegion(lat, lon);
          let locationName = `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;

          try {
            const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            if (resp.ok) {
              const data = await resp.json();
              if (data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.address.county || '';
                const country = data.address.country || '';
                if (city && country) locationName = `${city}, ${country}`;
                else if (country) locationName = country;
              }
            }
          } catch (e) {
            console.warn('Reverse geocoding error:', e);
          }

          btnGeolocateEl.textContent = 'Locate Me';
          selectLocation(locationName, regionId, lat, lon);
        },
        () => {
          btnGeolocateEl.textContent = 'Locate Me';
          alert('Could not determine your location automatically. Please search your city or region in the location search bar.');
        }
      );
    });
  }

  if (weekRangeSliderEl) {
    weekRangeSliderEl.addEventListener('input', (e) => {
      state.selectedWeek = parseInt(e.target.value, 10);
      updateWeekUI(state.selectedWeek);
      renderApp();
    });
  }

  document.querySelectorAll('.season-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedWeek = parseInt(btn.dataset.week, 10);
      updateWeekUI(state.selectedWeek);
      renderApp();
    });
  });

  if (btnCurrentWeekEl) {
    btnCurrentWeekEl.addEventListener('click', () => {
      state.selectedWeek = getCurrentWeekNumber() || 39;
      updateWeekUI(state.selectedWeek);
      renderApp();
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
