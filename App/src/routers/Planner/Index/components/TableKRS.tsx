import { Table, UnstyledButton } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import {
  getAllSelectedMK,
  getSKSSelectedMK,
  removeSelectedMK,
} from "~/services/selected_MK";
import { jsonDataClear, selectMKHari } from "~/types/krs";
import { loaderData } from "../_loader";
import { placeholderTab, sksView } from "../dataView";
import { useFilter } from "../provider";

const Jadwal = ["07:00-09:30", "09:30-12:00", "13:00-15:00", "15:30-18:00"];

export function TableKRS() {
  const loadd = useLoaderData() as loaderData;
  const data = loadd.selectedMK as Array<selectMKHari>;
  const dataMK = loadd.dataMK as Array<jsonDataClear>;
  const [updatedData, setUpdatedData] = useState(data);
  const [totalSKS, setTotalSKS] = useState(0);
  const { upup, toggleupup } = useFilter();

  const getSKS = async () => {
    const payload = await getSKSSelectedMK();
    return sksView(dataMK, payload);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await getAllSelectedMK();
      setUpdatedData(result);
      const resultsks = await getSKS();
      setTotalSKS(resultsks);
    };
    fetchData();
  }, [upup]);

  const handleDoubleClick = async (day: string, value: number) => {
    await removeSelectedMK(day, value);
    toggleupup();
  };

  const rows = updatedData.map((data, i) => (
    <Table.Tr key={data.kode} h={50}>
      <Table.Td>{Jadwal[i]}</Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("senin", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.senin || 0)}
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("selasa", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.selasa || 0)}
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("rabu", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.rabu || 0)}
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("kamis", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.kamis || 0)}
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("jumat", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.jumat || 0)}
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          onContextMenu={() => handleDoubleClick("sabtu", data.kode || 0)}
        >
          {placeholderTab(dataMK, data.sabtu || 0)}
        </UnstyledButton>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer minWidth={900}>
        <Table
          highlightOnHover
          withTableBorder
          styles={{ table: { tableLayout: "fixed" } }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Jam</Table.Th>
              <Table.Th>Senin</Table.Th>
              <Table.Th>Selasa</Table.Th>
              <Table.Th>Rabu</Table.Th>
              <Table.Th>Kamis</Table.Th>
              <Table.Th>Jumat</Table.Th>
              <Table.Th>Sabtu</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      Total SKS : {totalSKS}
    </>
  );
}
