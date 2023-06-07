import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { UserCreateDocument, UserCreateMutation, UserDocument, UserQuery } from "@/grafbase-api";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
  headers: {
    "x-api-key": process.env.GRAFBASE_API_KEY!,
  },
});

const serverApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
      jsonwebtoken.sign(
        {
          ...token,
          iss: "nextauth",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode: async ({ secret, token }) => jsonwebtoken.verify(token!, secret) as JWT,
  },
  callbacks: {
    async signIn({ user }) {
      // query user
      const { data, error, errors } = await serverApolloClient.query<UserQuery>({
        query: UserDocument,
        variables: { email: user.email },
      });

      if (error || errors?.length) {
        const errorMessage = "Fail to get user from database";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      if (data?.user) return true;

      // if user doesn't exist, add it to the database
      const newUser = await serverApolloClient.mutate<UserCreateMutation>({
        mutation: UserCreateDocument,
        variables: { name: user.name, email: user.email, image: user.image },
      });

      if (newUser?.errors?.length) {
        const errorMessage = "Fail to create user in database";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      return true;
    },
  },
};
