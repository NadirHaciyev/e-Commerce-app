import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Profile from "./pages/Profile";
import { useAuth } from "./context/Auth";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";
import Home from "./pages/Admin/Home";
import Order from "./pages/Admin/Order";
import AdminProducts from "./pages/Admin/Products";
import New from "./pages/Admin/Products/new";
import ProductUpdate from "./pages/Admin/ProductUpdate";

function App() {
  const { user, logedIn } = useAuth();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="register" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={logedIn ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="admin"
            element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
          >
            <Route index element={<Home />} />
            <Route path="order" element={<Order />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/:product_id" element={<ProductUpdate />} />
            <Route path="products/new" element={<New />} />
          </Route>
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="basket" element={<Basket />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
