const request = require("supertest");
const app = require("../../app.js");

describe("PUT /api/users/profile/:userId", () => {
  const newUser = {
    email: "edit-profile@user.com",
    password: "123",
  };
  const userInfo = {
    firstName: "Test",
    lastName: "User",
    address: "Somwhere",
    photo: "photoId",
    preference: "apple",
    allergy: "pear",
  };
  let userId, token;
  let fakeId = 1024;
  beforeAll(async () => {
    const response = await request(app).post("/api/users").send(newUser);
    userId = response.body.id;
    token = response.body.token;
  });
  afterAll(async () => {
    await request(app).delete(`/api/users/delete/${userId}`);
  });
  test("It should update user's infomation", async () => {
    const response = await request(app).put(`/api/users/profile/${userId}`).send(userInfo).set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe(userInfo["firstName"]);
    expect(response.body.lastName).toBe(userInfo["lastName"]);
  });
  test("It should fail with a wrong id", async () => {
    const response = await request(app).put(`/api/users/profile/${fakeId}`).send(userInfo).set("x-access-token", token);
    expect(response.statusCode).toBe(404);
  });
});