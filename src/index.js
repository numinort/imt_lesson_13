function httpRequest(url) {

    return new Promise(function (resolve, reject) {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;

                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error('network error'))
        };

        xhr.send();
    });
}

function getRandomeId(json) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            const usersParsed = JSON.parse(json);
            const ids = usersParsed.map((user) => user.id);
            const randomNum = Math.floor(Math.random() * (ids.length - 0) + 0);
            const randomId = ids[randomNum];

            resolve(randomId || 0);
        }, 3000);
    });
};



httpRequest('https://jsonplaceholder.typicode.com/users')
    .then((json) => {
        console.log('step 1:', json)

        return getRandomeId(json);
    })
    .then((id) => {
        console.log('step 2:', id);

        return httpRequest(`https://jsonplaceholder.typicode.com/users/${id}`);
    })
    .then((userJSON) => {
        console.log('step 3:', userJSON)

        const userName = JSON.parse(userJSON).name;
        console.log(userName);
    });



