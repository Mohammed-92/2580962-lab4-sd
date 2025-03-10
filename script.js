// Find submit button and listen to it
// once clicked stuff happpen
document.getElementById('submit-button').addEventListener('click', function() {

    // initiate/ get countries name that was inputed
    // Country Name = CN

    const CN = document.getElementById('country-name').value;

    // go to website, and put countries name in url

    fetch(`https://restcountries.com/v3.1/name/${CN}`)

        // check the input user gave
        .then(response => {
            // if not ok, ERROR 

            if (!response.ok) {
                throw new Error('Country not found');
            }
            // out the above message through json
            return response.json();
        })

        // if input is correct then fetch data
        // .then  = do the next thing
        .then(data => {
            // country = C
            // C data[0] => from the website first thing
            const C = data[0];

            // country information = CI
            // we want name , capital, population, region and the flags
            // thus we extract that information
            const CI = `
                <h2>${C.name.common}</h2>
                <p><strong>Capital:</strong> ${C.capital[0]}</p>
                <p><strong>Population:</strong> ${C.population}</p>
                <p><strong>Region:</strong> ${C.region}</p>
                <img src="${C.flags.svg}" alt="Flag of ${C.name.common}">
            `;
            // update out html put all this info on the page
            document.getElementById('country-info').innerHTML = CI;
            

            // now get borders of the country
            // borderingCountries = BC
            const BC = C.borders ? C.borders.map(stuff => {
                // fetches the borders of the country
                return fetch(`https://restcountries.com/v3.1/alpha/${stuff}`)
                    .then(response => response.json())
                    .then(data => `<p>${data[0].name.common} <img src="${data[0].flags.svg}" alt="Flag of ${data[0].name.common}"></p>`)
            }) : [];
            
            // yay! we have all the stuff
            // wait for everything to load properly and add BD to the html page

            // neighbours = N

            Promise.all(BC).then(N => {
                document.getElementById('bordering-countries').innerHTML = N.join('');
            });
        })

        // play fetch and catch 
        // if every thing is fine we celebrate
        // if not fine we throw hands and tell Ibrahim Vorajee to stop playin on his phone and critize MY HARDWORK
        .catch(error => {
            document.getElementById('country-info').innerHTML = `<p>${error.message}</p>`;
            document.getElementById('bordering-countries').innerHTML = '';
        });

        // we are done YAY! AWESOME!!
});
