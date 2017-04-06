var crmModel = require('../models/crmModel.js');
var CompanyModel = require('../models/CompanyModel.js');
var PersonModel = require('../models/PersonModel.js');
/**
 * crmController.js
 *
 * @description :: Server-side logic for managing crms.
 */
module.exports = {

    /**
     * crmController.list()
     */
    list: function(req, res) {
        crmModel.find(function(err, crms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting crm.',
                    error: err
                });
            }
            return res.json(crms);
        });
    },

    /**
     * crmController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        crmModel.findOne({ _id: id }, function(err, crm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting crm.',
                    error: err
                });
            }
            if (!crm) {
                return res.status(404).json({
                    message: 'No such crm'
                });
            }
            return res.json(crm);
        });
    },

    /**
     * crmController.create()
     */
    create: function(req, res) {
        var crm = new crmModel(req.body);

        crm.save(function(err, crm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating crm',
                    error: err
                });
            }
            return res.status(201).json(crm);
        });
    },
    checkout: function(req, res) {

        var limit = 10;

        crmModel.find({ $or: [{ "update": false }, { "update": null }] }, function(err, crms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting crm.',
                    error: err
                });
            }
            var results = [];
            for (let i = 0; i < crms.length; i++) {
                var crm = crms[i];
                var person = {};
                var company = {};
                var result = {};

                if(crm.firstname){
                    person['name'] = crm.firstname;    
                }
                if(crm.lastname){
                 person['name'] += " " + crm.lastname;       
                }

                
                person['email'] = crm.email;
                person['firstname'] = crm.firstname;
                person['lastname'] = crm.lastname;
                let lk_person = {};
                lk_person['designation'] = crm.designation;
                lk_person['headline'] = crm.designation;
                lk_person['url'] = crm.lk_url;
                person['lk'] = lk_person;

                var imPerson = new PersonModel(person);

                imPerson.save(person, function(err, info) {
                    if (err) console.log(err);
                    console.log("success", info._id);
                });           

                company['title'] = crm.company_name;
                company['website'] = crm.www;
                let address = {};
                address['country'] = crm.country;
                address['state'] = crm.state;
                address['city'] = crm.city;
                company['address'] = address;
                let lk_company = {};
                lk_company['detail'] = crm.lk_company_details;
                company['lk'] = lk_company;

                var imCompany = new CompanyModel(company);
                imCompany.save(function(err, info) {
                    if (err) console.log(err);
                    console.log("success", info._id);                  
                });
                results.push({'id processed': crm._id});
            }
            return res.json(results);
        }).limit(limit);

    }

};
