import express from 'express';
import graphQLServerApollo from './graphQl/index'
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';


const app = express();
const port = 8000;

const ExpressServer=async()=>{

app.get('/', (req, res) => {
  res.json({message:'Hello World!'});
});

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(await graphQLServerApollo()));
app.listen(port, () => {
   console.log(`Express is listening at http://localhost:${port}`);
   
});
}

ExpressServer()
