const controller = require("../controller/controller");
const CarModel = require("../model/model");
const httpMocks = require("node-mocks-http");
const testCarObj = require("./mock-data/new-car.json");
const testAllCarsObj = require("./mock-data/all-cars.json");

jest.mock("../model/model");

const errMsg = { message: "Something went wrong" };
const rejectedPromise = Promise.reject(errMsg);
let id = "644641776bda94d8ecbb8a74";

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("controller.create", () => {
  beforeEach(() => {
    req.body = testCarObj;
  });

  it("should have create function", () => {
    expect(typeof controller.createCar).toBe("function");
  });
  it("schould call controller.create", () => {
    req.body = testCarObj;
    controller.createCar(req, res, next);
    expect(CarModel.create).toBeCalledWith(testCarObj);
  });
  it("schould return 201 responce code", async () => {
    req.body = testCarObj;
    await controller.createCar(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("schould return json in responce", async () => {
    CarModel.create.mockReturnValue(testCarObj);
    await controller.createCar(req, res, next);
    expect(res._getJSONData()).toStrictEqual(testCarObj);
  });
  it("should handle errors", async () => {
    CarModel.create.mockReturnValue(rejectedPromise);
    await controller.createCar(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
});

describe("controller.getCars", () => {
  it("schould have a get method", () => {
    expect(typeof controller.getCars).toBe("function");
  });
  it("schould call CarModel.find({})", async () => {
    await controller.getCars(req, res, next);
    expect(CarModel.find).toBeCalledWith({});
  });
  it("schould return responce and status code 200", async () => {
    CarModel.find.mockReturnValue(testAllCarsObj);
    await controller.getCars(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(testAllCarsObj);
  });
  it("schould handle errors", async () => {
    CarModel.find.mockReturnValue(rejectedPromise);
    await controller.getCars(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
});

describe("controller.getCarById", () => {
  beforeEach(() => {
    req.params.id = id;
  });

  it("should have a getCarById", () => {
    expect(typeof controller.getCarById).toBe("function");
  });
  it("should call findById with id", async () => {
    await controller.getCarById(req, res, next);
    expect(CarModel.findById).toBeCalledWith(id);
  });
  it("schould return json body and status code 200", async () => {
    CarModel.findById.mockReturnValue(testCarObj);
    await controller.getCarById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(testCarObj);
  });
  it("schould handle errors", async () => {
    CarModel.findById.mockReturnValue(rejectedPromise);
    await controller.getCarById(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
  it("schould return 404 when item doen't exist", async () => {
    CarModel.findById.mockReturnValue(null);
    await controller.getCarById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
});

describe("controller.update", () => {
  beforeEach(() => {
    req.params.id = id;
    req.body = testCarObj;
  });
  it("schould have an update function", () => {
    expect(typeof controller.updateCar).toBe("function");
  });
  it("schould use findByIdAndUpdate", async () => {
    await controller.updateCar(req, res, next);
    expect(CarModel.findByIdAndUpdate).toBeCalledWith(id, testCarObj, {
      new: true,
      runValidators: true,
    });
  });
  it("schould return responce with json and status code 200", async () => {
    CarModel.findByIdAndUpdate.mockReturnValue(testCarObj);
    await controller.updateCar(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(testCarObj);
  });
  it("schould handle errors", async () => {
    CarModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await controller.updateCar(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
  it("schould return 404 if non-existent id", async () => {
    CarModel.findByIdAndUpdate.mockReturnValue(null);
    await controller.updateCar(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
});

describe("controler.delete", () => {
  beforeEach(() => {
    req.params.id = id;
  });
  it("schould have a delete function", () => {
    expect(typeof controller.deleteCar).toBe("function");
  });
  it("schould use findByIdAndDelete", async () => {
    await controller.deleteCar(req, res, next);
    expect(CarModel.findByIdAndDelete).toBeCalledWith(id);
  });
  it("schould return responce status code 204", async () => {
    CarModel.findByIdAndDelete.mockReturnValue(testCarObj);
    await controller.deleteCar(req, res, next);
    expect(res.statusCode).toBe(204);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("schould handle errors", async () => {
    CarModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await controller.deleteCar(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
  it("schould return 404 if non-existent id", async () => {
    CarModel.findByIdAndDelete.mockReturnValue(null);
    await controller.deleteCar(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
