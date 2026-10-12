import React from 'react';
import { Flame, Dumbbell, Wheat, Droplets, ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DaySchedule } from '../types/meal';
import { PROFILES } from '../data/profiles';

interface DualTrackMacrosCardProps {
  daySchedule: DaySchedule;
  viewMode: 'both' | 'ishan' | 'moumita';
  setViewMode: (mode: 'both' | 'ishan' | 'moumita') => void;
}

export const DualTrackMacrosCard: React.FC<DualTrackMacrosCardProps> = ({
  daySchedule,
  viewMode,
  setViewMode,
}) => {
  // Compute totals for Ishan
  const ishanTotals = daySchedule.meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.ishanPortion.calories,
      protein: acc.protein + meal.ishanPortion.protein,
      carbs: acc.carbs + meal.ishanPortion.carbs,
      fats: acc.fats + meal.ishanPortion.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Compute totals for Moumita
  const moumitaTotals = daySchedule.meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.moumitaPortion.calories,
      protein: acc.protein + meal.moumitaPortion.protein,
      carbs: acc.carbs + meal.moumitaPortion.carbs,
      fats: acc.fats + meal.moumitaPortion.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Percentages against target
  const ishanCalPct = Math.min(100, Math.round((ishanTotals.calories / PROFILES.ishan.targetCalories) * 100));
  const moumitaCalPct = Math.min(100, Math.round((moumitaTotals.calories / PROFILES.moumita.targetCalories) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-3.5 sm:p-6 shadow-sm transition-all">
      {/* Top Controls & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-stone-150 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              Daily Macro & Calorie Summary
            </h2>
            <span className="text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
              {daySchedule.dayName}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400">
            Real-time nutritional comparison against individual goals
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-stone-100 dark:bg-slate-950 p-1 rounded-xl border border-stone-200/80 dark:border-slate-800 self-stretch sm:self-auto justify-between sm:justify-start">
          <button
            onClick={() => setViewMode('both')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center touch-manipulation min-h-[32px] ${
              viewMode === 'both'
                ? 'bg-gradient-to-r from-emerald-600 to-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="hidden sm:inline">Dual Track </span>Both
          </button>
          <button
            onClick={() => setViewMode('ishan')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 touch-manipulation min-h-[32px] ${
              viewMode === 'ishan'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
            }`}
          >
            <span>👨🏽‍💼 Ishan</span>
          </button>
          <button
            onClick={() => setViewMode('moumita')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 touch-manipulation min-h-[32px] ${
              viewMode === 'moumita'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
            }`}
          >
            <span>👩🏽‍🍳 Moumita</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-3.5 sm:gap-4 mt-3.5 sm:mt-4 ${
          viewMode === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* ISHAN'S CARD */}
        {(viewMode === 'both' || viewMode === 'ishan') && (
          <div className="bg-emerald-50/30 dark:bg-slate-950/70 border border-emerald-200/80 dark:border-emerald-500/30 rounded-2xl p-3.5 sm:p-5 relative overflow-hidden">
            <div className="flex items-start justify-between pb-3 border-b border-emerald-100 dark:border-slate-800 gap-2">
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                <span className="text-xl sm:text-2xl p-1 bg-white dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-2xs shrink-0">
                  👨🏽‍💼
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-stone-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                    <span className="truncate">Ishan’s Intake</span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 shrink-0">
                      Deficit
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 truncate">Pure Veg · Day Shift</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-base sm:text-xl font-black text-emerald-700 dark:text-emerald-400 flex items-center justify-end gap-1">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span>{ishanTotals.calories}</span>
                  <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 font-normal">/ {PROFILES.ishan.targetCalories} kcal</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  {ishanTotals.calories <= PROFILES.ishan.targetCalories ? '🎯 On Target Deficit' : 'Near Target'}
                </span>
              </div>
            </div>

            {/* Calorie Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-stone-700 dark:text-slate-300 mb-1">
                <span>Daily Energy Budget</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{ishanCalPct}% of {PROFILES.ishan.targetCalories} kcal</span>
              </div>
              <div className="w-full h-2 sm:h-2.5 bg-emerald-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${ishanCalPct}%` }}
                />
              </div>
            </div>

            {/* Macro Pill breakdown */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-center">
              <div className="bg-white dark:bg-slate-900/90 border border-emerald-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-sky-700 dark:text-sky-400 mb-0.5">
                  <Dumbbell className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Protein
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{ishanTotals.protein}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Goal: {PROFILES.ishan.targetProtein}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((ishanTotals.protein / PROFILES.ishan.targetProtein) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/90 border border-emerald-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-0.5">
                  <Wheat className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Carbs
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{ishanTotals.carbs}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Goal: {PROFILES.ishan.targetCarbs}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((ishanTotals.carbs / PROFILES.ishan.targetCarbs) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/90 border border-emerald-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">
                  <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Fats
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{ishanTotals.fats}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Max: {PROFILES.ishan.targetFats}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((ishanTotals.fats / PROFILES.ishan.targetFats) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-stone-600 dark:text-slate-400 flex items-start gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 p-2 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Deficit Strategy:</strong> Low saturated fat, lean paneer, sprouted legumes, and high-fiber grains for satiety.
              </span>
            </div>
          </div>
        )}

        {/* MOUMITA'S CARD */}
        {(viewMode === 'both' || viewMode === 'moumita') && (
          <div className="bg-orange-50/30 dark:bg-slate-950/70 border border-orange-200/80 dark:border-orange-500/30 rounded-2xl p-3.5 sm:p-5 relative overflow-hidden">
            <div className="flex items-start justify-between pb-3 border-b border-orange-100 dark:border-slate-800 gap-2">
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                <span className="text-xl sm:text-2xl p-1 bg-white dark:bg-orange-950/60 rounded-xl border border-orange-200 dark:border-orange-500/20 shadow-2xs shrink-0">
                  👩🏽‍🍳
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-stone-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                    <span className="truncate">Moumita’s Intake</span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30 shrink-0">
                      Surplus
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 truncate">The Chef · Non-Veg · Night Shift</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-base sm:text-xl font-black text-orange-700 dark:text-orange-400 flex items-center justify-end gap-1">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span>{moumitaTotals.calories}</span>
                  <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 font-normal">/ {PROFILES.moumita.targetCalories} kcal</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-orange-700 dark:text-orange-300">
                  {moumitaTotals.calories >= 2200 ? '💪 Clean Surplus' : 'Fueling Up'}
                </span>
              </div>
            </div>

            {/* Calorie Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-stone-700 dark:text-slate-300 mb-1">
                <span>Daily Energy Intake</span>
                <span className="text-orange-700 dark:text-orange-400 font-bold">{moumitaCalPct}% of {PROFILES.moumita.targetCalories} kcal</span>
              </div>
              <div className="w-full h-2 sm:h-2.5 bg-orange-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${moumitaCalPct}%` }}
                />
              </div>
            </div>

            {/* Macro Pill breakdown */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-center">
              <div className="bg-white dark:bg-slate-900/90 border border-orange-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-sky-700 dark:text-sky-400 mb-0.5">
                  <Dumbbell className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Protein
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{moumitaTotals.protein}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Goal: {PROFILES.moumita.targetProtein}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((moumitaTotals.protein / PROFILES.moumita.targetProtein) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/90 border border-orange-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-0.5">
                  <Wheat className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Carbs
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{moumitaTotals.carbs}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Goal: {PROFILES.moumita.targetCarbs}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((moumitaTotals.carbs / PROFILES.moumita.targetCarbs) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900/90 border border-orange-200/60 dark:border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-orange-700 dark:text-orange-400 mb-0.5">
                  <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Lipids
                </div>
                <p className="text-sm sm:text-lg font-black text-stone-900 dark:text-white">{moumitaTotals.fats}g</p>
                <p className="text-[9px] sm:text-[10px] text-stone-500 dark:text-slate-400">Goal: {PROFILES.moumita.targetFats}g</p>
                <div className="w-full h-1 bg-stone-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((moumitaTotals.fats / PROFILES.moumita.targetFats) * 100))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-stone-600 dark:text-slate-400 flex items-start gap-1.5 bg-orange-50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 p-2 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
              <span>
                <strong>Surplus Strategy:</strong> River fish (Rohu), chicken thighs, eggs, mustard oil, ghee, and joha rice for muscle mass and stamina.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
