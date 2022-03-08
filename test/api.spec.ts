import request from "supertest";

// import app from "../src/app";
import server from "../src/server";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(server.app).get("/api").expect(200);
  });
});
