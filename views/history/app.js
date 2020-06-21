import {Datepicker} from'./datepicker.js'
import { Controller } from './controller.js'

const datepicker = new Datepicker("#config")
const controller = new Controller(datepicker)

controller.start()