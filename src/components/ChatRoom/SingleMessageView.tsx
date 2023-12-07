"use client";

import React, { ReactNode } from "react";

import dayjs from "dayjs";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils/cn";
import { getUserImageSrc } from "@/lib/utils/getUserImageSrc";
import { Message } from "@/types";
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
  const { user } = message.expand;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex-shrink-0">{children}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit max-w-xs">
        <div className="flex justify-between gap-6">
          <Avatar
            src={getUserImageSrc(message.expand.user)}
            alt={user.name}
            type="circle"
          />
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

export const SingleMessageView = ({
  message,
  currentUserId,
}: {
  message: Message;
  currentUserId: string;
}) => {
  const isCurrentUserMessage = currentUserId === message.expand.user.id;
  const userAvatarEl = (
    <Avatar
      src={getUserImageSrc(message.expand.user)}
      alt={message.expand.user.name}
      className="flex-shrink-0 cursor-pointer"
    />
  );

  return (
    <li>
      <div
        className={cn("relative flex items-end flex-row space-x-1", {
          "flex-row-reverse space-x-reverse": isCurrentUserMessage,
        })}
      >
        {isCurrentUserMessage && userAvatarEl}
        {!isCurrentUserMessage && (
          <HoverProfilePreview message={message}>
            {userAvatarEl}
          </HoverProfilePreview>
        )}

        <p
          className={cn("break-words overflow-hidden rounded p-3 text-sm sm:text-base", {
            "bg-primary text-primary-foreground": isCurrentUserMessage,
            "bg-secondary text-secondary-foreground": !isCurrentUserMessage,
          })}
        >
          {!isCurrentUserMessage && (
            <>
              <span className="font-bold italic">
                {message.expand.user.name}
              </span>
              <br />
            </>
          )}
          {message.body}
        </p>
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
