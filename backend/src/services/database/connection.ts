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

  async createMessagesTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        chat_id INTEGER REFERENCES chats(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.client.query(query);
      return result;
    } catch (error) {
      console.error("Error creating messages table:", error);
      throw error;
    }
  }

  async insertData(table: string, data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${keys
      .map((_, i) => `$${i + 1}`)
      .join(", ")})`;
    const result = await this.client.query(query, values);
    return result;
  }

  async getData(table: string, attribute: string, value: any) {
    const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`;
    const result = await this.client.query(query, [value]);
    return result;
  }

  async getDataDualAttribute(
    table: string,
    attribute1: string,
    attribute2: string,
    values: Array<any>
  ) {
    const query = `SELECT * FROM ${table} WHERE ${attribute1} = $1 AND ${attribute2} = $2`;
    const result = await this.client.query(query, [values]);
    return result;
  }

  async deleteAttribute(table: string, attribute: string, value: any) {
    const query = `DELETE FROM ${table} WHERE ${attribute} = $1`;
    const result = await this.client.query(query, [value]);
    return result;
  }

  async updateAttribute(
    table: string,
    attributeToUpdate: string,
    attributeToSearch: string,
    valueToUpdate: any,
    valueToSearch: any
  ) {
    const query = `UPDATE ${table} SET ${attributeToUpdate} = $1 WHERE ${attributeToSearch} = $2`;
    const result = await this.client.query(query, [
      valueToUpdate,
      valueToSearch,
    ]);
    return result;
  }

  getClient() {
    return this.client;
  }
}

export default DatabaseConnection;
