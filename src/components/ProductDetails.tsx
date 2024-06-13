import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Container,
  Loader,
  Title,
  Group,
} from "@mantine/core";
import { Product } from "../types/product";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Text>No product found</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Card
        shadow="sm"
        padding="lg"
        style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}
      >
        <Card.Section>
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              height={160}
              fit="contain"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Text>No image available</Text>
          )}
        </Card.Section>

        <Title order={2} style={{ marginTop: "1rem" }}>
          {product.title}
        </Title>

        <Text size="sm" style={{ marginBottom: "1rem" }}>
          {product.description}
        </Text>

        <Text size="xl" color="blue" style={{ marginBottom: "1rem" }}>
          ${product.price}
        </Text>

        <Group>
          <Text size="sm">Brand: {product.brand}</Text>
          <Text size="sm">Category: {product.category}</Text>
          <Text size="sm">Discount: {product.discountPercentage}%</Text>
          <Text size="sm">Rating: {product.rating}</Text>
          <Text size="sm">Stock: {product.stock}</Text>
        </Group>
      </Card>
    </Container>
  );
};

export default ProductDetails;
