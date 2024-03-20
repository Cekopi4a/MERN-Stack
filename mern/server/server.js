import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import alcoholfree from "./routes/alcoholfree.js";
import dessert from "./routes/dessert.js";
import grill from "./routes/grill.js";
import hot_dish from "./routes/hot_dish.js";
import _hlqb from "./routes/_hlqb.js";
import maindish from "./routes/maindish.js";
import salad from "./routes/salad.js";
import soup from "./routes/soup.js";
import topping from "./routes/topping.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/alcohol", records);
app.use("/alcfree", alcoholfree);
app.use("/dessert", dessert );
app.use("/grill", grill);
app.use("/hlqb", _hlqb);
app.use("/hotdish", hot_dish);
app.use("/maindish", maindish);
app.use("/salad", salad);
app.use("/soup", soup);
app.use("/topping", topping);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
