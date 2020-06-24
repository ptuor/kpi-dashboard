import assert from 'assert'
import Controller from '../../../views/history/controller.js'

const beforeEach = require("selenium-webdriver");


describe('Controller', function() {
    describe('isValidDateAndTime()', function() {

            it('should return true with valid dates', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = new Date()
                const toDate = new Date()

                const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

                assert.strictEqual(isValidDateAndTime, true)
            })



            it('should return false with invalid from date', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = undefined
                const toDate = new Date()

                const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

                assert.strictEqual(isValidDateAndTime, false)
            })


            it('should return false with invalid to date', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = new Date()
                const toDate = undefined

                const isValidDateAndTime = ctrl.validateDateAndTime(fromDate, toDate)

                assert.strictEqual(isValidDateAndTime, false)
            })

    })


    describe('getValuesByFromAndToDate()', function() {
        describe('check result message', function() {
            it('should return empty strings with valid dates', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = new Date()
                const toDate = new Date()

                const reslutMessage = ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.strictEqual(reslutMessage.message, "")
            })


            it('should return message strings with invalid from date', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = undefined
                const toDate = new Date()

                const reslutMessage = ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.notStrictEqual(reslutMessage.message, "")
            })

            it('should return message strings with invalid from date', function() {
                const ctrl = new Controller(undefined, undefined,true)
                const fromDate = new Date()
                const toDate = undefined

                const reslutMessage = ctrl.getValuesByFromAndToDate(fromDate, toDate)

                assert.strictEqual(reslutMessage.message, ctrl.erroeMessageForInvalidDates)
            })

        })

    })
})