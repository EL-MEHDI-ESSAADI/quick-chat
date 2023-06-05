"use client";
import React from "react";
import type { Message as IMessage } from "./Message";
import { Message } from "./Message";
import { gql, useQuery } from "@apollo/client";

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
    messageCollection: { edges: { node: IMessage }[] };
  }>(GetRecentMessagesQuery, {
    variables: {
      last: 100,
    },
  });

  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text">Fetching most recent chat messages.</p>
      </div>
    );

  if (error) return <p>Something went wrong. Refresh to try again.</p>;

  return (
    <div className="flex flex-col space-y-3 overflow-y-scroll w-full">
      {data?.messageCollection?.edges?.map(({ node }) => (
        <Message key={node?.id} message={node} />
      ))}
    </div>
  );
}

export { MessageList };
