    async function inn(body) {
        let uri = 'https://famous-elk.w5.gravitydemo.com/wp-json/gf/v2/forms/1';
        let h = new Headers();
        // h.append('Authorization', 'Basic');
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'Basic Y2tfY2VkMWZmY2Y0Y2YwMTdlYTJhMWY0MGM4NTI3NTQ5ZWI5YTZhN2I1OTpjc19hYTMxMWViMTg5YzA3OGRiNDgzYTIzMjBkMjU4MmM4YTY1OWM1ZWQ1')
        h.append('cache', 'no-cache');

        const response = await fetch(uri, {
            // mode: 'no-cors',
            headers: {
                'Content-Type' : 'applications/json',
                'Authorization': 'Basic Y2tfY2VkMWZmY2Y0Y2YwMTdlYTJhMWY0MGM4NTI3NTQ5ZWI5YTZhN2I1OTpjc19hYTMxMWViMTg5YzA3OGRiNDgzYTIzMjBkMjU4MmM4YTY1OWM1ZWQ1'
            }
        });
        return response;
    }

    let testResponse = {
        "input_1": "test",
        "input_1_3": "test2",
        "input_1_6": "sigg",
        "input_2": "alsigman@gmail.com",
        "input_3": "yuppp"
    }

    inn(testResponse)
        // .catch(error => console.log(error.text()))
        // .then(data => data.text())
        .then(text => text.json())
        .then(result => console.log(result.fields))