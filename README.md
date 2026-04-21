# Tax Harvesting Tool — KoinX

A React-based **Tax Loss Harvesting** dashboard built with Vite. This tool helps crypto investors visualize and optimize their capital gains by selecting holdings with unrealized losses to offset current gains — reducing their effective tax liability.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18 or above recommended)
- **npm** (comes bundled with Node.js)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/KoinXAss.git
   cd KoinXAss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Build for production** *(optional)*
   ```bash
   npm run build
   npm run preview
   ```

---

## 📸 Screenshots

### Dashboard — Gains Cards & Holdings Table (Top View)
![Dashboard Top View](./screenshots/dashboard-top.png)

### Dashboard — Full Holdings Table (Scrolled View)
![Dashboard Table View](./screenshots/dashboard-table.png)

> **Note:** To add screenshots, save your images as `dashboard-top.png` and `dashboard-table.png` inside the `screenshots/` folder.

---

## 🧠 Assumptions

- **Mock Data**: The app uses hardcoded mock data from `src/api/mockApi.js` instead of a live backend or real API.
- **No State Persistence**: Checkbox selections and interactions reset on page reload — no localStorage or backend persistence is implemented.
- **Desktop-First Design**: The UI is primarily designed for desktop viewports to match the provided Figma layouts. Basic responsive adjustments are included for smaller screens.
- **Tax Calculation Logic**: The harvesting computations (profits, losses, net gains) follow the formula specified in the assignment rather than real-world tax engine calculations.
- **Currency**: All values are displayed in USD (`$`), matching the mock data format.
- **Coin Logos**: Logos are fetched dynamically from [cryptoicons.org](https://cryptoicons.org) based on the asset symbol, with a fallback placeholder if the image fails to load.

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite** | Build tool & dev server |
| **Context API** | Global state management (`AppContext.jsx`) |
| **Vanilla CSS** | Styling (no utility frameworks) |

---

## 📂 Project Structure

```
KoinXAss/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── default-coin.png        # Fallback logo for assets
├── screenshots/                 # App screenshots for README
├── src/
│   ├── api/
│   │   └── mockApi.js           # Mock Capital Gains & Holdings APIs
│   ├── components/
│   │   ├── Checkbox.jsx         # Reusable checkbox with indeterminate state
│   │   ├── DisclaimerBanner.jsx # Collapsible notes & disclaimers accordion
│   │   ├── GainsCard.jsx        # Pre/After Harvesting gains card
│   │   ├── Header.jsx           # App header with logo & title
│   │   ├── HoldingsTable.jsx    # Sortable, selectable holdings table
│   │   ├── HowItWorksTooltip.*  # "How it works?" tooltip
│   │   ├── TableRow.jsx         # Individual holding row with gains display
│   │   └── ValueTooltip.*       # Hover tooltip for abbreviated values
│   ├── context/
│   │   └── AppContext.jsx       # Centralized state & tax harvesting logic
│   ├── utils/
│   │   ├── formatters.js        # Currency & number formatting helpers
│   │   └── getLogo.js           # Dynamic crypto logo URL generator
│   ├── App.jsx                  # Main dashboard layout
│   ├── App.css                  # Global styles & design tokens
│   └── main.jsx                 # React entry point
├── package.json
└── vite.config.js
```

---

## ✨ Key Features

- **Pre & After Harvesting Cards** — Side-by-side comparison of capital gains before and after selecting holdings
- **Real-time Recalculation** — Checking/unchecking holdings instantly updates the After Harvesting card
- **Savings Indicator** — Shows projected tax savings only when post-harvesting gains are lower
- **Select All / Individual Selection** — Header checkbox with indeterminate state support
- **Column Sorting** — Sort holdings by Short-term or Long-term gains
- **View All / Show Less** — Expandable table rows
- **Loading & Error States** — Skeleton loaders and error messages for async data
- **Disclaimer Accordion** — Collapsible important notes section
