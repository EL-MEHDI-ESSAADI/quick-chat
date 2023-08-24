"use server";

import { pb } from "@/lib/modules";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTokenPayload } from "pocketbase";

export async function logout() {
  cookies().delete("pb_auth");
  redirect("/login");
}

// export async function changeName() {
//   const authCookie = cookies().get("pb_auth") as any;

//   pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

//   try {
//     const res = await pb
//       .collection("users")
//       .update(pb.authStore.model?.id ?? "", {
//         name: "user x" + Math.floor(Math.random() * 10),
//       });

//     cookies().set(
//       "pb_auth",
//       JSON.stringify({ token: pb.authStore.token, model: pb.authStore.model }),
//       {
//         path: "/",
//         secure: true,
//         httpOnly: false,
//         sameSite: "strict",
//         expires: new Date(getTokenPayload(pb.authStore.token).exp * 1000),
//       },
//     );
//   } catch (error) {
//     console.log("error", error);
//   }
// }
