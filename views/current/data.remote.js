/****************************/
/* model                    */
/****************************/

export default class Data {

    // constructor which gets server url
    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }


    async getActualValues(callback){
        let url = new URL(this.serverUrl + "/oee/live")

        // fetch request to server
        return fetch(url.toString(), {
            headers: new Headers({
                'Accept': 'application/json',
            })
        }).then(response => {
            if (response.ok){
                return response.json()
            }else{
                return Promise.reject(response)
            }
        }).then(result => {
          callback(result)
        })
    }
}

