import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from 'next-auth/providers/google';
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import db from '../../../db';


const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // })
  ],
  adapter: SequelizeAdapter(db),
  database: process.env.DATABASE,
  // callbacks: {
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken
  //     return session
  //   }
  // }
}

export default (req, res) => NextAuth(req, res, options)