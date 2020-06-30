export default class Data {
    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }

    async getActualValues(){
        let url = new URL(this.serverUrl + "/oee/live")

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
        })
    }
}

