import { Container, Space, Text, Title } from "@mantine/core";

import Filter from "./components/Filter";
import { Reset } from "./components/Reset";
import { TableKRS } from "./components/TableKRS";
import { TableMK } from "./components/TableMk";
import { FilterProvider } from "./provider";

export default function Index() {
  return (
    <>
      <Container size="xl">
        <FilterProvider>
          <Title>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: "pink", to: "yellow" }}
            >
              KRS Planner SIMASTER
            </Text>
          </Title>
          <Space h="xl" />
          Klik kanan pada jadwal mata kuliah untuk menghapusnya
          <TableKRS />
          <Space h="md" />
          <Filter />
          <Space h="md" />
          <TableMK />
        </FilterProvider>
        <Space h="xl" />
        <Reset />
      </Container>
    </>
  );
}
