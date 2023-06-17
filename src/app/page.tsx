"use client";

import { useUser } from "@/lib/hooks";
import { pb } from "@/lib/modules";
import { useRouter } from "next/navigation";

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
    </main>
  );
}
