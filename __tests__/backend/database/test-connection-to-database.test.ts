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

describe("Insert Data", () => {
  let dbConnection: DatabaseConnection;
  let data = { header1: "test", header2: "20" };

  beforeAll(() => {
    dbConnection = new DatabaseConnection();
    dbConnection.connect();
  });

  it("should insert data without error", async () => {
    await expect(dbConnection.insertData("test", data)).resolves.not.toThrow();
  });

  afterAll(() => {
    dbConnection.disconnect();
  });
});
