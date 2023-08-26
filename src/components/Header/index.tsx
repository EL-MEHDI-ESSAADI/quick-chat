import Image from "next/image";
import { Avatar } from "@/components/client";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { getUserImageSrc } from "@/lib/utils/getUserImageSrc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Header = ({ user }: { user: NonNullable<User> }) => {
  async function logout() {
    "use server";

    cookies().delete("pb_auth");
    redirect("/login");
  }

  return (
    <header className="mb-4 border-b py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-lg font-semibold">QuickChat</h1>
        </div>
        <div className="flex gap-1">
          <Avatar src={getUserImageSrc(user)} alt={user.name} />
          <form action={logout}>
            <Button className="h-full" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};
