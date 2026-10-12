import React, { useState } from 'react';
import { Clock, Flame, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import { PROFILES } from '../data/profiles';

export const ShiftTimelineBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-3.5 sm:p-6 shadow-sm transition-all">
      {/* Header with quick stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-stone-150 dark:border-slate-800">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>Contrasting Shift & Culinary Sync</span>
              <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                Overlapping Base
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400">
              Moumita cooks while balancing night shifts · 1-pot shared base splits for dual goals
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 transition-colors w-full sm:w-auto touch-manipulation min-h-[36px]"
        >
          <span>{isExpanded ? 'Compact Shift View' : 'Show Full Shift Schedule'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Profiles Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 mt-3.5 sm:mt-4">
        {/* Ishan's Profile Card */}
        <div className="bg-emerald-50/50 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
              <span className="text-xl sm:text-2xl p-1.5 bg-white dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-500/30 shadow-xs shrink-0">
                {PROFILES.ishan.avatar}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white truncate">{PROFILES.ishan.name}</h3>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 shrink-0">
                    Day Shift
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300 font-semibold truncate">
                  {PROFILES.ishan.shiftHours}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center justify-end gap-1">
                <Flame className="w-3.5 h-3.5" /> 1,700 kcal
              </span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">Target Deficit</span>
            </div>
          </div>

          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-emerald-200/60 dark:border-slate-800 text-[11px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 text-stone-700 dark:text-slate-300">
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-emerald-200/80 dark:border-slate-700/60 font-semibold shadow-2xs">
              🌱 Pure Veg
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-emerald-200/80 dark:border-slate-700/60 font-semibold shadow-2xs">
              🥘 North Indian
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 font-bold">
              🎯 Weight Loss
            </span>
          </div>
        </div>

        {/* Moumita's Profile Card */}
        <div className="bg-orange-50/50 dark:bg-slate-900/80 border border-orange-200/80 dark:border-orange-500/30 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
              <span className="text-xl sm:text-2xl p-1.5 bg-white dark:bg-orange-950/60 rounded-xl border border-orange-200 dark:border-orange-500/30 shadow-xs shrink-0">
                {PROFILES.moumita.avatar}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white truncate">{PROFILES.moumita.name}</h3>
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30 shrink-0">
                    The Chef · Night
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-orange-700 dark:text-orange-300 font-semibold truncate">
                  {PROFILES.moumita.shiftHours}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-black text-orange-700 dark:text-orange-400 flex items-center justify-end gap-1">
                <Flame className="w-3.5 h-3.5" /> 2,500 kcal
              </span>
              <span className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">Target Surplus</span>
            </div>
          </div>

          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-orange-200/60 dark:border-slate-800 text-[11px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 text-stone-700 dark:text-slate-300">
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-orange-200/80 dark:border-slate-700/60 font-semibold shadow-2xs">
              🐟 Non-Veg (Fish 3x)
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-orange-200/80 dark:border-slate-700/60 font-semibold shadow-2xs">
              🌿 Assamese
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border border-orange-200 font-bold">
              💪 Weight Gain
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Timeline Diagram */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-200/80 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>The Daily Kitchen Handover Windows:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Window 1 */}
            <div className="bg-stone-50 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between text-stone-500 dark:text-slate-400 mb-1">
                <span className="font-bold text-amber-700 dark:text-amber-300">5:00 PM – 6:30 PM</span>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  Golden Cooking Window
                </span>
              </div>
              <p className="font-bold text-stone-800 dark:text-slate-200">Pre-Shift Master Batch</p>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 leading-relaxed">
                Moumita prepares the shared base gravy for Ishan’s 8:15 PM dinner and packs her own midnight tiffin.
              </p>
            </div>

            {/* Window 2 */}
            <div className="bg-stone-50 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between text-stone-500 dark:text-slate-400 mb-1">
                <span className="font-bold text-cyan-700 dark:text-cyan-300">8:10 PM – 9:30 PM</span>
                <span className="text-[10px] bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                  Crossing Handover
                </span>
              </div>
              <p className="font-bold text-stone-800 dark:text-slate-200">Ishan Returns & Moumita Leaves</p>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 leading-relaxed">
                Ishan arrives home from day shift to a hot casserole meal. Moumita grabs her insulated lunch bag and departs at 9:30 PM.
              </p>
            </div>

            {/* Window 3 */}
            <div className="bg-stone-50 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-stone-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between text-stone-500 dark:text-slate-400 mb-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">8:30 AM – 9:50 AM</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Morning Breakfast Split
                </span>
              </div>
              <p className="font-bold text-stone-800 dark:text-slate-200">Moumita Returns & Ishan Departs</p>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 leading-relaxed">
                10-min breakfast together: Ishan eats deficit plate, grabs packed office lunch box, and leaves. Moumita eats surplus plate and rests.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-300">
            <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>The Split-Prep Golden Rule:</strong> Moumita only cooks ONE shared base per meal (same kadai, same spices, same prep). Only at the finishing step does Ishan get paneer/low-oil, while Moumita gets fish/chicken/ghee. This cuts cooking time in half!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
