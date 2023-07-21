"use client";

import React, { ReactNode } from "react";

import dayjs from "dayjs";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useUser } from "@/lib/hooks";
import { Message } from "@/types";
import { POCKETBASE_URL } from "@/constants";
import { Avatar } from "@/components/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HoverProfilePreview = ({
  message,
  children,
}: {
  message: Message;
  children: ReactNode;
}) => {
  const avatarSrc = `${POCKETBASE_URL}/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`;
  const { user } = message.expand;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button>{children}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit max-w-xs">
        <div className="flex justify-between gap-6">
          <Avatar src={avatarSrc} alt={user.name} type="circle" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            {user.bio && <p className="text-sm">{user.bio}</p>}
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {dayjs(user.created).format("MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const SingleMessageView = ({ message }: { message: Message }) => {
  const { currentUser } = useUser();

  const isCurrentUserMessage = currentUser?.id === message.expand.user.id;
  const avatarSrc = `${POCKETBASE_URL}/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`;
  const userAvatarEl = (
    <Avatar
      src={avatarSrc}
      alt={message.expand.user.name}
      className="cursor-pointer"
    />
  );

  return (
    <li>
      <div
        className={cn("relative flex space-x-1", {
          "flex-row-reverse space-x-reverse": isCurrentUserMessage,
          "flex-row": !isCurrentUserMessage,
        })}
      >
        {isCurrentUserMessage && userAvatarEl}
        {!isCurrentUserMessage && (
          <HoverProfilePreview message={message}>
            {userAvatarEl}
          </HoverProfilePreview>
        )}

        <div
          className={cn("inline-flex items-start space-x-2 rounded p-3", {
            "bg-primary text-primary-foreground": isCurrentUserMessage,
            "bg-secondary text-secondary-foreground": !isCurrentUserMessage,
          })}
        >
          {!isCurrentUserMessage && (
            <span className="e.et-bold">{message.expand.user.name}:&nbsp;</span>
          )}
          {message.body}
        </div>
      </div>
      <div
        className={cn("mt-1 text-xs text-muted-foreground", {
          "text-right": isCurrentUserMessage,
        })}
      >
        {dayjs(message.created).fromNow()}
      </div>
    </li>
  );
};
