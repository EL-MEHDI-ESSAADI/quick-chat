"use client";

import React from "react";
import { Message, type MessageType } from "./Message";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AddMessageForm } from "../AddMessageForm";

const GetRecentMessagesQuery = gql`
  query GetRecentMessages($last: Int) @live {
    messageCollection(last: $last) {
      edges {
        node {
          id
          name
          avatar
          body
          likes
          createdAt
        }
      }
    }
  }
`;

function MessageList() {
  const { loading, error, data } = useQuery<{
    messageCollection: { edges: { node: MessageType }[] };
  }>(GetRecentMessagesQuery, {
    variables: {
      last: 100,
    },
  });

  if (loading) return <p className="text-center">Fetching most recent chat messages.</p>;

  if (error) return <p className="text-center">Something went wrong. Refresh to try again.</p>;

  return (
    <div className="h-[max(60vh,300px)] flex flex-col space-y-3 overflow-y-scroll">
      {data?.messageCollection?.edges?.map(({ node }) => (
        <Message key={node?.id} message={node} />
      ))}
    </div>
  );
}

function MessagesSection() {
  const { data: session } = useSession();

  if (session)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageList />
        </CardContent>
        <CardFooter>
          <AddMessageForm />
        </CardFooter>
      </Card>
    );

  return (
    <Card>
      <CardHeader>Sign in with GitHub to join the chat!</CardHeader>
    </Card>
  );
}

export { MessagesSection };
