import { Product, Supplier, Sale, User } from "../App";

export const mockProducts: Product[] = [
  // ======================
  // DOG FOOD
  // ======================
  {
    id: "1",
    name: "Aozi Dog Adult",
    category: "Dog Food",
    stock: 100,
    price: 165,
    supplierId: "1",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "2",
    name: "Beef Pro Adult (1kg)",
    category: "Dog Food",
    stock: 45,
    price: 120,
    supplierId: "1",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "3",
    name: "Beef Pro Adult (½kg)",
    category: "Dog Food",
    stock: 20,
    price: 60,
    supplierId: "1",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "4",
    name: "Beef Pro Puppy",
    category: "Dog Food",
    stock: 30,
    price: 140,
    supplierId: "1",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "5",
    name: "Bow Wow Adult",
    category: "Dog Food",
    stock: 100,
    price: 70,
    supplierId: "1",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "6",
    name: "Bow Wow Puppy",
    category: "Dog Food",
    stock: 50,
    price: 80,
    supplierId: "1",
    lowStockThreshold: 25,
    unit: "kg",
  },
  {
    id: "7",
    name: "High Action 24",
    category: "Dog Food",
    stock: 80,
    price: 55,
    supplierId: "1",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "8",
    name: "Nutrichunks Adult",
    category: "Dog Food",
    stock: 40,
    price: 105,
    supplierId: "1",
    lowStockThreshold: 25,
    unit: "kg",
  },
  {
    id: "9",
    name: "Nutrichunks Puppy",
    category: "Dog Food",
    stock: 25,
    price: 135,
    supplierId: "1",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "10",
    name: "Pedigree Adult",
    category: "Dog Food",
    stock: 60,
    price: 110,
    supplierId: "1",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "11",
    name: "Pedigree Puppy",
    category: "Dog Food",
    stock: 40,
    price: 130,
    supplierId: "1",
    lowStockThreshold: 25,
    unit: "kg",
  },

  // ======================
  // CAT FOOD & LITTER
  // ======================
  {
    id: "12",
    name: "Aozi Cat Organic",
    category: "Cat Food",
    stock: 40,
    price: 165,
    supplierId: "2",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "13",
    name: "Meow Mix",
    category: "Cat Food",
    stock: 35,
    price: 140,
    supplierId: "2",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "14",
    name: "Whiskas Adult",
    category: "Cat Food",
    stock: 30,
    price: 170,
    supplierId: "2",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "15",
    name: "Whiskas Kitten",
    category: "Cat Food",
    stock: 25,
    price: 180,
    supplierId: "2",
    lowStockThreshold: 20,
    unit: "kg",
  },
  {
    id: "16",
    name: "Cat Litter (Feline)",
    category: "Cat Litter",
    stock: 20,
    price: 220,
    supplierId: "2",
    lowStockThreshold: 10,
    unit: "bag",
  },
  {
    id: "17",
    name: "Cat Litter (Generic)",
    category: "Cat Litter",
    stock: 30,
    price: 90,
    supplierId: "2",
    lowStockThreshold: 15,
    unit: "pack",
  },

  // ======================
  // POULTRY & GAMEFOWL FEEDS
  // ======================
  {
    id: "18",
    name: "African Mix (Lovebird)",
    category: "Poultry Feed",
    stock: 60,
    price: 65,
    supplierId: "3",
    lowStockThreshold: 25,
    unit: "kg",
  },
  {
    id: "19",
    name: "Crack Corn (Bistay)",
    category: "Poultry Feed",
    stock: 80,
    price: 35,
    supplierId: "3",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "20",
    name: "Integra 3000",
    category: "Poultry Feed",
    stock: 50,
    price: 65,
    supplierId: "3",
    lowStockThreshold: 25,
    unit: "kg",
  },
  {
    id: "21",
    name: "Sunflower Seeds",
    category: "Poultry Feed",
    stock: 40,
    price: 90,
    supplierId: "3",
    lowStockThreshold: 20,
    unit: "kg",
  },

  // ======================
  // HOG & AQUA FEEDS
  // ======================
  {
    id: "22",
    name: "Hog Starter (B-Meg)",
    category: "Hog Feed",
    stock: 80,
    price: 65,
    supplierId: "4",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "23",
    name: "Hog Finisher",
    category: "Hog Feed",
    stock: 80,
    price: 55,
    supplierId: "4",
    lowStockThreshold: 30,
    unit: "kg",
  },
  {
    id: "24",
    name: "Floating Pellet (Adult)",
    category: "Aqua Feed",
    stock: 50,
    price: 65,
    supplierId: "4",
    lowStockThreshold: 25,
    unit: "kg",
  },

  // ======================
  // MEDS & VITAMINS
  // ======================
  {
    id: "25",
    name: "Amoxicillin",
    category: "Medicine",
    stock: 200,
    price: 4,
    supplierId: "5",
    lowStockThreshold: 50,
    unit: "tablet",
  },
  {
    id: "26",
    name: "Albendazole",
    category: "Medicine",
    stock: 50,
    price: 85,
    supplierId: "5",
    lowStockThreshold: 20,
    unit: "tablet",
  },
  {
    id: "27",
    name: "Dextrose Powder",
    category: "Medicine",
    stock: 40,
    price: 30,
    supplierId: "5",
    lowStockThreshold: 20,
    unit: "pack",
  },
  {
    id: "28",
    name: "Zero Mite Shampoo",
    category: "Medicine",
    stock: 100,
    price: 12,
    supplierId: "5",
    lowStockThreshold: 30,
    unit: "sachet",
  },

  // ======================
  // CHEMICALS / PESTICIDES
  // ======================
  {
    id: "29",
    name: "Lannate",
    category: "Chemical",
    stock: 20,
    price: 60.5,
    supplierId: "6",
    lowStockThreshold: 10,
    unit: "pack",
  },
  {
    id: "30",
    name: "Round Up",
    category: "Chemical",
    stock: 10,
    price: 485,
    supplierId: "6",
    lowStockThreshold: 5,
    unit: "bottle",
  },
  {
    id: "31",
    name: "Racumin / Rato",
    category: "Chemical",
    stock: 50,
    price: 25,
    supplierId: "6",
    lowStockThreshold: 15,
    unit: "pack",
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Ceylon Poultry Supplies",
    contact: "0771234567",
    email: "ceylon@poultry.lk",
  },
  {
    id: "2",
    name: "Lanka Feed Mills",
    contact: "0772345678",
    email: "info@lankafeed.lk",
  },
  {
    id: "3",
    name: "Agro Vet Solutions",
    contact: "0773456789",
    email: "contact@agrovet.lk",
  },
];

export const mockUsers: User[] = [
  { id: "1", username: "admin", role: "admin", active: true },
  { id: "2", username: "seller", role: "seller", active: true },
  {
    id: "3",
    username: "john_seller",
    role: "seller",
    active: true,
  },
  {
    id: "4",
    username: "mary_admin",
    role: "admin",
    active: true,
  },
  {
    id: "5",
    username: "old_user",
    role: "seller",
    active: false,
  },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const mockSales: Sale[] = [
  {
    id: "1",
    items: [
      {
        productId: "1",
        productName: "Aozi Dog Adult",
        quantity: 3,
        price: 165,
      },
      {
        productId: "8",
        productName: "Nutrichunks Adult",
        quantity: 2,
        price: 105,
      },
    ],
    total: 705,
    date: today,
    sellerId: "1",
  },
  {
    id: "2",
    items: [
      {
        productId: "16",
        productName: "Cat Litter (Feline)",
        quantity: 4,
        price: 220,
      },
    ],
    total: 880,
    date: today,
    sellerId: "1",
  },
  {
    id: "3",
    items: [
      {
        productId: "22",
        productName: "Hog Starter (B-Meg)",
        quantity: 2,
        price: 65,
      },
      {
        productId: "19",
        productName: "Crack Corn (Bistay)",
        quantity: 5,
        price: 35,
      },
    ],
    total: 305,
    date: yesterday,
    sellerId: "2",
  },
  {
    id: "4",
    items: [
      {
        productId: "25",
        productName: "Amoxicillin",
        quantity: 20,
        price: 4,
      },
      {
        productId: "27",
        productName: "Dextrose Powder",
        quantity: 5,
        price: 30,
      },
    ],
    total: 230,
    date: yesterday,
    sellerId: "2",
  },
  {
    id: "5",
    items: [
      {
        productId: "29",
        productName: "Lannate",
        quantity: 2,
        price: 60.5,
      },
      {
        productId: "31",
        productName: "Racumin / Rato",
        quantity: 4,
        price: 25,
      },
    ],
    total: 221,
    date: lastWeek,
    sellerId: "3",
  },
  {
    id: "6",
    items: [
      {
        productId: "14",
        productName: "Whiskas Adult",
        quantity: 3,
        price: 170,
      },
    ],
    total: 510,
    date: lastWeek,
    sellerId: "3",
  },
];