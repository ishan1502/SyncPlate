# SyncPlate 🍲
> **Smart Couple Meal Planner & Split-Prep Kitchen System**  
> Engineered for **Ishan** & **Moumita** to balance contrasting work shifts, divergent nutritional goals, and cultural culinary tastes without doubling kitchen time.

---

## 👥 The Couple's Profile & Constraints

| Attribute | 👨🏽‍💼 Ishan | 👩🏽‍🍳 Moumita (The Chef) |
|---|---|---|
| **Shift Schedule** | **Day Shift**: Away from home 9:50 AM – 8:10 PM | **Night Shift**: Away from home 9:30 PM – 8:30 AM |
| **Dietary Goal** | **Weight Loss** (Caloric Deficit: ~1,400–1,700 kcal) | **Weight Gain** (Caloric Surplus: ~2,300–2,600 kcal) |
| **Dietary Restriction** | **Strictly Vegetarian** | **Non-Vegetarian** (Fish/chicken/eggs 4+ days/week) |
| **Cuisine Heritage** | **North Indian Comfort** (Dhaba greens, Rajma, Tandoori) | **Assamese Heritage** (Guwahati: Tenga, Khar, Koldil, Til Diya, Xoriyoh) |
| **Role in Kitchen** | Consumer / Tiffin Carrier / Office Desk Eater | **Sole Cook & Meal Prepper** |

---

## 🍳 The "Split-Prep" Golden Rule

Because Moumita cooks while balancing an intense night shift schedule, **meals share a single "Master Base Recipe"**:
1. **One Pot / One Kadai**: Aromatics, master tomato/lentil/gravy base, or grain are cooked together.
2. **The Split Moment**: At a designated minute mark, the meal branches:
   - **Ishan's Branch (Weight Loss / Pure Veg)**: Low-fat paneer, sprouted moong, or soya chunks; dry seared or simmered with zero extra cream or butter; finished with fresh Kaji Nemu lemon.
   - **Moumita's Branch (Weight Gain / Non-Veg)**: Pan-fried river Rohu / Katla fish, chicken thighs, or eggs; enriched with cold-pressed mustard oil, desi cow ghee, roasted nuts, and aromatic Joha rice.

---

## 🚀 Key Features

1. **Smart Calendar Sync**:
   - Automatically reads the device's system date (`new Date().getDay()`) and snaps directly to today's scheduled meals.
   - Includes quick day pills (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`) and a 1-click **"Snap to Today"** button.

2. **Dual-Track View & Macro Engine**:
   - Real-time side-by-side or single-user toggle for Ishan and Moumita.
   - Precise tracking of **Calories, Protein, Carbs, and Fats** with visual progress bars against their individual daily targets.

3. **Split-Prep Recipe Cards & Modal**:
   - Total Prep & Cook times.
   - Interactive checklist for Shared Ingredients & One-Pot Steps.
   - **The Split Moment Alert**: Exact moment and instruction where the dish separates.
   - Built-in **Kitchen Assistant Timer** with quick presets (5m, 10m, full cook time) and audio-visual celebration.

4. **Touch-Friendly "Cook Mode" (Kitchen Mode)**:
   - Fullscreen high-contrast interface designed specifically for Moumita in the kitchen.
   - Extra-large fonts for easy reading from across the counter with wet or oily hands.
   - Step-by-step navigation and floating timer.

5. **Chef's Shift Prep Sync**:
   - Pre-shift cooking window: **5:00 PM – 6:15 PM** (Master base preparation).
   - Night shift departure pack: **9:00 PM – 9:20 PM** (Plating Ishan's dinner for 8:10 PM return; packing Moumita's 2:00 AM fuel).
   - Morning handover: **8:45 AM** (Breakfast assembly & packing Ishan's office lunch).
   - Interactive checkboxes with local storage persistence and confetti celebrations.

6. **7-Day Pantry & Grocery Checklist**:
   - Categorized into *Base Staples*, *Fresh Produce*, *Ishan's Veg Protein*, *Moumita's Non-Veg & Seafood*, *Spices & Assamese Specialties*, and *Healthy Fats & Dairy*.
   - **1-Click Copy to WhatsApp / Clipboard** to share grocery lists seamlessly.

---

## 🛠️ Technology Stack

- **React 18** + **TypeScript**
- **Vite 5** for blazing fast builds and HMR
- **Tailwind CSS** with dark mode support & custom culinary palettes
- **Lucide React** for clean, modern iconography
- **Canvas Confetti** for interactive cooking milestone celebrations
- **LocalStorage API** for persisting checked ingredients, prep tasks, and pantry status

---

## 🏃 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite Development Server
npm run dev

# 3. Build for Production
npm run build

# 4. Preview Production Build
npm run preview
```
