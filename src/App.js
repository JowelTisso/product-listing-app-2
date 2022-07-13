import "./App.css";
import Header from "./components/header/Header";
import { CartProvider } from "./context/CartProvider";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <CartProvider>
      <Header />
      <AllRoutes />
    </CartProvider>
  );
}

export default App;
