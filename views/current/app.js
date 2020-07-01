
import View  from './view.js'
import Controller from './controller.js'
import Data from './data.remote.js'



const view = new View()
const data = new Data("http://localhost:3000")
const controller = new Controller(view, data)


controller.run()


