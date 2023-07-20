"use client";

import React from "react";
import dayjs from "dayjs";
import { useUser } from "@/lib/hooks";
import { Message } from "@/types";
import { POCKETBASE_URL } from "@/constants";
import { Avatar } from "@/components/client";

export const SingleMessageView = ({ message }: { message: Message }) => {
  const { currentUser } = useUser();

  const isCurrentUserMessage = currentUser?.id === message.expand.user.id;
  const avatarSrc = `${POCKETBASE_URL}/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`;
  // inline-flex rounded space-x-2 items-start p-3 text-white bg-[#363739]
  return (
    <li>
      <div
        className={`relative flex space-x-1 ${
          isCurrentUserMessage ? "flex-row-reverse space-x-reverse" : "flex-row"
        }`}
      >
        {message.expand.user.avatar && (
          <Avatar src={avatarSrc} alt={message.expand.user.name} />
        )}
        <div
          className={`inline-flex items-start space-x-2 rounded p-3 ${
            isCurrentUserMessage
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          } `}
        >
          {!isCurrentUserMessage && (
            <span className="e.et-bold">{message.expand.user.name}:&nbsp;</span>
          )}
          {message.body}
        </div>
      </div>
      <div
        className={`mt-1 text-xs text-muted-foreground ${
          isCurrentUserMessage ? "text-right" : ""
        }`}
      >
        {dayjs(message.created).fromNow()}
      </div>
    </li>
  );
};
