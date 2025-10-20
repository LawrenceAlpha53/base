const { stat } = require("fs");
const WorkerServices = require("../Services/WorkerServices");
const db = require("../models");
const { Worker } = db;



const WorkerController = {
  Register: async (req, res, next) => {
    try {
      const WorkerDetails = req.body;
      const FullnameExist = await WorkerServices.FindWorkerByMatchingDetails(WorkerDetails.Fullname);
      const EmailExist = await WorkerServices.FindWorkerByEmail(WorkerDetails.Email);
      const PositionExist = await WorkerServices.FindWorkerByPosition(WorkerDetails.Position);

      if (FullnameExist) return res.status(409).json({ message: "User Exists" });
      if (EmailExist) return res.status(409).json({ message: "User with that Email Already Exists" });
      if (PositionExist) return res.status(409).json({ message: "This Worker Already Exists" });

      const CreatedWorkers = await WorkerServices.CreateUser(WorkerDetails);
      return res.status(201).json({
        message: "Successfully created the User",
        data: CreatedWorkers
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to register worker", error: error.message });
    }
  },

  Allworkers: async (req, res, next) => {
    try {
      const workers = await WorkerServices.GettingAllWorker();
      return res.status(200).json({
        message: "All workers successfully retrieved",
        data: workers
      });
    } catch (error) {
      console.error("Controller error fetching workers:", error.message);
      return res.status(500).json({
        message: "Internal server error while fetching workers",
        error: error.message
      });
    }
  },

  UpdatingWorker: async (req, res, next) => {
    try {
      const Updated = await WorkerServices.UpdatingWorkerDetails(req.params.Fullname, req.body);
      return res.status(200).json({ message: "Worker updated successfully", data: Updated });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update worker", error: error.message });
    }
  },

  PayingWorker: async (req, res, next) => {
    try {
      const UpdatedWorker = await WorkerServices.PaymentDetails(req.params.Fullname, req.body);
      return res.status(200).json({ message: "Payment recorded successfully", data: UpdatedWorker });
    } catch (error) {
      return res.status(500).json({ message: "Failed to record payment", error: error.message });
    }
  },

  Eliminate: async (req, res, next) => {
    try {
      const deleted = await WorkerServices.Eliminating(req.params.Fullname);
      if (!deleted) return res.status(404).json({ message: "No worker found to delete" });
      return res.status(200).json({ message: "Worker deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete worker", error: error.message });
    }
  }
};

module.exports = WorkerController;
