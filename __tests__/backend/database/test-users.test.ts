import UserModel from "../../../backend/src/models/user-model";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";

describe("Create a User", () => {
  let userModel: UserModel;
  let data = {
    email: "email1@gmail.com",
    p_hash: "soeifmosiemfio",
    username: "username1",
    profile_image: "profile_image1",
  };

  beforeAll(() => {
    userModel = new UserModel();
  });

  it("should create user without error", async () => {
    await expect(userModel.createUser(data)).resolves.not.toThrow();
  });
});

describe("Get User Info", () => {
  let userModel: UserModel;

  beforeAll(() => {
    userModel = new UserModel();
  });

  it("should get correct user info", async () => {
    const expectedEmail = "email1@gmail.com";

    const userInfo = await userModel.getUser("email1@gmail.com");
    expect(userInfo.rows[0].email).toEqual(expectedEmail);
  });
});

describe("Update a User", () => {
  let userModel: UserModel;

  beforeAll(() => {
    userModel = new UserModel();
  });

  it("should create user without error", async () => {
    await expect(
      userModel.updateUser("email", "email1@gmail.com", "email2@gmail.com")
    ).resolves.not.toThrow();
  });
});

describe("Delete a User", () => {
  let userModel: UserModel;

  beforeAll(() => {
    userModel = new UserModel();
  });

  it("should delete user without error", async () => {
    await expect(
      userModel.deleteUser("email2@gmail.com")
    ).resolves.not.toThrow();
  });
});
