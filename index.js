const path = require("path");
const express = require("express");
const cors = require("cors");

const WorkerRoute = require("./Routes/WorkerRoute")



const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',WorkerRoute)



const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

