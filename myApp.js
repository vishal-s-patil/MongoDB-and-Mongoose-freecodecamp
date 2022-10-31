require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  'name': { type: String, required: true },
  'age': Number,
  'favoriteFoods': [String]
})

let Person;
Person = new mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  let name = 'vishal';
  let age = 20;
  let favfoods = ['pizza', 'burgir'];
  var doc = new Person({
    name: name,
    age: age,
    favoriteFoods: favfoods
  })

  doc.save(function (err, data) {
    if (err) throw err;
    console.log('document saved successfully!');
    done(null, data);
  })

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, function (err, data) {
    if (err) done(err, null);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedData) => {
      if (err) done(err, null);
      done(null, updatedData);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) done(err, null);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "pizza";
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec(done, function (err, data) {
      if (err) done(err, null);
      done(null, err);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
