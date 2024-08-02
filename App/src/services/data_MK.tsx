import Database from "@tauri-apps/plugin-sql";

import { jsonDataClear } from "~/types/krs";
import { storage_data_MK } from "~/types/storage";

export async function checkDataMK(): Promise<boolean> {
  const db = await Database.load("sqlite:database.db");
  const result: string = await db.select("SELECT 1 FROM data_MK LIMIT 1");
  if (result.length === 0) {
    // if not exist
    return false;
  }
  return true;
}

export async function getAllDataMK(): Promise<Array<jsonDataClear>> {
  const db = await Database.load("sqlite:database.db");
  const data: storage_data_MK[] = await db.select("SELECT * FROM data_MK");

  const dataClear: Array<jsonDataClear> = data.map((item) => ({
    No: item.No,
    MK: {
      Kode: parseInt(item.MK.split(";")[0]),
      Nama: item.MK.split(";")[1],
      Kelas: item.MK.split(";")[2],
    },
    SKS: item.SKS,
    Sem: item.Sem,
    Prasyarat: item.Prasyarat,
    Dosen: item.Dosen.split(";"),
    Jadwal: {
      Hari: item.Jadwal.split(";")[0],
      Jam: item.Jadwal.split(";")[1],
      KodeJam: parseInt(item.Jadwal.split(";")[2]),
    },
  }));
  return dataClear;
}

export async function insertDataMK(data: Array<storage_data_MK>) {
  const db = await Database.load("sqlite:database.db");
  data.map(async (item) => {
    await db.execute(
      "INSERT INTO data_MK (No, MK, SKS, Sem, Prasyarat, Dosen, Jadwal) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        item.No,
        item.MK,
        item.SKS,
        item.Sem,
        item.Prasyarat,
        item.Dosen,
        item.Jadwal,
      ],
    );
  });
}

export async function resetDataMK() {
  const db = await Database.load("sqlite:database.db");
  await db.execute("DELETE FROM data_MK");
}
