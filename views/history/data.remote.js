export default class Data {
    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }

    async getValuesByDates(fromDate, toDate){
        let url = new URL(this.serverUrl + "/oee/history")

        const params = {from:fromDate, to:toDate}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))


        return fetch(url.toString(), {
            headers: new Headers({
                'Content-Type': 'application/json',
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