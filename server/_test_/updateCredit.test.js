const request = require("supertest");
const app = require("../../app.js");

describe("PUT /api/users/profile/:userId", () => {
  const newUser = {
    email: "update-credit@user.com",
    password: "123",
  };
  const credit = 20.8;
  let userId, token;
  beforeAll(async () => {
    const response = await request(app).post("/api/users").send(newUser);
    userId = response.body.id;
    token = response.body.token;
  });
  afterAll(async () => {
    await request(app).delete(`/api/users/delete/${userId}`);
  });
  test("It should update credit in account", async () => {
    const response = await request(app).put(`/api/users/credit/${userId}`).send({credit: credit}).set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.credit).toBe(credit);
  });
});