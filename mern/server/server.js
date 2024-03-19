import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import foods from "./routes/foods.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/alcohol", records);
app.use("/food", foods);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
