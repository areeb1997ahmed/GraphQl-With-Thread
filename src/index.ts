import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

const app = express();
const port = 8000;

const server=async()=>{

app.get('/', (req, res) => {
  res.json({message:'Hello World!'});
});

const server = new ApolloServer({
  typeDefs:`
  type Query{
    hello:String
  }
  `,
  resolvers:{
     Query: {
      hello:()=>`Hello this is grapg Ql`,
    }
  },
});
await server.start();
app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

app.listen(port, () => {
   console.log(`Express is listening at http://localhost:${port}`);
   
});
}

server()