// "use client";
// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { gql, useMutation } from "@apollo/client";
// import { useSession } from "next-auth/react";

// const AddNewMessageMutation = gql`
//   mutation AddNewMessage($name: String!, $avatar: URL, $body: String!) {
//     messageCreate(input: { name: $name, avatar: $avatar, body: $body }) {
//       message {
//         id
//         name
//         avatar
//         body
//         likes
//         createdAt
//       }
//     }
//   }
// `;

// function AddMessageForm() {
//   const { data: session } = useSession();
//   const [addNewMessage] = useMutation(AddNewMessageMutation);
//   const [message, setMessage] = React.useState("");

//   function handleSubmit() {
//     if (!message) return;
//     addNewMessage({
//       variables: {
//         name: session?.user?.name,
//         avatar: session?.user?.image,
//         body: message,
//       },
//     });
//     setMessage("");
//   }

//   return (
//     <div className="flex w-full max-w-sm items-center space-x-2">
//       <Input
//         type="email"
//         placeholder="Message"
//         onKeyDown={(e) => {
//           if (e.key === "Enter" && message) {
//             handleSubmit();
//           }
//         }}
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <Button type="submit" onClick={handleSubmit}>
//         Send
//       </Button>
//     </div>
//   );
// }

// export { AddMessageForm };
