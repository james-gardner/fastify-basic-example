import { FastifyPluginAsync } from "fastify";

const router: FastifyPluginAsync = async function(fastify) {
  fastify.get('/health/liveness', {
    schema: {
      tags: ['health']
    }
  }, async (_request, reply) => {
    return reply.code(204).send();
  });
  
  fastify.get('/health/readiness', {
    schema: {
      tags: ['health']
    }
  }, async (_request, reply) => {
    const connection = await fastify.pg.connect();

    try {
      await connection.query('SELECT 1');
      return reply.send({
        database: 'up'
      });
    } catch (err) {
      return reply.code(503).send({
        database: 'down'
      });
    } finally { 
      if (connection) {
        await connection.release();
      }
    }
  });
};

export default router;
