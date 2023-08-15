"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { pb } from "@/lib/modules";
import { useUser } from "@/lib/hooks";
import { GLOBAL_ROOM_ID } from "@/constants";
import { Avatar, ChatRoom } from "@/components/client";
import { Button } from "@/components/ui/button";
import { getUserImageSrc } from "@/lib/utils";

const useHomePage = () => {
  const router = useRouter();
  const { currentUser } = useUser();

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  return {
    logout,
    currentUser,
  };
};

const Header = () => {
  const { currentUser, logout } = useHomePage();

  return (
    <header className="mb-4 border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <span className="text-lg font-semibold">QuickChat</span>
        </div>
        <div className="flex gap-1">
          <Avatar src={getUserImageSrc(currentUser)} alt={currentUser!.name} />
          <Button className="h-12 border" variant="secondary" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <>
      <Header />
      <main className="container">
        <ChatRoom roomId={GLOBAL_ROOM_ID} />
      </main>
    </>
  );
}
