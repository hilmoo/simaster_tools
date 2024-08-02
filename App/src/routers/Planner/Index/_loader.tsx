import { json, redirect } from "react-router-dom";

import { checkDataMK, getAllDataMK } from "~/services/data_MK";
import { getAllSelectedMK } from "~/services/selected_MK";
import { jsonDataClear, selectMKHari } from "~/types/krs";

export interface loaderData {
  dataMK: Array<jsonDataClear>;
  selectedMK: Array<selectMKHari>;
}

export async function loader() {
  const EdataMK = await checkDataMK();
  if (!EdataMK) {
    return redirect("/planner/new");
  }
  const dataMK = await getAllDataMK();
  const selectedMK = await getAllSelectedMK();

  const loadd: loaderData = { dataMK, selectedMK };
  return json(loadd);
}
