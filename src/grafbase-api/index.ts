import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  URL: { input: any; output: any; }
};

/** Possible operations for an Int field */
export type IntOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  room: Room;
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type MessageByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Message */
export type MessageCreateInput = {
  body: Scalars['String']['input'];
  likes?: InputMaybe<Scalars['Int']['input']>;
  room: MessageToRoomCreateRoomRelation;
  user: MessageToUserCreateUserRelation;
};

export type MessageCreatePayload = {
  __typename?: 'MessageCreatePayload';
  message?: Maybe<Message>;
};

export type MessageDeletePayload = {
  __typename?: 'MessageDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type MessageOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to create a Message for the MessageToRoom relation of Room */
export type MessageToRoomCreateMessage = {
  body: Scalars['String']['input'];
  likes?: InputMaybe<Scalars['Int']['input']>;
  user: MessageToUserCreateUserRelation;
};

/** Input to link to or create a Message for the MessageToRoom relation of Room */
export type MessageToRoomCreateMessageRelation = {
  create?: InputMaybe<MessageToRoomCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Room for the MessageToRoom relation of Message */
export type MessageToRoomCreateRoom = {
  messages?: InputMaybe<Array<InputMaybe<MessageToRoomCreateMessageRelation>>>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  users?: InputMaybe<Array<InputMaybe<RoomToUserCreateUserRelation>>>;
};

/** Input to link to or create a Room for the MessageToRoom relation of Message */
export type MessageToRoomCreateRoomRelation = {
  create?: InputMaybe<MessageToRoomCreateRoom>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Message for the MessageToRoom relation of Room */
export type MessageToRoomUpdateMessageRelation = {
  create?: InputMaybe<MessageToRoomCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Room for the MessageToRoom relation of Message */
export type MessageToRoomUpdateRoomRelation = {
  create?: InputMaybe<MessageToRoomCreateRoom>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a User for the MessageToUser relation of Message */
export type MessageToUserCreateUser = {
  email: Scalars['String']['input'];
  friends?: InputMaybe<Array<InputMaybe<UserToUserCreateUserRelation>>>;
  image: Scalars['URL']['input'];
  name: Scalars['String']['input'];
  rooms?: InputMaybe<Array<InputMaybe<RoomToUserCreateRoomRelation>>>;
};

/** Input to link to or create a User for the MessageToUser relation of Message */
export type MessageToUserCreateUserRelation = {
  create?: InputMaybe<MessageToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the MessageToUser relation of Message */
export type MessageToUserUpdateUserRelation = {
  create?: InputMaybe<MessageToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Message */
export type MessageUpdateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  likes?: InputMaybe<IntOperationsInput>;
  room?: InputMaybe<MessageToRoomUpdateRoomRelation>;
  user?: InputMaybe<MessageToUserUpdateUserRelation>;
};

export type MessageUpdatePayload = {
  __typename?: 'MessageUpdatePayload';
  message?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a Message */
  messageCreate?: Maybe<MessageCreatePayload>;
  /** Delete a Message by ID or unique field */
  messageDelete?: Maybe<MessageDeletePayload>;
  /** Update a Message */
  messageUpdate?: Maybe<MessageUpdatePayload>;
  /** Create a Room */
  roomCreate?: Maybe<RoomCreatePayload>;
  /** Delete a Room by ID or unique field */
  roomDelete?: Maybe<RoomDeletePayload>;
  /** Update a Room */
  roomUpdate?: Maybe<RoomUpdatePayload>;
  /** Create a User */
  userCreate?: Maybe<UserCreatePayload>;
  /** Delete a User by ID or unique field */
  userDelete?: Maybe<UserDeletePayload>;
  /** Update a User */
  userUpdate?: Maybe<UserUpdatePayload>;
};


export type MutationMessageCreateArgs = {
  input: MessageCreateInput;
};


export type MutationMessageDeleteArgs = {
  by: MessageByInput;
};


export type MutationMessageUpdateArgs = {
  by: MessageByInput;
  input: MessageUpdateInput;
};


export type MutationRoomCreateArgs = {
  input: RoomCreateInput;
};


export type MutationRoomDeleteArgs = {
  by: RoomByInput;
};


export type MutationRoomUpdateArgs = {
  by: RoomByInput;
  input: RoomUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  by: UserByInput;
};


export type MutationUserUpdateArgs = {
  by: UserByInput;
  input: UserUpdateInput;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Query a single Message by an ID or a unique field */
  message?: Maybe<Message>;
  /** Paginated query to fetch the whole list of `Message`. */
  messageCollection?: Maybe<MessageConnection>;
  /** Query a single Room by an ID or a unique field */
  room?: Maybe<Room>;
  /** Paginated query to fetch the whole list of `Room`. */
  roomCollection?: Maybe<RoomConnection>;
  /** Query a single User by an ID or a unique field */
  user?: Maybe<User>;
  /** Paginated query to fetch the whole list of `User`. */
  userCollection?: Maybe<UserConnection>;
};


export type QueryMessageArgs = {
  by: MessageByInput;
};


export type QueryMessageCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MessageOrderByInput>;
};


export type QueryRoomArgs = {
  by: RoomByInput;
};


export type QueryRoomCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoomOrderByInput>;
};


export type QueryUserArgs = {
  by: UserByInput;
};


export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};

export type Room = {
  __typename?: 'Room';
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  messages?: Maybe<MessageConnection>;
  private?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<UserConnection>;
};


export type RoomMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoomOrderByInput>;
};


export type RoomUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoomOrderByInput>;
};

export type RoomByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type RoomConnection = {
  __typename?: 'RoomConnection';
  edges?: Maybe<Array<Maybe<RoomEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Room */
export type RoomCreateInput = {
  messages?: InputMaybe<Array<InputMaybe<MessageToRoomCreateMessageRelation>>>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  users?: InputMaybe<Array<InputMaybe<RoomToUserCreateUserRelation>>>;
};

export type RoomCreatePayload = {
  __typename?: 'RoomCreatePayload';
  room?: Maybe<Room>;
};

export type RoomDeletePayload = {
  __typename?: 'RoomDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type RoomEdge = {
  __typename?: 'RoomEdge';
  cursor: Scalars['String']['output'];
  node: Room;
};

export type RoomOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to create a Room for the RoomToUser relation of User */
export type RoomToUserCreateRoom = {
  messages?: InputMaybe<Array<InputMaybe<MessageToRoomCreateMessageRelation>>>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  users?: InputMaybe<Array<InputMaybe<RoomToUserCreateUserRelation>>>;
};

/** Input to link to or create a Room for the RoomToUser relation of User */
export type RoomToUserCreateRoomRelation = {
  create?: InputMaybe<RoomToUserCreateRoom>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a User for the RoomToUser relation of Room */
export type RoomToUserCreateUser = {
  email: Scalars['String']['input'];
  friends?: InputMaybe<Array<InputMaybe<UserToUserCreateUserRelation>>>;
  image: Scalars['URL']['input'];
  name: Scalars['String']['input'];
  rooms?: InputMaybe<Array<InputMaybe<RoomToUserCreateRoomRelation>>>;
};

/** Input to link to or create a User for the RoomToUser relation of Room */
export type RoomToUserCreateUserRelation = {
  create?: InputMaybe<RoomToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Room for the RoomToUser relation of User */
export type RoomToUserUpdateRoomRelation = {
  create?: InputMaybe<RoomToUserCreateRoom>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the RoomToUser relation of Room */
export type RoomToUserUpdateUserRelation = {
  create?: InputMaybe<RoomToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Room */
export type RoomUpdateInput = {
  messages?: InputMaybe<Array<InputMaybe<MessageToRoomUpdateMessageRelation>>>;
  private?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<RoomToUserUpdateUserRelation>>>;
};

export type RoomUpdatePayload = {
  __typename?: 'RoomUpdatePayload';
  room?: Maybe<Room>;
};

export type User = {
  __typename?: 'User';
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  friends?: Maybe<UserConnection>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  image: Scalars['URL']['output'];
  name: Scalars['String']['output'];
  rooms?: Maybe<RoomConnection>;
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
};


export type UserFriendsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};


export type UserRoomsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};

export type UserByInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a User */
export type UserCreateInput = {
  email: Scalars['String']['input'];
  friends?: InputMaybe<Array<InputMaybe<UserToUserCreateUserRelation>>>;
  image: Scalars['URL']['input'];
  name: Scalars['String']['input'];
  rooms?: InputMaybe<Array<InputMaybe<RoomToUserCreateRoomRelation>>>;
};

export type UserCreatePayload = {
  __typename?: 'UserCreatePayload';
  user?: Maybe<User>;
};

export type UserDeletePayload = {
  __typename?: 'UserDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to create a User for the UserToUser relation of User */
export type UserToUserCreateUser = {
  email: Scalars['String']['input'];
  image: Scalars['URL']['input'];
  name: Scalars['String']['input'];
  rooms?: InputMaybe<Array<InputMaybe<RoomToUserCreateRoomRelation>>>;
};

/** Input to link to or create a User for the UserToUser relation of User */
export type UserToUserCreateUserRelation = {
  create?: InputMaybe<UserToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the UserToUser relation of User */
export type UserToUserUpdateUserRelation = {
  create?: InputMaybe<UserToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a User */
export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  friends?: InputMaybe<Array<InputMaybe<UserToUserUpdateUserRelation>>>;
  image?: InputMaybe<Scalars['URL']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rooms?: InputMaybe<Array<InputMaybe<RoomToUserUpdateRoomRelation>>>;
};

export type UserUpdatePayload = {
  __typename?: 'UserUpdatePayload';
  user?: Maybe<User>;
};

export type UserCreateMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  image: Scalars['URL']['input'];
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'UserCreatePayload', user?: { __typename?: 'User', email: string, name: string, image: any } | null } | null };

export type UserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, name: string, image: any } | null };


export const UserCreateDocument = gql`
    mutation UserCreate($name: String!, $email: String!, $image: URL!) {
  userCreate(input: {email: $email, name: $name, image: $image}) {
    user {
      email
      name
      image
    }
  }
}
    `;
export type UserCreateMutationFn = Apollo.MutationFunction<UserCreateMutation, UserCreateMutationVariables>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUserCreateMutation(baseOptions?: Apollo.MutationHookOptions<UserCreateMutation, UserCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
      }
export type UserCreateMutationHookResult = ReturnType<typeof useUserCreateMutation>;
export type UserCreateMutationResult = Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<UserCreateMutation, UserCreateMutationVariables>;
export const UserDocument = gql`
    query User($email: String!) {
  user(by: {email: $email}) {
    email
    name
    image
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export type MessageKeySpecifier = ('body' | 'createdAt' | 'id' | 'likes' | 'room' | 'updatedAt' | 'user' | MessageKeySpecifier)[];
export type MessageFieldPolicy = {
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	likes?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageConnectionKeySpecifier = ('edges' | 'pageInfo' | MessageConnectionKeySpecifier)[];
export type MessageConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageCreatePayloadKeySpecifier = ('message' | MessageCreatePayloadKeySpecifier)[];
export type MessageCreatePayloadFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageDeletePayloadKeySpecifier = ('deletedId' | MessageDeletePayloadKeySpecifier)[];
export type MessageDeletePayloadFieldPolicy = {
	deletedId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageEdgeKeySpecifier = ('cursor' | 'node' | MessageEdgeKeySpecifier)[];
export type MessageEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageUpdatePayloadKeySpecifier = ('message' | MessageUpdatePayloadKeySpecifier)[];
export type MessageUpdatePayloadFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('messageCreate' | 'messageDelete' | 'messageUpdate' | 'roomCreate' | 'roomDelete' | 'roomUpdate' | 'userCreate' | 'userDelete' | 'userUpdate' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	messageCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	messageDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	messageUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	roomCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	roomDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	roomUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	userCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	userDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	userUpdate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('message' | 'messageCollection' | 'room' | 'roomCollection' | 'user' | 'userCollection' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	messageCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	roomCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userCollection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomKeySpecifier = ('createdAt' | 'id' | 'messages' | 'private' | 'title' | 'updatedAt' | 'users' | RoomKeySpecifier)[];
export type RoomFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	private?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomConnectionKeySpecifier = ('edges' | 'pageInfo' | RoomConnectionKeySpecifier)[];
export type RoomConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomCreatePayloadKeySpecifier = ('room' | RoomCreatePayloadKeySpecifier)[];
export type RoomCreatePayloadFieldPolicy = {
	room?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomDeletePayloadKeySpecifier = ('deletedId' | RoomDeletePayloadKeySpecifier)[];
export type RoomDeletePayloadFieldPolicy = {
	deletedId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomEdgeKeySpecifier = ('cursor' | 'node' | RoomEdgeKeySpecifier)[];
export type RoomEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomUpdatePayloadKeySpecifier = ('room' | RoomUpdatePayloadKeySpecifier)[];
export type RoomUpdatePayloadFieldPolicy = {
	room?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('createdAt' | 'email' | 'friends' | 'id' | 'image' | 'name' | 'rooms' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	friends?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserConnectionKeySpecifier = ('edges' | 'pageInfo' | UserConnectionKeySpecifier)[];
export type UserConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserCreatePayloadKeySpecifier = ('user' | UserCreatePayloadKeySpecifier)[];
export type UserCreatePayloadFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserDeletePayloadKeySpecifier = ('deletedId' | UserDeletePayloadKeySpecifier)[];
export type UserDeletePayloadFieldPolicy = {
	deletedId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserEdgeKeySpecifier = ('cursor' | 'node' | UserEdgeKeySpecifier)[];
export type UserEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserUpdatePayloadKeySpecifier = ('user' | UserUpdatePayloadKeySpecifier)[];
export type UserUpdatePayloadFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Message?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageKeySpecifier | (() => undefined | MessageKeySpecifier),
		fields?: MessageFieldPolicy,
	},
	MessageConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageConnectionKeySpecifier | (() => undefined | MessageConnectionKeySpecifier),
		fields?: MessageConnectionFieldPolicy,
	},
	MessageCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageCreatePayloadKeySpecifier | (() => undefined | MessageCreatePayloadKeySpecifier),
		fields?: MessageCreatePayloadFieldPolicy,
	},
	MessageDeletePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageDeletePayloadKeySpecifier | (() => undefined | MessageDeletePayloadKeySpecifier),
		fields?: MessageDeletePayloadFieldPolicy,
	},
	MessageEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageEdgeKeySpecifier | (() => undefined | MessageEdgeKeySpecifier),
		fields?: MessageEdgeFieldPolicy,
	},
	MessageUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageUpdatePayloadKeySpecifier | (() => undefined | MessageUpdatePayloadKeySpecifier),
		fields?: MessageUpdatePayloadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Room?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomKeySpecifier | (() => undefined | RoomKeySpecifier),
		fields?: RoomFieldPolicy,
	},
	RoomConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomConnectionKeySpecifier | (() => undefined | RoomConnectionKeySpecifier),
		fields?: RoomConnectionFieldPolicy,
	},
	RoomCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomCreatePayloadKeySpecifier | (() => undefined | RoomCreatePayloadKeySpecifier),
		fields?: RoomCreatePayloadFieldPolicy,
	},
	RoomDeletePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomDeletePayloadKeySpecifier | (() => undefined | RoomDeletePayloadKeySpecifier),
		fields?: RoomDeletePayloadFieldPolicy,
	},
	RoomEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomEdgeKeySpecifier | (() => undefined | RoomEdgeKeySpecifier),
		fields?: RoomEdgeFieldPolicy,
	},
	RoomUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomUpdatePayloadKeySpecifier | (() => undefined | RoomUpdatePayloadKeySpecifier),
		fields?: RoomUpdatePayloadFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserConnectionKeySpecifier | (() => undefined | UserConnectionKeySpecifier),
		fields?: UserConnectionFieldPolicy,
	},
	UserCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserCreatePayloadKeySpecifier | (() => undefined | UserCreatePayloadKeySpecifier),
		fields?: UserCreatePayloadFieldPolicy,
	},
	UserDeletePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserDeletePayloadKeySpecifier | (() => undefined | UserDeletePayloadKeySpecifier),
		fields?: UserDeletePayloadFieldPolicy,
	},
	UserEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserEdgeKeySpecifier | (() => undefined | UserEdgeKeySpecifier),
		fields?: UserEdgeFieldPolicy,
	},
	UserUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserUpdatePayloadKeySpecifier | (() => undefined | UserUpdatePayloadKeySpecifier),
		fields?: UserUpdatePayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;