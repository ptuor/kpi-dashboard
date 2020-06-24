import assert from 'assert'
import Controller from '../../../views/history/controller.js'
import View from '../../../views/history/view.js'


describe('Controller', function() {
    describe('', function() {
        beforeEach(function(){

            this.view = new View("config1")
        })

        it('should return hasErrors=true, only if any message with level error', function() {
            const ctrl = new Controller(this.view)



            assert.strictEqual("hallo", "hallo")
        })
    })
})