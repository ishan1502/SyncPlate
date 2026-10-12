import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  GitFork, 
  Check, 
  ChefHat, 
  Sparkles, 
  Lightbulb, 
  Fish, 
  Play, 
  Pause, 
  RotateCcw
} from 'lucide-react';
import { SplitMeal } from '../types/meal';
import { triggerConfetti } from '../utils/confetti';
import { playKitchenChime } from '../utils/audioHelper';

interface SplitRecipeModalProps {
  meal: SplitMeal | null;
  onClose: () => void;
  isKitchenModeInitial?: boolean;
}

export const SplitRecipeModal: React.FC<SplitRecipeModalProps> = ({
  meal,
  onClose,
  isKitchenModeInitial = false,
}) => {
  if (!meal) return null;

  const [isKitchenMode, setIsKitchenMode] = useState<boolean>(isKitchenModeInitial);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  
  // Kitchen timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(meal.cookTimeMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTimerPreset, setActiveTimerPreset] = useState<number>(meal.cookTimeMinutes);

  // Timer interval effect
  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerConfetti();
      playKitchenChime();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const setPresetTimer = (mins: number) => {
    setIsTimerRunning(false);
    setActiveTimerPreset(mins);
    setTimerSeconds(mins * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleIngredient = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStep = (key: string) => {
    setCheckedSteps((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Check if all shared steps completed
      const totalSteps = meal.sharedBase.steps.length;
      const checkedCount = Object.values(next).filter(Boolean).length;
      if (checkedCount === totalSteps) {
        triggerConfetti();
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className={`bg-white dark:bg-slate-900 border-t sm:border border-stone-200 dark:border-slate-700 rounded-t-3xl sm:rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh] ${
          isKitchenMode ? 'text-lg ring-4 ring-orange-500/40' : 'text-sm'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="bg-stone-50 dark:bg-slate-950 p-3.5 sm:p-5 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 shrink-0">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30">
                  {meal.mealType}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-stone-150 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
                  {meal.fusionTag}
                </span>
                {isKitchenMode && (
                  <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1 animate-pulse">
                    👨🏽‍🍳 Kitchen Mode
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-2xl font-black text-stone-900 dark:text-white mt-0.5 truncate max-w-[220px] xs:max-w-sm sm:max-w-xl">
                {meal.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <button
              onClick={() => setIsKitchenMode(!isKitchenMode)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 touch-manipulation min-h-[36px] ${
                isKitchenMode
                  ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/20'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border-stone-250 dark:border-slate-700'
              }`}
              title="Toggle Kitchen Large Text Mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">{isKitchenMode ? 'Standard Text' : 'Kitchen Mode (Large)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white transition-colors border border-stone-200 dark:border-slate-700 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close recipe modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 flex-1 bg-[#FAF8F5] dark:bg-slate-900">
          {/* Quick Metrics & Kitchen Assistant Timer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Cooking Timing Badges */}
            <div className="bg-white dark:bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-stone-200/90 dark:border-slate-800 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 block font-medium">Prep Time</span>
                <span className="text-base sm:text-xl font-black text-amber-700 dark:text-amber-400">{meal.prepTimeMinutes} min</span>
              </div>
              <div className="h-7 sm:h-8 w-px bg-stone-200 dark:bg-slate-800" />
              <div>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 block font-medium">Cook Time</span>
                <span className="text-base sm:text-xl font-black text-orange-700 dark:text-orange-400">{meal.cookTimeMinutes} min</span>
              </div>
              <div className="h-7 sm:h-8 w-px bg-stone-200 dark:bg-slate-800" />
              <div>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 block font-medium">Total Time</span>
                <span className="text-base sm:text-xl font-black text-emerald-700 dark:text-emerald-400">{meal.totalTimeMinutes} min</span>
              </div>
            </div>

            {/* Built-in Chef's Kitchen Timer */}
            <div className="bg-white dark:bg-slate-950 p-3 sm:p-3.5 rounded-2xl border border-amber-300 dark:border-amber-500/30 flex items-center justify-between gap-2.5 sm:gap-3 shadow-xs">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Kitchen Timer
                </span>
                <div className="text-xl sm:text-3xl font-mono font-black text-stone-900 dark:text-white tracking-wider mt-0.5">
                  {formatTimer(timerSeconds)}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center space-x-1">
                  {[5, 10, meal.cookTimeMinutes].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setPresetTimer(mins)}
                      className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md font-bold transition-all touch-manipulation ${
                        activeTimerPreset === mins
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all touch-manipulation ${
                      isTimerRunning
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(activeTimerPreset * 60);
                    }}
                    className="p-1 rounded-xl bg-stone-150 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-600 dark:text-slate-400 touch-manipulation"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: THE SHARED BASE (1-Pot Master Prep) */}
          <div className="bg-white dark:bg-slate-950/90 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-150 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center font-black text-sm">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-base sm:text-lg">
                    The Shared Base: {meal.sharedBase.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    Cook this together in one single pot/kadai to save kitchen time!
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border border-stone-200 dark:border-slate-700">
                1-Pot Prep
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 mt-3 italic bg-amber-50/50 dark:bg-slate-900/60 p-3 rounded-2xl border border-amber-200/60 dark:border-slate-800 leading-relaxed">
              "{meal.sharedBase.description}"
            </p>

            {/* Shared Ingredients Checklist */}
            <div className="mt-4">
              <span className="text-xs font-bold text-stone-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Shared Ingredients (Touch to Check Off):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {meal.sharedBase.ingredients.map((ing, i) => {
                  const key = `base-ing-${i}`;
                  const isChecked = !!checkedIngredients[key];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleIngredient(key)}
                      className={`text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-stone-400 line-through dark:bg-emerald-950/20 dark:border-emerald-500/40'
                          : 'bg-stone-50 dark:bg-slate-900/80 border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'border-stone-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold truncate">{ing.item}</span>
                      </div>
                      <span className="text-xs text-amber-700 dark:text-amber-400 font-bold shrink-0 ml-2">
                        {ing.amount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shared Cooking Steps */}
            <div className="mt-4 pt-3 border-t border-stone-150 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-stone-700 dark:text-slate-300 uppercase tracking-wider block">
                One-Pot Master Steps:
              </span>
              {meal.sharedBase.steps.map((step, idx) => {
                const stepKey = `base-step-${idx}`;
                const isStepChecked = !!checkedSteps[stepKey];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleStep(stepKey)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      isStepChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-stone-400 line-through dark:bg-emerald-950/20 dark:border-emerald-500/30'
                        : 'bg-stone-50/80 dark:bg-slate-900/90 border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border mt-0.5 shrink-0 transition-all ${
                        isStepChecked
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-stone-300 bg-white dark:border-slate-600 dark:bg-slate-800 text-stone-600 dark:text-slate-400 text-xs font-bold'
                      }`}
                    >
                      {isStepChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">{step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: THE SPLIT MOMENT (CRITICAL BRANCH) */}
          <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 dark:from-amber-950/40 dark:via-orange-950/40 border-2 border-amber-300 dark:border-amber-500/50 rounded-3xl p-4 sm:p-5 relative shadow-xs overflow-hidden">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-2xl bg-amber-500 text-white dark:text-slate-950 shrink-0 mt-0.5 shadow-xs">
                <GitFork className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-black text-amber-900 dark:text-amber-300 text-base sm:text-lg flex items-center gap-2">
                    The Split Moment (Dish Separates Here!)
                  </h3>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30">
                    ⏱️ {meal.splitMoment.timing}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-200 mt-1 font-medium leading-relaxed">
                  {meal.splitMoment.description}
                </p>
              </div>
            </div>

            {/* Split Fork Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* ISHAN'S BRANCH */}
              <div className="bg-white dark:bg-slate-950/90 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-150 dark:border-slate-800">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                      👨🏽‍💼 Ishan’s Fork
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 px-2 py-0.2 rounded font-bold">
                        Weight Loss · Pure Veg
                      </span>
                    </span>
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                      {meal.ishanPortion.calories} kcal
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 dark:text-white text-sm mt-2">
                    {meal.splitMoment.ishanFork.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {meal.splitMoment.ishanFork.action}
                  </p>

                  <div className="mt-2.5">
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                      Add-ons into Ishan’s Pot:
                    </span>
                    <ul className="text-xs text-stone-700 dark:text-slate-300 mt-1 space-y-1 list-disc list-inside">
                      {meal.splitMoment.ishanFork.addons.map((add, i) => (
                        <li key={i}>{add}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-slate-800 text-[11px] text-emerald-900 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/20 p-2 rounded-xl">
                  <strong>Deficit Control:</strong> {meal.splitMoment.ishanFork.calorieControlStrategy}
                </div>
              </div>

              {/* MOUMITA'S BRANCH */}
              <div className="bg-white dark:bg-slate-950/90 border border-orange-300 dark:border-orange-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-150 dark:border-slate-800">
                    <span className="text-xs font-bold text-orange-800 dark:text-orange-400 flex items-center gap-1">
                      👩🏽‍🍳 Moumita’s Fork
                      <span className="text-[10px] bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 px-2 py-0.2 rounded font-bold flex items-center gap-0.5">
                        {meal.moumitaMeatCheck && <Fish className="w-2.5 h-2.5" />} Weight Gain · Surplus
                      </span>
                    </span>
                    <span className="text-xs font-black text-orange-700 dark:text-orange-400">
                      {meal.moumitaPortion.calories} kcal
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 dark:text-white text-sm mt-2">
                    {meal.splitMoment.moumitaFork.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {meal.splitMoment.moumitaFork.action}
                  </p>

                  <div className="mt-2.5">
                    <span className="text-[10px] font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider block">
                      Add-ons into Moumita’s Pot:
                    </span>
                    <ul className="text-xs text-stone-700 dark:text-slate-300 mt-1 space-y-1 list-disc list-inside">
                      {meal.splitMoment.moumitaFork.addons.map((add, i) => (
                        <li key={i}>{add}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-orange-100 dark:border-slate-800 text-[11px] text-orange-900 dark:text-orange-300 bg-orange-50/80 dark:bg-orange-950/20 p-2 rounded-xl">
                  <strong>Surplus Boost:</strong> {meal.splitMoment.moumitaFork.surplusBoostStrategy}
                </div>
              </div>
            </div>
          </div>

          {/* CHEF TIME SAVER TIP */}
          <div className="bg-amber-50/70 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                Moumita’s Shift-Saver Tip:
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                {meal.chefTimeSaverTip}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-stone-50 dark:bg-slate-950 p-3.5 sm:p-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between shrink-0 pb-safe">
          <div className="text-xs text-stone-500 dark:text-slate-400 hidden sm:block font-medium">
            <span>Tap any step above to strike off as you cook in the kitchen.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 touch-manipulation min-h-[44px]"
          >
            Done Viewing Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
