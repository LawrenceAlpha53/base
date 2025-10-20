
const express = require("express")
const WorkerController = require("../Controller/WorkerController")
const router = express.Router()
router.post("/register",WorkerController.Register)
router.get("/getall",WorkerController.Allworkers)
router.get("/SingleWorker/:Fullname",WorkerController.GetSinleWorker)
router.patch("/Updating/:Fullname",WorkerController.UpdatingWorker)
router.delete("/eliminate/:Fullname",WorkerController.Eliminate)
router.patch('/pay/:Fullname',WorkerController.PayingWorker)





module.exports = router