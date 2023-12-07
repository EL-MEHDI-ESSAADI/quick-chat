import { Header } from "@/components/Header";
import { GLOBAL_ROOM_ID } from "@/constants";
import { ChatRoom } from "@/components/client";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <>
      <Header user={user} />
      <main className="container">
        <ChatRoom roomId={GLOBAL_ROOM_ID} userId={user.id} />
      </main>
    </>
  );
}
