import DatabaseConnection from "../services/database/connection";

class ChatModel {
  private db: DatabaseConnection;

  constructor() {
    this.db = new DatabaseConnection();
  }

  async createChat(data: any) {
    try {
      this.db.connect();
      const result = await this.db.insertData("chats", data);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async getChat(chat_name: string) {
    try {
      this.db.connect();
      const result = await this.db.getData("chats", "chat_name", chat_name);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error getting data from chat:", error);
      throw error;
    }
  }

  async deleteChat(chat_name: string) {
    try {
      this.db.connect();
      const result = await this.db.deleteAttribute(
        "chats",
        "chat_name",
        chat_name
      );
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  }

  async updateChat(attribute: string, currentValue: any, newValue: any) {
    try {
      this.db.connect();
      const result = await this.db.updateAttribute(
        "chats",
        attribute,
        attribute,
        newValue,
        currentValue
      );
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  }
}

export default ChatModel;
