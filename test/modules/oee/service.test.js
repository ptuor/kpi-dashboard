'use strict'
const assert = require('assert')

const service = require('../../../app/modules/oee/service.js')

describe('service', function () {
    describe('getLastElementFromArray()', function (){
        describe('with empty array', function () {
            it('should return empty object', function () {
                const result = service.getLastElementFromArray([])
                assert.strictEqual(result, undefined);

            });
        })

        describe('with filled array', function () {
            it('should return json', function () {
                const arrayOfJSON = ['{"oee": "90","ava":"20"}', '{"oee": "30","ava":"80"}', '{"oee": "10","ava":"50"}']

                const result = JSON.parse(service.getLastElementFromArray(arrayOfJSON))
                const oee = result.oee
                const ava = result.ava

                assert.strictEqual(oee, "10");
                assert.strictEqual(ava, "50");
            });

            it('should return number', function () {
                const arrayOfJSON = [5, 3, 200]

                const result = service.getLastElementFromArray(arrayOfJSON)

                assert.strictEqual(result, 200);

            });

            it('should return string', function () {
                const arrayOfJSON = ["Hans Olaf", "Paul Paulus", "lulu"]

                const result = service.getLastElementFromArray(arrayOfJSON)

                assert.strictEqual(result, "lulu");

            });

            it('should return object', function () {
                const arrayOfJSON = [{oee:90, ava:20}, {oee:30, ava:80}, {oee:12, ava:53}]

                const result = service.getLastElementFromArray(arrayOfJSON)
                const oee = result.oee
                const ava = result.ava


                assert.strictEqual(oee, 12);
                assert.strictEqual(ava, 53);

            });
        })

    })
})

