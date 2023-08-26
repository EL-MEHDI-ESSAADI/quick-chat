"use client";

import React, { RefObject, useEffect, useMemo } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import relativeTime from "dayjs/plugin/relativeTime";
import { ListResult } from "pocketbase";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SingleMessageView } from "./SingleMessageView";
import { AddMessageForm } from "./AddMessageForm";
import { Message, Room, User } from "@/types";
import { pb } from "@/lib/modules/client-pocketbase";

dayjs.extend(relativeTime);

const getRoomWithMessages = (roomId: string) => {
  return () =>
    Promise.all([
      pb.collection("rooms").getOne<Room>(roomId),
      pb.collection("messages").getList<Message>(1, 30, {
        sort: "-created",
        filter: `room='${roomId}'`,
        expand: "user",
      }),
    ]);
};

const useGlobalChat = (roomId: string, user: NonNullable<User>) => {
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const queryKey = useMemo(() => [`room-${roomId}`], [roomId]);
  const { data, isLoading, isError } = useSuspenseQuery<
    [Room, ListResult<Message>]
  >({
    queryKey: queryKey,
    queryFn: getRoomWithMessages(roomId),
  });

  const room = data?.[0];
  const messages = data?.[1]?.items?.map((message) => message);
  const messagesElements = messages
    ?.concat()
    ?.reverse()
    ?.map((message) => (
      <SingleMessageView
        key={message.id}
        message={message}
        currentUserId={user.id}
      />
    ));

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
  }, [queryClient, room?.id, queryKey, user?.id]);

  // initial scroll to bottom
  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      behavior: "smooth",
      top: messagesContainerRef.current?.scrollHeight,
    });
  }, [room?.id]);

  return {
    isLoading,
    isError,
    room,
    messagesContainerRef,
    messagesElements,
  };
};

const ScrollToBottomPopup = ({
  messagesContainerRef,
}: {
  messagesContainerRef: RefObject<HTMLDivElement>;
}) => {
  const [showScrollToBottomPopup, setShowScrollToBottomPopup] =
    React.useState(false);

  function scrollToBottom() {
    messagesContainerRef.current?.scrollTo({
      behavior: "smooth",
      top: messagesContainerRef.current?.scrollHeight,
    });
  }

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current?.addEventListener("scroll", handleScroll);

    function handleScroll() {
      if (!messagesContainerRef.current) return;

      const maxScrollHeight =
        messagesContainerRef.current.scrollHeight -
        messagesContainerRef.current.clientHeight;

      if (messagesContainerRef.current.scrollTop < maxScrollHeight - 100)
        setShowScrollToBottomPopup(true);
      else setShowScrollToBottomPopup(false);
    }
  }, [messagesContainerRef]);

  if (!showScrollToBottomPopup) return null;

  return (
    <button
      className="sticky bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-[#363739] bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
      onClick={scrollToBottom}
    >
      Scroll to see latest messages
    </button>
  );
};

function ChatRoom({
  roomId,
  user,
}: {
  roomId: string;
  user: NonNullable<User>;
}) {
  const { isLoading, isError, room, messagesContainerRef, messagesElements } =
    useGlobalChat(roomId, user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room?.title}</CardTitle>
      </CardHeader>
      <CardContent
        className="scrollbar-hide relative h-[max(60vh,300px)] overflow-auto"
        ref={messagesContainerRef}
      >
        {(isLoading || isError) && (
          <div className="grid h-full content-center justify-center">
            <p>{isLoading ? "Loading room..." : "Fail to fetch chat room"}</p>
          </div>
        )}
        {!isLoading && !isError && (
          <ul className="flex flex-col space-y-3">{messagesElements}</ul>
        )}
        <ScrollToBottomPopup messagesContainerRef={messagesContainerRef} />
      </CardContent>
      <CardFooter className="!mt-4">
        <AddMessageForm roomId={room?.id} userId={user.id} />
      </CardFooter>
    </Card>
  );
}

export { ChatRoom };
