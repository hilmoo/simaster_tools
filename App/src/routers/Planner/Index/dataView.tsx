import { matchSorter } from "match-sorter";

import { jsonDataClear } from "~/types/krs";

export function placeholderTab(data: Array<jsonDataClear>, No: number) {
  if (No === 0) return "";

  let result = data;
  result = matchSorter(data, No.toString(), {
    keys: ["No"],
    threshold: matchSorter.rankings.EQUAL,
  });

  return `${result[0].MK.Nama} (${result[0].MK.Kelas})`;
}

export function sksView(data: Array<jsonDataClear>, payload: number[] = []) {
  let SKS = 0;
  for (let i = 0; i < payload.length; i++) {
    let result = data;
    result = matchSorter(data, payload[i].toString(), {
      keys: ["No"],
      threshold: matchSorter.rankings.EQUAL,
    });
    SKS += result[0].SKS;
  }
  return SKS;
}
