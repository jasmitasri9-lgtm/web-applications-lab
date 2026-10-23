
use("MovieDB");

db.movies.insertMany([
  { movieId: "M101", title: "Pushpa 2", genre: "Action", tickets: 50, price: 200 },
  { movieId: "M102", title: "Devara", genre: "Action", tickets: 40, price: 300 },
  { movieId: "M103", title: "Kalki 2898 AD", genre: "Sci-Fi", tickets: 30, price: 150 },
  { movieId: "M104", title: "Salaar", genre: "Action", tickets: 60, price: 250 },
  { movieId: "M105", title: "RRR", genre: "Action", tickets: 25, price: 220 }
]);

db.movies.find();

db.movies.find({ price: { $lt: 250 } });

db.movies.updateOne(
  { movieId: "M102" },
  { $set: { tickets: 60 } }
);

db.movies.deleteOne({ movieId: "M103" });

db.movies.find();
