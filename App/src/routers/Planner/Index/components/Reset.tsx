import { Button, Flex } from "@mantine/core";
import { IconRefreshAlert } from "@tabler/icons-react";

import { resetDataMK } from "~/services/data_MK";
import { resetSelectedMK } from "~/services/selected_MK";

async function resetHandler() {
  await resetDataMK();
  await resetSelectedMK();
  window.location.reload();
}

export function Reset() {
  return (
    <>
      <Flex justify="flex-end" pb={"xl"}>
        <Button
          rightSection={<IconRefreshAlert size={14} />}
          color="red"
          onClick={resetHandler}
        >
          Reset All
        </Button>
      </Flex>
    </>
  );
}
