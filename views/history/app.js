/****************************/
/* Application              */
/****************************/

import View  from './view.js'
import Controller from './controller.js'
import Data from './data.remote.js'
import Charts from "../charts/charts.js";

const charts = new Charts()
const view = new View("#config", charts)
const data = new Data("http://localhost:3000")
const controller = new Controller(view, data)
