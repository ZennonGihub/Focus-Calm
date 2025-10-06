import app from "../src/app.js";

app.get("/", (req, res) => {
  res.json({ message: "API FOCUS CALM", version: "1.0.0" });
});

export default app;
