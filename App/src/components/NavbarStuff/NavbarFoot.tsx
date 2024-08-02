import { Center, Text } from "@mantine/core";

export function NavbarFoot() {
  return (
    <>
      <Center>
        <Text c="dimmed" span>
          Built by{" "}
          <Text
            component="a"
            href="https://github.com/hilmoo/"
            target="_blank"
            span
            td="underline"
          >
            hilmoo
          </Text>
        </Text>
      </Center>
    </>
  );
}
