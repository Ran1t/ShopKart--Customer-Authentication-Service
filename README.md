# ShopKart

ShopKart is a full stack shopping application built with React, Vite, Express, and MongoDB. It includes customer registration and login, product browsing, a wishlist, a cart, checkout, and order history.

## Requirements

- Node.js 20.19+ or 22.12+ and npm
- MongoDB running locally or a MongoDB Atlas connection string
- Razorpay test keys to complete the payment flow

## Project structure

```text
client/vite-project/   React frontend
server/               Express API and MongoDB models
```

## Setup

1. Clone the repository and install dependencies in both packages:

   ```bash
   cd server
   npm install
   cd ../client/vite-project
   npm install
   ```

2. Create `server/.env` (this file is ignored by Git) and set the backend configuration:

   ```dotenv
   dbUrl=mongodb://127.0.0.1:27017/shopkart
   JWT_SECRET=replace-with-a-long-random-secret
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_test_secret
   ```

   `dbUrl` and `JWT_SECRET` are required. Razorpay credentials are needed for checkout and must be Razorpay **test mode** keys. The server also accepts `TEST_RAZORPAY_KEY` and `TEST_RAZORPAY_SECRET` as aliases. Never commit real credentials or `.env` files.

3. Start the API from the `server` directory:

   ```bash
   node index.js
   ```

   The API listens on `http://localhost:8000` and connects to the MongoDB database specified by `dbUrl`.

4. In a second terminal, start the frontend:

   ```bash
   cd client/vite-project
   npm run dev
   ```

   Open the local URL printed by Vite (normally `http://localhost:5173`). The frontend sends API requests to port `8000` on the same host.

## Product data

The products page reads product records from MongoDB. The API currently provides `POST /products` to create products; there is no seed script. Create product documents through that endpoint (for example, with an API client) using this JSON shape:

```json
{
  "name": "Example product",
  "description": "Product description",
  "price": 29.99,
  "category": "Accessories",
  "image": "https://example.com/product.jpg",
  "stock": 10
}
```

## Useful commands

Run these from `client/vite-project`:

```bash
npm run build   # create the production frontend bundle
npm run lint    # check frontend code with ESLint
npm run preview # serve the production bundle locally
```

## API overview

- `/customers` — registration, login, current customer, logout, and password change
- `/products` — list, search, sort, create, and retrieve products
- `/wishlist` — authenticated wishlist operations
- `/cart` — authenticated cart operations
- `/orders` — authenticated order history and Razorpay checkout/payment verification

Wishlist, cart, and order endpoints require the customer login cookie. The server's CORS configuration currently permits the local Vite origins on ports `5173`.

## Configuration and secrets

Keep local backend configuration in `server/.env`; `server/.gitignore` excludes that file. Never commit frontend or backend environment files or credentials.

### Deployment environment variables

- **Backend:** Set `dbUrl`, `JWT_SECRET`, and (for checkout) `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in the backend host's environment settings. Set `FRONTEND_URL` to the deployed frontend origin, with no trailing slash. The server reads the host-provided `PORT` automatically. Set `NODE_ENV=production` so authentication cookies use secure cross-site settings.
- **Frontend:** Set `VITE_API_URL` to the deployed backend origin, including the trailing slash, for example `https://your-api.example.com/`. This value is public configuration; never put secrets in `VITE_` variables.

For local development, leave `VITE_API_URL` unset; the frontend will use port `8000` on the current host.
