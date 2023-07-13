"use client";

import { useUser } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/modules";
import { Avatar, ChatRoom } from "@/components/client";
import { GLOBAL_ROOM_ID, POCKETBASE_URL } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

function Header() {
  const { currentUser, logout } = useHomePage();
  const avatarSrc = `${POCKETBASE_URL}/api/files/${currentUser?.collectionId}/${currentUser?.id}/${currentUser?.avatar}`;

  return (
    <header className="border-b py-4 mb-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <span className="text-lg font-semibold">QuickChat</span>
        </div>
        <div className="flex gap-2">
          <Avatar src={avatarSrc} alt={currentUser!.name} />
          <Button
            className=""
            variant="secondary"
            onClick={logout}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { currentUser } = useHomePage();

  if (!currentUser) return null;

  return (
    <>
      <Header />
      <main className="container mx-auto px-3">
        <ChatRoom roomId={GLOBAL_ROOM_ID} />
      </main>
    </>
  );
}
