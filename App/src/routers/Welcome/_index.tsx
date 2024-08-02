import {
  Button,
  Container,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./_index.module.css";

export default function Index() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            All in <span className={classes.highlight}>one</span> SIMASTER{" "}
            <br /> tools
          </Title>
          <Text c="dimmed" mt="md">
            Dibuat untuk memudahkan mahasiswa UGM dalam penggunaan SIMASTER
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>KRS Planner</b> – atur kuliah yang akan kamu ambil saat KRS
            </List.Item>
            <List.Item>
              <b>SIMASTER Extensions</b> – berbagai chrome extension untuk
              automasi SIMASTER
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              component="a"
              href="https://github.com/hilmoo/simaster_tools"
              target="_blank"
            >
              Source code
            </Button>
          </Group>
        </div>
        {/* <Image src={image.src} className={classes.image} /> */}
      </div>
    </Container>
  );
}
