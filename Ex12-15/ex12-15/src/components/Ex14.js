import { createContext, useContext, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

// 1. Theme Context
const themes = {
  light: { foreground: "#000000", background: "#eeeeee" },
  dark: { foreground: "#ffffff", background: "#000000" },
};

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");

  const toggleTheme = () => {
    setThemeName((currentTheme) => currentTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function Theme() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <div
      className="border rounded-3 p-4"
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <p>Current theme: {themeName}</p>
      <Button
        variant="light"
        onClick={toggleTheme}
        style={{ backgroundColor: theme.background, color: theme.foreground }}
      >
        Toggle Theme
      </Button>
    </div>
  );
}

// 2. Shopping Cart / 3. Real-time Cart Count and Value
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    category: "mains",
    label: "Hot",
    price: "4.99",
    description: "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    category: "appetizer",
    label: "",
    price: "1.99",
    description: "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
  },
  {
    id: 2,
    name: "Vadonut",
    category: "appetizer",
    label: "New",
    price: "1.99",
    description: "A quintessential ConFusion experience, is it a vada or is it a donut?",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    category: "dessert",
    label: "",
    price: "2.99",
    description: "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms",
  },
];

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === dish.id);
      return existingItem
        ? items.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalValue = cartItems.reduce(
    (total, item) => total + Math.round(Number(item.price) * 100) * item.quantity,
    0
  ) / 100;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}

function DishesList() {
  const { addToCart, totalItems, totalValue } = useContext(CartContext);

  return (
    <div className="text-start">
      <h4>Dishes</h4>
      <p aria-live="polite">Cart: {totalItems} items | ${totalValue.toFixed(2)}</p>
      {dishes.map((dish) => (
        <div key={dish.id} className="border rounded-3 p-3 mb-3">
          <h5>
            {dish.name} {dish.label && <span className="badge bg-warning text-dark">{dish.label}</span>}
          </h5>
          <p className="small text-muted">{dish.category} · {dish.description}</p>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <strong>${dish.price}</strong>
            <Button size="sm" onClick={() => addToCart(dish)} aria-label={`Add ${dish.name} to cart`}>
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalValue } = useContext(CartContext);

  return (
    <div className="border rounded-3 shadow-sm p-3 bg-white text-start">
      <h4>Cart</h4>
      <Table bordered hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">Dish</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr><td colSpan={4} className="text-center text-muted">Your cart is empty.</td></tr>
          ) : cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div aria-live="polite">
        <p>Total items: {totalItems}</p>
        <p className="fw-bold">Total value: ${totalValue.toFixed(2)}</p>
      </div>
      <Button variant="outline-danger" onClick={clearCart} disabled={cartItems.length === 0}>
        Clear Cart
      </Button>
    </div>
  );
}

function Ex14() {
  return (
    <div>
      <h3>1. Theme Switcher</h3>
      <ThemeProvider>
        <Theme />
      </ThemeProvider>

      <hr />
      <h3>2. Shopping Cart</h3>
      <p className="text-muted">3. Cart count and value update in real time.</p>
      <CartProvider>
        <Container>
          <Row className="g-3">
            <Col md={6}><DishesList /></Col>
            <Col md={6}><Cart /></Col>
          </Row>
        </Container>
      </CartProvider>
    </div>
  );
}

export default Ex14;
