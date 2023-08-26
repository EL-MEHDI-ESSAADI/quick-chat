import { POCKETBASE_URL } from "@/constants";
import PocketBase from "pocketbase";

const pb = new PocketBase(POCKETBASE_URL);

if (typeof window !== "undefined") {
  pb.authStore.loadFromCookie(document.cookie);

  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  });
}

export { pb };
