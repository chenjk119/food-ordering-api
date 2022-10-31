const request = require("supertest");
const app = require("../../app.js");

describe("POST /api/histories/users/:userId", () => {
  const newUser = {
    email: "create-history@user.com",
    password: "123",
  };
  const newInfluencer = {
    email: "create-history@influencer.com",
    password: "123",
    isInfluencer: true,
  };
  let userId, influencerId, token, historyId;
  beforeAll(async () => {
    const response1 = await request(app).post("/api/users").send(newUser);
    userId = response1.body.id;
    const response2 = await request(app).post("/api/users").send(newInfluencer);
    influencerId = response2.body.id;
    token = response2.body.token;
  });
  afterAll(async () => {
    await request(app).delete(`/api/histories/delete/${historyId}`);
    await request(app).delete(`/api/users/delete/${userId}`);
    await request(app).delete(`/api/users/delete/${influencerId}`);
  });
  test("It should create a history", async () => {
    const body = {
      influencerId: influencerId,
      quantity: 1,
      size: "medium",
      total: 20.8,
    };
    const response = await request(app).post(`/api/histories/users/${userId}`).send(body).set("x-access-token", token);
    expect(response.statusCode).toBe(201);
    expect(response.body.quantity).toBe(1);
    historyId = response.body.id;
  });
});