import type { EcommerceCategory, EcommerceColumn, EcommerceCrumb } from './types';

export const defaultOfflineMessage = "You're currently offline, please reconnect";

function links(path: string, labels: readonly string[]) {
  return labels.map((label) => ({
    label,
    href: `${path}/${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`,
  }));
}

function columns(
  path: string,
  entries: readonly { title: string; labels: readonly string[] }[],
): EcommerceColumn[] {
  return entries.map((entry) => ({
    title: entry.title,
    links: links(
      `${path}/${entry.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}`,
      entry.labels,
    ),
  }));
}

export const officialStoreMenu = columns('/official-store', [
  { title: 'Phones', labels: ['iPhone 14 Pro', 'Samsung Galaxy', 'Google Pixel'] },
  { title: 'Laptops', labels: ['MacBook Air', 'Dell XPS', 'HP Spectre'] },
  { title: 'Tablets', labels: ['iPad Pro', 'Galaxy Tab', 'Surface Go'] },
  { title: 'Watches', labels: ['Apple Watch', 'Galaxy Watch', 'Fitbit'] },
  { title: 'Accessories', labels: ['AirPods', 'Chargers', 'Cases'] },
]);

export const electronicsMenu = columns('/electronics', [
  { title: 'Audio & Hi-Fi', labels: ['Headphones', 'Speakers', 'Soundbars'] },
  { title: 'Television', labels: ['Smart TVs', 'OLED TVs', 'Projectors'] },
  { title: 'Camera', labels: ['DSLR Cameras', 'Mirrorless', 'Action Cams'] },
  { title: 'Computing', labels: ['Gaming Laptops', 'Desktops', 'Monitors'] },
  { title: 'Photography', labels: ['Lenses', 'Tripods', 'Lighting'] },
]);

export const fashionMenu = [
  {
    title: 'Womens Fashion',
    links: [
      { label: 'Dresses', href: '/fashion/womens/dresses' },
      { label: 'Maternity', href: '/fashion/womens/maternity' },
      { label: 'Traditional', href: '/fashion/womens/traditional' },
    ],
  },
  {
    title: 'Mens Fashion',
    links: [
      { label: 'Clothing', href: '/fashion/mens/clothing' },
      { label: 'Shoes', href: '/fashion/mens/shoes' },
      { label: 'T-Shirts', href: '/fashion/mens/t-shirts' },
    ],
  },
  {
    title: 'Kids Fashion',
    links: [
      { label: 'Boys Fashion', href: '/fashion/kids/boys' },
      { label: 'Girls Fashion', href: '/fashion/kids/girls' },
      { label: 'Innovative Category', href: '/fashion/kids/innovative' },
    ],
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Shoes', href: '/fashion/accessories/shoes' },
      { label: 'Bags', href: '/fashion/accessories/bags' },
      { label: 'Jewelries', href: '/fashion/accessories/jewelries' },
    ],
  },
  {
    title: 'Top Brands',
    links: [
      { label: 'NIKE', href: '/fashion/brands/nike' },
      { label: 'ADIDAS', href: '/fashion/brands/adidas' },
      { label: 'New Balance', href: '/fashion/brands/new-balance' },
    ],
  },
];

export const homeMenu = columns('/home', [
  { title: 'Furniture', labels: ['Sofas', 'Tables', 'Chairs'] },
  { title: 'Decor', labels: ['Wall Art', 'Rugs', 'Mirrors'] },
  { title: 'Kitchenware', labels: ['Cookware', 'Utensils', 'Storage'] },
  { title: 'Lighting', labels: ['Table Lamps', 'Ceiling Lights', 'Outdoor'] },
  { title: 'Bed & Bath', labels: ['Bedding Sets', 'Towels', 'Mattresses'] },
]);

export const supermarketMenu = columns('/supermarket', [
  { title: 'Fresh Produce', labels: ['Fruits', 'Vegetables', 'Herbs'] },
  { title: 'Beverages', labels: ['Soft Drinks', 'Juices', 'Water'] },
  { title: 'Snacks', labels: ['Potato Chips', 'Nuts', 'Cookies'] },
  { title: 'Dairy', labels: ['Milk', 'Cheese', 'Yogurt'] },
  { title: 'Bakery & Pastries', labels: ['Bread', 'Cakes', 'Pastries'] },
]);

export const gadgetsMenu = columns('/gadgets', [
  { title: 'Smart Home', labels: ['Smart Speakers', 'Thermostats', 'Cameras'] },
  { title: 'Wearables', labels: ['Fitness Trackers', 'Smart Rings', 'Earbuds'] },
  { title: 'Drones', labels: ['Camera Drones', 'Toy Drones', 'Accessories'] },
  { title: 'Gaming', labels: ['Gaming Consoles', 'Controllers', 'Headsets'] },
  { title: 'Personal Care', labels: ['Electric Shavers', 'Hair Tools', 'Oral Care'] },
]);

export const kitchenMenu = columns('/kitchen', [
  { title: 'Appliances', labels: ['Blenders', 'Mixers', 'Air Fryers'] },
  { title: 'Cookware', labels: ['Frying Pans', 'Pots', 'Woks'] },
  { title: 'Bakeware', labels: ['Cake Tins', 'Baking Trays', 'Moulds'] },
  { title: 'Cutlery', labels: ['Chef Knives', 'Knife Sets', 'Scissors'] },
  { title: 'Dinnerware', labels: ['Plates', 'Bowls', 'Glasses'] },
]);

export const officeMenu = columns('/office', [
  { title: 'Pet Supplies', labels: ['Dog Food', 'Cat Food', 'Toys'] },
  { title: 'Stationery', labels: ['Notebooks', 'Pens', 'Folders'] },
  { title: 'Toys & Games', labels: ['Action Figures', 'Board Games', 'Puzzles'] },
  { title: 'Outdoor & Sports', labels: ['Camping Gear', 'Bikes', 'Fitness'] },
  { title: 'Automotive', labels: ['Car Accessories', 'Oils', 'Tools'] },
]);

export const defaultCategories: EcommerceCategory[] = [
  {
    id: 'official-store',
    label: 'Official Store',
    href: '/official-store',
    menu: officialStoreMenu,
  },
  { id: 'electronics', label: 'Electronics', href: '/electronics', menu: electronicsMenu },
  { id: 'fashion', label: 'Fashion', href: '/fashion', menu: fashionMenu },
  { id: 'home', label: 'Home', href: '/home', menu: homeMenu },
  { id: 'supermarket', label: 'Supermarket', href: '/supermarket', menu: supermarketMenu },
  { id: 'gadgets', label: 'Gadgets', href: '/gadgets', menu: gadgetsMenu },
  { id: 'kitchen', label: 'Kitchen', href: '/kitchen', menu: kitchenMenu },
  { id: 'office', label: 'Office', href: '/office', menu: officeMenu },
];

export const defaultBreadcrumbs: EcommerceCrumb[] = [
  { label: 'Fashion', href: '/fashion' },
  { label: 'Fashion', href: '/fashion/womens' },
  { label: 'Fashion', href: '/fashion/womens/dresses' },
  { label: 'Fashion', href: '/fashion/womens/dresses/edit' },
];

export const defaultAccountHref = '/account';
export const defaultHelpHref = '/help';
export const defaultCartHref = '/cart';
