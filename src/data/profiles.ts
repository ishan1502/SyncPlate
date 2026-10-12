import { UserDietProfile } from '../types/meal';

export const PROFILES: Record<'ishan' | 'moumita', UserDietProfile> = {
  ishan: {
    id: 'ishan',
    name: 'Ishan',
    avatar: '👨🏽‍💼',
    role: 'Day-Shifter & Mindful Eater',
    badge: 'Calorie Deficit · Pure Veg',
    shiftTitle: 'Day Shift (Away 9:50 AM – 8:10 PM)',
    shiftHours: '9:50 AM – 8:10 PM',
    shiftWindow: {
      start: '09:50',
      end: '20:10',
      isAway: true,
    },
    targetCalories: 1700,
    targetProtein: 85,
    targetCarbs: 180,
    targetFats: 45,
    dietType: 'Strictly Vegetarian',
    cuisinePreference: 'North Indian Comfort & High-Protein Tawa',
    goal: 'Weight Loss (Caloric Deficit -350 kcal)',
    accentColor: '#10b981', // Emerald
    tagline: 'High fiber & plant protein, zero excess oil, pre-packed office lunches.',
  },
  moumita: {
    id: 'moumita',
    name: 'Moumita',
    avatar: '👩🏽‍🍳',
    role: 'The Chef & Night Shift Warrior',
    badge: 'Calorie Surplus · Non-Veg',
    shiftTitle: 'Night Shift (Away 9:30 PM – 8:30 AM)',
    shiftHours: '9:30 PM – 8:30 AM',
    shiftWindow: {
      start: '21:30',
      end: '08:30',
      isAway: true,
    },
    targetCalories: 2500,
    targetProtein: 110,
    targetCarbs: 290,
    targetFats: 85,
    dietType: 'Non-Vegetarian',
    cuisinePreference: 'Assamese Heritage (Guwahati Flavors & Mustard Aromatics)',
    goal: 'Weight Gain (Caloric Surplus +400 kcal & Lean Muscle)',
    accentColor: '#f97316', // Vibrant Orange / Warm Coral
    tagline: 'Sole chef balance: overlapping bases, rich healthy fats, freshwater fish & eggs.',
  },
};
