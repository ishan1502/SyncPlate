import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ShiftTimelineBanner } from './components/ShiftTimelineBanner';
import { DualTrackMacrosCard } from './components/DualTrackMacrosCard';
import { MealCard } from './components/MealCard';
import { SplitRecipeModal } from './components/SplitRecipeModal';
import { ChefShiftPrepView } from './components/ChefShiftPrepView';
import { PantryChecklistView } from './components/PantryChecklistView';
import { KitchenModeOverlay } from './components/KitchenModeOverlay';
import { WEEKLY_SCHEDULE } from './data/weeklySchedule';
import { SplitMeal } from './types/meal';
import { getCurrentDayIndex } from './utils/dateHelper';

export function App() {
  // Smart Calendar Sync: Automatically reads device's current day of the week
  const initialTodayIndex = getCurrentDayIndex();
  const [currentDayIndex] = useState<number>(initialTodayIndex);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(initialTodayIndex);

  // Active view tabs
  const [activeTab, setActiveTab] = useState<'meals' | 'nutrition' | 'shiftSync' | 'pantry'>('meals');
  const [viewMode, setViewMode] = useState<'both' | 'ishan' | 'moumita'>('both');
  const [selectedMealTypeFilter, setSelectedMealTypeFilter] = useState<string>('all');

  // Modals & Overlays
  const [activeRecipeMeal, setActiveRecipeMeal] = useState<SplitMeal | null>(null);
  const [isKitchenModeOpen, setIsKitchenModeOpen] = useState<boolean>(false);

  // Theme state: defaults to false for natural warm light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('syncplate-theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('syncplate-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('syncplate-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Find the selected day's schedule
  const selectedDaySchedule =
    WEEKLY_SCHEDULE.find((s) => s.dayIndex === selectedDayIndex) || WEEKLY_SCHEDULE[0];

  const filteredMeals = selectedDaySchedule.meals.filter((m) => {
    if (selectedMealTypeFilter === 'all') return true;
    return m.mealType === selectedMealTypeFilter;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        currentDayIndex={currentDayIndex}
        selectedDayIndex={selectedDayIndex}
        onSelectDay={(idx) => setSelectedDayIndex(idx)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenKitchenMode={() => setIsKitchenModeOpen(true)}
      />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 md:pb-12 flex-1 w-full space-y-5 sm:space-y-6">
        {/* Contrasting Shift & Overlapping Logic Banner */}
        <ShiftTimelineBanner />

        {/* TAB 1: MEAL PLAN & RECIPES */}
        {activeTab === 'meals' && (
          <div className="space-y-5 sm:space-y-6">
            {/* Dual Track Macro Summary Bar */}
            <DualTrackMacrosCard
              daySchedule={selectedDaySchedule}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* Day Theme & Meal Filters Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Day Menu Theme
                  </span>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs font-bold text-stone-700 dark:text-slate-300">
                    {selectedDaySchedule.dayName}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                  {selectedDaySchedule.theme}
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 italic mt-0.5">
                  "{selectedDaySchedule.headlineQuote}"
                </p>
              </div>

              {/* Meal Filter Pills */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 bg-stone-100 dark:bg-slate-950 p-1 rounded-xl border border-stone-200/80 dark:border-slate-800 self-stretch md:self-auto overflow-x-auto scrollbar-none touch-pan-x -mx-1 px-1">
                {['all', 'Breakfast', 'Lunch', 'Evening Snack', 'Dinner'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMealTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap touch-manipulation min-h-[34px] flex items-center justify-center ${
                      selectedMealTypeFilter === type
                        ? 'bg-stone-900 text-white dark:bg-gradient-to-r dark:from-orange-600 dark:to-amber-600 shadow-xs'
                        : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {type === 'all' ? 'All 4 Meals' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {filteredMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onOpenRecipe={(m) => setActiveRecipeMeal(m)}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DUAL-TRACK NUTRITION DEEP DIVE */}
        {activeTab === 'nutrition' && (
          <div className="space-y-5 sm:space-y-6">
            <DualTrackMacrosCard
              daySchedule={selectedDaySchedule}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* Deep Breakdown per Meal Table */}
            <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-150 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-base sm:text-lg">
                    Meal-by-Meal Macro Breakdown ({selectedDaySchedule.dayName})
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    Side-by-side comparison of Calories, Protein, Carbs, and Fats for Ishan and Moumita
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">
                    👨🏽‍💼 Ishan: Deficit
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30">
                    👩🏽‍🍳 Moumita: Surplus
                  </span>
                </div>
              </div>

              {/* MOBILE VIEW: Card-based meal-by-meal breakdown (No side-scrolling required!) */}
              <div className="md:hidden mt-4 space-y-3.5">
                {selectedDaySchedule.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="p-3.5 rounded-2xl bg-stone-50/70 dark:bg-slate-950/70 border border-stone-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-slate-800/60 pb-2">
                      <span className="font-extrabold text-sm text-stone-900 dark:text-white">
                        {meal.mealType}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-slate-800 text-stone-700 dark:text-slate-300">
                        {meal.fusionTag}
                      </span>
                    </div>

                    {/* Ishan Plate Mobile */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-500/30">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-emerald-800 dark:text-emerald-400">
                          👨🏽‍💼 Ishan (Deficit)
                        </span>
                        <span className="font-black text-emerald-700 dark:text-emerald-300">
                          {meal.ishanPortion.calories} kcal
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-stone-800 dark:text-slate-200">
                        {meal.ishanPortion.dishName}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono font-bold text-stone-600 dark:text-slate-300">
                        <span className="text-sky-700 dark:text-sky-400">{meal.ishanPortion.protein}g Protein</span>
                        <span>·</span>
                        <span className="text-amber-700 dark:text-amber-300">{meal.ishanPortion.carbs}g Carbs</span>
                        <span>·</span>
                        <span className="text-emerald-700 dark:text-emerald-400">{meal.ishanPortion.fats}g Fats</span>
                      </div>
                    </div>

                    {/* Moumita Plate Mobile */}
                    <div className="p-2.5 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-500/30">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-orange-800 dark:text-orange-400">
                          👩🏽‍🍳 Moumita (Surplus)
                        </span>
                        <span className="font-black text-orange-700 dark:text-orange-300">
                          {meal.moumitaPortion.calories} kcal
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-stone-800 dark:text-slate-200">
                        {meal.moumitaPortion.dishName}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono font-bold text-stone-600 dark:text-slate-300">
                        <span className="text-sky-700 dark:text-sky-400">{meal.moumitaPortion.protein}g Protein</span>
                        <span>·</span>
                        <span className="text-amber-700 dark:text-amber-300">{meal.moumitaPortion.carbs}g Carbs</span>
                        <span>·</span>
                        <span className="text-orange-700 dark:text-orange-400">{meal.moumitaPortion.fats}g Fats</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block overflow-x-auto mt-4">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-slate-800 text-stone-500 dark:text-slate-400 font-semibold">
                      <th className="py-3 px-3">Meal</th>
                      <th className="py-3 px-3 text-emerald-800 dark:text-emerald-400 font-bold">Ishan's Dish</th>
                      <th className="py-3 px-3 text-emerald-800 dark:text-emerald-400 text-center font-bold">Ishan Cals</th>
                      <th className="py-3 px-3 text-emerald-800 dark:text-emerald-400 text-center font-bold">Ishan P / C / F</th>
                      <th className="py-3 px-3 text-orange-800 dark:text-orange-400 font-bold">Moumita's Dish</th>
                      <th className="py-3 px-3 text-orange-800 dark:text-orange-400 text-center font-bold">Moumita Cals</th>
                      <th className="py-3 px-3 text-orange-800 dark:text-orange-400 text-center font-bold">Moumita P / C / F</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150 dark:divide-slate-800/60">
                    {selectedDaySchedule.meals.map((meal) => (
                      <tr key={meal.id} className="hover:bg-stone-50/80 dark:hover:bg-slate-850/50 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                          {meal.mealType}
                        </td>
                        <td className="py-3.5 px-3 text-stone-800 dark:text-slate-200 font-medium">
                          {meal.ishanPortion.dishName}
                        </td>
                        <td className="py-3.5 px-3 text-center font-bold text-emerald-700 dark:text-emerald-400">
                          {meal.ishanPortion.calories} kcal
                        </td>
                        <td className="py-3.5 px-3 text-center text-stone-600 dark:text-slate-300 font-mono text-xs font-semibold">
                          {meal.ishanPortion.protein}g / {meal.ishanPortion.carbs}g / {meal.ishanPortion.fats}g
                        </td>
                        <td className="py-3.5 px-3 text-stone-800 dark:text-slate-200 font-medium">
                          {meal.moumitaPortion.dishName}
                        </td>
                        <td className="py-3.5 px-3 text-center font-bold text-orange-700 dark:text-orange-400">
                          {meal.moumitaPortion.calories} kcal
                        </td>
                        <td className="py-3.5 px-3 text-center text-stone-600 dark:text-slate-300 font-mono text-xs font-semibold">
                          {meal.moumitaPortion.protein}g / {meal.moumitaPortion.carbs}g / {meal.moumitaPortion.fats}g
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHEF'S SHIFT PREP SYNC */}
        {activeTab === 'shiftSync' && (
          <ChefShiftPrepView
            daySchedule={selectedDaySchedule}
            onOpenRecipeById={(mealId) => {
              const m = selectedDaySchedule.meals.find((meal) => meal.id === mealId);
              if (m) setActiveRecipeMeal(m);
            }}
          />
        )}

        {/* TAB 4: PANTRY & GROCERY CHECKLIST */}
        {activeTab === 'pantry' && <PantryChecklistView />}
      </main>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 mb-16 md:mb-0 border-t border-stone-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span className="text-lg">🍲</span>
            <span className="font-bold text-stone-800 dark:text-white">SyncPlate</span>
            <span>· Engineered for Ishan & Moumita</span>
          </div>
          <div className="flex flex-wrap items-center justify-center space-x-2 text-stone-400 dark:text-slate-500">
            <span>Guwahati Flavors × North Indian Classics</span>
            <span>·</span>
            <span>Split-Prep System</span>
          </div>
        </div>
      </footer>

      {/* Modal: Split Recipe Modal */}
      {activeRecipeMeal && (
        <SplitRecipeModal
          meal={activeRecipeMeal}
          onClose={() => setActiveRecipeMeal(null)}
        />
      )}

      {/* Modal: Fullscreen Kitchen Touch Mode */}
      {isKitchenModeOpen && (
        <KitchenModeOverlay
          meals={selectedDaySchedule.meals}
          initialMealId={selectedDaySchedule.meals[0]?.id}
          onClose={() => setIsKitchenModeOpen(false)}
        />
      )}
    </div>
  );
}
export default App;
