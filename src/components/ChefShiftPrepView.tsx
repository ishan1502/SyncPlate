import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChefHat, 
  Filter,
  Check
} from 'lucide-react';
import { DaySchedule } from '../types/meal';
import { triggerConfetti } from '../utils/confetti';

interface ChefShiftPrepViewProps {
  daySchedule: DaySchedule;
  onOpenRecipeById?: (mealId: string) => void;
}

export const ChefShiftPrepView: React.FC<ChefShiftPrepViewProps> = ({
  daySchedule,
}) => {
  const storageKey = `syncplate-prep-checks-${daySchedule.dayIndex}`;

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [personFilter, setPersonFilter] = useState<'all' | 'Ishan' | 'Moumita' | 'Both'>('all');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`syncplate-prep-checks-${daySchedule.dayIndex}`);
      setCompletedTasks(saved ? JSON.parse(saved) : {});
    } catch {
      setCompletedTasks({});
    }
  }, [daySchedule.dayIndex]);

  const toggleTask = (taskId: string) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Check if all tasks for the day are complete
    const allTaskIds = daySchedule.chefShiftPrep.flatMap((p) => p.tasks.map((t) => t.id));
    const allDone = allTaskIds.every((id) => updated[id]);
    if (allDone && !completedTasks[taskId]) {
      triggerConfetti();
    }
  };

  // Compute progress
  const allTasks = daySchedule.chefShiftPrep.flatMap((p) => p.tasks);
  const completedCount = allTasks.filter((t) => completedTasks[t.id]).length;
  const progressPct = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white dark:from-orange-950/60 dark:via-slate-900 dark:to-slate-900 border border-orange-200/90 dark:border-orange-500/40 rounded-3xl p-4 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 sm:space-x-3.5">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 shrink-0">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30">
                  {daySchedule.dayName} Shift Plan
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 font-semibold truncate">
                  Moumita’s Command Center
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
                Pre-Shift Kitchen Checklist
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Prep food before 9:30 PM departure so Ishan arrives to warm dinner at 8:10 PM, and his morning office dabba is packed before you rest.
              </p>
            </div>
          </div>

          {/* Progress Gauge */}
          <div className="bg-white dark:bg-slate-950/80 p-3.5 sm:p-4 rounded-2xl border border-stone-200 dark:border-slate-800 shrink-0 w-full md:w-auto md:min-w-[220px] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-stone-700 dark:text-slate-300">Shift Prep Progress</span>
              <span className="text-orange-700 dark:text-orange-400 font-mono text-sm">{progressPct}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-150 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-slate-400 mt-1.5 text-center font-medium">
              {completedCount} of {allTasks.length} tasks ready for shift
            </p>
          </div>
        </div>

        {/* Filter by recipient */}
        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-stone-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>Filter Tasks:</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-stone-100 dark:bg-slate-950 p-1 rounded-xl border border-stone-200/80 dark:border-slate-800 text-xs overflow-x-auto scrollbar-none touch-pan-x w-full sm:w-auto justify-between sm:justify-start">
            {(['all', 'Ishan', 'Moumita', 'Both'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setPersonFilter(filter)}
                className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-all text-center touch-manipulation min-h-[32px] ${
                  personFilter === filter
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200'
                }`}
              >
                {filter === 'all' ? 'All Tasks' : filter === 'Ishan' ? 'For Ishan' : filter === 'Moumita' ? 'For Moumita' : 'For Both'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Windows */}
      <div className="space-y-5">
        {daySchedule.chefShiftPrep.map((window) => {
          const filteredWindowTasks = window.tasks.filter((t) => {
            if (personFilter === 'all') return true;
            return t.forWho === personFilter;
          });

          if (filteredWindowTasks.length === 0) return null;

          return (
            <div
              key={window.id}
              className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs"
            >
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-stone-150 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-orange-50 text-orange-700 dark:bg-slate-800 dark:text-orange-400 border border-orange-200 dark:border-slate-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 dark:text-white text-base sm:text-lg">
                        {window.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20">
                        {window.priority}
                      </span>
                    </div>
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-bold">{window.timeWindow}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {window.targetMeals.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 dark:bg-slate-800 dark:text-slate-300 border border-stone-200 dark:border-slate-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-500 dark:text-slate-400 mt-2.5">
                {window.subtitle}
              </p>

              {/* Tasks List */}
              <div className="mt-4 space-y-2.5">
                {filteredWindowTasks.map((task) => {
                  const isChecked = !!completedTasks[task.id];
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 group select-none ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-500/40 opacity-80'
                          : 'bg-stone-50 dark:bg-slate-950/80 border-stone-200/90 dark:border-slate-800 hover:border-orange-300 hover:bg-orange-50/30'
                      }`}
                    >
                      {/* Big touch target checkbox */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border mt-0.5 shrink-0 transition-all ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                            : 'border-stone-300 bg-white dark:border-slate-600 dark:bg-slate-900 group-hover:border-orange-400'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span
                            className={`font-bold text-xs sm:text-sm ${
                              isChecked
                                ? 'text-stone-400 dark:text-slate-500 line-through'
                                : 'text-stone-900 dark:text-slate-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors'
                            }`}
                          >
                            {task.label}
                          </span>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              task.forWho === 'Ishan'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                                : task.forWho === 'Moumita'
                                ? 'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30'
                                : 'bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30'
                            }`}
                          >
                            For {task.forWho}
                          </span>
                        </div>

                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            isChecked ? 'text-stone-400 dark:text-slate-500 line-through' : 'text-stone-600 dark:text-slate-400'
                          }`}
                        >
                          {task.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
