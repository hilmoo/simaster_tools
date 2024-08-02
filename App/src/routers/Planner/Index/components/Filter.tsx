import {
  Button,
  CloseButton,
  Flex,
  Input,
  Popover,
  Select,
  Space,
} from "@mantine/core";
import { IconAdjustments, IconSearch } from "@tabler/icons-react";
import { useFilter } from "../provider";

export default function Filter() {
  const {
    search,
    setSearch,
    filSem,
    setFilSem,
    filSKS,
    setFilSKS,
    filDay,
    setFilDay,
    filHour,
    setFilHour,
  } = useFilter();

  return (
    <Flex gap="xs" justify="center" align="center" direction="row" wrap="wrap">
      <Input
        w={"50%"}
        placeholder="Ketik Nama Mata Kuliah"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        leftSection={<IconSearch size={16} />}
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setSearch("")}
            style={{ display: search ? undefined : "none" }}
          />
        }
      />
      <Popover
        width={300}
        position="bottom"
        withArrow
        shadow="md"
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <Button leftSection={<IconAdjustments size={16} />}>
            Filter Mata Kuliah
          </Button>
        </Popover.Target>
        <Popover.Dropdown px={"lg"}>
          <Select
            label="Filter kuliah berdasarkan Semester"
            placeholder="Pilih Semester"
            data={["1", "2", "3", "4", "5", "6", "7"]}
            value={filSem}
            onChange={setFilSem}
            allowDeselect
          />
          <Space h="xs" />
          <Select
            label="Filter kuliah berdasarkan SKS"
            placeholder="Pilih SKS"
            data={["1", "2", "3", "4"]}
            value={filSKS}
            onChange={setFilSKS}
            allowDeselect
          />
          <Space h="xs" />
          <Select
            label="Filter kuliah berdasarkan hari"
            placeholder="Pilih Hari"
            data={["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]}
            value={filDay}
            onChange={setFilDay}
            allowDeselect
          />
          <Space h="xs" />
          <Select
            label="Filter kuliah berdasarkan jam"
            placeholder="Pilih Jam"
            data={[
              { value: "1", label: "07:00 - 09:30" },
              { value: "2", label: "09:30 - 12:00" },
              { value: "3", label: "13:00 - 15:30" },
              { value: "4", label: "15:30 - 17:00" },
            ]}
            value={filHour}
            onChange={setFilHour}
            allowDeselect
          />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
