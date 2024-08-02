import Database from "@tauri-apps/plugin-sql";

import { selectMKHari } from "~/types/krs";
import { storage_selected_MK } from "~/types/storage";

export async function checkSelectedMK(): Promise<boolean> {
  const db = await Database.load("sqlite:database.db");
  const result: string = await db.select("SELECT 1 FROM selected_MK LIMIT 1");
  if (result.length === 0) {
    // if not exist
    return false;
  }
  return true;
}

export async function getAllSelectedMK(): Promise<Array<selectMKHari>> {
  const db = await Database.load("sqlite:database.db");
  const data: storage_selected_MK[] = await db.select(
    "SELECT * FROM selected_MK",
  );

  const dataClear: Array<selectMKHari> = data.map((item) => {
    return {
      kode: item.kode,
      senin: item.senin,
      selasa: item.selasa,
      rabu: item.rabu,
      kamis: item.kamis,
      jumat: item.jumat,
      sabtu: item.sabtu,
    };
  });
  return dataClear;
}

export async function getSKSSelectedMK(): Promise<number[]> {
  const db = await Database.load("sqlite:database.db");
  const data: storage_selected_MK[] = await db.select(
    "SELECT * FROM selected_MK",
  );
  const duaDResult = data.map((item) =>
    [
      item.senin,
      item.selasa,
      item.rabu,
      item.kamis,
      item.jumat,
      item.sabtu,
    ].filter((value) => value !== null),
  );
  let satuDResult: number[] = [];

  for (var i = 0; i < duaDResult.length; i++) {
    satuDResult = satuDResult.concat(duaDResult[i]);
  }

  return satuDResult;
}

export async function insertSelectedMK(
  day: string,
  MK_NO: number,
  kode_jam: number,
) {
  const db = await Database.load("sqlite:database.db");
  const column = day.toLowerCase();
  const query = `UPDATE selected_MK SET ${column} = $1 WHERE kode = $2;`;
  await db.execute(query, [MK_NO, kode_jam]);
}

export async function initiateEmpty() {
  const db = await Database.load("sqlite:database.db");
  const values = [1, 2, 3, 4];
  for (const value of values) {
    await db.execute("INSERT INTO selected_MK (kode) VALUES ($1)", [value]);
  }
}

export async function removeSelectedMK(day: string, kode_jam: number) {
  const db = await Database.load("sqlite:database.db");
  const column = day.toLowerCase();
  const query = `UPDATE selected_MK SET ${column} = NULL WHERE kode = $1;`;
  await db.execute(query, [kode_jam]);
}

export async function resetSelectedMK() {
  const db = await Database.load("sqlite:database.db");
  await db.execute("DELETE FROM selected_MK");
}
