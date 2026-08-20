# 🎬 NetflixGemini — Enterprise-Grade Streaming & AI Platform

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-navy?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![React Router v7](https://img.shields.io/badge/React_Router-v7.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-API_Integration-01B4E4?style=for-the-badge&logo=the-movie-database&logoColor=white)](https://developer.themoviedb.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-API_suggestions-9B72F8?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

An enterprise-grade, highly optimized, fully decoupled Netflix client clone integrated with Google Gemini AI for contextual movie recommendations. Rather than standard, fragile "clone" scripts, this project demonstrates robust system design, strict SOLID development principles (heavily focusing on the Single Responsibility Principle), browser performance engineering, and modern React design patterns.

---

## 🚀 Live Demo
You can view the live deployment of this project here: [NetflixGemini](https://netflix-gemini-mkd.web.app/)

## 🧠 The Engineering Philosophy & "Why"

Software engineering is about **decisions, trade-offs, and deep theory**, not just copy-pasting visual elements. My persona is centered around **knowing the "why" before writing the "how."** In building this application, I prioritized:

*   **Strict Single Responsibility Principle (SRP):** Components are strictly "dumb" visual containers. All heavy side-effects, state transitions, API integrations, and validation logic are completely extracted into customized hooks and centralized store modules.
*   **Performance as a First-Class Citizen:** Managing render trees defensively. This includes preventing the classic "React API Waterfall" anti-pattern, locking down DOM elements from layout shift (CLS), and handling React's object memory comparisons strictly.
*   **Security & Data Integrity:** Designing zero-leak environments. Decoupling sensitive keys, safeguarding route layout bounds on the server-side, preventing flash-of-unauthenticated-content (FOUC), and utilizing immutable models for application schemas.
*   **Frictionless Standardization:** Building components that align with web and React specifications (e.g., using standard prop forwarding rather than customized patterns) ensuring clean library interoperability.

---

## 🛠️ Tech Stack & Integrations

### Core Architecture
*   **React 19:** Utilizes cutting-edge React features including native `ref` prop forwarding.
*   **React Router v7:** Powers the client-side routing, dividing the application cleanly into isolated layout-driven domains (Public Layout and Protected Layout).
*   **Tailwind CSS v4:** Operates mobile-first layout controls, utilising linear gradients and responsive stacking rules with fluid container adaptations.
*   **Zustand:** Subscribes React components to a lightning-fast state store located entirely outside the React component tree on the heap memory.

### Platform Services
*   **Firebase Authentication & Hosting:** Secures user sign-ups, logs user credentials, caches persistent client sessions via IndexedDB listeners, and deploys production static assets.
*   **Google Gemini API:** Generates intelligent, content-aware movie and TV recommendations dynamically.
*   **TMDB REST API:** Feeds complete, paginated catalogs of metadata, movie posters, and high-fidelity video attachments.
*   **Axios Client:** Wraps endpoints in modular pre-stamped envelopes (instances) configured with automatic bearer tokens and base URLs.
*   **Zod Validator:** Intercepts form inputs to validate strings and enforce strict password complexity rules.

---

## 📂 System Folder Directory

```text
src/
├── assets/         # Global styles, static logos, and asset layers
├── components/     # Pure, reusable "dumb" UI components
│   ├── ui/         # Visual elements (Buttons, AuthBackground)
│   ├── forms/      # Visual layout inputs (InputField, PasswordInput)
│   ├── shimmers/   # Layout-stable pulse skeleton loaders
│   └── navigation/ # Contextual headers (PublicNav, ProtectedNav)
├── context/        # Core infrastructure (AuthProvider for auth sync)
├── hooks/          # Custom hooks encapsulating heavy side-effects
│   ├── useAuth/    # Secure wrapper for session states
│   ├── useLoginForm/
│   ├── useSignupForm/
│   ├── useVideoBackground/
│   └── useContentFeed/
├── layouts/        # Rigid layout frame containers (PublicLayout, ProtectedLayout)
├── pages/          # Decoupled routes (LandingPage, LoginPage, BrowsePage)
├── services/       # Pre-configured instances (firebase.js, tmdb.js, gemini.js)
├── store/          # Zustand global state heap (authStore, movieStore)
├── utils/          # Deeply frozen validation dictionaries and shared constants
├── App.jsx         # App router configuration and global providers
└── main.jsx        # Bootloader rendering React root
```

---

## 🚀 Architectural & Technical Implementations

### 1. Route Layout Domain Architecture & Auth Flow
Instead of bloating individual pages with security validations or using fragile inline wrappers that evaluate on every route swap, the routing was designed around **nested layout domains**.

*   `PublicLayout` acts as the application's **"Bouncer"**: It checks if a session is present. If yes, it forcefully redirects the user to the private space (`/app`), preventing authenticated users from unnecessarily reloading forms.
*   `ProtectedLayout` acts as the **"Guard"**: It intercepts non-authenticated guests and redirects them instantly to `/login` using `<Navigate replace />`, completely wiping out their transition history stack so the browser's "Back" button cannot navigate back to private assets.

```javascript
// App.jsx (Infrastructure Configuration Provider)
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />, // Bouncer
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> }
    ]
  },
  {
    path: '/app',
    element: <ProtectedLayout />, // Guard
    children: [
      { index: true, element: <BrowsePage /> },
      { path: 'movie/:movieId', element: <MoviePage /> },
      { path: 'account', element: <AccountPage /> }
    ]
  }
]);
```

**The Performance "Why":** Since layout frames wrap nested child routes, when navigating between `/app` children, React Router **re-renders only the `<Outlet />` element**. The parent layout, its security controls, and the complex stateful navigation bars remain mounted, preventing visual flicker and avoiding repetitive security checks.

---

### 2. State Optimization: Zustand vs. Redux Toolkit (RTK)
To prevent the nested DOM "Provider Wrapper Hell" inherent to React Context, state was migrated to **Zustand**.

*   **Philosophy Comparison:** RTK relies on a complex, bureaucratic "Flux" architecture requiring separate slice definitions, redundant action dispatch, and dispatch/reducer handshakes on every simple state change. Zustand operates a **Pub/Sub (Publish-Subscribe)** pattern, maintaining states entirely outside the React component tree on the memory heap. It leverages React 18's native `useSyncExternalStore` hook to bridge updates safely.
*   **Selector Optimization & Render Mitigation:** To secure optimal rendering speeds, components strictly query states using precise **selectors**. Furthermore, Zustand’s `useShallow` hook was implemented to memoize multi-key extractions.

```javascript
// Prevents unneeded component re-renders when unrelated properties in the store change.
const { nowPlayingMovies, trendingMovies, topRatedMovies } = useMovieStore(
  useShallow((state) => ({
    nowPlayingMovies: state.nowPlayingMovies,
    trendingMovies: state.trendingMovies,
    topRatedMovies: state.topRatedMovies
  }))
);
```

---

### 3. Parallel Network Pipelines (`Promise.all()`)
Fetching catalogs sequentially creates a critical performance roadblock known as the **"API Request Waterfall"** (where each request must wait to finish before the next one starts).

To solve this, a custom `useContentFeed` hook orchestrates parallel network queries, retrieving multiple categories (Trending, Top Rated, Action, Comedy) simultaneously through a unified `Promise.all` operation.

```javascript
// useContentFeed.js
const categoriesToFetch = [
  { storeKey: "trendingMovies", endpoint: requests.fetchTrending },
  { storeKey: "topRatedMovies", endpoint: requests.fetchTopRated },
  { storeKey: "actionMovies", endpoint: requests.fetchActionMovies }
];

const loadAllCategories = async () => {
  try {
    // 1. Fire all requests concurrently (Parallel)
    const apiPromises = categoriesToFetch.map(category => tmdb.get(category.endpoint));
    
    // 2. Wait concurrently for all resolutions
    const results = await Promise.all(apiPromises);
    
    // 3. Map responses back to respective store keys maintaining list order
    results.forEach((response, index) => {
      const storeKey = categoriesToFetch[index].storeKey;
      setMovieCategory(storeKey, response.data.results);
    });
  } catch (error) {
    console.error("Critical parallel data ingestion failure", error);
  }
};
```
**The Performance "Why":** Assuming each endpoint takes `300ms`, a sequential approach results in a `900ms` wait. The parallel pipeline resolves all datasets concurrently, capping total network delay at the speed of the single slowest query (~`300ms`), representing a **75% reduction in loading latency**.

---

### 4. Unbreakable Responsive YouTube Background Player Hack
Embedding YouTube's standard iframe player inside a hero background creates major challenges: interactive players pause on mouse clicks, black borders flash, and YouTube controls clutter the streaming aesthetic.

To solve this, we designed a customized `HeroVideoBackground` player using an **Unbreakable CSS Math Hack** to force raw iframes to scale and behave like standard background images (`object-fit: cover`) across all screen viewports (such as iPads).

```jsx
// HeroVideoBackground.jsx
function HeroVideoBackground({ movieId }) {
  const { youTubeKey } = useVideoBackground(movieId);
  if (!youTubeKey) return null;

  return (
    <div className="absolute w-full aspect-video overflow-hidden">
      <iframe
        className="absolute top-1/2 left-1/2 pointer-events-none border-0
                   w-[100vw] h-[56.25vw] 
                   min-h-[100vh] min-w-[177.77vh] 
                   -translate-x-1/2 -translate-y-1/2 scale-[1.35]"
        src={`https://www.youtube.com/embed/${youTubeKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${youTubeKey}&cc_load_policy=0&iv_load_policy=3`}
        title="Cinematic Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      {/* Dynamic Linear Gradient Overlays for Seamless UI Integration */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black from-10% via-black/60 via-30% to-transparent to-70%" />
    </div>
  );
}
```

#### The Science Behind the Iframe Cover Hack:
1.  **Aspect Ratio Alignment (`w-[100vw] h-[56.25vw]`):** Locks down the dimensions to the perfect `16:9` widescreen aspect ratio on laptops and wider displays.
2.  **Tall Screen Scaling (`min-h-[100vh] min-w-[177.77vh]`):** If a user loads the app on a narrow, tall viewport (like an iPad), the iframe's height would normally drop below the container's height, creating ugly black borders. This minimum lock forces the iframe's height to cover the viewport, expanding its width proportionally (16/9 = 1.7777, hence `177.77vh`).
3.  **The Crop Zoom (`scale-[1.35] pointer-events-none`):** Zooms in on the center of the video, pushing YouTube's embedded branding title blocks and interactive layers completely off the screen bounds while making clicks slide straight through to the controls.
4.  **Tailwind v4 Seamless Gradient Stops (`from-10% to-70%`):** Avoids sub-pixel rendering gaps (1px bleed lines) by enforcing 100% solid black coloration up to 10% height, softly fading out to transparent at 70% height to blend perfectly with the catalog list container below.

---

### 5. Form Architecture: Validation, React 19 Refs, & Immutable Dictionary
We decoupled form presentation entirely from the underlying execution systems:

*   **React 19 Native Refs:** Because this project uses React 19, the legacy `forwardRef()` boilerplate is completely deprecated. Standard `ref` variables are extracted directly from props like standard parameters, simplifying component communication.
*   **Uncontrolled Performance Inputs:** Form fields (`InputField`, `PasswordInput`) use `useRef` bridges rather than firing a state-based component update on every single keypress, removing useless re-render loops during input entries.
*   **Immutable Error Configurations:** Validation rules are driven by Zod schema primitives, but error strings are centrally consolidated inside a deeply frozen JavaScript dictionary to secure runtime immutability.

```javascript
// utils/validationErrors.js
export const VALIDATION_ERRORS = Object.freeze({
  NAME_REQUIRED: "Name is required.",
  NAME_TOO_SHORT: "Name must be at least 2 characters.",
  EMAIL_INVALID: "Please enter a valid email.",
  PASSWORD_TOO_SHORT: "Must be at least 8 characters.",
  PASSWORD_NO_UPPER: "Add at least one uppercase letter."
});

// schemas/authSchema.js
export const namePrimitive = z.string()
  .min(2, VALIDATION_ERRORS.NAME_TOO_SHORT)
  .transform(val => val.trim())
  .refine(
     val => /^[\p{L}](?:[\p{L}'\s.-]*[\p{L}.])?$/u.test(val), // Unicode/Initials Friendly
     VALIDATION_ERRORS.NAME_INVALID_FORMAT
  );
```

**The Re-render Trap Defeated:** When error states are empty, resetting state to an empty object `{}` normally triggers a re-render in React, because objects are compared by memory references (`{} === {}` is `false`). We implemented strict guard clauses that evaluate object key length before scheduling updates, preventing unnecessary paint cycles:

```javascript
if (Object.keys(formErrors).length > 0) {
  setFormErrors({}); // Guard clause: prevents useless re-renders on subsequent clean submissions
}
```

---

## ✨ Features

*   **Advanced Authentication Domains:** Divides routes strictly into guest spaces and private spaces using nested layout-driven "guards" and "bouncers."
*   **Gemini AI-Powered Recommendations:** Seamlessly suggests movies and TVs dynamically based on contextual queries.
*   **Parallel Catalog Ingestion:** Downloads multiple categories concurrently, eliminating screen load times.
*   **Cinematic Widescreen Background Backgrounds:** Forces standard YouTube iframes to act as flawless, responsive cinematic overlays without clickable interfaces.
*   **Layout-Stable Shimmering Pulse Loaders:** Generates glowing placeholders matching the exact card dimensions of incoming datasets, preventing visual Layout Shift (CLS).
*   **Dynamic Custom Eye-Toggles:** Includes high-fidelity secure password masking without violating the Single Responsibility Principle.
*   **Interactive Mobile Responsive Profile Menus:** Houses customizable account drop-downs that automatically reposition navigation options onto responsive slides on smaller screens.
*   **Click-to-Close Interceptors:** Integrates fullscreen invisible overlay backdrops to capture clicks outside drop-down components safely without bloating document event listeners.

---

## ⚡ Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a valid API Account with [TMDB](https://www.themoviedb.org/) and [Firebase](https://firebase.google.com/).

### Standard Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/netflix-gemini.git
    cd netflix-gemini
    ```

2.  **Install Production Dependencies:**
    ```bash
    npm install
    ```

3.  **Secure Your Environment Credentials:**
    Create a `.env.local` file in the root of the project to securely house your integration keys (this file is excluded from git commits through `.gitignore` to prevent leaks):
    ```env
    # Vite Environment Prefix Configuration
    VITE_FIREBASE_API_KEY="your_firebase_api_key"
    VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
    VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
    VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_sender_id"
    VITE_FIREBASE_APP_ID="your_firebase_app_id"
    
    # TMDB Integration
    VITE_TMDB_ACCESS_TOKEN="your_tmdb_bearer_token"
    VITE_TMDB_IMG_BASE_URL="https://image.tmdb.org/t/p/original"
    
    # Gemini AI Configuration
    VITE_GEMINI_API_KEY="your_gemini_api_key"
    ```

4.  **Launch the Optimized Dev Server:**
    ```bash
    npm run dev
    ```

---

## 🌎 Cloud Production Deployment

The project is configured for lightweight, optimized static builds deployed onto Firebase Hosting. Because this is a Single Page Application (SPA), the Firebase hosting module rewrite ensures all incoming URLs are delegated back to `index.html` so React Router can process path resolution.

1.  **Compile & Package Assets:**
    ```bash
    npm run build
    ```
    *This triggers Vite to compile, package, and optimize all React/JS code into optimized chunks inside the `/dist` directory.*

2.  **Single-Page Router Rewrite Rules (`firebase.json`):**
    ```json
    {
      "hosting": {
        "public": "dist",
        "ignore": [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ],
        "rewrites": [
          {
            "source": "**",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```

3.  **Publish Production Build:**
    ```bash
    firebase deploy
    ```

---

## 👤 Developed By

*   **GitHub:** [@monukd01dev](https://github.com/monukd01dev)
*   **LinkedIn:** [Monu Kumar](https://www.linkedin.com/in/monukd01dev)

*Crafted with ❤️, clean code, and zero compromises.*
