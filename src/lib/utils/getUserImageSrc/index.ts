import { POCKETBASE_URL } from "@/constants";
import { User } from "@/types";

export function getUserImageSrc(user: User) {
  if (!user) return "";
  return `${POCKETBASE_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
}
