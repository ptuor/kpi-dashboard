export default class Data {
    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }

    async getValuesByDates(fromDate, toDate){
        return fetch(this.serverUrl + "/oee/1", {
            headers: new Headers({'Accept': 'application/json'})
        }).then(response => {
            if (response.ok){
                return response.json()
            }else{
                return Promise.reject(response)
            }
        })
    }
}