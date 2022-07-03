const express = require("express");
const request = require("request");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/expand", (req, res) => {
  let { shortUrl } = req.query;
  if (!shortUrl.startsWith("http")) shortUrl = `https://${shortUrl}`;

  request(
    {
      url: shortUrl,
      method: "HEAD",
      followAllRedirects: true,
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        res.send("Error");
      } else {
        res.send(response.request.href);
      }
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
