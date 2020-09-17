import express from "express";
import axios from "axios";
import { CHECK_URL, USER_TOKEN, USER_TOKEN_HEADER } from "./secrets";

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/code/:email", async (request, response) => {
  const { email } = request.params;
  try {
    await axios.get(`${CHECK_URL}${email}`, {
      headers: {
        [USER_TOKEN_HEADER]: USER_TOKEN,
      },
    });
    response.status(200).send(`${email} OK`);
  } catch (e) {
    response
      .status(404)
      .send(
        `hastickets check for ${email} returned ${e.response?.status}: ${e.message}`
      );
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
