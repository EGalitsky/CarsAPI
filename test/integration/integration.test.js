const supertest = require("supertest");
const app = require("../../app");
const testCarObj = require("../mock-data/new-car.json");
const testUpdateCarObj = require("../mock-data/update-car.json");

const endpointUrl = "/cars/";
let car;

describe(endpointUrl, () => {
  it("GET" + endpointUrl, async () => {
    const responce = await supertest(app).get(endpointUrl);

    expect(responce.statusCode).toBe(200);
    expect(Array.isArray(responce.body)).toBeTruthy();
  });
  it("POST" + endpointUrl, async () => {
    const responce = await supertest(app).post(endpointUrl).send(testCarObj);
    expect(responce.statusCode).toBe(201);
    expect(responce.body.name).toBe(testCarObj.name);
    car = responce.body;
  });
  it(
    "should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const responce = await supertest(app).post(endpointUrl).send({
        title: "Some property is missing",
      });
      expect(responce.statusCode).toBe(500);
      expect(responce.body.name).toStrictEqual("ValidationError");
    }
  );
  it("GET by Id" + endpointUrl, async () => {
    const responce = await supertest(app).get(endpointUrl + car._id);
    expect(responce.statusCode).toBe(200);
    expect(responce.body._id).toBe(car._id);
  });
  it("GET with non-existent id" + endpointUrl, async () => {
    const responce = await supertest(app).get(
      endpointUrl + "6f4567a20a24948f8082963d"
    );
    expect(responce.statusCode).toBe(404);
  });
  it("PATCH" + endpointUrl, async () => {
    const responce = await supertest(app)
      .patch(endpointUrl + car._id)
      .send(testUpdateCarObj);
    expect(responce.statusCode).toBe(200);
    expect(responce.body.displacement).toBe(testUpdateCarObj.displacement);
  });
  it("PATCH  with non-existent id" + endpointUrl, async () => {
    const responce = await supertest(app)
      .patch(endpointUrl + "6f4567a20a24948f8082963d")
      .send(testUpdateCarObj);
    expect(responce.statusCode).toBe(404);
  });

  it("DELETE" + endpointUrl, async () => {
    const responce = await supertest(app).delete(endpointUrl + car._id);
    expect(responce.statusCode).toBe(200);
  });

  it("DELETE with non-existent id" + endpointUrl, async () => {
    const responce = await supertest(app).delete(
      endpointUrl + "6f4567a20a24948f8082963d"
    );
    expect(responce.statusCode).toBe(404);
  });
});
