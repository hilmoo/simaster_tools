import {
  Container,
  FileInput,
  Notification,
  rem,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconJson, IconX } from "@tabler/icons-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tutorial from "./components/Tutorial";
import { handleImport } from "./handleImport";

export default function () {
  const [importE, setImportE] = useState("");
  const navigate = useNavigate();

  const jsonIcon = (
    <IconJson style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  return (
    <>
      <Title ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          KRS Planner SIMASTER
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Untuk memulai, import json mata kuliah
      </Text>
      <Container size="xs">
        <FileInput
          onChange={(data) => {
            if (data) {
              handleImport(data)
                .then(() => {
                  navigate("/planner");
                })
                .catch((error) => {
                  setImportE(error.message);
                });
            }
          }}
          leftSection={jsonIcon}
          label="File Json Mata Kuliah"
          placeholder="Pilih file json"
          rightSectionPointerEvents="none"
          mt="md"
          accept="application/json"
        />

        {importE && (
          <Notification
            icon={xIcon}
            color="red"
            title="Error"
            mt="md"
            withCloseButton={false}
          >
            {importE}
          </Notification>
        )}
      </Container>
      <Space h={"xl"} />
      <Container>
        <Tutorial />
      </Container>
    </>
  );
}
