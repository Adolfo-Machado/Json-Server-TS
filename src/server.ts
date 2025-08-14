import dotenv from 'dotenv';
dotenv.config();
import jsonServer from 'json-server';
import path from 'path';
import { Application } from 'express';
import logservice from './middlewares/requestLog';
import delayMiddleware from './middlewares/delay';


const app: Application = jsonServer.create();
const port = process.env['PORT'] || 3000;

const router = jsonServer.router(path.join(__dirname, '/mock/db.json'));
const Json_Server = jsonServer.defaults();

app.use(Json_Server);

console.log('DELAY_ENABLED:', process.env['DELAY_ENABLED'] )
if (process.env['DELAY_ENABLED'] === 'true'){
  app.use(delayMiddleware);
}

console.log('LOG_ENABLED:', process.env['LOG_ENABLED'] )
if (process.env['LOG_ENABLED'] === 'true'){
  app.use('/', logservice);
}

/* A função jsonServer.rewriter para reescrever algumas rotas antes de passá-las para o roteador.

  '/api/*': '/$1': Esta regra reescreve qualquer rota que comece com "/api/" para remover o prefixo "api/". 
  Por exemplo, a rota "/api/heroes" seria reescrita como "/heroes".

  '/heroes\\?name=:term': '/heroes?q=:term': Esta regra lida com consultas específicas na rota "/heroes". 
  Quando a rota inclui uma consulta para o parâmetro name, ela é reescrita para incluir o parâmetro q. 
  Por exemplo, a rota "/heroes?name=Wolverine" seria reescrita como "/heroes?q=Wolverine".  */

app.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/heroes\\?name=:term': '/heroes?q=:term',    
    "/villains\\?name=:term": "/villains?q=:term",
    "/produtos\\?nome=:term": "/produtos?q=:term",
    "/categorias\\?nome=:term": "/categorias?q=:term",
  })
);

app.use(router);

app.listen(port, () => {
  console.log('JSON Server is running on port', port);
});

export default app;
