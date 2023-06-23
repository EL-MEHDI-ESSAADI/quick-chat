"use client";

import { pb } from "@/lib/modules";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { useUser } from "@/lib/hooks";
import relativeTime from "dayjs/plugin/relativeTime";
import { Message } from "@/types";
import { GLOBAL_ROOM_ID } from "@/constants";
import Image from "next/image";

dayjs.extend(relativeTime);

async function getPublicRoomAndMessages() {
  return Promise.all([
    pb.collection("rooms").getOne(GLOBAL_ROOM_ID),
    pb.collection("messages").getList<Message>(1, 30, { sort: "created", filter: `room='${GLOBAL_ROOM_ID}'`, expand: "user" }),
  ]);
}

function GlobalChat() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["messages"], queryFn: getPublicRoomAndMessages });
  const { currentUser } = useUser();

  const messages = data?.[1]?.items?.map((message) => message);

  if (isLoading) return <p className="text-center">Fetching most recent chat messages.</p>;
  if (isError) return <p className="text-center">Something went wrong.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {messages?.map((message) => {
          console.log(message.expand.user);
          const isCurrentUserMessage = currentUser?.id === message.expand.user.id;
          return (
            <div key={message.id}>
              <div
                className={`flex relative space-x-1 ${isCurrentUserMessage ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
              >
                {message.expand.user.avatar && (
                  <div className="w-12 h-12 overflow-hidden flex-shrink-0 rounded">
                    <Image
                      width={50}
                      height={50}
                      src={`http://127.0.0.1:8090/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`}
                      alt={message.expand.user.name}
                    />
                  </div>
                )}
                <span
                  className={`inline-flex rounded space-x-2 items-start p-3 ${
                    isCurrentUserMessage ? "bg-[#4a9c6d]" : "bg-[#d275cb]"
                  } `}
                >
                  {!isCurrentUserMessage && <span className="font-bold">{message.expand.user.name}:&nbsp;</span>}
                  {message.body}
                </span>
              </div>
              <div className={`text-sm ${isCurrentUserMessage ? "text-right" : ""}`}>{dayjs(message.created).fromNow()}</div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter>{/* <AddMessageForm /> */}</CardFooter>
    </Card>
  );
}

export { GlobalChat };
