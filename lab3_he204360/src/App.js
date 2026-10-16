import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
    return () => document.documentElement.removeAttribute("data-bs-theme");
  }, [isDark]);

  return (
    <Container className="app-container">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((previous) => !previous)} />
      <main className="pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Container>
  );
}

export default App;
