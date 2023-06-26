"use client";

import { pb } from "@/lib/modules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Message, Room } from "@/types";
import { SingleMessageView } from "./SingleMessageView";
import { AddMessageForm } from "./AddMessageForm";
import { ListResult } from "pocketbase";

dayjs.extend(relativeTime);

function getRoomAndMessages(roomId: string) {
  return () =>
    Promise.all([
      pb.collection("rooms").getOne<Room>(roomId, { expand: "messages, messages.user" }),
      pb.collection("messages").getList<Message>(1, 30, { sort: "-created", filter: `room='${roomId}'`, expand: "user" }),
    ]);
}

const useGlobalChat = (roomId: string) => {
  const queryClient = useQueryClient();
  const messagesListRef = React.useRef<HTMLDivElement>(null);
  const queryKey = useMemo(() => [`room-${roomId}`], [roomId]);
  const { data, isLoading, isError } = useQuery<[Room, ListResult<Message>]>({
    queryKey: queryKey,
    queryFn: getRoomAndMessages(roomId),
  });

  const room = data?.[0];
  const messages = data?.[1]?.items?.map((message) => message);
  const messagesElements = messages
    ?.concat()
    ?.reverse()
    ?.map((message) => <SingleMessageView key={message.id} message={message} />);

  // realtime messages update
  useEffect(() => {
    if (!room?.id) return;
    pb.collection("messages").subscribe<Message>("*", function (e) {
      if (e.action !== "create" || e.record.room !== room?.id) return;
      queryClient.invalidateQueries({ queryKey: queryKey });
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, [queryClient, room?.id, queryKey]);

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

function ChatRoom({ roomId }: { roomId: string }) {
  const { isLoading, isError, room, messages, messagesListRef, messagesElements } = useGlobalChat(roomId);

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

export { ChatRoom };
