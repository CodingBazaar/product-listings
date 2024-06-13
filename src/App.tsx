import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import Header from "./components/Header";
import { ProductDetails } from "./components/ProductDetails";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container fluid size={"sm"}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
