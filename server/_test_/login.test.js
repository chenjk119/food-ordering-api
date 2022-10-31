const request = require("supertest");
const app = require("../../app.js");

describe("POST /api/users/login", () => {
  const newUser = {
    email: "login@user.com",
    password: "123",
  };
  const fakePassword = {
    email: "login@user.com",
    password: "321",
  };
  let userId;
  beforeAll(async () => {
    const response = await request(app).post("/api/users").send(newUser);
    userId = response.body.id;
  });
  afterAll(async () => {
    await request(app).delete(`/api/users/delete/${userId}`);
  });
  test("It should return 200", async () => {
    const response = await request(app).post("/api/users/login").send(newUser);
    expect(response.statusCode).toBe(200);
  });
  test("It should fail when password does not match", async () => {
    const response = await request(app).post("/api/users/login").send(fakePassword);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid Credentials');
  });
});