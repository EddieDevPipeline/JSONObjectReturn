const users = [
  { id: 1, name: "Ryan", email: "ryan@ryan.com", password: "password123" },
  { id: 2, name: "Eddie", email: "eddie@eddie.com", password: "password456" },
  { id: 3, name: "Sam", email: "sam@sam.com", password: "password789" },
];

users.forEach((user) => {
  console.log(`Hello, ${user.name}, your email is ${user.email}`);
});

function fetchWithPromise(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(Error("Network Error"));

    xhr.send();
  });
}

const dataType = prompt(
  "Enter the type of data you want to fetch (e.g., people, planets):"
);
const baseUrl = "https://swapi.tech/api/";
const url = `${baseUrl}${dataType}`;

const dataPromise = fetchWithPromise(url);

dataPromise
  .then((data) => {
    console.log("Fetched data:", data);
    return JSON.parse(data);
  })
  .then((parsedData) => {
    if (parsedData.results && parsedData.results.length > 0) {
      console.log("First item name:", parsedData.results[0].name);
    } else {
      console.log("No results found");
    }
  })
  .catch((error) => {
    console.error("Failed to fetch data:", error);
    alert("Failed to fetch data: " + error); // Alert the user about the error
  });
