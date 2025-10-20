const { where } = require("sequelize");
const db = require("../models");
const { Worker } = db;

const WorkerServices = {
  CreateUser: async (WorkerDetails) => await Worker.create(WorkerDetails),
  FindWorkerByMatchingDetails: async (Fullname) => await Worker.findOne({ where: { Fullname } }),
  FindWorkerByEmail: async (Email) => await Worker.findOne({ where: { Email } }),
  FindWorkerByPosition: async (Position) => await Worker.findOne({ where: { Position } }),

  GettingAllWorker: async () => {
    const workers = await Worker.findAll();
    return Array.isArray(workers) ? workers : [];
  },

  UpdatingWorkerDetails: async (Fullname, payload) => {
    const worker = await Worker.findOne({ where: { Fullname } });
    if (!worker) throw new Error("Worker not found");
    Object.assign(worker, payload);
    await worker.save();
    return worker;
  },

  PaymentDetails: async (Fullname, payload) => {
    const worker = await Worker.findOne({ where: { Fullname } });
    if (!worker) throw new Error("Worker not found");
    Object.assign(worker, payload);
    await worker.save();
    return worker;
  },

  Eliminating: async (Fullname) => {
    const deleted = await Worker.destroy({ where: { Fullname } });
    return deleted;
  }
};

module.exports = WorkerServices;
