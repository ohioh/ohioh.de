# API-End of the Protocol:

For Testing in your coding experiences it  can be helpfull  to use: https://httpbin.org/
Example: 

fetch('https://httpbin.org/ip')
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });
