/**
 * "Your basket" Produce & Seasonality Dataset
 * Copyright (c) Smissenbroek
 */

export const REGIONS = [
  { id: 'we_eu', name: 'Western & Central Europe (FR, BE, NL, DE, CH, AT)', lat: 48.8, default: true },
  { id: 'med_eu', name: 'Mediterranean Europe (ES, IT, PT, GR, South FR)', lat: 40.4 },
  { id: 'uk_ie', name: 'UK & Ireland', lat: 52.5 },
  { id: 'nordic', name: 'Northern Europe & Baltics (SE, NO, DK, FI)', lat: 59.3 },
  { id: 'us_ne', name: 'US Northeast & Midwest (NY, MA, IL, PA)', lat: 41.8 },
  { id: 'us_wc', name: 'US West Coast & Pacific NW (WA, OR, CA North)', lat: 45.5 },
  { id: 'us_ca', name: 'US Sunbelt & California South', lat: 34.0 }
];

export const BUILTIN_CITIES = [
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

export function mapCoordinatesToRegion(lat, lon) {
  // Bounding box & latitude checks
  if (lon < -50) {
    // North America
    if (lon < -115) {
      if (lat >= 42) return 'us_wc'; // Pacific NW
      return 'us_ca'; // California South / Southwest
    }
    return 'us_ne'; // US Northeast & Midwest
  }

  // Europe & Mediterranean
  if (lat >= 56) return 'nordic';
  if (lat >= 51 && lon >= -10 && lon <= 2) return 'uk_ie';
  if (lat < 44 || (lat <= 45 && lon < -2)) return 'med_eu';
  return 'we_eu';
}


export const CATEGORIES = [
  { id: 'all', name: 'All Produce', icon: '🧺' },
  { id: 'vegetable', name: 'Vegetables', icon: '🥬' },
  { id: 'fruit', name: 'Fruits', icon: '🍎' },
  { id: 'herb', name: 'Herbs & Edibles', icon: '🌿' },
  { id: 'nut', name: 'Nuts & Roots', icon: '🌰' }
];

export const PRODUCE_DATA = [
  // VEGETABLES
  {
    id: 'asparagus-green',
    name: 'Green Asparagus',
    latinName: 'Asparagus officinalis',
    category: 'vegetable',
    emoji: '🎋',
    image: 'images/asparagus.jpg',
    color: '#4e7c41',
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
    emoji: '🥢',
    image: 'images/white_asparagus.jpg',
    color: '#e8e5d8',
    regions: ['we_eu', 'nordic'],
    harvestWeeks: [16, 17, 18, 19, 20, 21, 22, 23, 24],
    peakWeeks: [18, 19, 20, 21],
    storageWeeks: [],
    nutrition: 'Rich in fiber, potassium, and anti-inflammatory saponins.',
    carbonRating: 'A+',
    storageTip: 'Wrap in a damp cloth in the vegetable drawer for 3–4 days.',
    culinaryPairs: ['Melted Butter', 'Cooked Ham', 'Hard-boiled Eggs', 'Chervil', 'New Potatoes'],
    funFact: 'Grown entirely underground shielded from sunlight to prevent chlorophyll synthesis, earning it the moniker "White Gold".',
    prepTips: 'Peel thoroughly from just below the tip down to the stem base.'
  },
  {
    id: 'strawberry',
    name: 'Field Strawberries',
    latinName: 'Fragaria × ananassa',
    category: 'fruit',
    emoji: '🍓',
    image: 'images/strawberry.jpg',
    color: '#d63031',
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
    emoji: '🌱',
    image: 'images/rhubarb.jpg',
    color: '#c0392b',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    peakWeeks: [17, 18, 19, 20, 21],
    storageWeeks: [],
    nutrition: 'Excellent source of dietary fiber, calcium, and Anthocyanins.',
    carbonRating: 'A+',
    storageTip: 'Wrap unwashed stalks tightly in foil and keep in fridge up to 2 weeks.',
    culinaryPairs: ['Strawberries', 'Vanilla', 'Ginger', 'Custard', 'Pork Tenderloin'],
    funFact: 'Botanically a vegetable, but legally defined as a fruit in the US in 1947 due to its culinary usage.',
    prepTips: 'Discard leaves completely as they contain high concentrations of toxic oxalic acid.'
  },
  {
    id: 'radish',
    name: 'Spring Radish',
    latinName: 'Raphanus sativus',
    category: 'vegetable',
    emoji: '🥊',
    image: 'images/radish.jpg',
    color: '#e84393',
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
    emoji: '🫛',
    image: 'images/peas.jpg',
    color: '#27ae60',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    peakWeeks: [23, 24, 25, 26, 27],
    storageWeeks: [],
    nutrition: 'Abundant plant protein, fiber, lutein, and zeaxanthin for eye health.',
    carbonRating: 'A+',
    storageTip: 'Pods convert sugar to starch rapidly post-harvest; shell and eat or blanch & freeze quickly.',
    culinaryPairs: ['Fresh Mint', 'Butter', 'Pancetta', 'Ricotta', 'Lemon'],
    funFact: 'Gregor Mendel established the laws of inheritance studying pea pod traits in his monastery garden.',
    prepTips: 'Blanch in boiling salted water for just 90 seconds then shock in ice water.'
  },
  {
    id: 'broad-beans',
    name: 'Fava / Broad Beans',
    latinName: 'Vicia faba',
    category: 'vegetable',
    emoji: '🫘',
    image: 'images/broad_beans.jpg',
    color: '#55efc4',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    peakWeeks: [22, 23, 24, 25],
    storageWeeks: [],
    nutrition: 'Exceptionally rich in L-DOPA precursor, protein, iron, and magnesium.',
    carbonRating: 'A+',
    storageTip: 'Keep in pods in crisper drawer for up to 5 days.',
    culinaryPairs: ['Pecorino Romano', 'Savory Herb', 'Olive Oil', 'Garlic', 'Bacon'],
    funFact: 'Cultivated for over 8,000 years in the Mediterranean basin before common phaseolus beans.',
    prepTips: 'Pod the beans, blanch for 1 min, then slip off the outer white skin for bright emerald kernels.'
  },
  {
    id: 'zucchini',
    name: 'Courgette / Zucchini',
    latinName: 'Cucurbita pepo',
    category: 'vegetable',
    emoji: '🥒',
    image: 'images/zucchini.jpg',
    color: '#10ac84',
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
    emoji: '🍅',
    image: 'images/tomato.jpg',
    color: '#ee5253',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
    peakWeeks: [30, 31, 32, 33, 34, 35, 36, 37],
    storageWeeks: [],
    nutrition: 'Superb source of Lycopene, Vitamin C, Potassium, and Vitamin K.',
    carbonRating: 'A+',
    storageTip: 'NEVER refrigerate raw tomatoes! Store stem-side down at room temperature to preserve aromatic volatiles.',
    culinaryPairs: ['Fresh Basil', 'Extra Virgin Olive Oil', 'Mozzarella di Bufala', 'Sea Salt', 'Garlic'],
    funFact: 'Refrigeration inactivates the genes that produce tomato flavor enzymes, rendering them mealy.',
    prepTips: 'Slice with a serrated knife and sprinkle with sea salt 5 minutes before serving.'
  },
  {
    id: 'eggplant',
    name: 'Aubergine / Eggplant',
    latinName: 'Solanum melongena',
    category: 'vegetable',
    emoji: '🍆',
    image: 'images/eggplant.jpg',
    color: '#5f27cd',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [31, 32, 33, 34, 35, 36],
    storageWeeks: [],
    nutrition: 'Loaded with Nasunin (a potent brain-cell membrane antioxidant in the purple skin).',
    carbonRating: 'A+',
    storageTip: 'Keep in a cool dark pantry (~10-12°C) or front of fridge for up to 5 days.',
    culinaryPairs: ['Tahini', 'Garlic', 'Olive Oil', 'Tomatoes', 'Miso', 'Oregano'],
    funFact: 'Botanically a berry! The name "eggplant" arose because 18th-century European cultivars were small and goose-egg white.',
    prepTips: 'Roast whole until collapsed and smoky for baba ganoush or ratatouille.'
  },
  {
    id: 'bell-pepper',
    name: 'Sweet Bell Peppers',
    latinName: 'Capsicum annuum',
    category: 'vegetable',
    emoji: '🫑',
    image: 'images/bell_pepper.jpg',
    color: '#ff6b6b',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
    peakWeeks: [32, 33, 34, 35, 36, 37, 38],
    storageWeeks: [],
    nutrition: 'Red bell peppers contain over 200% of daily Vitamin C requirements per single fruit.',
    carbonRating: 'A+',
    storageTip: 'Store dry in the vegetable crisper for up to 10 days.',
    culinaryPairs: ['Onions', 'Garlic', 'Thyme', 'Goat Cheese', 'Anchovies'],
    funFact: 'Green peppers are simply unripened red or yellow peppers with a more herbaceous, bitter profile.',
    prepTips: 'Char over an open flame or under high broiler until blackened, then steam in a bag to peel easily.'
  },
  {
    id: 'cherry',
    name: 'Sweet Cherries',
    latinName: 'Prunus avium',
    category: 'fruit',
    emoji: '🍒',
    image: 'images/cherry.jpg',
    color: '#800020',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [23, 24, 25, 26, 27, 28, 29, 30],
    peakWeeks: [25, 26, 27, 28],
    storageWeeks: [],
    nutrition: 'Contains natural melatonin (promotes sleep regulation) and anthocyanin anti-inflammatories.',
    carbonRating: 'A+',
    storageTip: 'Keep cold with stems attached. Wash right before eating.',
    culinaryPairs: ['Dark Chocolate', 'Almonds', 'Kirsch', 'Duck Breast', 'Mascarpone'],
    funFact: 'A single mature cherry tree can yield up to 7,000 cherries in a single brief season!',
    prepTips: 'Pit easily by placing cherry over a glass bottle neck and poking through with a chopstick.'
  },
  {
    id: 'raspberry',
    name: 'Summer Raspberries',
    latinName: 'Rubus idaeus',
    category: 'fruit',
    emoji: '🍇',
    image: 'images/raspberry.jpg',
    color: '#e84118',
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
    id: 'blackberry',
    name: 'Wild & Garden Blackberries',
    latinName: 'Rubus fruticosus',
    category: 'fruit',
    emoji: '🫐',
    image: 'images/blackberry.jpg',
    color: '#2f3640',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [32, 33, 34, 35, 36],
    storageWeeks: [],
    nutrition: 'Exceptional antioxidant polyphenols, bioflavonoids, and Vitamin K.',
    carbonRating: 'A+',
    storageTip: 'Store refrigerated unwashed in original breathable container for 3–4 days.',
    culinaryPairs: ['Apples', 'Cinnamon', 'Venison', 'Red Wine', 'Lemon Verbena'],
    funFact: 'UK folklore states blackberries should not be picked after Michaelmas (Sept 29) as the devil touches them!',
    prepTips: 'Simmer into a fast coulis with lemon juice and a touch of honey.'
  },
  {
    id: 'peach-nectarine',
    name: 'Yellow Peaches & Nectarines',
    latinName: 'Prunus persica',
    category: 'fruit',
    emoji: '🍑',
    image: 'images/peach.jpg',
    color: '#f8c291',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    peakWeeks: [29, 30, 31, 32, 33, 34],
    storageWeeks: [],
    nutrition: 'Abundant in Vitamin A (beta-carotene), Vitamin C, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Ripen at room temperature stem-side down. Refrigerate only once fully soft.',
    culinaryPairs: ['Prosciutto', 'Burrata', 'Basil', 'Amaretto', 'Honey'],
    funFact: 'A nectarine is genetically identical to a peach except for a single recessive gene responsible for smooth skin.',
    prepTips: 'Grill halves over medium heat for 3 minutes to caramelize natural fruit sugars.'
  },
  {
    id: 'apricot',
    name: 'Orchard Apricots',
    latinName: 'Prunus armeniaca',
    category: 'fruit',
    emoji: '🍊',
    image: 'images/apricot.jpg',
    color: '#e67e22',
    regions: ['we_eu', 'med_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [23, 24, 25, 26, 27, 28, 29, 30, 31],
    peakWeeks: [25, 26, 27, 28],
    storageWeeks: [],
    nutrition: 'Packed with provitamin A carotenoids, lutein, and soluble fiber.',
    carbonRating: 'A+',
    storageTip: 'Store at room temperature until fragrant, then refrigerate in paper bag.',
    culinaryPairs: ['Almond Extract', 'Rosemary', 'Lavender', 'Pork Chops', 'Goat Cheese'],
    funFact: 'Apricots were cultivated in Armenia since antiquity; its scientific name reflects this lineage.',
    prepTips: 'Halve and poach gently in white wine and thyme simple syrup.'
  },
  {
    id: 'fig-fresh',
    name: 'Fresh Black & Green Figs',
    latinName: 'Ficus carica',
    category: 'fruit',
    emoji: '🪻',
    image: 'images/fig.jpg',
    color: '#4a235a',
    regions: ['med_eu', 'we_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [23, 24, 25, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    peakWeeks: [35, 36, 37, 38, 39],
    storageWeeks: [],
    nutrition: 'High dietary calcium, copper, magnesium, and prebiotic digestive enzymes.',
    carbonRating: 'A+',
    storageTip: 'Eat within 2 days of picking. Extremely perishable at room temp.',
    culinaryPairs: ['Blue Cheese / Gorgonzola', 'Walnuts', 'Honey', 'Balsamic Glaze', 'Prosciutto'],
    funFact: 'Botanically an inverted flower cluster (syconium) pollinated by specialized microscopic fig wasps.',
    prepTips: 'Quarter from the top without cutting through base, blossom like a flower and fill with goat cheese.'
  },
  {
    id: 'melon-cantaloupe',
    name: 'Charentais & Cantaloupe Melon',
    latinName: 'Cucumis melo var. cantalupensis',
    category: 'fruit',
    emoji: '🍈',
    image: 'images/melon.jpg',
    color: '#f39c12',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    peakWeeks: [30, 31, 32, 33, 34, 35],
    storageWeeks: [],
    nutrition: 'High hydration (90% water), Vitamin C, and Beta-Carotene.',
    carbonRating: 'A+',
    storageTip: 'Keep whole melon at room temperature until stem end smells intoxicatingly sweet.',
    culinaryPairs: ['Cured Ham / Prosciutto', 'Mint', 'Lime Juice', 'Port Wine', 'Feta'],
    funFact: 'Charentais melon from Southwestern France is famed for its dense orange flesh and musky aroma.',
    prepTips: 'Scoop out seeds, cut into wedges, and serve chilled with thin slices of salty ham.'
  },
  {
    id: 'sweetcorn',
    name: 'Fresh Sweetcorn',
    latinName: 'Zea mays var. saccharata',
    category: 'vegetable',
    emoji: '🌽',
    image: 'images/corn.jpg',
    color: '#f1c40f',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [33, 34, 35, 36, 37],
    storageWeeks: [],
    nutrition: 'Rich in ferulic acid antioxidant, thiamine (B1), and dietary fiber.',
    carbonRating: 'A+',
    storageTip: 'Leave in husk in fridge. Cook as soon as possible after harvesting.',
    culinaryPairs: ['Salted Butter', 'Smoked Paprika', 'Lime', 'Cotija Cheese', 'Coriander'],
    funFact: 'Each kernel of corn has its own individual strand of silk attached to it.',
    prepTips: 'Boil in un-salted water for 5 minutes (salt toughens corn kernels).'
  },
  {
    id: 'chanterelle',
    name: 'Golden Chanterelles',
    latinName: 'Cantharellus cibarius',
    category: 'herb',
    emoji: '🍄',
    image: 'images/chanterelle.jpg',
    color: '#d35400',
    regions: ['we_eu', 'nordic', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [34, 35, 36, 37, 38, 39, 40],
    storageWeeks: [],
    nutrition: 'One of the richest natural non-animal sources of Vitamin D2 + iron and copper.',
    carbonRating: 'A+',
    storageTip: 'Keep dry in a breathable paper bag in fridge for up to 1 week. Never in plastic!',
    culinaryPairs: ['Butter', 'Shallots', 'Heavy Cream', 'Parsley', 'Tagliatelle'],
    funFact: 'Chanterelles form mycorrhizal partnerships with living tree roots and cannot be commercially cultivated.',
    prepTips: 'Brush off dirt dry with a pastry brush instead of washing with water.'
  },
  {
    id: 'porcini',
    name: 'Wild Cèpe / Porcini',
    latinName: 'Boletus edulis',
    category: 'herb',
    emoji: '🍄‍🟫',
    image: 'images/porcini.jpg',
    color: '#795548',
    regions: ['we_eu', 'med_eu', 'nordic', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [],
    nutrition: 'Packed with umami glutamate, ergothioneine, and selenium.',
    carbonRating: 'A+',
    storageTip: 'Store in paper bag. Slice and dry surplus for long-term pantry storage.',
    culinaryPairs: ['Risotto Rice', 'Garlic', 'Thyme', 'Parmesan', 'Olive Oil'],
    funFact: 'Italian name "Porcini" translates to "piglets" due to their plump, fat stems.',
    prepTips: 'Sauté in hot pan with oil first to evaporate moisture, then add butter and garlic.'
  },
  {
    id: 'apple-discovery',
    name: 'Early Apples (Discovery & Elstar)',
    latinName: 'Malus domestica',
    category: 'fruit',
    emoji: '🍏',
    image: 'images/apple_early.jpg',
    color: '#7bed9f',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [34, 35, 36, 37, 38],
    storageWeeks: [41, 42, 43, 44],
    nutrition: 'Quercetin antioxidant, pectin soluble fiber, and crisp malic acid refreshing bite.',
    carbonRating: 'A+',
    storageTip: 'Early apples don\'t store as long as late cultivars. Consume within 3 weeks.',
    culinaryPairs: ['Cheddar Cheese', 'Blackberries', 'Cinnamon', 'Pork', 'Walnuts'],
    funFact: '\'Discovery\' was bred in Essex in 1949 and is famed for crisp pink-flushed flesh.',
    prepTips: 'Eat raw with skin on for maximum quercetin intake.'
  },
  {
    id: 'apple-autumn',
    name: 'Main Crop Apples (Boskoop, Gala, Honeycrisp)',
    latinName: 'Malus domestica',
    category: 'fruit',
    emoji: '🍎',
    image: 'images/apple_main.jpg',
    color: '#ff4757',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [39, 40, 41, 42, 43],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    nutrition: 'Pectin fiber regulates blood sugar; high concentration of polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Store in cool cellar (2-4°C) with high humidity. Keep away from potatoes.',
    culinaryPairs: ['Salted Caramel', 'Cinnamon', 'Butter Crust', 'Calvados', 'Cabbage'],
    funFact: 'Traditional apple cellars keep apples fresh for 6+ months using low oxygen and temperature controls.',
    prepTips: 'Bake whole stuffed with raisins, walnuts, and butter.'
  },
  {
    id: 'pear-conference',
    name: 'Conference & Autumn Pears',
    latinName: 'Pyrus communis',
    category: 'fruit',
    emoji: '🍐',
    image: 'images/pear.jpg',
    color: '#a4b0be',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    nutrition: 'High hypoallergenic fiber, copper, Vitamin C, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Pears ripen from the inside out! Check neck softness with thumb press.',
    culinaryPairs: ['Roquefort / Gorgonzola', 'Walnuts', 'Red Wine', 'Arugula / Rocket', 'Honey'],
    funFact: 'Conference pear was winner of the Royal Horticultural Society British Pear Conference in 1885.',
    prepTips: 'Poach whole in red wine, star anise, and cinnamon stick.'
  },
  {
    id: 'quince',
    name: 'Fragrant Quince',
    latinName: 'Cydonia oblonga',
    category: 'fruit',
    emoji: '🍐',
    image: 'images/quince.jpg',
    color: '#eccc68',
    regions: ['we_eu', 'med_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48],
    peakWeeks: [42, 43, 44, 45, 46],
    storageWeeks: [49, 50, 51, 52, 1, 2],
    nutrition: 'Extremely rich in natural pectin, Vitamin C, iron, and aromatic polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Keep at room temperature for weeks; aroma will perfume the entire kitchen.',
    culinaryPairs: ['Manchego Cheese', 'Game Meats', 'Cardamom', 'Vanilla', 'Honey'],
    funFact: 'Cannot be eaten raw! When cooked long with sugar, white quince flesh turns ruby red due to heat transformation.',
    prepTips: 'Slow cook into Spanish Membrillo paste for cheese boards.'
  },
  {
    id: 'plum-damsons',
    name: 'Victoria Plums & Greengages',
    latinName: 'Prunus domestica',
    category: 'fruit',
    emoji: '🫐',
    image: 'images/plum.jpg',
    color: '#8e44ad',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [34, 35, 36, 37, 38],
    storageWeeks: [],
    nutrition: 'Rich in sorbitol, chlorogenic acid, and antioxidant neochlorogenic acid.',
    carbonRating: 'A+',
    storageTip: 'Ripen at room temperature until dusty bloom skin yields slightly.',
    culinaryPairs: ['Cinnamon', 'Star Anise', 'Almond Tart', 'Brandy', 'Pork Roast'],
    funFact: 'Greengages (Reine Claude) were introduced to France by King Francis I named after his queen.',
    prepTips: 'Bake into a French Clafoutis or plum tart.'
  },
  {
    id: 'grape-wine',
    name: 'Table & Wine Grapes',
    latinName: 'Vitis vinifera',
    category: 'fruit',
    emoji: '🍇',
    image: 'images/grapes.jpg',
    color: '#6c5ce7',
    regions: ['we_eu', 'med_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [37, 38, 39, 40, 41, 42],
    storageWeeks: [],
    nutrition: 'High Resveratrol antioxidant content, natural glucose energy, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Refrigerate unwashed in plastic bag. Wash right before eating.',
    culinaryPairs: ['Aged Cheeses', 'Walnuts', 'Rosemary', 'Fennel Seed', 'Roast Chicken'],
    funFact: 'European grapevines (Vitis vinifera) have been cultivated for winemaking for over 6,000 years.',
    prepTips: 'Roast grapes on the vine with olive oil and fresh rosemary to pair with pork or goat cheese.'
  },
  {
    id: 'pumpkin-hokkaido',
    name: 'Hokkaido / Red Kuri Squash',
    latinName: 'Cucurbita maxima',
    category: 'vegetable',
    emoji: '🎃',
    image: 'images/pumpkin.jpg',
    color: '#e67e22',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [38, 39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nutrition: 'Huge Vitamin A concentration (beta-carotene), potassium, fiber, and low glycemic index.',
    carbonRating: 'A+',
    storageTip: 'Store in dry place at 10-15°C with stem attached. Will keep up to 5 months.',
    culinaryPairs: ['Nutmeg', 'Coconut Milk', 'Ginger', 'Sage', 'Chestnuts', 'Parmesan'],
    funFact: 'Red Kuri skin is thin and completely edible when cooked—no tedious peeling required!',
    prepTips: 'Roast wedges skin-on with olive oil, sea salt, and fresh sage leaves.'
  },
  {
    id: 'butternut-squash',
    name: 'Butternut Squash',
    latinName: 'Cucurbita moschata',
    category: 'vegetable',
    emoji: '🍠',
    image: 'images/butternut.jpg',
    color: '#f39c12',
    regions: ['we_eu', 'med_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [39, 40, 41, 42, 43, 44],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    nutrition: 'Abundant in Vitamin C, Vitamin E, Vitamin B6, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Store in cool dry place away from direct sunlight.',
    culinaryPairs: ['Brown Butter', 'Sage', 'Pecans', 'Maple Syrup', 'Goat Cheese'],
    funFact: 'Developed in Massachusetts in 1944 by Charles Leggett who crossed gooseneck squash with pumpkin.',
    prepTips: 'Halve lengthwise, remove seeds, score grid pattern, brush with butter and roast until silky soft.'
  },
  {
    id: 'walnut-fresh',
    name: 'Fresh "Green" & Dry Walnuts',
    latinName: 'Juglans regia',
    category: 'nut',
    emoji: '🌰',
    image: 'images/walnut.jpg',
    color: '#a67c52',
    regions: ['we_eu', 'med_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44],
    peakWeeks: [39, 40, 41, 42],
    storageWeeks: [45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    nutrition: 'Highest plant Alpha-Linolenic Acid (ALA) omega-3 fatty acids of all nuts + polyphenols.',
    carbonRating: 'A+',
    storageTip: 'Fresh green walnuts must be peeled and eaten within days; dried walnuts keep in shell for 1 year.',
    culinaryPairs: ['Roquefort', 'Pears', 'Honey', 'Endive', 'Balsamic'],
    funFact: 'Freshly harvested "wet" walnuts in autumn have a creamy, delicate taste without bitter skin tannin.',
    prepTips: 'Peel yellow skin of fresh autumn walnuts to reveal sweet white kernels.'
  },
  {
    id: 'chestnut',
    name: 'Sweet Chestnuts (Marrons)',
    latinName: 'Castanea sativa',
    category: 'nut',
    emoji: '🌰',
    image: 'images/chestnut.jpg',
    color: '#6e2c00',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    peakWeeks: [42, 43, 44, 45, 46],
    storageWeeks: [50, 51, 52, 1, 2, 3],
    nutrition: 'Unlike other nuts, low in fat (99% starch & fiber) and rich in Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'Store in breathable bag in fridge up to 3 weeks. Do not let dry out.',
    culinaryPairs: ['Roast Brussels Sprouts', 'Bacon', 'Vanilla', 'Game Birds', 'Red Wine'],
    funFact: 'Known as the "bread tree" in mountainous Southern Europe where chestnut flour sustained villages.',
    prepTips: 'Cut an "X" on the flat side of shell before roasting at 200°C for 20 minutes.'
  },
  {
    id: 'hazelnut',
    name: 'Fresh Cobnuts / Hazelnuts',
    latinName: 'Corylus avellana',
    category: 'nut',
    emoji: '🌰',
    image: 'images/hazelnut.jpg',
    color: '#d35400',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_wc'],
    harvestWeeks: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    peakWeeks: [36, 37, 38, 39, 40],
    storageWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    nutrition: 'Loaded with Vitamin E (tocopherol), monounsaturated fats, and manganese.',
    carbonRating: 'A+',
    storageTip: 'Fresh green cobnuts are eaten juicy in Sept; dry fully for winter storing.',
    culinaryPairs: ['Dark Chocolate', 'Apples', 'Brown Butter', 'Salads', 'Pesto'],
    funFact: 'Kentish Cobnuts have green leafy husks (bracts) enclosing the sweet kernel.',
    prepTips: 'Toast in dry skillet for 5 minutes then rub in tea towel to strip dark skins.'
  },
  {
    id: 'leek',
    name: 'Winter Leeks',
    latinName: 'Allium ampeloprasum var. porrum',
    category: 'vegetable',
    emoji: '🧅',
    image: 'images/leek.jpg',
    color: '#27ae60',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    peakWeeks: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5],
    storageWeeks: [],
    nutrition: 'Contains prebiotic Inulin fiber, Kaempferol flavonoid, and folate.',
    carbonRating: 'A+',
    storageTip: 'Trim dark top green leaves, wrap in damp towel in fridge for up to 2 weeks.',
    culinaryPairs: ['Potatoes', 'Cream', 'Dijon Mustard', 'Gruyère', 'Thyme'],
    funFact: 'The national emblem of Wales since the 6th century battle against Saxons.',
    prepTips: 'Slit white shank vertically and rinse under running cold water to wash away trapped soil sand.'
  },
  {
    id: 'brussels-sprouts',
    name: 'Frost-Kissed Brussels Sprouts',
    latinName: 'Brassica oleracea var. gemmifera',
    category: 'vegetable',
    emoji: '🥬',
    image: 'images/brussels_sprouts.jpg',
    color: '#2e7d32',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [],
    nutrition: 'Massive Vitamin K content (250% DV), glucosinolates, and Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'If bought on stalk, leave attached in cold pantry for maximum fresh longevity.',
    culinaryPairs: ['Chestnuts', 'Pancetta', 'Balsamic Reduction', 'Parmesan', 'Walnuts'],
    funFact: 'Freezing autumn frost converts leaf starches to natural sugars, making winter sprouts noticeably sweeter!',
    prepTips: 'Halve and high-heat roast cut side down until deeply caramelized and crispy.'
  },
  {
    id: 'kale-lacinato',
    name: 'Cavolo Nero / Tuscan Kale',
    latinName: 'Brassica oleracea var. palmifolia',
    category: 'vegetable',
    emoji: '🥬',
    image: 'images/kale.jpg',
    color: '#1b5e20',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4],
    storageWeeks: [],
    nutrition: 'Powerhouse nutrient index: Vitamin K, Vitamin A, Calcium, and Chlorophyll.',
    carbonRating: 'A+',
    storageTip: 'Store leaves wrapped in dry paper towel inside sealed bag in fridge crisper up to 1 week.',
    culinaryPairs: ['Cannellini Beans', 'Garlic', 'Olive Oil', 'Chorizo', 'Parmesan Crusts'],
    funFact: 'In Tuscany, Cavolo Nero is the essential spine of Ribollita bread soup.',
    prepTips: 'Strip leaves off fibrous center stem, strip and massage raw leaves with olive oil & lemon juice.'
  },
  {
    id: 'parsnip',
    name: 'Winter Parsnips',
    latinName: 'Pastinaca sativa',
    category: 'vegetable',
    emoji: '🥕',
    image: 'images/parsnip.jpg',
    color: '#f5f5dc',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3],
    storageWeeks: [13, 14, 15, 16, 17, 18],
    nutrition: 'High soluble fiber, falcarinol antioxidant, and potassium.',
    carbonRating: 'A+',
    storageTip: 'Keep in cold sand cellar or vegetable drawer for months.',
    culinaryPairs: ['Honey', 'Whole Grain Mustard', 'Roast Beef', 'Nutmeg', 'Thyme'],
    funFact: 'Before cane sugar was imported to Europe, parsnips were used as a primary sweetener for desserts.',
    prepTips: 'Roast with honey and coarse grain mustard until edges turn golden brown.'
  },
  {
    id: 'celeriac',
    name: 'Celeriac / Celery Root',
    latinName: 'Apium graveolens var. rapaceum',
    category: 'vegetable',
    emoji: '🥔',
    image: 'images/celeriac.jpg',
    color: '#d7ccc8',
    regions: ['we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc'],
    harvestWeeks: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    peakWeeks: [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2],
    storageWeeks: [15, 16, 17, 18, 19, 20],
    nutrition: 'Low starch root alternative, high in Vitamin K, phosphorus, and B-complex.',
    carbonRating: 'A+',
    storageTip: 'Keep unwashed in plastic bag in vegetable drawer for up to 3 weeks.',
    culinaryPairs: ['Dijon Rémoulade', 'Apples', 'Butter Mash', 'Truffle Oil', 'Hazelnuts'],
    funFact: 'Mentioned in Homer\'s Odyssey as "selinon" growing in the marshes of Calypso\'s island.',
    prepTips: 'Peel knobby skin off with a sharp chef\'s knife, cut into matchsticks for classic Remoulade.'
  },
  {
    id: 'beetroot',
    name: 'Red & Golden Beetroot',
    latinName: 'Beta vulgaris',
    category: 'vegetable',
    emoji: '🧅',
    image: 'images/beetroot.jpg',
    color: '#880e4f',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    nutrition: 'Nitrates boost nitric oxide blood flow performance; rich in Betalain anti-inflammatories.',
    carbonRating: 'A+',
    storageTip: 'Twist off green tops (leave 2cm stem to prevent bleeding), store root in crisper drawer.',
    culinaryPairs: ['Goat Cheese', 'Horseradish', 'Dill', 'Walnuts', 'Orange Segments'],
    funFact: 'Beetroot juice is widely used by endurance athletes to increase stamina and oxygen efficiency.',
    prepTips: 'Roast wrapped in foil skin-on at 200°C for 45 mins; skin slips right off under cool water.'
  },
  {
    id: 'carrot-heritage',
    name: 'Main Crop & Heritage Carrots',
    latinName: 'Daucus carota subsp. sativus',
    category: 'vegetable',
    emoji: '🥕',
    image: 'images/carrot.jpg',
    color: '#e67e22',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    storageWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    nutrition: 'Premier source of Beta-carotene (Vitamin A precursor), lutein, and biotin.',
    carbonRating: 'A+',
    storageTip: 'Cut off green tops to stop roots drying out. Keep in water bath in fridge.',
    culinaryPairs: ['Cumin', 'Coriander', 'Butter', 'Honey', 'Tarragon'],
    funFact: 'Original carrots were purple or yellow! Orange carrots were bred in 17th-century Netherlands in tribute to William of Orange.',
    prepTips: 'Roast whole with cumin seeds and maple syrup.'
  },
  {
    id: 'spinach-spring-autumn',
    name: 'Fresh Leaf Spinach',
    latinName: 'Spinacia oleracea',
    category: 'vegetable',
    emoji: '🥬',
    image: 'images/spinach.jpg',
    color: '#2e7d32',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    peakWeeks: [17, 18, 19, 20, 38, 39, 40, 41, 42],
    storageWeeks: [],
    nutrition: 'Iron, Folate, Vitamin K, Magnesium, and lutein eye protection.',
    carbonRating: 'A+',
    storageTip: 'Store dry in breathable salad container with paper towel inside.',
    culinaryPairs: ['Garlic', 'Nutmeg', 'Butter', 'Pine Nuts', 'Ricotta'],
    funFact: 'The misconception that spinach had 10x more iron than other veggies stemmed from a misplaced decimal point in an 1870 study!',
    prepTips: 'Wilt in hot melted butter for just 2 minutes with a microplaned dash of fresh nutmeg.'
  },
  {
    id: 'chicory-witloof',
    name: 'Belgian Endive / Chicon / Witloof',
    latinName: 'Cichorium intybus var. foliosum',
    category: 'vegetable',
    emoji: '🥗',
    image: 'images/chicory.jpg',
    color: '#fff9c4',
    regions: ['we_eu', 'uk_ie'],
    harvestWeeks: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    peakWeeks: [46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8],
    storageWeeks: [],
    nutrition: 'Intense bitter compounds (intybin) stimulate liver bile digestion; high folate.',
    carbonRating: 'A+',
    storageTip: 'Keep stored in total darkness! Exposure to light turns leaves green and overly bitter.',
    culinaryPairs: ['Béchamel', 'Baked Ham', 'Gruyère Cheese', 'Walnuts', 'Blue Cheese', 'Oranges'],
    funFact: 'Discovered accidentally by a Belgian farmer in 1830 who stored chicory roots in a dark cellar during wartime.',
    prepTips: 'Braise whole in butter, sugar, and lemon juice then wrap in ham, top with béchamel & cheese and bake.'
  },
  {
    id: 'radicchio-treviso',
    name: 'Radicchio di Treviso & Castelfranco',
    latinName: 'Cichorium intybus var. silvestre',
    category: 'vegetable',
    emoji: '🥬',
    image: 'images/radicchio.jpg',
    color: '#4a148c',
    regions: ['med_eu', 'we_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakWeeks: [44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2],
    storageWeeks: [],
    nutrition: 'High Intybin bitters, anthocyanins, and anti-diabetic inulin.',
    carbonRating: 'A+',
    storageTip: 'Store in crisper drawer up to 10 days.',
    culinaryPairs: ['Risotto', 'Balsamic Vinegar', 'Olive Oil', 'Gorgonzola', 'Pears'],
    funFact: 'Prized Treviso Tardivo is forced in dark spring-water pools to develop crisp red-and-white spears.',
    prepTips: 'Grill wedges brushed with olive oil and drizzle with aged balsamic vinegar.'
  },
  {
    id: 'fennel-florence',
    name: 'Florence Fennel Bulb',
    latinName: 'Foeniculum vulgare var. azoricum',
    category: 'vegetable',
    emoji: '🌿',
    image: 'images/fennel.jpg',
    color: '#c8e6c9',
    regions: ['med_eu', 'we_eu', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    peakWeeks: [35, 36, 37, 38, 39, 40, 41, 42],
    storageWeeks: [],
    nutrition: 'Anethole essential oils give anise flavor, anti-spasmodic digestion aid, high Vitamin C.',
    carbonRating: 'A+',
    storageTip: 'Cut off fronds (reserve for garnish), wrap bulb in paper towel in fridge up to 10 days.',
    culinaryPairs: ['Blood Oranges', 'Black Olives', 'Fish / Sea Bass', 'Pernod', 'Parmesan'],
    funFact: 'In ancient Greece, Marathon meant "field of fennel"—the site of the historic 490 BC battle.',
    prepTips: 'Shave paper thin on a mandoline and toss with orange segments and extra virgin olive oil.'
  },
  {
    id: 'artichoke-globe',
    name: 'Globe Artichokes',
    latinName: 'Cynara cardunculus var. scolymus',
    category: 'vegetable',
    emoji: '🥦',
    image: 'images/artichoke.jpg',
    color: '#33691e',
    regions: ['med_eu', 'we_eu', 'us_wc', 'us_ca'],
    harvestWeeks: [18, 19, 20, 21, 22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41],
    peakWeeks: [20, 21, 22, 23, 24, 37, 38, 39],
    storageWeeks: [],
    nutrition: 'Highest antioxidant score among common vegetables! Cynarin stimulates liver detox.',
    carbonRating: 'A+',
    storageTip: 'Store unwashed in plastic bag in fridge for up to 1 week.',
    culinaryPairs: ['Lemon Aioli', 'Garlic Butter', 'Vinaigrette', 'Mint', 'Parsley'],
    funFact: 'The artichoke is actually an unopened flower bud of a thistle plant.',
    prepTips: 'Trim top quarter and leaf prickles, steam whole with lemon slices and garlic for 35 mins.'
  },
  {
    id: 'basil-sweet',
    name: 'Sweet Genovese Basil',
    latinName: 'Ocimum basilicum',
    category: 'herb',
    emoji: '🌿',
    image: 'images/basil.jpg',
    color: '#2e7d32',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [26, 27, 28, 29, 30, 31, 32, 33, 34],
    storageWeeks: [],
    nutrition: 'Rich in Eugenol essential oils, Vitamin K, and antibacterial flavonoids.',
    carbonRating: 'A+',
    storageTip: 'NEVER refrigerate basil! Keep stem ends in glass of water on kitchen counter at room temp.',
    culinaryPairs: ['Tomatoes', 'Pine Nuts', 'Parmesan / Pecorino', 'Garlic', 'Olive Oil'],
    funFact: 'Genovese Basil enjoys PDO (Protected Designation of Origin) status in Liguria, Italy.',
    prepTips: 'Tear or pound in mortar & pestle for pesto rather than chopping finely with steel blade to prevent browning.'
  },
  {
    id: 'mint-spearmint',
    name: 'Garden Spearmint',
    latinName: 'Mentha spicata',
    category: 'herb',
    emoji: '🌱',
    image: 'images/mint.jpg',
    color: '#009688',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    storageWeeks: [],
    nutrition: 'Menthol digestive aid, rosmarinic acid antioxidant, and refreshing aroma.',
    carbonRating: 'A+',
    storageTip: 'Keep stems in water glass or wrapped in damp paper towel in fridge.',
    culinaryPairs: ['New Potatoes', 'Lamb', 'Strawberries', 'Peas', 'Cucumbers', 'Lime'],
    funFact: 'Mint spreads aggressively via underground stolons (runners); best grown in contained garden pots!',
    prepTips: 'Muddle gently for cocktails or infuse in hot water for fresh herbal tea.'
  },
  {
    id: 'rosemary-common',
    name: 'Perennial Rosemary',
    latinName: 'Salvia rosmarinus',
    category: 'herb',
    emoji: '🌿',
    image: 'images/rosemary.jpg',
    color: '#1b5e20',
    regions: ['med_eu', 'we_eu', 'uk_ie', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    peakWeeks: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    storageWeeks: [],
    nutrition: 'Carnosic acid protects brain memory; powerful antimicrobial and antioxidant pinene.',
    carbonRating: 'A+',
    storageTip: 'Wrap in dry paper towel in crisper drawer for up to 3 weeks.',
    culinaryPairs: ['Roast Potatoes', 'Lamb Chops', 'Focaccia Bread', 'Garlic', 'Olive Oil'],
    funFact: 'Associated with remembrance since ancient Greece; students wore rosemary garlands during exams.',
    prepTips: 'Strip needle leaves backwards off woody stem, chop finely for focaccia topping.'
  },
  {
    id: 'thyme-garden',
    name: 'Garden Thyme',
    latinName: 'Thymus vulgaris',
    category: 'herb',
    emoji: '🌿',
    image: 'images/thyme.jpg',
    color: '#4e7c41',
    regions: ['med_eu', 'we_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    peakWeeks: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    storageWeeks: [],
    nutrition: 'Thymol essential oil is a natural antiseptic and respiratory decongestant.',
    carbonRating: 'A+',
    storageTip: 'Keep dry in fridge or hang bunches upside down in warm dry room to dry.',
    culinaryPairs: ['Roast Chicken', 'Mushrooms', 'Butter', 'Lemon', 'Stews'],
    funFact: 'Ancient Egyptians used thyme oil in embalming; Roman soldiers bathed in thyme tea for courage.',
    prepTips: 'Strip tiny leaves easily by running fingers from tip down stem.'
  },
  {
    id: 'garlic-spring',
    name: 'Fresh Green Garlic & Hardneck Garlic',
    latinName: 'Allium sativum',
    category: 'vegetable',
    emoji: '🧄',
    image: 'images/garlic.jpg',
    color: '#e0e0e0',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    peakWeeks: [24, 25, 26, 27, 28, 29, 30],
    storageWeeks: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    nutrition: 'Allicin organosulfur compound formed when crushed; cardiovascular & immune booster.',
    carbonRating: 'A+',
    storageTip: 'Store cured garlic in cool dark pantry in mesh bag. Never in fridge!',
    culinaryPairs: ['Olive Oil', 'Everything!'],
    funFact: 'Crushing or chopping garlic and letting it sit 10 minutes maximizes Allicin enzyme activation before cooking.',
    prepTips: 'Smash clove with flat of chef knife blade to pop skin off easily.'
  },
  {
    id: 'onion-yellow',
    name: 'Main Crop Yellow & Red Onions',
    latinName: 'Allium cepa',
    category: 'vegetable',
    emoji: '🧅',
    image: 'images/onion.jpg',
    color: '#d35400',
    regions: ['we_eu', 'med_eu', 'uk_ie', 'nordic', 'us_ne', 'us_wc', 'us_ca'],
    harvestWeeks: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    peakWeeks: [33, 34, 35, 36, 37, 38],
    storageWeeks: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    nutrition: 'Quercetin, Fructooligosaccharides prebiotics, and sulfur compounds.',
    carbonRating: 'A+',
    storageTip: 'Store braided or in mesh bag in cool, dark dry pantry.',
    culinaryPairs: ['Butter', 'Beef Stock', 'Thyme', 'Gruyère Cheese', 'Boric Acid'],
    funFact: 'Ancient Egyptians worshipped onions, viewing their concentric rings as a symbol of eternal life.',
    prepTips: 'Chill onions 30 mins before slicing to reduce tearing syn-propanethial-S-oxide vapors.'
  }
];

// Helper: Get active produce items for a given region and week number (1-52)
export function getBasketProduce(regionId, weekNum, filterCategory = 'all', searchQuery = '') {
  const normSearch = searchQuery.trim().toLowerCase();

  return PRODUCE_DATA.filter(item => {
    // Check region match
    if (!item.regions.includes(regionId)) return false;

    // Check category match
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;

    // Check search match
    if (normSearch.length > 0) {
      const matchName = item.name.toLowerCase().includes(normSearch);
      const matchLatin = item.latinName.toLowerCase().includes(normSearch);
      const matchPair = item.culinaryPairs.some(p => p.toLowerCase().includes(normSearch));
      const matchNutr = item.nutrition.toLowerCase().includes(normSearch);
      if (!matchName && !matchLatin && !matchPair && !matchNutr) return false;
    }

    // Check harvest or storage week match
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

// Helper: Convert week number to approximate date range string
export function getWeekDateRange(weekNum, year = 2026) {
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

  if (startMonth === endMonth) {
    return `${startMonth} ${startDate} – ${endDate}`;
  }
  return `${startMonth} ${startDate} – ${endMonth} ${endDate}`;
}

// Helper: Get current week of the year
export function getCurrentWeekNumber() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return Math.min(Math.max(weekNo, 1), 52);
}

// Sample Seasonal Recipes based on available produce items
export const SEASONAL_RECIPES = [
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
