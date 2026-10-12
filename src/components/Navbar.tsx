import React from 'react';
import { 
  Calendar, 
  UtensilsCrossed, 
  Clock, 
  ShoppingCart, 
  BarChart3, 
  Sun, 
  Moon, 
  ChefHat, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getFormattedCurrentDate } from '../utils/dateHelper';

interface NavbarProps {
  currentDayIndex: number;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
  activeTab: 'meals' | 'nutrition' | 'shiftSync' | 'pantry';
  setActiveTab: (tab: 'meals' | 'nutrition' | 'shiftSync' | 'pantry') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenKitchenMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDayIndex,
  selectedDayIndex,
  onSelectDay,
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  onOpenKitchenMode,
}) => {
  const currentDateStr = getFormattedCurrentDate();
  const days = [
    { name: 'Mon', index: 1, full: 'Monday' },
    { name: 'Tue', index: 2, full: 'Tuesday' },
    { name: 'Wed', index: 3, full: 'Wednesday' },
    { name: 'Thu', index: 4, full: 'Thursday' },
    { name: 'Fri', index: 5, full: 'Friday' },
    { name: 'Sat', index: 6, full: 'Saturday' },
    { name: 'Sun', index: 0, full: 'Sunday' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-slate-900/90 border-b border-stone-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Top Header Row */}
          <div className="flex items-center justify-between h-14 sm:h-20 border-b border-stone-150 dark:border-slate-800/60">
            {/* Logo & Title */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-orange-500 p-0.5 shadow-md shadow-emerald-500/15 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#FAF8F5] dark:bg-slate-950 rounded-[14px] flex items-center justify-center text-lg sm:text-2xl">
                  🍲
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-1">
                    Sync<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-600 dark:from-emerald-400 dark:via-teal-300 dark:to-orange-400">Plate</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30 flex items-center gap-0.5 sm:gap-1">
                    <Sparkles className="w-2.5 h-2.5 shrink-0" />
                    <span className="hidden xs:inline">Split-Prep</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 hidden sm:block">
                  Smart Couple Meal Planner · Ishan & Moumita
                </p>
              </div>
            </div>

            {/* Calendar Auto-Sync Pill & Controls */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* Auto-Sync Today Badge */}
              <div className="hidden lg:flex items-center space-x-2 bg-stone-100/90 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700/60 rounded-full px-3 py-1.5 text-xs text-stone-700 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-stone-600 dark:text-slate-300">Device Synced:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{currentDateStr}</span>
              </div>

              {/* Quick Kitchen Mode Button */}
              {onOpenKitchenMode && (
                <button
                  onClick={onOpenKitchenMode}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/20 transition-all active:scale-95 touch-manipulation min-h-[36px]"
                  title="Open touch-friendly Kitchen Mode"
                  aria-label="Cook Mode"
                >
                  <ChefHat className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Cook Mode</span>
                </button>
              )}

              {/* Dark / Light Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 transition-colors border border-stone-200 dark:border-slate-700 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              </button>
            </div>
          </div>

          {/* Day Selector Bar & Desktop Views */}
          <div className="py-2 sm:py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            {/* Day Selector Buttons with smooth horizontal scroll */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-1 px-1 touch-pan-x">
              {days.map((day) => {
                const isSelected = selectedDayIndex === day.index;
                const isToday = currentDayIndex === day.index;
                return (
                  <button
                    key={day.name}
                    onClick={() => onSelectDay(day.index)}
                    className={`relative flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 touch-manipulation min-h-[34px] ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-500/20'
                        : 'bg-stone-100/90 text-stone-600 hover:bg-stone-200 hover:text-stone-900 border border-stone-200/80 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span>{day.name}</span>
                    {isToday && (
                      <span
                        className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded-full font-extrabold ${
                          isSelected
                            ? 'bg-white text-emerald-800'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                        }`}
                      >
                        Today
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Jump to Today Button */}
              {selectedDayIndex !== currentDayIndex && (
                <button
                  onClick={() => onSelectDay(currentDayIndex)}
                  className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl px-2.5 py-1.5 transition-colors whitespace-nowrap flex items-center gap-1 ml-1 touch-manipulation min-h-[34px]"
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span className="hidden xs:inline">Snap to Today</span>
                  <span className="xs:hidden">Today</span>
                </button>
              )}
            </div>

            {/* Desktop Navigation Tabs (Hidden on mobile, bottom dock used instead) */}
            <div className="hidden md:flex items-center bg-stone-100 dark:bg-slate-950/70 p-1 rounded-xl border border-stone-200/80 dark:border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('meals')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'meals'
                    ? 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Meal Plan</span>
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'nutrition'
                    ? 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Dual Macros</span>
              </button>
              <button
                onClick={() => setActiveTab('shiftSync')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'shiftSync'
                    ? 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Shift Prep Sync</span>
              </button>
              <button
                onClick={() => setActiveTab('pantry')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'pantry'
                    ? 'bg-white dark:bg-slate-800 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                <span>Pantry</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Native mobile feel, iOS safe-area aware) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-stone-200/90 dark:border-slate-800/90 pb-safe shadow-2xl transition-colors"
      >
        <div className="grid grid-cols-5 items-center px-1.5 py-1">
          {/* 1. Meal Plan */}
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all touch-manipulation min-h-[48px] ${
              activeTab === 'meals'
                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'meals' ? 'bg-emerald-100 dark:bg-emerald-950/60' : ''}`}>
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Meals</span>
          </button>

          {/* 2. Dual Macros */}
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all touch-manipulation min-h-[48px] ${
              activeTab === 'nutrition'
                ? 'text-cyan-700 dark:text-cyan-400 font-bold'
                : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'nutrition' ? 'bg-cyan-100 dark:bg-cyan-950/60' : ''}`}>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Macros</span>
          </button>

          {/* 3. Cook Mode Center Quick Action */}
          <div className="flex flex-col items-center justify-center">
            {onOpenKitchenMode && (
              <button
                onClick={onOpenKitchenMode}
                className="flex flex-col items-center justify-center -mt-3.5 touch-manipulation"
                aria-label="Open Cook Mode"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/35 border-2 border-white dark:border-slate-900 active:scale-90 transition-all">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-orange-700 dark:text-orange-400 mt-0.5 tracking-tight">
                  Cook
                </span>
              </button>
            )}
          </div>

          {/* 4. Shift Prep */}
          <button
            onClick={() => setActiveTab('shiftSync')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all touch-manipulation min-h-[48px] ${
              activeTab === 'shiftSync'
                ? 'text-orange-700 dark:text-orange-400 font-bold'
                : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'shiftSync' ? 'bg-orange-100 dark:bg-orange-950/60' : ''}`}>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Shift Prep</span>
          </button>

          {/* 5. Pantry */}
          <button
            onClick={() => setActiveTab('pantry')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all touch-manipulation min-h-[48px] ${
              activeTab === 'pantry'
                ? 'text-pink-700 dark:text-pink-400 font-bold'
                : 'text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'pantry' ? 'bg-pink-100 dark:bg-pink-950/60' : ''}`}>
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Pantry</span>
          </button>
        </div>
      </nav>
    </>
  );
};
