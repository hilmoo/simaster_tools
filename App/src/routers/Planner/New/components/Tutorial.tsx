import {
  ActionIcon,
  Box,
  CopyButton,
  Flex,
  Kbd,
  rem,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Tutorial() {
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch("/dumpDataMK.js")
      .then((response) => response.text())
      .then((data) => setCode(data));
  }, []);

  return (
    <>
      <Text>Tutorial mendapatkan file json mata kuliah dari SIMASTER: </Text>
      <Stack gap="xs" pt={"xs"} pl={"md"}>
        <Text>
          1. Buka link SIMASTER{" "}
          <Text
            component="a"
            href="https://simaster.ugm.ac.id/akademik/mhs_kelas_ambil/"
            target="_blank"
            td="underline"
          >
            Mata Kuliah Ditawarkan
          </Text>
        </Text>
        <Text>
          2. Buka console browser
          <Stack pl={"md"} gap={0}>
            <div dir="ltr">
              Windows: <Kbd>Shift</Kbd> + <Kbd>CTRL</Kbd> + <Kbd>J</Kbd>
            </div>
            <div dir="ltr">
              Mac: <Kbd>Option</Kbd> + <Kbd>⌘</Kbd> + <Kbd>J</Kbd>
            </div>
          </Stack>
        </Text>
        <Text>3. Paste kode berikut ke console</Text>
        <Flex
          gap={rem(1)}
          justify="space-between"
          align="flex-start"
          direction="row"
          bg="rgba(0, 0, 0, .3)"
          w={"100%"}
          p={"xs"}
          pb={0}
          dir="auto"
        >
          <ScrollArea scrollbars="x" pb={"md"}>
            <Box w={"max-content"}>
              <div style={{ whiteSpace: "pre-wrap", overflow: "auto" }}>
                {code}
              </div>
            </Box>
          </ScrollArea>
          <CopyButton value={code} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
      </Stack>
    </>
  );
}
