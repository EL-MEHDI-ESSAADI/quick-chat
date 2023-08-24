"use client";

import { pb } from "@/lib/modules";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddMessageForm = ({ roomId, userId }: { roomId?: string, userId: string }) => {
  const [message, setMessage] = React.useState("");

  function handleSubmit() {
    if (!message) return;
    pb.collection("messages").create({
      body: message,
      likes: 0,
      user: userId,
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
        disabled={!roomId}
      />
      <Button type="submit" onClick={handleSubmit} disabled={!roomId}>
        Send
      </Button>
    </div>
  );
};
