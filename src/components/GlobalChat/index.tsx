"use client";

import { pb } from "@/lib/modules";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { useUser } from "@/lib/hooks";
import relativeTime from "dayjs/plugin/relativeTime";
import { Message, Room } from "@/types";
import { GLOBAL_ROOM_ID } from "@/constants";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

dayjs.extend(relativeTime);

async function getPublicRoomAndMessages() {
  return Promise.all([
    pb.collection("rooms").getOne<Room>(GLOBAL_ROOM_ID, { expand: "messages, messages.user" }),
    pb.collection("messages").getList<Message>(1, 30, { sort: "created", filter: `room='${GLOBAL_ROOM_ID}'`, expand: "user" }),
  ]);
}

const SingleMessage = ({ message }: { message: Message }) => {
  const { currentUser } = useUser();
  const isCurrentUserMessage = currentUser?.id === message.expand.user.id;
  const avatarSrc = `http://127.0.0.1:8090/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`;

  return (
    <div>
      <div className={`flex relative space-x-1 ${isCurrentUserMessage ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
        {message.expand.user.avatar && (
          <div className="w-12 h-12 overflow-hidden flex-shrink-0 rounded">
            <Image width={50} height={50} src={avatarSrc} alt={message.expand.user.name} />
          </div>
        )}
        <span
          className={`inline-flex rounded space-x-2 items-start p-3 ${isCurrentUserMessage ? "bg-[#4a9c6d]" : "bg-[#d275cb]"} `}
        >
          {!isCurrentUserMessage && <span className="font-bold">{message.expand.user.name}:&nbsp;</span>}
          {message.body}
        </span>
      </div>
      <div className={`text-sm ${isCurrentUserMessage ? "text-right" : ""}`}>{dayjs(message.created).fromNow()}</div>
    </div>
  );
};

const AddMessageForm = ({ roomId }: { roomId: string }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = React.useState("");

  function handleSubmit() {
    if (!message) return;
    pb.collection("messages").create({
      body: message,
      likes: 0,
      user: currentUser?.id,
      room: roomId,
    });
    setMessage("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && message) handleSubmit();
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Message"
        onKeyDown={onKeyDown}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

function GlobalChat() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["messages"], queryFn: getPublicRoomAndMessages });

  const room = data?.[0];
  const messages = data?.[1]?.items?.map((message) => message);

  useEffect(() => {
    pb.collection("messages").subscribe("*", function (e) {
      console.log("record", e.record);
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, []);

  if (isLoading) return <p className="text-center">Fetching most recent chat messages...</p>;
  if (isError || !room || !messages) return <p className="text-center">Something went wrong.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[max(60vh,300px)] flex flex-col space-y-3 overflow-y-scroll">
          {messages?.map((message) => (
            <SingleMessage key={message.id} message={message} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <AddMessageForm roomId={room.id} />
      </CardFooter>
    </Card>
  );
}

export { GlobalChat };
