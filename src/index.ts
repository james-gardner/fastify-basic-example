import fastify from 'fastify';
import swagger from '@fastify/swagger';
import postgres from '@fastify/postgres';
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import config from './config';
import customers from './app/customers';
import health from './app/health';

const app = fastify({
  logger: true
}).setValidatorCompiler(TypeBoxValidatorCompiler).withTypeProvider<TypeBoxTypeProvider>();

app.register(swagger, {
  openapi: {
    info: {
      version: '0.0.1',
      title: 'Example API',
    },
  }
});

const {
  host,
  username,
  password,
  database
} = config.get('postgres');

app.register(postgres, {
  connectionString: `postgres://${username}:${password}@${host}/${database}`
});

app.register(health);
app.register(customers);

app.get('/docs', {}, async (request, reply) => {
  reply.send(app.swagger());
});

app.listen({
  port: config.get('port')
});