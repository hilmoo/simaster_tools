import { AppShell, Burger, em, Group, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import { MoLogo } from "~/components/MoLogo/MoLogo";
import { NavbarFoot } from "~/components/NavbarStuff/NavbarFoot";
import ToggleColorSmall from "~/components/ToggleColor/Index";
import { NavbarLink } from "../components/NavbarStuff/NavbarLink";
import useDisableMenu from '~/utils/disableMenu';

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  const isSmall = useMediaQuery(`(max-width: ${em(576)})`);
  useDisableMenu();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <MoLogo size={30} type={isSmall ? "mini" : "text"} />
            <Group ml={"xl"} gap={0}>
              <ToggleColorSmall />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar px="xs" pb={"md"}>
        <AppShell.Section grow my={"xs"} component={ScrollArea}>
          <NavbarLink />
        </AppShell.Section>
        <AppShell.Section>
          <NavbarFoot />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
