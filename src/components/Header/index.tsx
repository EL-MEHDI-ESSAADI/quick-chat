"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function Header() {
  const { data: session, status, update } = useSession();

  if (status === "loading") return <div>loading...</div>;

  if (session)
    return (
      <div>
        <p>signed in as {session.user?.name}</p>
        <button onClick={() => signOut({ redirect: false })}>Logout</button>
      </div>
    );

  return <button onClick={() => signIn()}>Login</button>;
}

export { Header };
