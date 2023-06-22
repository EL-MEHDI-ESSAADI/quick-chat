"use client";

import React, {  } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// function MessageList() {
//   const { data, isLoading, isError } = useQuery({ queryKey: ["messages"], queryFn: getPublicRoomAndMessages });
//   const listElementRef = React.useRef<HTMLDivElement>(null);
//   console.log(data)

//   // useLayoutEffect(() => {
//   //   if (!data?.messageCollection?.edges?.length) return;

//   //   listElementRef.current?.scrollBy(0, listElementRef.current?.scrollHeight);
//   // }, [data?.messageCollection?.edges?.length]);

//   // get public room
//   async function getPublicRoomAndMessages() {
//     return Promise.all([
//       pb.collection("rooms").getOne("pgumvg05s2nie31", {
//         expand: "messages, messages.user",
//       }),
//       pb.collection("messages").getList(1, 30, { sort: "-updated", filter: "room.id=pgumvg05s2nie31" }),
//     ]);
//   }


//   if (isLoading) return <p className="text-center">Fetching most recent chat messages.</p>;

//   if (isError) return <p className="text-center">Something went wrong. Refresh to try again.</p>;

//   return (
//     <div className="h-[max(60vh,300px)] flex flex-col space-y-3 overflow-y-scroll" ref={listElementRef}>
//       {/* {data?.messageCollection?.edges?.map(({ node }) => (
//         <Message key={node?.id} message={node} />
//       ))} */}
//     </div>
//   );
// }

function MessagesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Chat</CardTitle>
      </CardHeader>
      {/* <CardContent><MessageList /></CardContent> */}
      <CardFooter>{/* <AddMessageForm /> */}</CardFooter>
    </Card>
  );
}

export { MessagesSection };
