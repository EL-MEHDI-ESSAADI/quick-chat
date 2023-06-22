"use client";

import { pb } from "@/lib/modules";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getPublicRoomAndMessages() {
  return Promise.all([
    pb.collection("rooms").getOne("pgumvg05s2nie31", {
      expand: "messages, messages.user",
    }),
    pb.collection("messages").getList(1, 30, { sort: "-created", filter: "room='pgumvg05s2nie31'", expand: "user" }),
  ]);
}

function GlobalChat() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["messages"], queryFn: getPublicRoomAndMessages });

  return <div>GlobalChat</div>;
}

export { GlobalChat };
