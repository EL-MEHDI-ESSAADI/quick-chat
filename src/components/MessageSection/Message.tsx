import { useSession } from "next-auth/react";
import Image from "next/image";

export type MessageType = {
  id: string;
  name: string;
  avatar?: string;
  body: string;
  likes: number;
  createdAt: string;
};

interface Props {
  message: MessageType;
}

export const Message = ({ message }: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className={`flex relative space-x-1 ${
        message.name === session?.user?.name ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      {message?.avatar && (
        <div className="w-12 h-12 overflow-hidden flex-shrink-0 rounded">
          <Image width={50} height={50} src={message.avatar} alt={message.name} />
        </div>
      )}
      <span
        className={`inline-flex rounded space-x-2 items-start p-3 ${
          message.name === session?.user?.name ? "bg-[#4a9c6d]" : "bg-[#d275cb]"
        } `}
      >
        {message.name !== session?.user?.name && <span className="font-bold">{message.name}:&nbsp;</span>}
        {message.body}
      </span>
    </div>
  );
};
