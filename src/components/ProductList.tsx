import React, { useState, useEffect } from "react";
import { Table, Button, TextInput, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { Product } from "../types/product";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleSearch = () => {
    fetch("https://dummyjson.com/products/search?q=" + searchTerm)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  const handleDelete = (id: number) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      });
  };

  const handleSave = (product: Product) => {
    const isNewProduct = !product.id;
    const method = isNewProduct ? "POST" : "PUT";
    const url = isNewProduct
      ? "https://dummyjson.com/products/add"
      : `https://dummyjson.com/products/${product.id}`;

    const { id, ...productPayload } = product;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productPayload),
    })
      .then((res) => res.json())
      .then((savedProduct) => {
        if (product.id) {
          setProducts(
            products.map((p) => (p.id === savedProduct.id ? savedProduct : p))
          );
        } else {
          setProducts([...products, savedProduct]);
        }
        setModalOpen(false);
        setCurrentProduct(null);
      });
  };

  const openModal = (product: Product | null = null) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <Group gap="apart" style={{ marginBottom: "1rem" }}>
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          style={{ width: "300px" }}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={() => openModal()}>Add Product</Button>
      </Group>

      {products.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover withRowBorders={false}>
            <Table.Thead>
              <Table.Tr style={{ textAlign: "left" }}>
                <Table.Th>Title</Table.Th>
                <Table.Th>Brand</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((product) => (
                <Table.Tr key={product.id} style={{ textAlign: "left" }}>
                  <Table.Td>
                    <a onClick={() => navigate(`/products/${product.id}`)}>
                      {product.title}
                    </a>
                  </Table.Td>
                  <Table.Td>{product.brand}</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>${product.price}</Table.Td>
                  <Table.Td>{product.stock}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button onClick={() => openModal(product)} size="xs">
                        Edit
                      </Button>
                      <Button
                        onClick={() => product.id && handleDelete(product.id)}
                        size="xs"
                        color="red"
                      >
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}

      {modalOpen && (
        <ProductForm
          product={currentProduct}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductList;
