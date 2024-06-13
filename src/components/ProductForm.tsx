import React, { useState } from "react";
import { Modal, Button, TextInput, NumberInput, Group } from "@mantine/core";
import { Product } from "../types/product";

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onClose,
}) => {
  const [formState, setFormState] = useState({
    title: product ? product.title : "",
    description: product ? product.description : "",
    price: product ? product.price : 0,
    discountPercentage: product ? product.discountPercentage : 0,
    rating: product ? product.rating : 0,
    stock: product ? product.stock : 0,
    brand: product ? product.brand : "",
    category: product ? product.category : "",
  });
  const [error, setError] = useState({
    title: false,
    price: false,
    stock: false,
    brand: false,
    category: false,
  });

  const handleChange = (field: string, value: unknown) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const validate = () => {
    let hasError = false;

    if (
      formState.title.trim() === "" ||
      formState.title.length < 3 ||
      formState.title.length > 50
    ) {
      setError((prev) => ({ ...prev, title: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, title: false }));
    }

    if (
      isNaN(formState.price) ||
      formState.price <= 0 ||
      formState.price > 10000
    ) {
      setError((prev) => ({ ...prev, price: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, price: false }));
    }

    if (
      isNaN(formState.stock) ||
      formState.stock < 0 ||
      formState.stock > 1000
    ) {
      setError((prev) => ({ ...prev, stock: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, stock: false }));
    }

    if (
      !/^[a-zA-Z\s]+$/.test(formState.brand) ||
      formState.brand?.length < 2 ||
      formState.brand?.length > 30
    ) {
      setError((prev) => ({ ...prev, brand: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, brand: false }));
    }

    if (
      formState.category.trim() === "" ||
      formState.category.length < 3 ||
      formState.category.length > 30
    ) {
      setError((prev) => ({ ...prev, category: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, category: false }));
    }

    return !hasError;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newProduct: Product = product
        ? { ...product, ...formState }
        : { ...formState };
      onSave(newProduct);
    }
  };

  return (
    <Modal
      opened
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
      transitionProps={{
        transition: "fade",
        duration: 600,
        timingFunction: "linear",
      }}
    >
      <TextInput
        label="Title"
        value={formState.title}
        onChange={(e) => handleChange("title", e.currentTarget.value)}
        error={
          error.title
            ? "Title is required and should be between 3 to 50 characters"
            : null
        }
        required
      />
      <TextInput
        label="Description"
        value={formState.description}
        onChange={(e) => handleChange("description", e.currentTarget.value)}
        maxLength={200}
      />
      <NumberInput
        label="Price"
        value={formState.price}
        onChange={(value) => handleChange("price", value)}
        error={
          error.price
            ? "Price is required and should be between 0 to 10000"
            : null
        }
        required
      />
      <NumberInput
        label="Discount Percentage"
        value={formState.discountPercentage}
        onChange={(value) => handleChange("discountPercentage", value)}
        max={100}
        min={0}
      />
      <NumberInput
        label="Rating"
        value={formState.rating}
        onChange={(value) => handleChange("rating", value)}
        max={5}
        min={0}
      />
      <NumberInput
        label="Stock"
        value={formState.stock}
        onChange={(value) => handleChange("stock", value)}
        error={
          error.stock
            ? "Stock is required and should be between 0 to 1000"
            : null
        }
        required
      />
      <TextInput
        label="Brand"
        value={formState.brand}
        onChange={(e) => handleChange("brand", e.currentTarget.value)}
        error={
          error.brand
            ? "Brand is required and should be a valid name with 2 to 30 characters"
            : null
        }
        required
      />
      <TextInput
        label="Category"
        value={formState.category}
        onChange={(e) => handleChange("category", e.currentTarget.value)}
        error={
          error.category
            ? "Category is required and should be between 3 to 30 characters"
            : null
        }
        required
      />
      <Group justify="flex-end" gap="lg" style={{ marginTop: "1rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{product ? "Update" : "Add"}</Button>
      </Group>
    </Modal>
  );
};

export default ProductForm;
