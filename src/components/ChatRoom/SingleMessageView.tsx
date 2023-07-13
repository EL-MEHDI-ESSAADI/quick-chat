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

  return (
    <div>
      <div className={`flex relative space-x-1 ${isCurrentUserMessage ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
        {message.expand.user.avatar && (
          <Avatar src={avatarSrc} alt={message.expand.user.name} />
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
