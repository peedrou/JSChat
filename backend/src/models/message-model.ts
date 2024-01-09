import DatabaseConnection from "../services/database/connection";

class MessageModel {
  private db: DatabaseConnection;

  constructor() {
    this.db = new DatabaseConnection();
  }

  async createMessage(data: any) {
    try {
      this.db.connect();
      const result = await this.db.insertData("messages", data);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async getAllMessagesFromChat(chat_id: number) {
    try {
      this.db.connect();
      const result = await this.db.getData("messages", "chat_id", chat_id);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error getting data from messages:", error);
      throw error;
    }
  }

  async getMessagesFromUser(chat_id: number, user_id: number) {
    try {
      this.db.connect();
      const result = await this.db.getDataDualAttribute(
        "messages",
        "chat_id",
        "user_id",
        [chat_id, user_id]
      );
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error getting data from messages:", error);
      throw error;
    }
  }

  async deleteMessage(id: number) {
    try {
      this.db.connect();
      const result = await this.db.deleteAttribute("messages", "id", id);
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  }

  async updateMessage(newContent: string, id: number) {
    try {
      this.db.connect();
      const result = await this.db.updateAttribute(
        "messages",
        "content",
        "id",
        newContent,
        id
      );
      this.db.disconnect();
      return result;
    } catch (error) {
      console.error("Error updating chat:", error);
      throw error;
    }
  }
}

export default MessageModel;
