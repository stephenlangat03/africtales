
import { Product } from './types';

export const CATEGORIES = [
  "All",
  "Jewelry",
  "Accessories",
  "Decor",
  "Beadwork"
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Traditional Beaded Gourd',
    category: 'Decor',
    price: 4500,
    description: 'A traditional calabash gourd adorned with intricate multicolored beadwork. Used traditionally for storage or as a decorative masterpiece.',
    image: 'download%20(11).jpeg', 
    rating: 4.8,
    stock: 5,
    history: 'Calabashes have been used for centuries across Africa as vessels for food and water, often decorated to reflect status and identity.'
  },
  {
    id: '2',
    name: 'Hand-Woven Beaded Strip',
    category: 'Beadwork',
    price: 1200,
    description: 'A strip of fine beadwork displaying geometric patterns. Perfect for sewing onto fabric or framing.',
    image: 'download%20(12).jpeg',
    rating: 4.5,
    stock: 15
  },
  {
    id: '3',
    name: 'Maasai Bangle Collection',
    category: 'Jewelry',
    price: 800,
    description: 'Vibrant, rigid beaded bangles available in various traditional colors.',
    image: 'download%20(13).jpeg',
    rating: 4.7,
    stock: 40
  },
  {
    id: '4',
    name: 'Red Ceremonial Necklace',
    category: 'Jewelry',
    price: 5500,
    description: 'A classic multi-strand red bead necklace, traditionally worn by Maasai women.',
    image: 'download%20(14).jpeg',
    rating: 4.9,
    stock: 8
  },
  {
    id: '5',
    name: 'Grand Beaded Collar',
    category: 'Jewelry',
    price: 7000,
    description: 'An expansive, flat beaded collar necklace featuring a spectrum of colors.',
    image: 'download%20(15).jpeg',
    rating: 5.0,
    stock: 3
  },
  {
    id: '6',
    name: 'Kenya Flag Wristbands',
    category: 'Accessories',
    price: 500,
    description: 'Show your pride with these beaded wristbands in the colors of the Kenyan flag.',
    image: 'download%20(16).jpeg',
    rating: 4.6,
    stock: 100
  },
  {
    id: '7',
    name: 'Kenya Flag Beaded Sash',
    category: 'Accessories',
    price: 3500,
    description: 'A long, durable beaded sash or belt featuring the Kenyan flag pattern. Can be used as a strap or decorative belt.',
    image: 'download%20(17).jpeg',
    rating: 4.8,
    stock: 10
  },
  {
    id: '8',
    name: 'Chunky Glass Bead Strands',
    category: 'Beadwork',
    price: 2800,
    description: 'Strands of large, colorful glass beads. Ideal for collectors or making statement jewelry.',
    image: 'download%20(18).jpeg',
    rating: 4.4,
    stock: 25
  },
  {
    id: '9',
    name: 'Maasai Shield Keychains',
    category: 'Accessories',
    price: 350,
    description: 'Miniature beaded keychains shaped like a traditional shield. A perfect small gift.',
    image: 'download%20(19).jpeg',
    rating: 4.7,
    stock: 150
  },
  {
    id: '10',
    name: 'Ceremonial Jewelry Set',
    category: 'Jewelry',
    price: 15000,
    description: 'A complete ceremonial set comprising necklace and headgear on a white display.',
    image: 'images%20(8).jpeg',
    rating: 5.0,
    stock: 2
  },
  {
    id: '11',
    name: 'Teal Geometric Earrings',
    category: 'Jewelry',
    price: 1200,
    description: 'Teardrop earrings featuring a striking teal, black, and white pattern.',
    image: 'images%20(9).jpeg',
    rating: 4.6,
    stock: 20
  },
  {
    id: '12',
    name: 'Tribal Fringe Earrings',
    category: 'Jewelry',
    price: 1400,
    description: 'Long fringe earrings with diamond patterns in earth tones.',
    image: 'images%20(10).jpeg',
    rating: 4.8,
    stock: 18
  },
  {
    id: '13',
    name: 'Leather Beaded Belts',
    category: 'Accessories',
    price: 3800,
    description: 'Premium dark leather belts inlaid with intricate, multicolored beadwork patterns.',
    image: 'images%20(11).jpeg',
    rating: 4.9,
    stock: 12
  },
  {
    id: '14',
    name: 'Antique Trade Beads',
    category: 'Beadwork',
    price: 3000,
    description: 'Rare antique trade beads with a rich history, displayed on a red background.',
    image: 'images%20(12).jpeg',
    rating: 4.5,
    stock: 6
  },
  {
    id: '15',
    name: 'Beaded Wire Bowl',
    category: 'Decor',
    price: 2500,
    description: 'Hand-woven wire bowl interlaced with colorful beads. Functional art.',
    image: 'images%20(13).jpeg',
    rating: 4.7,
    stock: 10
  }
];

export const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2023-10-15', total: 12500, status: 'delivered', customer: 'Jane Doe' },
  { id: 'ORD-002', date: '2023-10-18', total: 4500, status: 'shipped', customer: 'John Smith' },
];
