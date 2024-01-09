import MessageModel from "../../../backend/src/models/message-model";
import UserModel from "../../../backend/src/models/user-model";
import ChatModel from "../../../backend/src/models/chat-model";
import DatabaseConnection from "../../../backend/src/services/database/connection";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";

describe("Create messages Table if it has not been created", () => {
  let dbConnection: DatabaseConnection;

  beforeAll(() => {
    dbConnection = new DatabaseConnection();
  });

  it("should create messages table without error", async () => {
    await expect(dbConnection.createMessagesTable()).resolves.not.toThrow();
  });
});

describe("Create a Message", () => {
  let messageModel: MessageModel;
  let chatModel: ChatModel;
  let userModel: UserModel;
  let dbConnection: DatabaseConnection;
  let user_id: any;
  let chat_id: any;
  let content: string;
  let userData: object = {
    email: "email1@gmail.com",
    p_hash: "soeifmosiemfio",
    username: "username1",
    profile_image: "profile_image1",
  };
  let chatData: object = {
    chat_name: "test chat 1",
    chat_image: "soeifmosiemfio",
  };
  let messageData: object = {};

  beforeAll(() => {
    messageModel = new MessageModel();
    chatModel = new ChatModel();
    userModel = new UserModel();
    dbConnection = new DatabaseConnection();

    async () => {
      await expect(userModel.createUser(userData));
    };
    async () => {
      await expect(chatModel.createChat(chatData));
    };
    user_id = dbConnection.getData("users", "username", "username1");
    chat_id = dbConnection.getData("chats", "chat_name", "test chat 1");
    content = "Hi! I'm a test message!";

    messageData["user_id"] = user_id;
    messageData["chat_id"] = chat_id;
    messageData["content"] = content;
  });

  it("should create message without error", async () => {
    await expect(
      messageModel.createMessage(messageData)
    ).resolves.not.toThrow();
  });
});

describe("Get All Messages from Chat", () => {
  let messageModel: MessageModel;
  let chatModel: ChatModel;
  let dbConnection: DatabaseConnection;
  let chat_id: any;

  beforeAll(() => {
    messageModel = new MessageModel();
    chatModel = new ChatModel();
    dbConnection = new DatabaseConnection();

    chat_id = dbConnection.getData("chats", "chat_name", "test chat 1");
  });

  it("should get correct messages info", async () => {
    const expectedMessage = "Hi! I'm a test message!";

    const messageInfo = await messageModel.getAllMessagesFromChat(chat_id);
    expect(messageInfo.rows[0].content).toEqual(expectedMessage);
  });
});

describe("Get All Messages from User", () => {
  let messageModel: MessageModel;
  let chatModel: ChatModel;
  let userModel: UserModel;
  let dbConnection: DatabaseConnection;
  let chat_id: any;
  let user_id: any;

  beforeAll(() => {
    messageModel = new MessageModel();
    chatModel = new ChatModel();
    dbConnection = new DatabaseConnection();
    userModel = new UserModel();

    chat_id = dbConnection.getData("chats", "chat_name", "test chat 1");
    user_id = dbConnection.getData("users", "username", "username1");
  });

  it("should get messages from user without error", async () => {
    await expect(
      messageModel.getMessagesFromUser(chat_id, user_id)
    ).resolves.not.toThrow();
  });

  afterAll(async () => {
    await userModel.deleteUser("email1@gmail.com");
    await chatModel.deleteChat("test chat 1");
  });
});

// TODO: Update and Delete message tests
