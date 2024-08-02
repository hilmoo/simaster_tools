import { insertDataMK } from "~/services/data_MK";
import { jsonDataRawExt } from "~/types/krs";
import { storage_data_MK } from "~/types/storage";

function timeKoding(timeStr: string) {
  const awal = timeStr ? timeStr.split("-")[0] : "";
  if (awal === "07:00") {
    return 1;
  } else if (awal === "09:30") {
    return 2;
  } else if (awal === "13:00") {
    return 3;
  } else if (awal === "15:30") {
    return 4;
  } else {
    return 0;
  }
}

export async function handleImport(data: File): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(data);
    reader.onload = async (event) => {
      if (event.target?.result) {
        try {
          const regexMK = /^(\S+)\s+(.+?)\s+Kelas:\s*(\S+)$/;
          const regexDOS = /(?:\d+\.\s*)([^0-9]+?)(?=\d+\.\s|$)/g;
          const raw: Record<string, any> = JSON.parse(
            event.target.result as string,
          );
          const jsonData: Array<jsonDataRawExt> = raw["mataKuliah"].map(
            (item: any) => ({
              MK: item["Mata Kuliah"],
              Sem: item["Semester"],
              ...item,
            }),
          );

          const jsonClear: Array<storage_data_MK> = jsonData.map((item) => {
            const matchResult = item.MK.match(regexMK);
            const [_, Kode, Nama, Kelas] = matchResult ? matchResult : [];
            const matchesDOS = [...item.Dosen.matchAll(regexDOS)];
            const resultsDOS = matchesDOS.map((match) =>
              match[1].trim().replace(/\s*$/, "."),
            );
            return {
              No: parseInt(item.No),
              MK: "" + Kode + ";" + Nama + ";" + Kelas,
              SKS: parseInt(item.SKS),
              Sem: parseInt(item.Sem),
              Prasyarat: item.Prasyarat,
              Dosen: resultsDOS.join(";"),
              Jadwal:
                "" +
                item.Jadwal.split(", ")[0] +
                ";" +
                item.Jadwal.split(" ")[1] +
                ";" +
                timeKoding(item.Jadwal.split(" ")[1]),
            };
          });

          await insertDataMK(jsonClear);
          resolve(true);
        } catch (error) {
          reject(
            new Error(
              "Failed to parse JSON file. Make sure it's valid JSON format",
            ),
          );
        }
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(reader.error || new Error("Unknown error"));
    };
  });
}
