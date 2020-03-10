const { expect } = require('chai')

// ----------- OR --------------
// const chai = require('chai')
// const expect = chai.expect

const db = require('../db')

const { Product} = db.mdoels

describe('data layer', () => 
{
    // it('foo is equal to foo', () =>
    // {
    //     const foo = 'foo'
    //     expect(foo).to.equal('foo')
    // })
    describe('seeded data', () =>
    {
        let seed;
        beforeEach(async() => 
        {
            seed = await db.sync()
        })
        it('there are 4 products', () =>
        {
            expect(seed.products.length).to.equal(4)
        })
        it('one of them has a name bar', async() =>
        {
            const bar = await Product.findOne({ where: {name: 'bar'}})
            expect(bar.name).to.equal('bar')
        })
        it('foo1 has a category of fooCategory', async() =>
        {
            const foo1 = await Product.findOne({ where: {name: 'foo1'}})
            expect(foo1.category).to.equal('fooCategory')
        })
    })
})