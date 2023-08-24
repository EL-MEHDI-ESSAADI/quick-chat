import { Admin, Record } from "pocketbase";

export function extractUserFromModel(model: Record | Admin | null) {
  if (model === null) return null;

  return {
    id: model.id,
    name: model.name,
    email: model.email,
    avatar: model.avatar,
    username: model.username,
    collectionId: model.collectionId,
    collectionName: model.collectionName,
    emailVisibility: model.emailVisibility,
    created: model.created,
    updated: model.updated,
    verified: model.verified,
    bio: model.bio,
  };
}
