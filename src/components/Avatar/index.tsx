"use client";

import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import React from "react";

function Avatar({
  src,
  alt,
  className,
  type = "square",
}: {
  src: string;
  alt: string;
  className?: string;
  type?: "square" | "circle";
}) {
  return (
    <Image
      width={48}
      height={48}
      src={src}
      alt={alt}
      className={cn(
        "h-[48px] w-[48px] flex-shrink-0 object-cover object-center",
        type === "square" ? "rounded" : "rounded-full",
        className,
      )}
    />
  );
}

export { Avatar };
