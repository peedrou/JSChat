import DatabaseConnection from "../services/database/connection";

class UserModel {
  private db: DatabaseConnection;

  constructor() {
    this.db = new DatabaseConnection();
  }

  async createUser(data: any) {
    try {
      this.db.connect();
      const result = await this.db.insertData("users", data);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUser(email: string) {
    try {
      this.db.connect();
      const result = await this.db.getData("users", "email", email);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error getting data from user:", error);
      throw error;
    }
  }

  async deleteUser(email: string) {
    try {
      this.db.connect();
      const result = await this.db.deleteAttribute("users", "email", email);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async updateUser(attribute: string, currentValue: any, newValue: any) {
    try {
      this.db.connect();
      const result = await this.db.updateAttribute(
        "users",
        attribute,
        attribute,
        newValue,
        currentValue
      );
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

export default UserModel;
