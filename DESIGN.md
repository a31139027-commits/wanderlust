# Design System Specification: A Curated Keepsake

## 1. Overview & Creative North Star

### The Creative North Star: "The Digital Curator"
This design system is built on the philosophy of a **Curated Keepsake**. It moves away from the clinical, high-contrast rigidity of traditional SaaS platforms toward an editorial, tactile experience. The goal is to make every interface feel like a page in a high-end travel journal or a bespoke gallery exhibition.

**Breaking the Template:**
To achieve this signature feel, we abandon the standard 1px border. We lean into **Bento Grid** logic—grouping information into distinct, highly rounded "containers" that vary in size to create intentional asymmetry. By utilizing extreme corner radii (`xl: 3rem`) and subtle tonal shifts, the layout feels organic and "collected" rather than engineered.

---

## 2. Colors & Surface Philosophy

The palette is anchored in earthy, sun-drenched tones. We use a Material-inspired naming convention but apply it with editorial restraint.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning or containment is strictly prohibited. 
Boundary definition must be achieved through:
1.  **Tonal Shifts:** Placing a `surface_container_lowest` card on a `surface_container` background.
2.  **Negative Space:** Using the spacing scale (e.g., `8: 2.75rem`) to let elements breathe.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper.
*   **Base Layer:** `surface` (#FDF8F5) or `surface_bright`.
*   **Section Layer:** `surface_container` (#F2EDEA) to group large Bento modules.
*   **Content Layer:** `surface_container_lowest` (#FFFFFF) for individual cards or interactive elements.
*   **The Glass Rule:** Navigation bars and floating menus must utilize `surface_container_low` at 70% opacity with a **24px backdrop-blur**. This creates a "frosted glass" effect that integrates the UI with the content beneath.

### Signature Textures
Avoid flat `primary` fills for large areas. Instead, use a linear gradient from `primary` (#7A5642) to `primary_container` (#DCAE96) at a 45-degree angle to provide a soft, "terra cotta" depth to hero sections and primary CTAs.

---

## 3. Typography: Editorial Authority

The typography pairing is designed to balance modern geometric precision with legible, humanist warmth.

*   **Display & Headlines:** **Plus Jakarta Sans.** 
    *   *Usage:* High-impact titles. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, editorial look.
*   **Body & Titles:** **Be Vietnam Pro.** 
    *   *Usage:* All reading text. The slightly taller x-height of Be Vietnam Pro ensures legibility against low-contrast backgrounds.
*   **Hierarchy Note:** Always maintain a significant scale jump between `headline-lg` and `body-md` to preserve the "keepsake" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are often too "heavy" for this soft aesthetic. We use **Tonal Layering** as the primary driver of depth.

*   **The Layering Principle:** To lift a card, do not add a shadow immediately. Instead, drop the background color one step in the hierarchy (e.g., a card using `surface_container_highest` sitting on a `surface_container_low` deck).
*   **Ambient Shadows:** If a floating element (like a FAB or Modal) requires a shadow, use a "Cloud Shadow":
    *   `box-shadow: 0 12px 40px rgba(52, 50, 47, 0.06);` 
    *   The shadow color must be a low-opacity version of `on_surface` (#34322F), never pure black.
*   **The "Ghost Border" Fallback:** For accessibility in input fields, use the `outline_variant` token at **15% opacity**. This provides a hint of structure without breaking the "No-Line" rule.

---

## 5. Components

### Buttons
*   **Primary:** Filled with `primary` gradient; white `on_primary` text. Radius: `full`.
*   **Secondary:** Filled with `secondary_container` (#C9E6D7). Soft mint background with `on_secondary_container` text.
*   **Tertiary:** Ghost style. No background, `primary` text, bold `label-md` weight.

### Bento Cards
*   **Styling:** Background of `surface_container_lowest`. 
*   **Rounding:** `lg` (2rem) for standard cards; `xl` (3rem) for parent containers.
*   **Content:** No dividers. Separate header from body using `3.5rem` (10) of vertical padding.

### Input Fields
*   **Style:** Pill-shaped (`full` roundedness).
*   **Color:** `surface_variant` background.
*   **Interaction:** On focus, transition background to `surface_container_lowest` and add a soft `secondary` ambient shadow.

### Navigation (The Signature Bar)
*   **Architecture:** Floating "island" nav. 
*   **Visuals:** `surface_container_low` at 80% opacity, 24px backdrop blur. 
*   **Icons:** Use `on_surface_variant` for inactive states and a small `primary` dot indicator for active states.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical Bento layouts. A "keepsake" feels gathered, not manufactured.
*   **Do** use `secondary` (Mint) as a functional accent for success states or "organic" callouts.
*   **Do** embrace wide margins. The "Curated" look requires at least `5.5rem` (16) of padding on page containers.

### Don't
*   **Don't** use 1px solid borders. It shatters the soft, premium feel.
*   **Don't** use sharp corners. Even "small" components like chips should have at least `0.5rem` rounding.
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1C1B1A) to keep the contrast natural and easy on the eyes.
*   **Don't** crowd the Bento grid. If a card feels full, increase the grid span rather than shrinking the text.