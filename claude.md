# Bloom AI - Project Documentation

## 📋 Project Overview

**Bloom AI** è un'applicazione web moderna per l'autenticazione e la gestione di un hub di marketing intelligente. Il progetto si basa su un design system professionale con focus su glassmorphism, dark mode e animazioni eleganti.

---

## 🎨 Design System

### Brand Identity
- **Nome**: Bloom AI
- **Tagline**: "Fai sbocciare il tuo business online"
- **Filosofia**: Tech-Forward Glassmorphism con Dark Mode First

### Color Palette

#### Colori Primari
```css
--accent-primary: #FF6B35    /* Arancione principale */
--accent-glow: #FF9B75       /* Arancione glow */
```

#### Colori Background
```css
--void: #030303              /* Background principale (quasi nero) */
--surface: #0A0A0A           /* Superficie secondaria */
```

#### Colori Testo
```css
--text-primary: #E0E0E0      /* Testo principale */
--text-secondary: #9CA3AF    /* Testo secondario */
--text-muted: #6B7280        /* Testo disattivato */
```

#### Colori Sistema
```css
--success: #34D399           /* Verde successo */
--error: #F87171             /* Rosso errore */
```

#### Gradienti
```css
--gradient-logo: linear-gradient(135deg, #FF9B6B 0%, #FF7B4D 25%, #5B9FE3 50%, #B349C1 100%)
--gradient-btn: linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)
```

### Typography

- **Sans-Serif**: Inter (300, 400, 500, 600)
- **Monospace**: Space Grotesk (300, 500, 700)

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
```

### Logo Specifications

- **Formato**: SVG scalabile
- **Elementi**: Cerchio con gradiente + fulmine centrale + elementi orbitali
- **Gradiente**: Radiale multi-colore (arancione → blu → viola)
- **Dimensioni standard**: 32px, 40px, 48px, 96px

---

## 🏗️ Project Structure

```
/home/user/Bloom-AI/
├── index.html                 # Entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite config
├── BRAND_GUIDELINES.md       # Complete brand guidelines
├── claude.md                 # This file
├── vercel.json               # Vercel deployment config
├── public/
│   └── favicon.svg           # Favicon
├── src/
│   ├── main.jsx              # React entry
│   ├── App.jsx               # Main router
│   ├── pages/
│   │   ├── Login.jsx         # Login page (split layout)
│   │   └── Dashboard.jsx     # Dashboard
│   ├── components/
│   │   ├── Logo.jsx          # Logo component
│   │   ├── GlassPanel.jsx    # Glassmorphism container
│   │   ├── NeonButton.jsx    # Primary CTA button
│   │   ├── TechInput.jsx     # Form input
│   │   └── AppCard.jsx       # Dashboard card
│   └── styles/
│       ├── variables.css     # CSS custom properties
│       └── global.css        # Global styles + animations
```

---

## 🎯 Design Principles

### 1. Dark Mode First
- Background quasi nero (#030303) per ridurre affaticamento
- Contrasto elevato per leggibilità
- Accenti luminosi su sfondo scuro

### 2. Glassmorphism
- Superfici semi-trasparenti con blur
- Border sottili con opacità bassa
- Shadow multi-layer per profondità

### 3. Neon Accents
- Colori vividi (arancione #FF6B35) su sfondo scuro
- Glow effects su hover e focus
- Gradient animati per elementi hero

### 4. Micro-Interactions
- Transizioni fluide (0.3s ease)
- Hover states sempre presenti
- Focus states con glow effect
- Loading states animati

---

## 🎭 Animation System

### Keyframe Animations Available

```css
/* Entry Animations */
@keyframes reveal           /* Fade in + slide up */
@keyframes float            /* Floating movement */

/* Effects */
@keyframes gradient-shift   /* Animated gradient */
@keyframes text-glow        /* Pulsing glow */
@keyframes pulse            /* Scale + opacity */
@keyframes shimmer          /* Button shimmer */

/* Bloom Specific */
@keyframes bloom-petals     /* Flower blooming */
@keyframes bloom-glow       /* Glow effect */

/* Utility */
@keyframes spin             /* Rotation */
@keyframes bounce           /* Bounce effect */
```

### Transition Standards

```css
--transition-fast: 0.15s ease    /* Hover states */
--transition-base: 0.3s ease     /* Default */
--transition-slow: 0.5s ease     /* Ambient */
```

---

## 🧩 Component Library

### GlassPanel
Contenitore base con glassmorphism effect.

**Caratteristiche:**
- Background semi-trasparente
- Backdrop blur (24px)
- Border sottile con opacità bassa
- Shadow multi-layer

### NeonButton
Bottone primario con gradiente arancione.

**Caratteristiche:**
- Gradiente arancione (#FF6B35 → #FF8F6B)
- Glow effect su hover
- Transform lift su hover (-2px)
- Shimmer animation opzionale

### TechInput
Input field con stile tech-forward.

**Stati:**
- Default: Background scuro, border sottile
- Focus: Border arancione + glow effect
- Error: Border rosso + messaggio
- Disabled: Opacity ridotta

### Logo
Logo SVG scalabile con gradiente multi-colore.

**Props:**
- `size`: Dimensione in px (default: 40)
- `className`: Classi CSS aggiuntive

---

## 📱 Pages

### Login Page (`/`)

**Layout:**
- Split layout 50/50 (form | visuals)
- Form side: Dark background (#0A0A0A)
- Visual side: Gradient shapes + flower animation

**Features:**
- Username/Password inputs con icone
- Remember Me checkbox
- Forgot Password link
- Error handling
- Responsive design

**Credentials:**
- Username: `admin`
- Password: `admin`

### Dashboard Page (`/dashboard`)

**Layout:**
- Fixed navbar con logo
- Grid di app cards (3 colonne desktop)
- Spotlight effect su cards

**Apps Available:**
- Brand Profile
- CaptionFlow
- Growth Analytics

---

## 🛠️ Tech Stack

### Core
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.12
- **Router**: React Router DOM 6.21.3
- **Icons**: Lucide React 0.309.0

### Styling
- **Approach**: Pure CSS + CSS Variables
- **No frameworks**: No Tailwind/SCSS (only Tailwind classes in some components)
- **Font Loading**: Google Fonts

### Deployment
- **Platform**: Vercel
- **Config**: SPA routing via vercel.json

---

## 📝 Development Guidelines

### Adding New Components

1. Create component in `/src/components/`
2. Use CSS variables for theming
3. Follow naming conventions (PascalCase)
4. Add prop validation
5. Document component in this file

### Adding New Animations

1. Define keyframe in `/src/styles/global.css`
2. Add to Animation System section above
3. Use meaningful, descriptive names
4. Test performance (prefer transform/opacity)

### Color Usage Rules

- **Primary actions**: `--accent-primary` (#FF6B35)
- **Success states**: `--success` (#34D399)
- **Error states**: `--error` (#F87171)
- **Text main**: `--text-primary` (#E0E0E0)
- **Text secondary**: `--text-secondary` (#9CA3AF)

### Animation Guidelines

- **Entry animations**: 0.3-0.6s
- **Hover states**: 0.15s
- **Ambient effects**: 2-4s infinite
- **Always use**: `ease` or `ease-out`
- **Prefer**: `transform` and `opacity` for performance

---

## 🚀 Build & Deploy

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
git push origin main
# Auto-deployed via Vercel integration
```

---

## 🎨 Design Assets

### Favicon
- **Location**: `/public/favicon.svg`
- **Size**: 32x32px
- **Design**: Logo con gradiente

### Logo Component
- **Location**: `/src/components/Logo.jsx`
- **Scalable**: Yes (SVG)
- **Gradient**: Radial multi-color

---

## 📚 References

### Full Documentation
See `BRAND_GUIDELINES.md` for:
- Complete color system
- Typography scale
- UI component specs
- Animation library
- Layout system
- States & feedback
- Implementation examples

### External Resources
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts](https://fonts.google.com/)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

## 🔒 Git Workflow

### Branch Strategy
- **Main branch**: `main` (production)
- **Feature branches**: `claude/feature-name-xxxxx`

### Commit Guidelines
- Use descriptive commit messages
- Format: `Action: Description`
  - `Add: New feature`
  - `Update: Modified feature`
  - `Fix: Bug fix`
  - `Redesign: UI changes`

### Current Branch
```
claude/redesign-web-interface-wWmCJ
```

---

## ✅ Recent Updates

### 2026-01-17
- Created `claude.md` documentation
- Improved Login page with glassmorphism
- Added advanced animations
- Enhanced brand identity compliance

### Previous Commits
- `fb464f5`: Update Login UI to Wardiere style and add favicon
- `880c6fa`: Redesign Login Page (Split Layout)
- `609f583`: Add vercel.json for SPA routing
- `5b5d7ee`: Initial commit

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Forgot password flow
- [ ] Sign up page
- [ ] User profile settings
- [ ] Dark/Light theme toggle (optional)
- [ ] Multi-language support
- [ ] Advanced dashboard features

### UI Improvements
- [ ] Add more micro-interactions
- [ ] Implement spotlight card effect globally
- [ ] Add page transition animations
- [ ] Create reusable modal component
- [ ] Add toast notification system

---

## 📞 Support

### Issues
Report issues at: [GitHub Issues](https://github.com/psikolele/Bloom-AI/issues)

### Questions
For questions about implementation, refer to `BRAND_GUIDELINES.md` first.

---

**Version**: 2.0
**Last Updated**: 2026-01-17
**Maintained by**: Claude Code
**Project**: Bloom AI
