"use client";

import { pb } from "@/lib/modules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useLayoutEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Message, Room } from "@/types";
import { GLOBAL_ROOM_ID } from "@/constants";
import { SingleMessageView } from "./SingleMessageView";
import { AddMessageForm } from "./AddMessageForm";
import { ListResult } from "pocketbase";

dayjs.extend(relativeTime);

async function getPublicRoomAndMessages() {
  return Promise.all([
    pb.collection("rooms").getOne<Room>(GLOBAL_ROOM_ID, { expand: "messages, messages.user" }),
    pb.collection("messages").getList<Message>(1, 30, { sort: "-created", filter: `room='${GLOBAL_ROOM_ID}'`, expand: "user" }),
  ]);
}

const useGlobalChat = () => {
  const queryClient = useQueryClient();
  const messagesListRef = React.useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useQuery<[Room, ListResult<Message>]>({
    queryKey: ["messages"],
    queryFn: getPublicRoomAndMessages,
  });

  const room = data?.[0];
  const messages = data?.[1]?.items?.map((message) => message);
  const messagesElements = messages
    ?.concat()
    ?.reverse()
    ?.map((message) => <SingleMessageView key={message.id} message={message} />);

  // realtime messages update
  useEffect(() => {
    if(!room?.id) return
    pb.collection("messages").subscribe<Message>("*", function (e) {
      if (e.action !== "create" || e.record.room !== room?.id) return;
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, [queryClient, room?.id]);

  //  scroll to bottom of messages list when messages change
  useLayoutEffect(() => {
    if (!messages?.length) return;

    messagesListRef.current?.scrollBy(0, messagesListRef.current?.scrollHeight);
  }, [messages]);

  return {
    isLoading,
    isError,
    room,
    messages,
    messagesListRef,
    messagesElements,
  };
};

function GlobalChat() {
  const { isLoading, isError, room, messages, messagesListRef, messagesElements } = useGlobalChat();

  if (isLoading) return <p className="text-center">Fetching most recent chat messages...</p>;
  if (isError || !room || !messages) return <p className="text-center">Fail to fetch chat messages.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={messagesListRef} className="h-[max(60vh,300px)] flex flex-col space-y-3 overflow-y-scroll">
          {messagesElements}
        </div>
      </CardContent>
      <CardFooter>
        <AddMessageForm roomId={room.id} />
      </CardFooter>
    </Card>
  );
}

export { GlobalChat };
