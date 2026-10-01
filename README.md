# TUVO PERFUMES

A front-end perfume shop prototype made with plain HTML, CSS, and JavaScript. It uses mock product data and runs without a build step, framework, or backend.

## Project files

- `index.html` contains the page sections, navigation, product areas, dialogs, cart, and checkout form.
- `style.css` controls the visual design, product layouts, dialogs, and responsive mobile styles.
- `script.js` contains the sample products and the search, category filters, product details, cart, and checkout interactions.
- `README.md` is this getting-started guide.

## Run it in VS Code

1. Open this project folder in VS Code.
2. To use the Live Server extension, install it from the Extensions view, open `index.html`, then choose **Go Live** in the status bar.
3. Or open the VS Code terminal in this folder and run `py -m http.server 8000`. Visit `http://localhost:8000` in your browser. Stop the server with `Ctrl+C`.
4. An internet connection is needed for the hosted sample product photos and Google Fonts. The site itself has no package installation step.

## How the shopping bag works

Product cards are drawn from the `products` array in `script.js`. Clicking **Add to bag** adds that product to the cart. The cart drawer redraws immediately with the item count, quantities, line totals, and subtotal. The quantity buttons and remove control update the same cart data.

The `saveCart()` function writes the cart as JSON into the browser's `localStorage`. When the page starts, `loadCart()` reads it back, checks that product IDs and quantities are valid, and restores the bag. This storage is only in that browser on that device; it is not an online order database.

The checkout form validates the required fields in the browser and displays an order-received confirmation. This is a UI demonstration only: it does not send an order to TUVO PERFUMES and does not collect payment. The Google button is also a demo interaction, not real Google authentication. Real accounts, order processing, and payment require a secure service and appropriate integrations.

## Add a product

In `script.js`, add another object to the `products` array near the top. Give it a unique `id`, a name, category, audience, price as a number, short description, image path or URL, and available stock. For example:

```js
{
  id: 13,
  name: 'Cedar & Citrus',
  category: 'Perfumes',
  audience: "Unisex",
  price: 42000,
  description: 'Bright citrus with a dry cedar finish.',
  image: 'images/cedar-citrus.jpg',
  stock: 8
}
```

Use `Perfumes` or `Perfume Oils` for `category`. For `audience`, use `Men's Fragrances`, `Women's Fragrances`, or `Unisex`. These values control the category filters. The oil cards are generated automatically for products whose category is `Perfume Oils`.

## Change prices and photos

- Change a product's `price` number in the `products` array. Prices are formatted as Nigerian Naira by `formatPrice()`.
- To use your own photo, create an `images` folder beside these files, put the photo there, and set `image` to a relative path such as `images/cedar-citrus.jpg`. Keep product photos cropped similarly for a consistent grid.
- The current sample photos and fonts are loaded from the internet. Replace their URLs with your own product photography before publishing a real shop.

## Before sharing or publishing

1. Test search by product name and category, and click each category filter.
2. Add products, change quantities, remove products, and check the cart count and Naira totals.
3. Refresh the page and confirm the cart is still there; clear site storage to test the empty-cart state.
4. Open product details, change quantity, and add the selected amount.
5. Complete checkout with test information and confirm the success message. No order is actually sent.
6. Try the Google button and remember it only shows a demo message.
7. Check the page on a phone-sized screen and with keyboard navigation.
8. Replace all placeholder phone, WhatsApp, and email details; test the links.
9. Make sure every product name, price, stock quantity, and photo is correct and that you have permission to use the photos.
10. Do not advertise this prototype as taking real orders or payments until it is connected to a secure backend and tested.

## Publish the static interface

You can publish the front-end preview on GitHub Pages or a static hosting service such as Netlify. For GitHub Pages, push these files to a GitHub repository, open the repository's **Settings → Pages**, choose the branch and folder containing `index.html`, and save. The host will provide a public URL after publishing. A static host publishes the interface only; real Google login, order storage, and payment still need separate secure integrations.
