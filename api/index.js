import app from "../src/app.js";
import { connectDb } from "../src/db/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("Attempting to connect to database...");

    await connectDb();

    console.log("DB connection established successfully.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("CRITICAL: DB Connection Error. Server not started.");
    console.error(error);
    process.exit(1);
  }
}
startServer();

export default app;
