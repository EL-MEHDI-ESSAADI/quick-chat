"use client";

import { useUser } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/modules";
import { ChatRoom } from "@/components/client";
import { GLOBAL_ROOM_ID } from "@/constants";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useUser();

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  if (!currentUser) return null;

  return (
    <main className="container mx-auto px-3 ">
      <h1>
        hello <strong>{currentUser?.name}</strong>
      </h1>
      <button onClick={logout}>logout</button>
      <ChatRoom roomId={GLOBAL_ROOM_ID} />
    </main>
  );
}
