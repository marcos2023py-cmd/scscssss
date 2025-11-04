# Design Guidelines: Repuestos Informáticos D Y M

## Design Approach

**Reference-Based E-Commerce Approach** drawing inspiration from modern parts/electronics retailers like iFixit, NewEgg, and clean Shopify stores. The design prioritizes trust, ease of navigation through extensive catalogs, and efficient checkout flows while maintaining a professional, tech-forward aesthetic aligned with the brand's green identity.

## Core Design Principles

1. **Trust & Professionalism**: Clean layouts with clear product organization to build confidence in a technical parts marketplace
2. **Efficient Navigation**: Multi-level categorization (Brand → Model → Part Type) with persistent search and filtering
3. **Visual Clarity**: Consistent placeholder imagery with professional styling, clear product information hierarchy
4. **Streamlined Checkout**: Single-page checkout flow with clear section divisions and progress indication

---

## Typography System

**Font Families** (via Google Fonts CDN):
- **Primary**: Inter (weights: 400, 500, 600, 700) - Clean, modern sans-serif for UI and body text
- **Accent**: Lexend Deca (weights: 500, 600) - For headings and brand elements, slightly rounded for approachability

**Type Scale**:
- Display (brand/hero): 3xl to 4xl, Lexend Deca semibold
- H1 (page titles): 2xl to 3xl, Lexend Deca semibold  
- H2 (section headers): xl to 2xl, Lexend Deca medium
- H3 (category/card titles): lg to xl, Inter semibold
- Body: base, Inter regular
- Small (metadata/labels): sm, Inter medium
- Tiny (captions): xs, Inter regular

**Line Heights**: Tight (1.2) for headings, relaxed (1.6) for body text

---

## Layout & Spacing System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (between related elements): 2-4
- Component internal padding: 4-6  
- Section spacing: 8-12
- Major section gaps: 16-24

**Container Strategy**:
- Full-width header/footer with max-w-7xl inner container
- Product grids: max-w-7xl with responsive columns
- Checkout form: max-w-4xl centered
- Category sidebar: fixed w-64 on desktop, collapsible on mobile

**Grid System**:
- Product cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 with gap-6
- Category navigation: Single column list with nested items
- Checkout sections: Two-column layout (shipping/payment info split) on lg+

---

## Component Library

### Navigation & Header

**Main Header**: 
- Sticky top navigation with shop name/logo (left), search bar (center, expandable on mobile), cart icon with badge (right)
- Height: h-16, backdrop blur effect when scrolling
- Secondary nav bar below with brand category links in horizontal scroll on mobile, flex row on desktop

**Category Sidebar** (desktop):
- Fixed left sidebar w-64 with hierarchical accordion menu
- Brand names as primary items, models as nested expandable lists
- Active states with subtle indicators, hover states for interactivity

**Mobile Navigation**:
- Hamburger menu revealing slide-in drawer with full category tree
- Bottom sticky bar with category, search, cart, menu icons

### Product Display

**Product Cards**:
- Aspect ratio 1:1 image container with "IMAGEN NO DISPONIBLE" placeholder
- Placeholder design: Centered icon (image-off from Heroicons) with text below
- Product name (truncate to 2 lines), price prominent, "Agregar al Carrito" button
- Hover state: subtle elevation with shadow
- Card padding: p-4, rounded-lg borders

**Product Grid**: 
- Responsive columns as specified above
- Equal height cards using flex/grid
- Loading skeleton states for async loading

**Search Results**:
- Inline results dropdown below search bar showing top 6 matches
- Full results page with same grid layout plus filtering sidebar
- "X resultados para 'término'" header with sort options

### Shopping Cart

**Cart Icon/Badge**:
- Floating badge with item count, pulsing animation on add
- Click reveals slide-out panel from right (w-96 max)

**Cart Panel**:
- Scrollable item list with thumbnail, name, price, quantity controls, remove button
- Each item in compact horizontal layout
- Sticky footer with subtotal and "Proceder al Pago" button
- Empty state with icon and "Tu carrito está vacío" message

### Checkout Flow

**Single Page Checkout** (max-w-4xl centered):
- Progress indicator at top: Carrito → Datos de Envío → Pago → Confirmación (current step highlighted)
- Three main sections vertically stacked on mobile, two-column on lg+:

1. **Datos de Envío** (left column):
   - Form fields: Nombre completo, Cédula de Identidad, Teléfono, Dirección, Ciudad, Código Postal
   - Each field with floating labels, proper input types
   - Field spacing: space-y-4

2. **Datos de Pago** (right column):
   - Tarjeta number (with card type icon detection), Titular, Fecha de Expiración, CVV
   - Visual card mockup showing entered data in real-time
   - Fields in grid-cols-2 for expiry/CVV

3. **Resumen del Pedido** (sticky sidebar on desktop, section on mobile):
   - Compact item list, subtotal, envío, total
   - "Confirmar Pedido" primary button (full width)

### Loading & Feedback States

**Loading Animation** (5 seconds):
- Full-screen overlay with semi-transparent backdrop
- Centered animated logo or spinner
- "Procesando pago..." text below
- Smooth fade-in entrance

**Error Notification**:
- Modal dialog (max-w-md) with icon (x-circle from Heroicons)
- Message: "Los datos de la tarjeta no son aceptados en el comercio. Intente con otra."
- Single "Entendido" button to dismiss
- Subtle shake animation on appearance

### Footer

**Rich Footer**:
- Three-column layout on desktop (Información, Categorías, Contacto)
- Información: Logo, tagline, brief description
- Categorías: Quick links to main brands
- Contacto: Phone, email, social media icons (Heroicons)
- Bottom bar with copyright and payment method icons
- Background distinguishes from main content, padding py-12

---

## Images

**Product Placeholders**:
- "IMAGEN NO DISPONIBLE" design with light background, centered camera-off icon (Heroicons), text below in muted tone
- Consistent across all product cards
- Aspect ratio 1:1, object-cover fit

**Hero Section** (Homepage):
- Full-width banner (h-96) showcasing brand with overlay text
- Image suggestion: Technical/workshop background with phone parts in organized trays, tooling
- Centered headline "Repuestos Informáticos D Y M", subheadline "Repuestos originales para todas las marcas"
- CTA button "Explorar Catálogo" with blurred background, no hover state changes
- Text with subtle shadow for readability over image

**Category Headers** (optional):
- Small banner image for each brand category page (h-48)
- Brand logo or representative phone image

---

## Interaction Patterns

**Micro-interactions**:
- Add to cart: Brief scale animation on button, cart badge pulse
- Quantity controls: Immediate visual feedback with subtle number change animation
- Form validation: Inline error messages appearing below fields with icon
- Search: Debounced input with loading indicator in search bar

**Navigation Flow**:
- Homepage → Category (Brand) → Subcategory (Model) → Product List → Product Detail (optional) → Cart → Checkout
- Breadcrumb navigation on category/product pages

**Search Behavior**:
- Auto-suggest with debouncing (300ms)
- Highlight matching text in results
- Recent searches storage (optional localStorage enhancement)

---

## Accessibility & Forms

**Form Inputs**:
- Consistent styling: border, rounded, padding (px-4 py-3), focus ring
- Labels: Always visible (not placeholder-only), text-sm above field
- Error states: Red accent border, error icon, error message below
- Required field indicators with asterisk

**Icons**: Heroicons via CDN (outline style for UI, solid for emphasis)

**Keyboard Navigation**: 
- Tab order follows logical flow
- Cart and mobile menu accessible via keyboard
- Form fields with proper labels and ARIA attributes

---

## Special Considerations

**Telegram Integration**:
- No visible integration UI (happens behind scenes after checkout)
- Success feedback only through error modal (per requirements)

**Performance**:
- Lazy loading for product images (even placeholders for consistency)
- Virtualized lists for long category trees
- Debounced search to minimize re-renders

**Responsive Breakpoints**:
- Mobile-first approach
- sm: 640px (2 columns)
- md: 768px (sidebar appears)
- lg: 1024px (3 columns, checkout two-column)
- xl: 1280px (4 columns)

This comprehensive design creates a professional, trustworthy e-commerce experience optimized for browsing extensive technical catalogs while maintaining brand identity and smooth user flows from discovery to checkout.