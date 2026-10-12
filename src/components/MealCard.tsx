import React from 'react';
import { 
  Clock, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  ChefHat, 
  Utensils, 
  Coffee, 
  Sun, 
  Sunset, 
  Moon, 
  Fish,
  Dumbbell
} from 'lucide-react';
import { SplitMeal } from '../types/meal';

interface MealCardProps {
  meal: SplitMeal;
  onOpenRecipe: (meal: SplitMeal) => void;
  viewMode: 'both' | 'ishan' | 'moumita';
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onOpenRecipe, viewMode }) => {
  const getMealIcon = () => {
    switch (meal.mealType) {
      case 'Breakfast':
        return <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Lunch':
        return <Sun className="w-4 h-4 text-orange-500 dark:text-yellow-400" />;
      case 'Evening Snack':
        return <Sunset className="w-4 h-4 text-rose-500 dark:text-orange-400" />;
      case 'Dinner':
        return <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Utensils className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const getMealTimeHint = () => {
    switch (meal.mealType) {
      case 'Breakfast':
        return '8:45 AM (Handover breakfast)';
      case 'Lunch':
        return '1:30 PM (Ishan Dabba / Moumita fuel)';
      case 'Evening Snack':
        return '5:00 PM (Desk crunch & tea)';
      case 'Dinner':
        return '8:15 PM (Ishan arrival / Moumita tiffin)';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 hover:border-amber-300/80 dark:hover:border-slate-700 rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-150 dark:border-slate-800">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shrink-0">
              {getMealIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base truncate">{meal.mealType}</span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border border-stone-200 dark:border-slate-700 shrink-0">
                  {meal.fusionTag}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-slate-400 truncate">{getMealTimeHint()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-stone-600 dark:text-slate-400 bg-stone-50 dark:bg-slate-950 px-2 sm:px-2.5 py-1 rounded-xl border border-stone-200/80 dark:border-slate-800 shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-bold text-stone-800 dark:text-slate-200">{meal.totalTimeMinutes}m</span>
            <span className="text-stone-400 hidden sm:inline">({meal.prepTimeMinutes}m prep + {meal.cookTimeMinutes}m cook)</span>
          </div>
        </div>

        {/* Meal Title & 1-Pot Shared Base Banner */}
        <div className="mt-3.5">
          <h3 className="font-extrabold text-stone-900 dark:text-slate-100 text-base sm:text-lg group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            {meal.title}
          </h3>

          <div className="mt-2.5 p-2.5 sm:p-3 rounded-2xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200/70 dark:border-slate-800 flex items-start gap-2.5 text-xs">
            <div className="p-1 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800 dark:text-slate-200">Shared Base (1 Pot):</span>
                <span className="text-[9px] sm:text-[10px] text-amber-700 dark:text-amber-400 font-extrabold uppercase tracking-wider">
                  Moumita Cooks Together
                </span>
              </div>
              <p className="text-stone-600 dark:text-slate-400 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                {meal.sharedBase.description}
              </p>
            </div>
          </div>
        </div>

        {/* Dual Track Plates */}
        <div
          className={`grid gap-3 mt-3.5 ${
            viewMode === 'both' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {/* ISHAN'S PLATE */}
          {(viewMode === 'both' || viewMode === 'ishan') && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-200/80 dark:border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <span>👨🏽‍💼 Ishan’s Plate</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                      Deficit
                    </span>
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-emerald-700 dark:text-emerald-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{meal.ishanPortion.calories} kcal</span>
                  </div>
                </div>

                <p className="font-bold text-stone-900 dark:text-slate-100 text-xs sm:text-sm mt-1 line-clamp-1">
                  {meal.ishanPortion.dishName}
                </p>

                <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {meal.ishanPortion.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-emerald-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-700 dark:text-slate-300 font-semibold">
                  <span className="flex items-center gap-0.5 sm:gap-1 text-sky-700 dark:text-sky-400 font-bold">
                    <Dumbbell className="w-3 h-3" /> {meal.ishanPortion.protein}g P
                  </span>
                  <span className="text-amber-700 dark:text-amber-300">{meal.ishanPortion.carbs}g C</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{meal.ishanPortion.fats}g F</span>
                </div>
                {meal.ishanPortion.packingNote && (
                  <p className="text-[10px] text-stone-500 dark:text-slate-500 italic mt-1 truncate">
                    🍱 {meal.ishanPortion.packingNote}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* MOUMITA'S PLATE */}
          {(viewMode === 'both' || viewMode === 'moumita') && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-orange-50/40 dark:bg-slate-950/80 border border-orange-200/80 dark:border-orange-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-800 dark:text-orange-400 flex items-center gap-1">
                    <span>👩🏽‍🍳 Moumita’s Plate</span>
                    {meal.moumitaMeatCheck && (
                      <span className="text-[9px] bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                        <Fish className="w-2.5 h-2.5" /> Non-Veg
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-orange-700 dark:text-orange-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{meal.moumitaPortion.calories} kcal</span>
                  </div>
                </div>

                <p className="font-bold text-stone-900 dark:text-slate-100 text-xs sm:text-sm mt-1 line-clamp-1">
                  {meal.moumitaPortion.dishName}
                </p>

                <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {meal.moumitaPortion.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-orange-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-700 dark:text-slate-300 font-semibold">
                  <span className="flex items-center gap-0.5 sm:gap-1 text-sky-700 dark:text-sky-400 font-bold">
                    <Dumbbell className="w-3 h-3" /> {meal.moumitaPortion.protein}g P
                  </span>
                  <span className="text-amber-700 dark:text-amber-300">{meal.moumitaPortion.carbs}g C</span>
                  <span className="text-orange-700 dark:text-orange-400">{meal.moumitaPortion.fats}g F</span>
                </div>
                {meal.moumitaPortion.packingNote && (
                  <p className="text-[10px] text-stone-500 dark:text-slate-500 italic mt-1 truncate">
                    🥡 {meal.moumitaPortion.packingNote}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button to Open Split-Prep Recipe Modal */}
      <div className="mt-4 pt-3.5 border-t border-stone-150 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span className="text-[11px] text-amber-800 dark:text-amber-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" /> Split: {meal.splitMoment.timing}
        </span>

        <button
          onClick={() => onOpenRecipe(meal)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs touch-manipulation min-h-[38px]"
        >
          <ChefHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Split Recipe & Steps</span>
          <ArrowRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>
    </div>
  );
};
