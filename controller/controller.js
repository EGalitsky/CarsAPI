const CarModel = require("../model/model");

exports.createCar = async (request, responce, next) => {
  try {
    const createdCar = await CarModel.create(request.body);
    responce.status(201).json(createdCar);
  } catch (err) {
    next(err);
  }
};

exports.getCars = async (request, responce, next) => {
  try {
    const allCars = await CarModel.find(request.body);
    responce.status(200).json(allCars);
  } catch (err) {
    next(err);
  }
};

exports.getCarById = async (request, responce, next) => {
  try {
    const id = request.params.id;
    const car = await CarModel.findById(id);
    if (car) return responce.status(200).json(car);
    responce.status(404).send();
  } catch (err) {
    next(err);
  }
};

exports.updateCar = async (request, responce, next) => {
  try {
    const id = request.params.id;
    const body = request.body;

    const updatedCar = await CarModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (updatedCar) return responce.status(200).json(updatedCar);
    responce.status(404).send();
  } catch (err) {
    next(err);
  }
};

exports.deleteCar = async (request, responce, next) => {
  try {
    const id = request.params.id;
    const car = await CarModel.findByIdAndDelete(id);
    if (car) return responce.status(204).send();
    responce.status(404).send();
  } catch (err) {
    next(err);
  }
};
