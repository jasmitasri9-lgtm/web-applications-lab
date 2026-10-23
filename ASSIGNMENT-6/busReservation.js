
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const db = client.db("TransportDB");
        const buses = db.collection("buses");

        // 1. Insert three bus records
        await buses.insertMany([
            {
                busNo: "B101",
                route: "Vizag to Hyderabad",
                totalSeats: 50,
                availableSeats: 35
            },
            {
                busNo: "B102",
                route: "Vizag to Vijayawada",
                totalSeats: 40,
                availableSeats: 25
            },
            {
                busNo: "B103",
                route: "Vizag to Chennai",
                totalSeats: 45,
                availableSeats: 15
            }
        ]);
        console.log("Three bus records inserted.");

        // 2. Retrieve buses with more than 20 available seats
        const availableBuses = await buses.find({
            availableSeats: { $gt: 20 }
        }).toArray();

        console.log("Buses with more than 20 available seats:");
        console.log(availableBuses);

        // 3. Update available seats of bus B102
        await buses.updateOne(
            { busNo: "B102" },
            { $set: { availableSeats: 30 } }
        );
        console.log("Available seats of B102 updated.");

        // 4. Delete bus B103
        await buses.deleteOne({ busNo: "B103" });
        console.log("Bus B103 deleted.");

        // 5. Display final records
        console.log("Final bus records:");
        console.log(await buses.find().toArray());

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

main();
