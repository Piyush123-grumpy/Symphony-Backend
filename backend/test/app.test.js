import request from "supertest";
import app from "../index.js"; // Your Express app

// check if it works or not
describe("testing if the code will work or not", () => {
  test("It should respond with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
// get All the Product
describe("GET All Product", () => {
  test("responds with 200 status code and product data", async () => {
    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("GET All Product", () => {
    test("responds with 200 status code and product data", async () => {
      const response = await request(app).get("/myorder");
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
// get All the slider
// get all the category
describe("GET All Order", () => {
  test("responds with 200 status code and Order data", async () => {
    const response = await request(app).get("/myorder");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
// Check Login in Successfull or not
describe("POST /login", () => {
  test("returns a token on successful login", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@example.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  // check if it will provide me any error if giver wrong password
  test("returns 401 on incorrect credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "shishir@shishir.com",
      password: "1111111",
    });
    console.log(response);
    expect(response.status);
    expect(response.body.token).not.toBeDefined();
  });
});

