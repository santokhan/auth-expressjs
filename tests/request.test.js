const API = "http://localhost:5000"

const credentials = {
    email: "santokhan1999@gmail.com",
    password: "santo@1234"
}

function signup() {
    fetch(API + "/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(res => {
        console.log(res.status)
        return res.json()
    }).then(data => {
        console.log(data)
    }).catch(err => console.error(err))
}

async function signin() {
    try {
        const res = await fetch(API + "/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const data = await res.json();
        console.log(data)
        return data;
    } catch (err) {
        return console.error(err)
    }
}

function signout() {
    signin(credentials).then(data => {
        if (!data) return console.error("invalid credentials");

        const refreshToken = data.refreshToken

        fetch(API + "/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
        }).then(res => {
            console.log(res.status)
            return res.json()
        }).then(data => {
            console.log(data)
        }).catch(err => console.error(err))
    })
}

function verify(email) {
    fetch(API + "/verify?redirect=https://google.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    }).then(res => {
        console.log(res.status)
        return res.json()
    }).then(data => {
        console.log(data)
    }).catch(err => console.error(err))
}

function forgot() {
    fetch(API + "/forgot?redirect=https://google.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(res => {
        console.log(res.status)
        return res.json()
    }).then(data => {
        console.log(data)
    }).catch(err => console.error(err))
}

function token(credentials) {
    signin(credentials).then(data => {
        if (!data) return console.error("invalid credentials");

        const refreshToken = data.refreshToken

        if (refreshToken) {
            // generate new token 
            fetch(API + "/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refreshToken })
            }).then(res => {
                console.log(res.status)
                return res.json()
            }).then(data => {
                if (!data) return console.error("invalid token");
                console.log("new token ", data.accessToken)
            }).catch(err => console.error(err))
        }
    })

}

function reset() {
    fetch(API + "/reset?redirect=https://google.com?token=", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
    }).catch(err => console.error(err))
}

signup()
// signin()
// token(credentials)
// signout()
// verify(credentials.email)
// forgot()
// reset()