import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./cart/CartProvider";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
              <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/products" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
              <Route path="/products/:id" element={<ProtectedRoutes><ProductDetails /></ProtectedRoutes>} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
