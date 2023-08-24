import Image from "next/image";
import { GLOBAL_ROOM_ID } from "@/constants";
import { Avatar, ChatRoom } from "@/components/client";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import { User } from "@/types";
import { redirect } from "next/navigation";
import { getUserImageSrc } from "@/lib/utils";

const Header = ({ user }: { user: NonNullable<User> }) => {
  return (
    <header className="mb-4 border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <span className="text-lg font-semibold">QuickChat</span>
        </div>
        <div className="flex gap-1">
          <Avatar src={getUserImageSrc(user)} alt={user.name} />
          <form action={logout}>
            <Button className="h-12 border" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <>
      <Header user={user} />
      <main className="container">
        <ChatRoom roomId={GLOBAL_ROOM_ID} user={user} />
      </main>
    </>
  );
}
