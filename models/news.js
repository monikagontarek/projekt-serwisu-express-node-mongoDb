var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: { type: String, required: [true, 'pole tytuł jest wymagane'] }, // String is shorthand for {type: String}
    // jeśli chcemy, żeby parametr był zawsze wpisany (nie był opcjaonalny to nadajemy mu type, wtedy składnia = {type: np.string, required: true})
    description: { type: String, required: [true, 'pole opis jest wymagane'] },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);