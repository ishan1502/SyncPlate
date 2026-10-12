import { GroceryItem } from '../types/meal';

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  // Base Staples & Grains
  { id: 'g1', name: 'Aged Basmati Rice', quantity: '1.5 kg', category: 'Base Staples & Grains', checked: false, usedInDays: ['Tue', 'Thu', 'Sun'] },
  { id: 'g2', name: 'Assamese Joha Rice (Fragrant heirloom)', quantity: '1 kg', category: 'Base Staples & Grains', checked: false, usedInDays: ['Mon', 'Wed', 'Fri', 'Sat'] },
  { id: 'g3', name: 'Whole Wheat Flour (Chakki Atta)', quantity: '2 kg', category: 'Base Staples & Grains', checked: false, usedInDays: ['Mon', 'Tue', 'Wed', 'Sat'] },
  { id: 'g4', name: 'Thick Poha & Red Chira (Bora Saul)', quantity: '500g', category: 'Base Staples & Grains', checked: false, usedInDays: ['Mon', 'Wed'] },
  { id: 'g5', name: 'Kashmiri Rajma & Black Urad Dal', quantity: '500g each', category: 'Base Staples & Grains', checked: false, usedInDays: ['Tue', 'Thu'] },
  { id: 'g6', name: 'Yellow Moong & Red Masoor Dal', quantity: '500g each', category: 'Base Staples & Grains', checked: false, usedInDays: ['Mon', 'Thu', 'Sun'] },
  { id: 'g7', name: 'Assamese Mati Mah (Whole Black Gram)', quantity: '300g', category: 'Base Staples & Grains', checked: false, usedInDays: ['Wed'] },
  { id: 'g8', name: 'Broken Wheat (Dalia) & Coarse Suji', quantity: '500g each', category: 'Base Staples & Grains', checked: false, usedInDays: ['Fri', 'Sun'] },
  { id: 'g9', name: 'Roasted Phool Makhana & Murmura', quantity: '250g each', category: 'Base Staples & Grains', checked: false, usedInDays: ['Mon', 'Fri', 'Sat'] },

  // Fresh Produce
  { id: 'g10', name: 'Ripe Country Tomatoes (Bilahi)', quantity: '2 kg', category: 'Fresh Produce', checked: false, usedInDays: ['Mon', 'Tue', 'Thu', 'Fri'] },
  { id: 'g11', name: 'Red Onions & Garlic', quantity: '2 kg onions, 250g garlic', category: 'Fresh Produce', checked: false, usedInDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  { id: 'g12', name: 'Raw Green Papaya (Omita for Khar)', quantity: '1 medium (700g)', category: 'Fresh Produce', checked: false, usedInDays: ['Wed'] },
  { id: 'g13', name: 'Banana Flower (Koldil)', quantity: '1 whole cleaned', category: 'Fresh Produce', checked: false, usedInDays: ['Wed'] },
  { id: 'g14', name: 'Fresh Spinach (Palak)', quantity: '1 kg', category: 'Fresh Produce', checked: false, usedInDays: ['Mon', 'Sun'] },
  { id: 'g15', name: 'Eggplants (Large Bharta variety)', quantity: '3 large (1 kg)', category: 'Fresh Produce', checked: false, usedInDays: ['Fri'] },
  { id: 'g16', name: 'Baby Potatoes & Regular Potatoes', quantity: '1.5 kg', category: 'Fresh Produce', checked: false, usedInDays: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'] },
  { id: 'g17', name: 'Assamese Kaji Nemu (Aromatic Lemons)', quantity: '6 pieces', category: 'Fresh Produce', checked: false, usedInDays: ['Mon', 'Tue', 'Fri', 'Sat'] },
  { id: 'g18', name: 'Cauliflower & Green Peas', quantity: '1 head gobhi, 500g peas', category: 'Fresh Produce', checked: false, usedInDays: ['Thu', 'Sat', 'Sun'] },

  // Ishan's Veg Protein (Calorie Deficit Focus)
  { id: 'g19', name: 'Low-Fat Fresh Paneer', quantity: '800g (batch)', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Mon', 'Tue', 'Fri', 'Sat', 'Sun'] },
  { id: 'g20', name: 'Sprouted Green Moong Beans', quantity: '300g', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Mon', 'Tue'] },
  { id: 'g21', name: 'High-Protein Textured Soya Chunks', quantity: '200g', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Thu'] },
  { id: 'g22', name: 'Roasted Bengal Gram Sattu', quantity: '250g', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Thu'] },
  { id: 'g23', name: 'Greek Yogurt / Low-fat Dahi', quantity: '1 kg', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Tue', 'Wed', 'Thu', 'Sun'] },
  { id: 'g24', name: 'Roasted Soya Nuts (Desk Snack)', quantity: '150g', category: 'Ishan Veg Protein', checked: false, usedInDays: ['Tue'] },

  // Moumita's Non-Veg & Seafood (Caloric Surplus Focus)
  { id: 'g25', name: 'Fresh River Rohu Fish Steaks', quantity: '700g (Mon & Sun)', category: 'Moumita Non-Veg & Seafood', checked: false, usedInDays: ['Mon', 'Wed', 'Sun'] },
  { id: 'g26', name: 'Katla / Hilsa Fish Steaks', quantity: '500g (Fri)', category: 'Moumita Non-Veg & Seafood', checked: false, usedInDays: ['Fri'] },
  { id: 'g27', name: 'Chicken Thighs (Bone-in & Boneless)', quantity: '1.2 kg', category: 'Moumita Non-Veg & Seafood', checked: false, usedInDays: ['Mon', 'Tue', 'Sat', 'Sun'] },
  { id: 'g28', name: 'Minced Chicken Keema', quantity: '600g', category: 'Moumita Non-Veg & Seafood', checked: false, usedInDays: ['Tue', 'Wed', 'Thu'] },
  { id: 'g29', name: 'Farm Fresh Brown Eggs', quantity: '2 dozen (24 pcs)', category: 'Moumita Non-Veg & Seafood', checked: false, usedInDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sun'] },

  // Spices & Assamese Specialties
  { id: 'g30', name: 'Assamese Panch Phoron (5-Spice blend)', quantity: '100g', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Mon', 'Wed', 'Sun'] },
  { id: 'g31', name: 'Assamese Kolakhar or Baking Soda', quantity: '1 bottle / 100g', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Wed'] },
  { id: 'g32', name: 'Black Sesame Seeds (Kola Til)', quantity: '250g', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Sat'] },
  { id: 'g33', name: 'Yellow Mustard Seeds (Xoriyoh)', quantity: '200g', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Fri'] },
  { id: 'g34', name: 'Liquid Date-Palm Jaggery (Nolen Gur)', quantity: '250ml', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Wed'] },
  { id: 'g35', name: 'Assam CTC Black Tea Leaves', quantity: '500g', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Tue', 'Sat'] },
  { id: 'g36', name: 'Kasuri Methi & Kashmiri Deghi Mirch', quantity: '100g each', category: 'Spices & Assamese Specialties', checked: false, usedInDays: ['Tue', 'Thu', 'Sat'] },

  // Healthy Fats & Dairy
  { id: 'g37', name: 'Pure Cold-Pressed Kachi Ghani Mustard Oil', quantity: '1.5 L', category: 'Healthy Fats & Dairy', checked: false, usedInDays: ['Mon', 'Wed', 'Fri', 'Sat'] },
  { id: 'g38', name: 'Pure Desi Cow Ghee', quantity: '500g', category: 'Healthy Fats & Dairy', checked: false, usedInDays: ['Tue', 'Thu', 'Sat', 'Sun'] },
  { id: 'g39', name: 'Churned White Butter (Makhan)', quantity: '200g', category: 'Healthy Fats & Dairy', checked: false, usedInDays: ['Thu'] },
  { id: 'g40', name: 'Cashews, Almonds & Walnuts', quantity: '250g each', category: 'Healthy Fats & Dairy', checked: false, usedInDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sun'] },
  { id: 'g41', name: 'Creamy Natural Peanut Butter', quantity: '1 jar (350g)', category: 'Healthy Fats & Dairy', checked: false, usedInDays: ['Thu'] },
];
