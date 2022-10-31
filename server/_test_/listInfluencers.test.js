const request = require("supertest");
const app = require("../../app.js");

describe("GET /api/users/influencers", () => {
  const influencer = {
    email: "get-influencer@influencer.com",
    password: "123",
    isInfluencer: true,
  };
  const user = {
    email: "get-influencer@user.com",
    password: "123",
    isInfluencer: false,
  };
  let influencerId, userId;
  let token;
  afterAll(async () => {
    await request(app).delete(`/api/users/delete/${influencerId}`);
    await request(app).delete(`/api/users/delete/${userId}`);
  });
  beforeAll(async () => {
    const response1 = await request(app).post("/api/users").send(influencer);
    const response2 = await request(app).post("/api/users").send(user);
    influencerId = response1.body.id;
    userId = response2.body.id;
    token = response2.body.token;
  });
  test("It should get all the influencers", async () => {
    const response = await request(app).get("/api/users/influencers").set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.length >= 1).toBe(true);
    expect(response.body.includes(user)).toBe(false);
  });
  test("It should fail without a valid token", async () => {
    const response = await request(app).get("/api/users/influencers");
    expect(response.statusCode).toBe(403);
  });
  test("It should fail when token does not match", async () => {
    let fakeToken = "fake token";
    const response = await request(app).get("/api/users/influencers").set("x-access-token", fakeToken);
    expect(response.statusCode).toBe(401);
  });
});