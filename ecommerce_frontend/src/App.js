import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Nav from "./pages/Nav";
import Home from './pages/Home'
import Categories from './pages/Categories'
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import CategoriesDetails from "./pages/CategoriesDetails";
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import OrderCompletePage from './pages/OrderCompletePage';
import { CartProvider } from './pages/CartContext';
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
  <>
      <CartProvider>
   <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<CategoriesDetails />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<PrivateRoute Component={CartPage} />} />
        <Route path="/order-complete" element={<OrderCompletePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search/:query" element={<SearchPage />} />


      </Routes>
     
    </Router>
    </CartProvider>
    </>
  );
}

export default App;
