const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    e.preventDefault();
    let data = new FormData(form);
    for (let [key, value] of data.entries()) {
        /* eslint-disable n/no-console */
        console.log(`${key}: ${value}`);
        /* eslint-enable n/no-console */
    }
});
