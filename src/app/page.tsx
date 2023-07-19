"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { pb } from "@/lib/modules";
import { useUser } from "@/lib/hooks";
import { GLOBAL_ROOM_ID, POCKETBASE_URL } from "@/constants";
import { Avatar, ChatRoom } from "@/components/client";
import { Button } from "@/components/ui/button";

const useHomePage = () => {
  const router = useRouter();
  const { currentUser } = useUser();

  const userAvatarSrc = `${POCKETBASE_URL}/api/files/${currentUser?.collectionId}/${currentUser?.id}/${currentUser?.avatar}`;

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  return {
    logout,
    currentUser,
    userAvatarSrc,
  };
};

const Header = () => {
  const { currentUser, logout, userAvatarSrc } = useHomePage();

  return (
    <header className="border-b py-4 mb-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <span className="text-lg font-semibold">QuickChat</span>
        </div>
        <div className="flex gap-1">
          <Avatar src={userAvatarSrc} alt={currentUser!.name} />
          <Button className="border h-12" variant="secondary" onClick={logout}>
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
