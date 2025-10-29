import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name:"Credentials",

      credentials:{
        email:{label:"Email",type:"email"},
        password:{label:"password",type:"password"}
      },

      authorize:async(credentials)=>{
        const email=credentials.email as string | null;
        const password=credentials.password as string | null;

        if(!email || !password) throw new Error("Email and password are required")

       const user= await prisma.user.findUnique({
          where:{email}
        })

        if(!user) throw new Error("No user found")

          const isPasswordCorrect=await bcrypt.compare(password,user.password)
          if(!isPasswordCorrect) throw new Error("Enter a correct password")

            const userData={
              email:user.email,
              role:user.role as Role,
              id:user.id
            }

            return userData;
      }
    })
  ],

  pages:{
    signIn:'/auth'
  },

  callbacks:{

    async session({token,session}){
      if(token?.sub && token?.role){
        session.user.id=token.sub
        session.user.role=token.role
      }
      return session;
    },

    async jwt({token,user}){
      if(user){
        token.role=user.role;
      }
      return token
    },

    signIn:async({account})=>{

      if(account?.provider==='credentials'){
        return true
      }

      return false
    }
  }
})