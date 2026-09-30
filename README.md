# DOM Store Manager (`dom-store-zhumazhan`)

Interactive Web Store Application built for Web Development course, **Lab 5: DOM Manipulation, Events & Forms**.  
Author: **Akerke Zhumazhan**

---

## 1. How to Open

Open `index.html` directly in any modern web browser or run using VS Code **Live Server** extension:

```bash
open index.html

2. Handled Events Rationale
submit on #add-product-form: Handled to process user inputs, trigger field validation without page reloads (e.preventDefault()), and update state.
click on #product-list (Event Delegation): A single click event listener attached to <tbody> manages all increment (+), decrement (-), and delete button actions using HTML5 data-action and data-name attributes. This avoids attaching individual event listeners to every row and improves memory efficiency.
submit validation triggers: Validates fields in real-time within the DOM, showing inline red error messages without alert() popups.

3. Application Interface

4. AI Tools Used
Gemini: Assisted in setting up clean CSS flexbox/grid layout and event delegation structure.