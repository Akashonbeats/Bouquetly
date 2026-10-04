# 🌸 Bouquetly

**Craft a digital bouquet for someone you adore.**

> A delicate web experience where you hand-pick watercolor flowers, arrange them into a bouquet, write a heartfelt note, and share it as a unique link with someone special.

🔗 **Live at [bouquetly.me](https://bouquetly.me)**

---

## ✨ Features

- **12 Hand-Illustrated Flowers** — each bloom carries its own meaning, from *Tulip (Perfect Love)* to *Zinnia (Lasting Affection)*. Pick up to 10.
- **3 Greenery Styles** — wrap your bouquet in *Wild Meadow*, *Emerald Garden*, or *Eucalyptus Dream* with a live preview.
- **Personal Notes** — write a heartfelt message with *to*, *from*, and your words.
- **Shareable Links** — the entire bouquet state is Base64-encoded into the URL. No database, no sign-up, no server. Just a link that blooms.
- **OG Image Generation** — dynamic Open Graph previews via Vercel edge functions so shared links look great on social media.
- **Floating Petals** — ambient watercolor flowers drift across every page.
- **Smooth Transitions** — directional slide animations with a custom transition engine.
- **Flow Guards** — route protection ensures users follow the step-by-step builder flow.
- **Responsive** — designed to feel beautiful on both desktop and mobile.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router v7 |
| **State** | `useReducer` + Context API |
| **Icons** | Lucide React |
| **IDs** | nanoid |
| **OG Images** | `@vercel/og` (serverless edge) |
| **Deployment** | Vercel |
| **Styling** | Vanilla CSS with custom properties |

---

## 📁 Project Structure

```
bouquetly/
├── api/                          # Vercel serverless functions
│   ├── bouquet-preview.js        #   OG meta tag injection
│   └── bouquet-image.js          #   Dynamic OG image generation
├── public/                       # Static assets
├── src/
│   ├── assets/
│   │   ├── flowers/              # 12 hand-drawn .webp flower assets
│   │   └── bushes/               # 3 greenery arrangement .png assets
│   ├── components/
│   │   ├── BouquetDisplay/       # Live bouquet arranger with organic layout
│   │   ├── FloatingPetals/       # Ambient drifting flower decorations
│   │   ├── FlowerCard/           # Individual selectable flower card
│   │   ├── FlowerSVG/            # SVG-based flower renderer
│   │   ├── FlowGuard/            # Route guards for builder flow
│   │   ├── NoteCardPreview/      # Live note card preview
│   │   ├── BouquetTypeCard/      # Greenery style selector card
│   │   ├── SelectedFlowersPill/  # Selected flowers counter badge
│   │   ├── StepIndicator/        # Multi-step progress dots
│   │   ├── MilestoneOverlay/     # Celebratory milestone animations
│   │   ├── Header/               # App header
│   │   ├── Footer/               # App footer
│   │   └── PageLoader/           # Page transition loader
│   ├── context/
│   │   ├── BouquetContext.jsx    # Global bouquet state (reducer pattern)
│   │   └── TransitionContext.jsx # Page transition orchestration
│   ├── hooks/
│   │   ├── usePageReady.js       # Page-ready lifecycle hook
│   │   └── useTransitionNavigate.js
│   ├── pages/
│   │   ├── LandingPage/          # Hero landing with CTA
│   │   ├── SelectFlowersPage/    # Flower picker grid (step 1)
│   │   ├── SelectBouquetPage/    # Greenery selector (step 2)
│   │   ├── WriteNotePage/        # Note composer (step 3)
│   │   └── GiftPage/             # Shareable bouquet viewer
│   ├── utils/
│   │   ├── flowers.js            # Flower & greenery data definitions
│   │   ├── bouquetEncoder.js     # URL-safe state encoder/decoder
│   │   └── preloader.js          # Image preloading utility
│   ├── App.jsx                   # Root layout, routing, transitions
│   └── main.jsx                  # Entry point
├── vercel.json                   # Vercel rewrite rules
└── vite.config.js                # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/Akashonbeats/Bouquetly.git
cd Bouquetly

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 How Sharing Works

Bouquetly uses client-side encoding — no database required:

1. User picks flowers → selects greenery → writes a note
2. The entire state is encoded into a compact Base64 string
3. A shareable URL is generated: `bouquetly.me/bouquet/dHUscm8s...`
4. Recipient opens the link → state is decoded → the bouquet renders

The flowers, arrangement order, greenery style, and personal note all live inside the URL itself. Share it via text, email, or social media. 💐

---

## 📄 License

This project is open source. Feel free to explore, learn from, and build upon it.

---

*Made with 🌷 by [Akash](https://github.com/Akashonbeats)*
