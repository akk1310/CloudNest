import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authoptions=NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Add this line
  // Additional options...
});

export {authoptions as GET,authoptions as POST}
