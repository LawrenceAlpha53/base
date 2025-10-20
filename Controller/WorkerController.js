const { stat } = require("fs");
const WorkerServices = require("../Services/WorkerServices");
const db = require("../models");
const { Worker } = db;



const WorkerController = {
  Register: async (req, res, next) => {
    try {
      const WorkerDetails = req.body;
      const FullnameExist = await WorkerServices.FindWorkerByMatchingDetails(
        WorkerDetails.Fullname
      );

      const EmailExist = await WorkerServices.FindWorkerByEmail(
        WorkerDetails.Email
      );
      const PositionExist = await WorkerServices.FindWorkerByPosition(
        WorkerDetails.Position
      );

      if (FullnameExist) {
        return res.status(201).json({
          message: "User Exists",

          status: res.statusCode,
        });
      }

      if (EmailExist) {
        return res.status(409).json({
          message: "User with that Email Already Exists",
          status: res.statusCode,
        });
      }

      if (PositionExist) {
        return res.status(409).json({
          message: "This Worker ALready Exist Please",
          status: res.statusCode,
        });
      } else {
        const CreatedWorkers = await WorkerServices.CreateUser(WorkerDetails);
        return res.status(409).json({
          message: "Successfully created the User",
          data: CreatedWorkers,
          status: res.statusCode,
        });
      }
    } catch (error) {
      return next(error);
    }
  },

  //Getting all workers

  Allworkers: async (req, res, next) => {
    try {
      const workers = await WorkerServices.GettingAllWorker();

      if (workers !== 0) {
        return res.status(201).json({
          message: "All Workers Successfully Retrived",
          data: workers,
        });
      } else {
        return res.status(409).json({
          message: "No Worker Retrived",
          status: res.statusCode,
        });
      }
    } catch (error) {
      return next(error);
    }
  },

  //getting Single User by name

  GetSinleWorker: async (req, res, next) => {
    try {
      const Fullname = req.body;
      const RetrivedUser = await WorkerServices.GettingSinleUser(
        req.params.Fullname
      );
      Object.assign(RetrivedUser, Fullname);
      if (RetrivedUser) {
        return res.status(201).json({
          message: "User Successfully retrived",
          data: RetrivedUser,
          status: res.statusCode,
        });
      } else {
        return res.status(409).json({
          message: "Failed to Retrive that User please",
          status: res.statusCode,
        });
      }
    } catch (error) {
      return next(error);
    }
  },

  //Updating User
  UpdatingWorker: async (req, res, next) => {
    try {
      const ID = req.body;
      const Updated = await WorkerServices.UpdatingWorkerDetails(
        req.params.Fullname,
        ID
      );
      Object.assign(Updated, ID);
      if (Updated) {
        return res.status(201).json({
          message: "successfuly updated the worker details",
          data: Updated,
          status: res.statusCode,
        });
      } else {
        return res.status(409).json({
          message: "failed to update the user please",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  //deleting
Eliminate: async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.Fullname);
    const deleted = await Worker.destroy({ where: { Fullname: name } });

    if (deleted === 0) {
      return res.status(404).json({ message: "No user found to delete" });
    }

    return res.status(200).json({ message: "Successfully deleted the user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting worker" });
  }
},

//pay Worker
PayingWorker: async (req, res, next) => {
  try {
    const Fullname = decodeURIComponent(req.params.Fullname);
    const { paymentDate, paymentMethod, paymentAmount, paymentNotes } = req.body;

    const worker = await Worker.findOne({ where: { Fullname } });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    await worker.update({
      paymentDate,
      paymentMethod,
      paymentAmount,
      paymentNotes
    });

    return res.status(200).json({
      message: 'Payment recorded successfully',
      data: worker
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to record payment' });
  }
}




};
module.exports = WorkerController;
