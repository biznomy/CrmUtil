var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    'title': String,
    'address': [],
    'phone': [],
    'email': [],
    'lk' : {},
    'anglist' : {},
    'website': String,
    'category': [],
    'subCategory': [],
    'status': [],
    'tags': [],
    'createdOn': { type: Date, default: Date.now },
    'updatedOn': { type: Date, default: Date.now },
    'persons': [{ type: Schema.ObjectId, ref: "Person" }]
});

module.exports = mongoose.model('Company', CompanySchema);
