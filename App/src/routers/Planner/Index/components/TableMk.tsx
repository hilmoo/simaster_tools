import { ActionIcon, Table, Tooltip } from "@mantine/core";
import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { IconPlus } from "@tabler/icons-react";
import { insertSelectedMK } from "~/services/selected_MK";
import { jsonDataClear } from "~/types/krs";
import { loaderData } from "../_loader";
import { useFilter } from "../provider";

export function TableMK() {
  const loadd = useLoaderData() as loaderData;
  const data = loadd.dataMK as Array<jsonDataClear>;
  const [filteredData, setFilteredData] = useState(data);
  const { search, filSem, filSKS, filDay, filHour, toggleupup } = useFilter();

  useEffect(() => {
    let results = data;

    if (search) {
      results = matchSorter(results, search, {
        keys: ["MK.*.Nama"],
      });
    }

    if (filSem) {
      results = results.filter((data) => data.Sem === parseInt(filSem));
    }

    if (filSKS) {
      results = results.filter((data) => data.SKS === parseInt(filSKS));
    }

    if (filDay) {
      results = results.filter((data) => data.Jadwal.Hari === filDay);
    }

    if (filHour) {
      results = results.filter(
        (data) => data.Jadwal.KodeJam === parseInt(filHour),
      );
    }

    setFilteredData(results);
  }, [search, filSem, filSKS, filDay, filHour]);

  const rows = filteredData.map((data) => (
    <Table.Tr key={data.No}>
      <Table.Td>
        {data.MK.Nama}
        <br />
        Kelas: {data.MK.Kelas}
      </Table.Td>
      <Table.Td>{data.SKS}</Table.Td>
      <Table.Td>{data.Sem}</Table.Td>
      <Table.Td>
        {data.Dosen.filter((dosen) => dosen !== "").map((dosen, i) => (
          <span key={i}>
            {i + 1}. {dosen.slice(0, -1)}
            <br />
          </span>
        ))}
      </Table.Td>
      <Table.Td>
        {data.Jadwal.KodeJam !== 0 && `${data.Jadwal.Hari}, ${data.Jadwal.Jam}`}
      </Table.Td>
      <Table.Td>
        <Tooltip label="Tambah ke daftar KRS">
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={async () => {
              await insertSelectedMK(
                data.Jadwal.Hari,
                data.No,
                data.Jadwal.KodeJam,
              );
              toggleupup();
            }}
          >
            <IconPlus stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={900}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Mata Kuliah</Table.Th>
            <Table.Th>SKS</Table.Th>
            <Table.Th>Semester</Table.Th>
            <Table.Th>Dosen</Table.Th>
            <Table.Th>Jadwal</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
