"use client";

import React from "react";
import dayjs from "dayjs";
import { useUser } from "@/lib/hooks";
import { Message } from "@/types";
import Image from "next/image";
import { POCKETBASE_URL } from "@/constants";

export const SingleMessageView = ({ message }: { message: Message }) => {
  const { currentUser } = useUser();
  const isCurrentUserMessage = currentUser?.id === message.expand.user.id;
  const avatarSrc = `${POCKETBASE_URL}/api/files/${message.expand.user.collectionId}/${message.expand.user.id}/${message.expand.user.avatar}`;

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
