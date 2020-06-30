
import View  from './view.js'
import Controller from './controller.js'
import Data from './data.remote.js'



const view = new View()
const data = new Data("http://localhost:3000")
const controller = new Controller(view, data)
let oeeArray = []



// Polling request to server
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const poll = (promiseFn, time) => promiseFn().then(
    sleep(time).then(() => poll(promiseFn, time)))

poll(() => new Promise(() => {
   fetch("http://localhost:3000/oee/live", {
      headers: new Headers({'Accept': 'application/json'})
   }).then(response => {
      return response.json()
   }).then(result => {

      //thresholdMessage(result.oee)

      console.log(result.oee)
      oeeArray.push(result)

      view.updateChart("OEE", 0, result.oee)
      view.updateChart("AVA", 1, result.ava)
      view.updateChart("EFF", 2, result.eff)
      view.updateChart("QUA", 3, result.qua)
      // this.view.updateTrend(
      //     (oeeArray.map(values => [Date.parse(values.createdAt), values.oee])),
      //     (oeeArray.map(values => [Date.parse(values.createdAt), values.ava])),
      //     (oeeArray.map(values => [Date.parse(values.createdAt), values.eff])),
      //     (oeeArray.map(values => [Date.parse(values.createdAt), values.qua])))

      //
      // oeeArray.push(result.oee)
      // avaArray.push(result.ava)
      // effArray.push(result.eff)
      // quaArray.push(result.qua)
      //
      // if (count === 0) {
      //    createChart("OEE", result.oee)
      //    createChart("AVA", result.ava)
      //    createChart("EFF", result.eff)
      //    createChart("QUA", result.qua)
      //    createTrend(result.oee, result.ava, result.eff, result.qua)
      // } else {
      //    updateChart( "OEE",0, result.oee)
      //    updateChart( "AVA",1, result.ava)
      //    updateChart( "EFF", 2, result.eff)
      //    updateChart( "QUA", 3,  result.qua)
      //    updateTrend(oeeArray, avaArray, effArray, quaArray)
      // }
      // count++
   })
}), 5000);



