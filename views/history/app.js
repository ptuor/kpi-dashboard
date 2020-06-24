
import View  from './view.js'
import Controller from './controller.js'

const view = new View("#config1")
const controller = new Controller(view)

controller.start()