const input = document.querySelector("#input");
const expandButton = document.querySelector("#expand-btn");
const result = document.querySelector("#result");

expandButton.addEventListener("click", () => {
  result.innerText = "Loading...";
  fetch(`/expand?shortUrl=${input.value}`)
    .then((res) => res.text())
    .then((text) => {
      result.innerText = text;
      result.setAttribute("href", text);
    })
    .catch((error) => {
      console.log(error);
      result.innerText = "Error";
    });
});
