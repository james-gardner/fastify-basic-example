import convict from 'convict';

convict.addFormat(require('convict-format-with-validator').ipaddress);

const config = convict({
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },  
  postgres: {
    host: {
      doc: 'database hostname',
      default: 'localhost',
      env: 'PGHOST',
    },
    port: {
      doc: 'database port',
      format: 'port',
      default: 5432,
      env: 'PGPORT',
    },
    username: {
      doc: 'database user',
      default: 'postgres',
      env: 'PGUSER',
    },
    password: {
      doc: 'database user password',
      default: undefined,
      env: 'PGPASSWORD'
    },
    database: {
      doc: 'database name',
      default: 'postgres',
      env: 'PGDATABASE'
    }
  }
});

export default config;