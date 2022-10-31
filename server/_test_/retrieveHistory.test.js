const request = require("supertest");
const app = require("../../app.js");

describe("GET /api/histories/users/:userId", () => {
  const newUser = {
    email: "retrieve-history@user.com",
    password: "123",
  };
  const newInfluencer = {
    email: "retrieve-history@influencer.com",
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
    const body = {
      influencerId: influencerId,
      quantity: 1,
      size: "medium",
      total: 20.8,
    };
    const response3 = await request(app).post(`/api/histories/users/${userId}`).send(body).set("x-access-token", token);
    historyId = response3.body.id;
  });
  afterAll(async () => {
    await request(app).delete(`/api/histories/delete/${historyId}`);
    await request(app).delete(`/api/users/delete/${userId}`);
    await request(app).delete(`/api/users/delete/${influencerId}`);
  });
  test("It should get history of a user", async () => {
    const response = await request(app).get(`/api/histories/users/${userId}`).set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test("It should get history of an influencer", async() => {
    const response = await request(app).get(`/api/histories/influencers/${influencerId}`).set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  })
});