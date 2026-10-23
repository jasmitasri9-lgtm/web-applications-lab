
use("SportsDB");

db.equipment.insertMany([
  { equipmentId: "E101", name: "Cricket Bat", sport: "Cricket", quantity: 20, available: true },
  { equipmentId: "E102", name: "Cricket Ball", sport: "Cricket", quantity: 50, available: true },
  { equipmentId: "E103", name: "Football", sport: "Football", quantity: 15, available: true },
  { equipmentId: "E104", name: "Tennis Racket", sport: "Tennis", quantity: 10, available: false }
]);

db.equipment.find();

db.equipment.find({ sport: "Cricket" });

db.equipment.updateOne(
  { equipmentId: "E102" },
  { $set: { quantity: 75 } }
);

db.equipment.deleteOne({ equipmentId: "E103" });

db.equipment.find();
