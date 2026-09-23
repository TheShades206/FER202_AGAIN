import nam1 from "./Images/nam1.jpg";
import nu1 from "./Images/Nu1.jpg";
import nu2 from "./Images/Nu2.jpg";

import nam2 from "./Images/nam2.jpg";
import nam3 from "./Images/nam3.jpg";
import nam4 from "./Images/nam4.jpg";
import Header from './components/Header.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner.js';
import Footer from './components/Footer.js';
function App() {
const products = [
  {
    id: 1,
    name: "Men Hoodie",
    price: 450000,
    status: "In Stock",
    image: nam1,
  },
  {
    id: 2,
    name: "Women T-Shirt",
    price: 250000,
    status: "In Stock",
    image: nu1,
  },
  {
    id: 3,
    name: "Jeans",
    price: 500000,
    status: "In Stock",
    image: nam2,
  },
  {
    id: 4,
    name: "Jacket",
    price: 650000,
    status: "In Stock",
    image: nam3,
  },
  {
    id: 5,
    name: "Dress",
    price: 550000,
    status: "In Stock",
    image: nu2,
  },
  {
    id: 6,
    name: "Shirt",
    price: 350000,
    status: "In Stock",
    image: nam4,
  },
];

  return (
    <div>
      <Header/>
      <br></br>  
      <Banner/>
      <br></br>
      <Footer/>
    </div>
  );
}

export default App;
