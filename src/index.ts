import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prismaClient } from './libs/db';

const app = express();
const port = 8000;

const ExpressServer=async()=>{

app.get('/', (req, res) => {
  res.json({message:'Hello World!'});
});

const server = new ApolloServer({
  typeDefs:`
  type Query{
    hello:String
  }
  type Mutation{
    createUser(
      firstName:String!,
      lastname:String!,
      password:String!,
      email:String!
      ):Boolean
  }
  `,
  resolvers:{
     Query: {
      hello:()=>`Hello this is grapg Ql`,
    },
    Mutation:{
      createUser: async(_, { 
        firstName,
        lastname,
        password,
        email
      }:{ 
        firstName:string;lastname:string;email:string;password:string;
      })=>{
        await prismaClient.user.create({
          data:{
            firstName,
            lastname,
            password,
            email,
            salt: "random_salt"
          }
        })
        return true
      }
    }
  },
});
await server.start();
app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

app.listen(port, () => {
   console.log(`Express is listening at http://localhost:${port}`);
   
});
}

ExpressServer()