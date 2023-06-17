// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import React from "react";

// function Header() {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <div>loading...</div>;

//   if (session)
//     return (
//       <div className="container py-3">
//         <div className="flex space-x-1">
//           {session?.user?.image && (
//             <div className="w-12 h-12 rounded overflow-hidden">
//               <Image
//                 width={50}
//                 height={50}
//                 src={session?.user?.image}
//                 alt={session?.user?.name || "User profile picture"}
//                 title={session?.user?.name || "User profile picture"}
//               />
//             </div>
//           )}
//           <button onClick={() => signOut({ redirect: false })} className="bg-gray-950 text-white rounded h-12 px-6 font-medium">
//             Sign out
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="container py-3">
//       <div className="flex items-center">
//         <button onClick={() => signIn("github")} className="bg-black/90 rounded h-12 px-5 font-medium text-white">
//           Sign in with GitHub
//         </button>
//       </div>
//     </div>
//   );
// }

// export { Header };
