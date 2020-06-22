import {View} from'./view.js'
import { Controller } from './controller.js'

const view = new View("#config")
const controller = new Controller(view)

controller.start()