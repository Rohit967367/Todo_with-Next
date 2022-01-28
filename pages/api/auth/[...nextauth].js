// import { GoogleAuthProvider } from "firebase/auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "334774191903-42e62uvovumcrmr0hl324o8edu3n15bs.apps.googleusercontent.com",
      clientSecret: "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",

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  secret: "secret",

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
