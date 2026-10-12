import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Check, 
  Search, 
  Copy, 
  CheckCheck, 
  RotateCcw, 
  CheckCircle2
} from 'lucide-react';
import { INITIAL_GROCERY_ITEMS } from '../data/pantryData';
import { GroceryItem } from '../types/meal';
import { triggerConfetti } from '../utils/confetti';

export const PantryChecklistView: React.FC = () => {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    try {
      const saved = localStorage.getItem('syncplate-grocery-items');
      return saved ? JSON.parse(saved) : INITIAL_GROCERY_ITEMS;
    } catch {
      return INITIAL_GROCERY_ITEMS;
    }
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('syncplate-grocery-items', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.checked;
          if (nextState) {
            const remaining = prev.filter((i) => i.id !== id && !i.checked).length;
            if (remaining === 0) triggerConfetti();
          }
          return { ...item, checked: nextState };
        }
        return item;
      })
    );
  };

  const resetAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  };

  const copyToClipboard = () => {
    const unchecked = items.filter((i) => !i.checked);
    const text = `🛒 SyncPlate Weekly Grocery List (${unchecked.length} items to buy):\n\n` +
      categories.filter((c) => c !== 'All').map((cat) => {
        const catItems = unchecked.filter((i) => i.category === cat);
        if (catItems.length === 0) return '';
        return `*${cat}*:\n` + catItems.map((i) => `• ${i.name} (${i.quantity})`).join('\n');
      }).filter(Boolean).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const categories = [
    'All',
    'Base Staples & Grains',
    'Fresh Produce',
    'Ishan Veg Protein',
    'Moumita Non-Veg & Seafood',
    'Spices & Assamese Specialties',
    'Healthy Fats & Dairy',
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quantity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPct = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50/90 via-pink-50/40 to-white dark:from-slate-900 border border-rose-200/90 dark:border-slate-800 rounded-3xl p-4 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 sm:space-x-3.5">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20 shrink-0">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 border border-pink-200 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30">
                  Weekly Pantry
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-slate-400 font-semibold truncate">
                  Inventory & Grocery
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
                7-Day Split-Prep Grocery List
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                All common base staples, Ishan’s vegetarian deficit proteins, and Moumita’s Assamese non-veg ingredients mapped out for the full week.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all active:scale-95 touch-manipulation min-h-[38px]"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to WhatsApp!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              onClick={resetAll}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-stone-200 dark:border-slate-700 transition-all touch-manipulation min-h-[38px]"
              title="Reset all checkboxes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-stone-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              Pantry Status: {checkedCount} of {items.length} stocked ({progressPct}%)
            </span>
          </div>

          <div className="w-full sm:w-64 h-2 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search with 16px text-base on mobile to avoid iOS Safari zoom */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items (e.g. Rohu fish, paneer)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-xl text-base sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-pink-500 shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap touch-manipulation min-h-[34px] ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/90 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid by Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start space-x-3 select-none group ${
                item.checked
                  ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-500/40 opacity-75'
                  : 'bg-white dark:bg-slate-900/90 border-stone-200/90 dark:border-slate-800 hover:border-pink-300 hover:bg-pink-50/20 shadow-2xs'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 shrink-0 transition-all ${
                  item.checked
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'border-stone-300 bg-stone-50 dark:border-slate-600 dark:bg-slate-800 group-hover:border-pink-400'
                }`}
              >
                {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <span
                    className={`font-bold text-xs sm:text-sm truncate ${
                      item.checked
                        ? 'text-stone-400 dark:text-slate-400 line-through'
                        : 'text-stone-900 dark:text-slate-100 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="font-bold text-amber-800 dark:text-amber-400">{item.quantity}</span>
                  <span className="text-[10px] text-stone-600 dark:text-slate-500 bg-stone-100 dark:bg-slate-950 px-2 py-0.5 rounded-md border border-stone-200 dark:border-slate-800">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-[10px] text-stone-500 dark:text-slate-400">
                  <span>Used on:</span>
                  <div className="flex items-center gap-0.5">
                    {item.usedInDays.map((d) => (
                      <span key={d} className="bg-stone-100 dark:bg-slate-800 px-1 py-0.2 rounded text-stone-700 dark:text-slate-300 font-mono font-semibold">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
