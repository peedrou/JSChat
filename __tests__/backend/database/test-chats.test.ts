import ChatModel from "../../../backend/src/models/chat-model";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";

describe("Create a Chat", () => {
  let chatModel: ChatModel;
  let data = {
    chat_name: "test chat 1",
    chat_image: "soeifmosiemfio",
  };

  beforeAll(() => {
    chatModel = new ChatModel();
  });

  it("should create a chat without error", async () => {
    await expect(chatModel.createChat(data)).resolves.not.toThrow();
  });
});

describe("Get Chat Info", () => {
  let chatModel: ChatModel;

  beforeAll(() => {
    chatModel = new ChatModel();
  });

  it("should get correct chat info", async () => {
    const expectedChatName = "test chat 1";

    const chatInfo = await chatModel.getChat("test chat 1");
    expect(chatInfo.rows[0].chat_name).toEqual(expectedChatName);
  });
});

describe("Update a Chat", () => {
  let chatModel: ChatModel;

  beforeAll(() => {
    chatModel = new ChatModel();
  });

  it("should create chat without error", async () => {
    await expect(
      chatModel.updateChat("chat_name", "test chat 1", "test chat 2")
    ).resolves.not.toThrow();
  });
});

describe("Delete a Chat", () => {
  let chatModel: ChatModel;

  beforeAll(() => {
    chatModel = new ChatModel();
  });

  it("should delete chat without error", async () => {
    await expect(chatModel.deleteChat("test chat 2")).resolves.not.toThrow();
  });
});
