import DatabaseConnection from "../../../backend/src/services/database/connection";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";

describe("Database Connection", () => {
  let dbConnection: DatabaseConnection;

  beforeAll(() => {
    dbConnection = new DatabaseConnection();
  });

  it("should connect without error", async () => {
    await expect(dbConnection.connect()).resolves.not.toThrow();
  });

  afterAll(() => {
    dbConnection.disconnect();
  });
});
