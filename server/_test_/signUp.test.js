const request = require("supertest");
const app = require("../../app.js");

describe("POST /api/users", () => {
  const newUser = {
    email: "sign-up@user.com",
    password: "123",
  };
  let userId;
  afterAll(async () => {
    await request(app).delete(`/api/users/delete/${userId}`);
  });
  test("It should create a new user", async () => {
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.statusCode).toBe(201);
    userId = response.body.id;
    expect(response.body.email).toBe(newUser["email"]);
  });
});