import assert from 'assert'
import Controller from '../../../views/history/controller.js'
import Data from "../../../views/history/data.local.js";
// const beforeEach = require("selenium-webdriver");
const chai = require('chai'), spies = require('chai-spies')
chai.use(spies);


describe('Controller', function() {
    beforeEach(function(){
        this.view = {updateChart: chai.spy(), updateTrend: chai.spy(), registerRefreshHandler: chai.spy()}
    })
    describe('isValidDateAndTime()', function() {
         it('should return true with valid dates', function() {
             const ctrl = new Controller(this.view , undefined)
             const fromDate = new Date()
             const toDate = new Date()

             const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

             assert.strictEqual(isValidDateAndTime, true)
         })



         it('should return false with invalid from date', function() {
             const ctrl = new Controller(this.view , undefined)
             const fromDate = undefined
             const toDate = new Date()

             const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

             assert.strictEqual(isValidDateAndTime, false)
         })


         it('should return false with invalid to date', function() {
             const ctrl = new Controller(this.view , undefined)
             const fromDate = new Date()
             const toDate = undefined

             const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

             assert.strictEqual(isValidDateAndTime, false)
         })

    })

    describe('getValuesByFromAndToDate()', function() {
        describe('check result message', function() {
            it('should return empty strings with valid dates', async function() {
                const fakeData = new Data(true)
                const ctrl = new Controller(this.view , fakeData)
                const fromDate = new Date()
                const toDate = new Date()

                const resultMessage = await ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.strictEqual(resultMessage.message, "")
            })


            it('should return message strings with invalid from date', async function() {
                const ctrl = new Controller(this.view , undefined)
                const fromDate = undefined
                const toDate = new Date()

                const resultMessage = await ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.notStrictEqual(resultMessage.message, "")
            })

            it('should return message strings with invalid from date', async function() {
                const ctrl = new Controller(this.view , undefined)
                const fromDate = new Date()
                const toDate = undefined

                const resultMessage = await ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.strictEqual(resultMessage.message, ctrl.erroeMessageForInvalidDates.toString())
            })

        })

    })




    describe('calculateAverageOeeValues()', function() {

        it('should return 0 if array is empty', function() {
            const ctrl = new Controller(this.view , undefined)
            const array = []

            const averageValueFromArray = ctrl.calculateAverageOeeValues(array)

            assert.strictEqual(averageValueFromArray, 0)
        })


        it('should return 10 as correct average of array', function() {
            const ctrl = new Controller(this.view , undefined)
            const array = [5, 10, 15]

            const averageValueFromArray = ctrl.calculateAverageOeeValues(array)

            assert.strictEqual(averageValueFromArray, 10)
        })


        it('should return 10.25 as correct average of array', function() {
            const ctrl = new Controller(this.view , undefined)
            const array = [5, 10, 15, 11]

            const averageValueFromArray = ctrl.calculateAverageOeeValues(array)

            assert.strictEqual(averageValueFromArray, 10.25)
        })

        it('should return 3.33 as correct rounded average of array', function() {
            const ctrl = new Controller(this.view , undefined)
            const array = [5, 4, 1]

            const averageValueFromArray = ctrl.calculateAverageOeeValues(array)

            assert.strictEqual(averageValueFromArray, 3.33)
        })

    })

})