import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { CustomerType, CustomerListResponse } from "./schema";

const router: FastifyPluginAsyncTypebox = async function(fastify, _opts) {
  fastify.get('/customers', {
    schema: {
      response: {
        200: CustomerListResponse
      }
    }
  }, async (req, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query<CustomerType>(
        'SELECT id, email FROM customers'
      );

      return reply.send({
        customers: rows
      });
    } finally {
      client.release();
    }
  });
}
export default router;
