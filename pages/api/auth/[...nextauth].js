import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import db from '../../../db';


const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

  ],
  adapter: SequelizeAdapter(db),
  database: process.env.DATABASE,
}

export default (req, res) => {
  try {
    return NextAuth(req, res, options)
    
  } catch (error) {
    console.log('error: ', error)
  }
}