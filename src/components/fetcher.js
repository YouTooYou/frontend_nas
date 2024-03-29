
const URL = `http://${process.env.REACT_APP_IP_ADDRESS}:5000`

export async function fetcher(method, endpoint, body) {
    if(!endpoint.startsWith("/")) {
        endpoint += "/"
    }
    let headers = {
        "Content-Type": "application/json"
    }
    let init
    if(body) {
        init = {
            method: method,
            headers: headers,
            // processData: false,
            // mode: "no-cors",
            body: JSON.stringify(body)
        }
    } else {
        init = {
            method: method,
            headers: headers,
            // processData: false,
            // mode: "no-cors",
        }
    }

    return await fetch(URL + endpoint, init)
    // console.log(promise)
}


// export async function walk(path) {
//         await fetcher("POST", "/",
//             {path: path}
//         ).then(response => response.json()).then(items => {
//             console.log("items in walk:")
//             console.log(items)
//             this.setState({
//                 isLoaded: true,
//                 items: items,
//                 path: path,
//             })
//         })
//     }