export interface UserDietProfile {
  id: 'ishan' | 'moumita';
  name: string;
  avatar: string;
  role: string;
  badge: string;
  shiftTitle: string;
  shiftHours: string;
  shiftWindow: {
    start: string;
    end: string;
    isAway: boolean;
  };
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  dietType: 'Strictly Vegetarian' | 'Non-Vegetarian';
  cuisinePreference: string;
  goal: string;
  accentColor: string;
  tagline: string;
}

export interface MealPortion {
  dishName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
  specialPrep: string;
  ingredients: string[];
  packingNote?: string;
}

export interface SharedBaseRecipe {
  name: string;
  description: string;
  ingredients: {
    item: string;
    amount: string;
    category: 'Staple' | 'Produce' | 'Spices' | 'Pantry';
  }[];
  steps: string[];
}

export interface SplitMoment {
  description: string;
  timing: string; // e.g. "At 18 min mark (when tomato base is half cooked)"
  ishanFork: {
    title: string;
    action: string;
    addons: string[];
    calorieControlStrategy: string;
  };
  moumitaFork: {
    title: string;
    action: string;
    addons: string[];
    surplusBoostStrategy: string;
  };
}

export interface SplitMeal {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Evening Snack' | 'Dinner';
  title: string;
  fusionTag: string; // e.g., "Assamese × North Indian Split"
  baseCuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  sharedBase: SharedBaseRecipe;
  splitMoment: SplitMoment;
  ishanPortion: MealPortion;
  moumitaPortion: MealPortion;
  chefTimeSaverTip: string;
  kitchenTags: string[];
  moumitaMeatCheck: boolean; // Indicates if Moumita portion includes fish/meat/egg
}

export interface ChefPrepTask {
  id: string;
  timeWindow: string; // e.g. "5:00 PM – 6:15 PM"
  title: string;
  subtitle: string;
  priority: 'High' | 'Medium' | 'Essential';
  targetMeals: string[];
  tasks: {
    id: string;
    label: string;
    detail: string;
    forWho: 'Ishan' | 'Moumita' | 'Both';
    completed?: boolean;
  }[];
}

export interface DaySchedule {
  dayIndex: number; // 0 = Sunday, 1 = Monday, etc.
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  theme: string;
  headlineQuote: string;
  meals: SplitMeal[];
  chefShiftPrep: ChefPrepTask[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: 'Base Staples & Grains' | 'Fresh Produce' | 'Ishan Veg Protein' | 'Moumita Non-Veg & Seafood' | 'Spices & Assamese Specialties' | 'Healthy Fats & Dairy';
  checked: boolean;
  usedInDays: string[];
}
