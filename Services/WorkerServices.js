const { where } = require("sequelize");
const db = require("../models");
const { Worker } = db;



const WorkerServices = {
  //Registering Worker Basing on Credentials if they Match No Worker will be Registered
  CreateUser: async (WorkerDetails) => {
    try {
      const user = await Worker.create(WorkerDetails);

      return user;
    } catch (error) {
      throw error;
    }
  },

  FindWorkerByMatchingDetails: async (Fullname) => {
    try {
      const user = await Worker.findOne({ where: { Fullname } });

      return user;
    } catch (error) {
      throw error;
    }
  },
  FindWorkerByEmail: async (Email) => {
    try {
      const user = await Worker.findOne({ where: { Email } });
      return user;
    } catch (error) {
      throw error;
    }
  },
  FindWorkerByPosition: async (Position) => {
    try {
      const user = await Worker.findOne({ where: { Position } });
      return user;
    } catch (error) {
      throw error;
    }
  },

  //finding all Workers
  GettingAllWorker: async () => {
    try {
      const user = await Worker.findAll();
      return user;
    } catch (error) {
      throw error;
    }
  },
  //getting single user by full name

  GettingSinleUser: async (Fullname) => {
    try {
      const user = await Worker.findOne({ where: { Fullname } });
      return user;
    } catch (error) {
      throw error;
    }
  },
  //Updating Worker Details

  UpdatingWorkerDetails: async (Fullname, USER) => {
    try {
      const user = await Worker.findOne({ where: { Fullname } });
      if (!user) {
        throw new error("No user found");
      }

      Object.assign(user, USER);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  },
  //deleting user
  Eliminating: async (Fullname) => {
    try {
      const user = await Worker.destroy({ where: { Fullname } });
      return user;
    } catch (error) {
      throw error;
    }
  },
// //payment
PaymentDetails:async(Fullname,paymentDate,paymentMethod,paymentNotes) => {
  try{
const user = await Worker.collection('workers').findOne({ where: { Fullname}})
if(!user) {
  throw new error('Worker not found please')
} 
const UpdatedWorker = await Worker.collection('workers').updateOne({ Fullname: fullname},{ $set: { lastPaid: new Date(paymentDate)}})
const payment= {
  paymentDate,paymentMethod,paymentNotes
}
await Worker.collection('payments').insertOne(payment)
return user



  }catch(error) {
    throw error
  }
}



};

module.exports = WorkerServices;
