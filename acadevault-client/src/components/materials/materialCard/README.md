# MaterialCard Component (AcadeVault)

This folder contains a production-grade, modular implementation of **MaterialCard** for AcadeVault. Instead of duplicating “FeaturedCard, TrendingCard, GridCard, FlipCard, etc.,” we expose a single **MaterialCard** that supports:

- Four `variant`s:
  1. `default` (vertical)
  2. `horizontal`
  3. `grid`
  4. `flip`
- A `layout` prop (for special cases; currently only `"backface"` is used internally for flip).
- Flags to toggle which pieces are visible:  
  • `showMeta`, `showSummary`, `showDescription`  
  • `showPrice`, `showRating`, `showActions`, `showShopInfo`
- Slot props (for advanced overrides):  
  • `renderThumbnail(material)`, `renderContent(material)`, `renderFooter(material)`  
- Card styling props:  
  • `cardVariant` (“default” / “outlined” / “shadowed” / “gradient”)  
  • `cardTheme` (“light” / “dark” / “glass” / “neon”)  
  • `clickable` (if true, the entire card is keyboard-focusable + clickable on Enter/Space)

### File overview

- **index.jsx**  
  The main entry point. Computes dynamic pricing (via `useEffectivePrice`), determines `promoTag`, then conditionally renders either:
  1. `FlipCard` (for `variant === "flip"`)  
  2. One of the other three layouts (`default`, `horizontal`, `grid`)

- **FlipCard.jsx**  
  Handles the 3D “flip” animation using Framer Motion.  
  - Front face uses `<Thumbnail>` + inline price/rating + Quick View button.  
  - Back face shows details (type, degree, level, pages, delivery, department, publisher) and bottom action buttons.

- **Thumbnail.jsx**  
  Renders the `<Image>` (via Next.js) and a promotion/status tag (if any).

- **Content.jsx**  
  Renders:
  - Department • degree (level) (if `showMeta`)
  - Title  
  - Summary (if `showSummary`) **or** Description (if `showDescription && !showSummary`)  
  - A “Type • Delivery • Pages” line

- **Footer.jsx**  
  Renders:
  - Pricing (via `<PriceDisplay>`) and “Save X%” badge if discounted  
  - Star rating (via `<StarRatingDisplay>`) + review count  
  - Optional shop info (logo + link)  
  - “Quick View / Wishlist / Compare / Add to Cart” buttons

> **Tip:** To add a brand-new layout variant (e.g. “sidebar card”), simply add another case under `variant` in **index.jsx**, and compose `<Thumbnail>`, `<Content>`, `<Footer>` (or pass custom `renderXXX` slots).

---

## 3. How to import & use

```jsx
import MaterialCard from "@/components/materials/MaterialCard";

// Example usage in a page or parent component:
<MaterialCard
  material={someMaterialObj}
  variant="grid"
  onClick={() => router.push(`/materials/${someMaterialObj._id}`)}
  onQuickView={(mat) => setQuickViewMaterial(mat)}
  onAddToCart={(id) => addToCart(id)}
  onWishlist={(id) => addToWishlist(id)}
  onCompare={(id) => addToCompare(id)}
  showShopInfo={true}
  cardVariant="shadowed"
  cardTheme="light"
  clickable={true}
/>
