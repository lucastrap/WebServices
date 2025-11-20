const request = require("supertest");
const app = require("../src/app");


jest.mock("../mockDB/books", () => {
  return [
    { id: "1", title: "Book 1", author: "Author 1" },
    { id: "2", title: "Book 2", author: "Author 2" }
  ];
});

describe("API Endpoints v2", () => {
  
  test("GET /api/v2/books returns list", async () => {
    const res = await request(app).get("/api/v2/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.version).toBe('v2');
    expect(Array.isArray(res.body.books)).toBe(true);
    expect(res.body.books.length).toBe(2);
  });

  test("GET /api/v2/books/:id returns book", async () => {
    const res = await request(app).get("/api/v2/books/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe("1");
    expect(res.body.title).toBe("Book 1");
  });

  test("GET /api/v2/books/:id returns 404 for unknown", async () => {
    const res = await request(app).get("/api/v2/books/9999");
    expect(res.statusCode).toBe(404);
  });

  test("POST /api/v2/books creates item", async () => {
    const newItem = { title: "New Book", author: "New Author" };
    const res = await request(app).post("/api/v2/books").send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newItem.title);
    expect(res.body.id).toBeDefined();
  });

  test("PUT /api/v2/books/:id updates item", async () => {
    const updateData = { title: "Updated Book", author: "Author 1" };
    const res = await request(app).put("/api/v2/books/1").send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updateData.title);
    
    const check = await request(app).get("/api/v2/books/1");
    expect(check.body.title).toBe("Updated Book");
  });

  test("DELETE /api/v2/books/:id deletes item", async () => {
    const res = await request(app).delete("/api/v2/books/2");
    expect(res.statusCode).toBe(204);

    const check = await request(app).get("/api/v2/books/2");
    expect(check.statusCode).toBe(404);
  });
});
