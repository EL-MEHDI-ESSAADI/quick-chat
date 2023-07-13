"use client";

import Image from "next/image";
import React from "react";

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      width={48}
      height={48}
      src={src}
      alt={alt}
      className="flex-shrink-0 rounded w-[48px] h-[48px] object-center object-cover"
    />
  );
}

export { Avatar };
