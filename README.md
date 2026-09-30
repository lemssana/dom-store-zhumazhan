
# DOM Store Manager Architecture

Study project for Web Development course, **Lab 5: DOM Manipulation, Events & Forms**.  
Author: **Akerke Zhumazhan** (`dom-store-zhumazhan`)

---

## 1. Project Overview & Quick Start

This repository contains an interactive DOM application built on top of the custom `Store` state management class developed in Lab 4. The project strictly uses **vanilla JavaScript (ES6+) and native DOM APIs** without external frameworks or third-party UI libraries.

### How to Run

```bash
# Option 1: Serve locally via Node.js static server
npx serve .

# Option 2: Open directly in any modern browser
open index.html

```

---

## 2. Directory & Architecture Structure

```text
dom-store-zhumazhan/
├── index.html          # Semantic HTML5 layout containing form and inventory table
├── style.css           # Modern CSS3 styling (CSS Grid, Flexbox, custom properties)
├── app.js              # Application entry point, event listeners, and DOM controllers
├── src/
│   └── Store.js        # Core Store ES6 class encapsulating array state and validations
├── screenshot1.png     # Screenshot verification of the inventory interface
├── screenshot2.png     # Screenshot verification of inline form validations
└── README.md           # Comprehensive project documentation

```

---

## 3. Specifications & Technical Reference

### Core Components Specifications

| File / Component | Role & Scope | Key Responsibilities & Constructs |
| --- | --- | --- |
| **`src/Store.js`** | Data Model / State Layer | Encapsulates `#items` private array, item validation logic (`isValidItem`), price calculation (`total()`), and quantity mutations (`updateQty`). |
| **`app.js`** | UI Controller & Event Handlers | Coordinates state changes with DOM updates (`render()`), handles form submission, performs DOM-based field validation, and executes event delegation. |
| **`index.html`** | Structure & Markup | Provides accessible form controls with inline `.error-message` spans and tabular layout for inventory rendering. |
| **`style.css`** | Presentation Layer | Defines responsive layout, hover states, status badges, and styled form controls using modern CSS variables. |

### DOM Event Handling Matrix

| Target Element | Event Type | Pattern / Mechanism | Purpose & Implementation Details |
| --- | --- | --- | --- |
| **`#add-product-form`** | `submit` | Direct Event Listener | Prevents page refresh via `e.preventDefault()`, executes `validateForm()`, and calls `store.add()` upon successful validation. |
| **`#product-list`** | `click` | Event Delegation | A single event listener attached to `<tbody>` intercepts clicks on `+`, `-`, and `Delete` buttons using `data-action` and `data-name` dataset attributes. |

---

## 4. Handled Events Rationale

In accordance with Lab 5 requirements, event handling is structured around **memory efficiency and clean state synchronization**:

1. **`submit` Event on Form:**
Instead of using standard form submission which reloads the browser, the `submit` event is intercepted using `preventDefault()`. This allows running custom JavaScript validation logic dynamically and updating the DOM in-place.
2. **Event Delegation on `<tbody>` (`#product-list`):**
Rather than attaching individual `click` event listeners to every single `+`, `-`, and `Delete` button across all table rows, a single `click` event listener is attached to the parent `<tbody>`. When a user clicks a button, the event bubbles up to `<tbody>`, where `e.target.dataset.action` identifies the intended action and invokes `store.updateQty()` or `store.remove()`.
3. **Inline Validation without `alert()`:**
Form validation errors (empty product name, invalid or negative price, non-integer quantity) are displayed directly in dedicated error spans in the DOM without modal popups.

---

## 5. Application Interface & Validation Proof

### Product Inventory View

### Inline Form Validation

---

## 6. AI Tools Disclosure

* **Gemini / ChatGPT:** Assisted in designing modern CSS variables, structuring event delegation patterns, and formatting technical documentation.

```
