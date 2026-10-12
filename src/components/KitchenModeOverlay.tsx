import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  GitFork, 
  ChefHat
} from 'lucide-react';
import { SplitMeal } from '../types/meal';
import { triggerConfetti } from '../utils/confetti';
import { playKitchenChime } from '../utils/audioHelper';

interface KitchenModeOverlayProps {
  meals: SplitMeal[];
  initialMealId?: string;
  onClose: () => void;
}

export const KitchenModeOverlay: React.FC<KitchenModeOverlayProps> = ({
  meals,
  initialMealId,
  onClose,
}) => {
  const [selectedMealIndex, setSelectedMealIndex] = useState<number>(() => {
    if (initialMealId) {
      const idx = meals.findIndex((m) => m.id === initialMealId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const activeMeal = meals[selectedMealIndex] || meals[0];
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Floating Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(activeMeal.cookTimeMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerConfetti();
      playKitchenChime();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const addTimerMinutes = (mins: number) => {
    setTimerSeconds((prev) => prev + mins * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const allSteps = [
    ...activeMeal.sharedBase.steps.map((text, i) => ({
      type: 'shared',
      title: `Shared Step ${i + 1}`,
      text,
      isSplit: false,
    })),
    {
      type: 'split',
      title: `The Split Moment (${activeMeal.splitMoment.timing})`,
      text: activeMeal.splitMoment.description,
      isSplit: true,
      ishan: activeMeal.splitMoment.ishanFork,
      moumita: activeMeal.splitMoment.moumitaFork,
    },
  ];

  const handleNextStep = () => {
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      triggerConfetti();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FBF9F5] dark:bg-slate-950 text-stone-900 dark:text-white flex flex-col overflow-hidden select-none animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 p-3 sm:p-5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-black shadow-md shadow-orange-500/20 shrink-0">
            <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-orange-700 dark:text-orange-400 truncate">
                🍳 Touch Kitchen Mode
              </span>
              <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700 hidden xs:inline">
                Hands-Friendly
              </span>
            </div>
            <h1 className="text-sm sm:text-xl md:text-2xl font-black text-stone-900 dark:text-white truncate max-w-[200px] xs:max-w-xs sm:max-w-md">
              {activeMeal.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Desktop Meal Switcher Buttons */}
          <div className="hidden md:flex items-center space-x-1 bg-stone-100 dark:bg-slate-950 p-1 rounded-xl border border-stone-200 dark:border-slate-800">
            {meals.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMealIndex(idx);
                  setCurrentStepIndex(0);
                  setTimerSeconds(m.cookTimeMinutes * 60);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedMealIndex === idx
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                {m.mealType}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-600 hover:text-stone-900 dark:text-slate-200 dark:hover:text-white transition-colors border border-stone-200 dark:border-slate-700 active:scale-95 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Exit Kitchen Mode"
            aria-label="Close Kitchen Mode"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Meal Switcher Bar */}
      <div className="md:hidden flex items-center space-x-1 overflow-x-auto scrollbar-none px-3 py-1.5 bg-stone-100/90 dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 touch-pan-x shrink-0">
        {meals.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMealIndex(idx);
              setCurrentStepIndex(0);
              setTimerSeconds(m.cookTimeMinutes * 60);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap touch-manipulation min-h-[30px] ${
              selectedMealIndex === idx
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
            }`}
          >
            {m.mealType}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 flex flex-col justify-between max-w-5xl mx-auto w-full">
        {/* Step Indicator & Timer Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-stone-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <span className="text-xs sm:text-base font-bold text-stone-500 dark:text-slate-400">
              Step {currentStepIndex + 1} of {allSteps.length}
            </span>
            <div className="flex space-x-1.5 ml-2">
              {allSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    i === currentStepIndex
                      ? 'bg-orange-500 scale-125 ring-2 ring-orange-400/40'
                      : i < currentStepIndex
                      ? 'bg-emerald-500'
                      : 'bg-stone-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Large Floating Kitchen Timer */}
          <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-3 bg-white dark:bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-stone-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-mono text-xl sm:text-3xl font-black text-stone-900 dark:text-amber-300">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-1.5 sm:p-2 rounded-xl text-white font-bold transition-all touch-manipulation ${
                  isTimerRunning ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
                aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => addTimerMinutes(1)}
                className="text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 px-2 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 touch-manipulation"
              >
                +1m
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(activeMeal.cookTimeMinutes * 60);
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-500 dark:text-slate-400 touch-manipulation"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Step Card (Huge Text for Kitchen Viewing) */}
        <div className="my-4 sm:my-6">
          {allSteps[currentStepIndex].type === 'shared' ? (
            <div className="bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 rounded-3xl p-4 sm:p-8 md:p-10 shadow-lg space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2.5 sm:space-x-3 text-amber-700 dark:text-amber-400">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center font-black text-sm sm:text-base border border-amber-300 dark:border-amber-500/30 shrink-0">
                  {currentStepIndex + 1}
                </span>
                <span className="font-bold text-xs sm:text-lg uppercase tracking-wider">
                  One-Pot Base Prep
                </span>
              </div>

              <p className="text-base sm:text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white leading-relaxed">
                {allSteps[currentStepIndex].text}
              </p>
            </div>
          ) : (
            /* SPLIT MOMENT SPECIAL STEP */
            <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/60 dark:via-slate-900 dark:to-orange-950/60 border-2 sm:border-4 border-amber-400 dark:border-amber-500 rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2.5 sm:space-x-3 text-amber-800 dark:text-amber-400">
                <GitFork className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3] shrink-0" />
                <span className="font-black text-xs sm:text-lg md:text-xl uppercase tracking-wider">
                  ⚠️ ATTENTION CHEF: SPLIT THE POT NOW!
                </span>
              </div>

              <p className="text-sm sm:text-xl md:text-2xl font-bold text-stone-900 dark:text-slate-100 leading-snug">
                {activeMeal.splitMoment.description}
              </p>

              {/* Fork Dual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 pt-1 sm:pt-2">
                {/* Ishan */}
                <div className="bg-white dark:bg-slate-950/90 border-2 border-emerald-300 dark:border-emerald-500/60 rounded-2xl p-3.5 sm:p-5 space-y-2 sm:space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-150 dark:border-slate-800">
                    <span className="text-sm sm:text-lg font-black text-emerald-800 dark:text-emerald-400">
                      👨🏽‍💼 Ishan’s Pot (Weight Loss)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {activeMeal.ishanPortion.calories} kcal
                    </span>
                  </div>
                  <p className="text-xs sm:text-base font-bold text-stone-900 dark:text-white">
                    {activeMeal.splitMoment.ishanFork.title}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                    {activeMeal.splitMoment.ishanFork.action}
                  </p>
                </div>

                {/* Moumita */}
                <div className="bg-white dark:bg-slate-950/90 border-2 border-orange-300 dark:border-orange-500/60 rounded-2xl p-3.5 sm:p-5 space-y-2 sm:space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-150 dark:border-slate-800">
                    <span className="text-sm sm:text-lg font-black text-orange-800 dark:text-orange-400">
                      👩🏽‍🍳 Moumita’s Pot (Surplus)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300">
                      {activeMeal.moumitaPortion.calories} kcal
                    </span>
                  </div>
                  <p className="text-xs sm:text-base font-bold text-stone-900 dark:text-white">
                    {activeMeal.splitMoment.moumitaFork.title}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                    {activeMeal.splitMoment.moumitaFork.action}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Big Navigation Buttons for Kitchen Hands */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 pt-3 sm:pt-4 border-t border-stone-200 dark:border-slate-800 pb-safe">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`py-3.5 sm:py-5 px-4 sm:px-6 rounded-2xl font-black text-sm sm:text-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 touch-manipulation min-h-[48px] ${
              currentStepIndex === 0
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200 dark:bg-slate-900 dark:text-slate-600 dark:border-slate-800'
                : 'bg-white hover:bg-stone-50 text-stone-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-stone-200 dark:border-slate-700 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNextStep}
            className="py-3.5 sm:py-5 px-4 sm:px-6 rounded-2xl font-black text-sm sm:text-xl flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all touch-manipulation min-h-[48px]"
          >
            <span>{currentStepIndex === allSteps.length - 1 ? 'Finish Dish 🎉' : 'Next Step'}</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
