const Sequilize = require('sequilize')
const { UUID, UUIDV4, STRING} = Sequilize

const conn = new Sequilize(process.env.DATABASE_URL || 'postgres://localhost/acme_db')

const Product = conn.define('product', 
{
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

const Categroy = conn.define('category', 
{
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

Product.belongsTo(Category)

const sync = async() =>
{
    await conn.sync( { force: true})
    const [fooCategory, barCategory, bazzCategory] = await Promise.all([
        Category.create({ name: 'Foo Category'}),
        Category.create({ name: 'Bar Category'}),
        Category.create({ name: 'Bazz Category'})
    ])
    await Promise.all([
        Product.create({ name: 'foo1', categoryId: fooCategory.id }),
        Product.create({ name: 'foo2', categoryId: fooCategory.id }),
        Product.create({ name: 'bar', categoryId: barCategory.id }),
        Product.create({ name: 'bazz', categoryId: bazzCategory.id })
    ])
    const products = await Product.findAll()
    const categories = await Product.findAll()

    return {
        products,
        categories
    }
}

const models = {
    Product,
    Category
}

module.exports = {
    sync,
    models
}