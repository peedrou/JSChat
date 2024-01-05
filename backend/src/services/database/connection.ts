import { Client } from "pg";

class DatabaseConnection {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
      database: process.env.DB_NAME,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  getClient() {
    return this.client;
  }
}

export default DatabaseConnection;
