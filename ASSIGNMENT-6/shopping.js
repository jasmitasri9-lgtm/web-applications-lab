
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
    try {
        // 1. Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const db = client.db("ShoppingDB");
        const products = db.collection("products");

        // 2. Insert four product records
        await products.insertMany([
            {
                productId: "P101",
                productName: "Laptop",
                category: "Electronics",
                price: 50000,
                stock: 20
            },
            {
                productId: "P102",
                productName: "Headphones",
                category: "Electronics",
                price: 2000,
                stock: 15
            },
            {
                productId: "P103",
                productName: "Shoes",
                category: "Fashion",
                price: 1500,
                stock: 8
            },
            {
                productId: "P104",
                productName: "Backpack",
                category: "Accessories",
                price: 1200,
                stock: 25
            }
        ]);
        console.log("Four product records inserted.");

        // 3. Retrieve products with stock greater than 10
        const availableProducts = await products.find({
            stock: { $gt: 10 }
        }).toArray();

        console.log("Products with stock greater than 10:");
        console.log(availableProducts);

        // 4. Update the price of product P102
        await products.updateOne(
            { productId: "P102" },
            { $set: { price: 2500 } }
        );
        console.log("Price of product P102 updated.");

        // 5. Delete product P103
        await products.deleteOne({ productId: "P103" });
        console.log("Product P103 deleted.");

        // 6. Display the remaining products
        console.log("Remaining products:");
        console.log(await products.find().toArray());

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

main();
