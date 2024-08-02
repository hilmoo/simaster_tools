import { NavLink } from "@mantine/core";
import { IconCalendarWeek, IconHome, IconPuzzle } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export function NavbarLink() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route: string) => {
    if (route === "/") {
      return path === "/";
    }
    return path.startsWith(route);
  };

  return (
    <>
      <NavLink
        href="/"
        label="Welcome"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        active={isActive("/")}
      />
      <NavLink
        href="/planner"
        label="KRS Planner"
        leftSection={<IconCalendarWeek size="1rem" stroke={1.5} />}
        active={isActive("/planner")}
      />
      <NavLink
        href="#required-for-focus"
        label="Extension"
        leftSection={<IconPuzzle size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="Auto Edom" href="/extension" active={isActive("/extension")}/>
      </NavLink>
    </>
  );
}
