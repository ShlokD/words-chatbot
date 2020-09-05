const queryForm = document.querySelector("#query-form");
const queryInput = document.querySelector("#query-input");
const output = document.querySelector("#output");

const appendMatches = (matches) => {
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  const fragment = new DocumentFragment();
  const list = document.createElement("ul");

  matches.forEach((match) => {
    const listItem = document.createElement("li");
    listItem.textContent = match.word;
    list.append(listItem);
  });

  fragment.append(list);
  output.append(fragment);
};

const onFormSubmit = (ev) => {
  ev.preventDefault();
  const sentence = queryInput.value;
  const body = {
    sentence,
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  fetch("/get-words", options)
    .then((res) => res.json())
    .then((resJSON) => appendMatches(resJSON.matches));
};
queryForm.addEventListener("submit", onFormSubmit);
