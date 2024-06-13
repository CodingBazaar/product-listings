import { Group, Text, Container } from "@mantine/core";

const Header = () => {
  return (
    <div style={{ padding: "1rem 0" }}>
      <Container fluid size={"xs"}>
        <Group>
          <Text
            ta="left"
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            // style={{left: "0px"}}
            // style={{ color: "black", fontWeight: "bold", fontSize: "x-large" }}
          >
            Shoppy
          </Text>
        </Group>
      </Container>
    </div>
  );
};

export default Header;
