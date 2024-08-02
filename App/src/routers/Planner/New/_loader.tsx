import { redirect } from "react-router-dom";
import { checkDataMK } from "~/services/data_MK";
import { checkSelectedMK, initiateEmpty } from "~/services/selected_MK";

export async function loader() {
  const EDataMK = await checkDataMK();
  if (EDataMK) {
    return redirect("/planner");
  }

  const EselectedMK = await checkSelectedMK();
  if (!EselectedMK) {
    await initiateEmpty();
  }

  return null;
}
