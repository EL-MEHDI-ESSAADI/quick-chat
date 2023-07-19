"use client";

import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import relativeTime from "dayjs/plugin/relativeTime";
import { ListResult } from "pocketbase";
import dayjs from "dayjs";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SingleMessageView } from "./SingleMessageView";
import { AddMessageForm } from "./AddMessageForm";
import { Message, Room } from "@/types";
import { pb } from "@/lib/modules";
import { Button } from "../ui/button";

dayjs.extend(relativeTime);

const getRoomAndMessages = (roomId: string) => {
  return () =>
    Promise.all([
      pb.collection("rooms").getOne<Room>(roomId, { expand: "messages, messages.user" }),
      pb
        .collection("messages")
        .getList<Message>(1, 30, { sort: "-created", filter: `room='${roomId}'`, expand: "user" }),
    ]);
};

const useGlobalChat = (roomId: string) => {
  const queryClient = useQueryClient();
  const [showScrollToBottomPopup, setShowScrollToBottomPopup] = React.useState(false);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
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

    pb.collection("messages").subscribe<Message>("*", (e) => {
      if (e.action !== "create" || e.record.room !== room?.id) return;
      queryClient.invalidateQueries({ queryKey: queryKey });
    });

    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, [queryClient, room?.id, queryKey]);

  // showing scroll to bottom popup
  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current?.addEventListener("scroll", handleScroll);

    function handleScroll() {
      if (!messagesContainerRef.current) return;
      const maxScrollHeight = messagesContainerRef.current.scrollHeight - messagesContainerRef.current.clientHeight;
      if (messagesContainerRef.current.scrollTop < maxScrollHeight - 100) setShowScrollToBottomPopup(true);
      else setShowScrollToBottomPopup(false);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  function scrollToBottom() {
    messagesContainerRef.current?.scrollTo(0, messagesContainerRef.current.scrollHeight);
  }

  return {
    isLoading,
    isError,
    showScrollToBottomPopup,
    scrollToBottom,
    room,
    messages,
    messagesContainerRef,
    messagesElements,
  };
};

function ChatRoom({ roomId }: { roomId: string }) {
  const { isLoading, isError, showScrollToBottomPopup, room, messagesContainerRef, scrollToBottom, messagesElements } =
    useGlobalChat(roomId);

  if (isError) return <p className="text-center">Fail to fetch chat messages.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room?.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[max(60vh,300px)] overflow-auto scrollbar-hide relative" ref={messagesContainerRef}>
        {isLoading && (
          <div className="h-full grid content-center justify-center">
            <p>Loading chat...</p>
          </div>
        )}
        {!isLoading && !isError && <ul className="flex flex-col space-y-3">{messagesElements}</ul>}
        {showScrollToBottomPopup && (
          <Button
            variant="secondary"
            className="sticky bottom-1 left-1/2 -translate-x-1/2 text-xs p-2 h-auto"
            onClick={scrollToBottom}
          >
            Scroll to see latest messages
          </Button>
        )}
      </CardContent>
      <CardFooter className="!mt-4">
        <AddMessageForm roomId={room?.id} />
      </CardFooter>
    </Card>
  );
}

export { ChatRoom };
