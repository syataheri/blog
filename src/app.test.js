const supertest = require("supertest");
const { server } = require("../index");
const UserService = require("./user/service");

const user = {
  name: "sya",
  email: "siamaktaheri1998@gmail.com",
  password: "23454787@St",
};
const request = supertest.agent(server);
let userId, postId, token;

// **************************************************************** //
describe("POST /signup", () => {
  jest.setTimeout(30000);
  it("given the user succussefully saved to DB, responds with 201", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send(user);
    expect(response.status).toBe(201);
    userId = response.body.response.id;
  });

  it("given the user already exist, responds with 409", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send(user);
    expect(response.status).toBe(409);
  });

  it("given the user data is not valid, responds with 406", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send({ name: "s", email: "sya1gmail.com", password: "234548" });
    expect(response.status).toBe(406);
  });
});

// **************************************************************** //
describe("POST /login", () => {
  it("given the user exist and password is true, responds with 200", async () => {
    const response = await request
      .post("/api/auth/login")
      .type("json")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    token = "berar " + response.body.response.token;
  });

  it("given the email does not exist, responds with 401", async () => {
    const response = await request.post("/api/auth/login").type("json").send({
      email: "s@gmail.com",
      password: user.password,
    });
    expect(response.status).toBe(401);
  });

  it("given the password is wrong, responds with 401", async () => {
    const response = await request.post("/api/auth/login").type("json").send({
      email: user.email,
      password: "23454sdsd$T",
    });
    expect(response.status).toBe(401);
  });
});

// **************************************************************** //
describe("POST /post", () => {
  it("given the post data is right, responds with 201", async () => {
    const response = await request
      .post("/api/post")
      .type("json")
      .set("Authorization", token)
      .send({ title: "test", body: "this is a test post" });
    expect(response.status).toBe(201);
    postId = response.body.response.id;
  });

  it("given post data is wrong, responds with 406", async () => {
    const response = await request
      .post("/api/post")
      .send({ title: "te", body: "this" })
      .type("json")
      .set("Authorization", token);
    expect(response.status).toBe(406);
  });

  it("given the post data is right but user not authorized, responds with 401", async () => {
    const response = await request
      .post("/api/post")
      .send({ title: "test", body: "this is a test post" })
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });
});

// **************************************************************** //
describe("Get /post", () => {
  it("given user authorized, responds with 406", async () => {
    const response = await request.get("/api/post").set("Authorization", token);
    expect(response.status).toBe(200);
  });

  it("given user is not authorized, responds with 401", async () => {
    const response = await request
      .get("/api/post")
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });
});

// **************************************************************** //
describe("Get /post/:id", () => {
  it("given id is right, responds with 200", async () => {
    const response = await request
      .get(`/api/post/${postId}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
  });

  it("given id is wrong, responds with 404", async () => {
    const response = await request
      .get(`/api/post/${postId + 10}`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("given user is not authorized, responds with 401", async () => {
    const response = await request
      .get(`/api/post/${postId}`)
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });
});

// **************************************************************** //
describe("Put /post/:id", () => {
  it("given id is right and data is right, responds with 200", async () => {
    const response = await request
      .put(`/api/post/${postId}`)
      .send({ title: "updated test", body: "this is a updated test post" })
      .set("Authorization", token);
    expect(response.status).toBe(201);
  });

  it("given id is wrong, responds with 404", async () => {
    const response = await request
      .put(`/api/post/${postId + 10}`)
      .send({ title: "updated test", body: "this is a updated test post" })
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("given data is unvalid, responds with 406", async () => {
    const response = await request
      .put(`/api/post/${postId}`)
      .send({ title: "te", body: "this" })
      .set("Authorization", token);
    expect(response.status).toBe(406);
  });

  it("given user is not authorized, responds with 401", async () => {
    const response = await request
      .put(`/api/post/${postId}`)
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });
});

// **************************************************************** //
describe("Delete /post/:id", () => {
  it("given id is wrong, responds with 404", async () => {
    const response = await request
      .get(`/api/post/${postId + 10}`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("given user is not authorized, responds with 401", async () => {
    const response = await request
      .get(`/api/post/${postId}`)
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });

  it("given id is right, responds with 200", async () => {
    const response = await request
      .get(`/api/post/${postId}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
  });
});

// **************************************************************** //
afterAll(async () => {
  const userService = new UserService();
  await userService.deleteUser(userId);
  server.close();
});
