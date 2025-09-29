// Function to get country data from the API 
// the name of the country is parameter
        async function getData(countryName) {
            const apiurl = `https://restcountries.com/v3.1/name/${countryName}`;
            try {
                const response = await fetch(apiurl);
                if (!response.ok) {
                    throw new Error(`Country "${countryName}" not found`);
                }
                else {
                    const data = await response.json();
                    return data[0];  // Return the first element from the response
                }
            } 
            catch (error) {
                throw new Error('Connection to API unsuccessful: ' + error.message);
            }
        }


 // Function to display country data on the page
        function displayData(country) {
            const result = document.getElementById("result");
            result.innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width: 150px; margin-top: 10px;">
            `;
        }

        

// Function to handle the form in the HTML
// starts when the form is activated
            const myform = document.getElementById("countryForm");
            myform.addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent the form from reloading the page

            const countryName = document.getElementById("country").value.trim();
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "";  // Clear any previous result

            try {
                const countryData = await getData(countryName);
                // here is the full JSON response
                document.body.innerHTML += "Here is the returned non-formatted JSON stream of characters: <br/>";
                document.body.innerHTML += JSON.stringify(countryData, null,'\t'); // whole JSON
                displayData(countryData);  // run function to display selected attributes only
            } catch (error) {
                resultDiv.textContent = error.message;
            }
        }
    
    );

                        
