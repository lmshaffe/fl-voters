const mongoose = require('mongoose');

let VoterSchema = new mongoose.Schema({
  countyCode: String,
  _id: {
    type: Number,
    require: true,
    unique: true
  },
  lastName: String,
  suffixName: String,
  firstName: String,
  middleName: String,
  publicRecordExemption: String,
  residentAddressLine1: String,
  residentAddressLine2: String,
  residentCity: String,
  residentState: String,
  residentZip: String,
  mailingAddressLine1: String,
  mailingAddressLine2: String,
  mailingAddressLine3: String,
  mailingCity: String,
  mailingState: String,
  mailingZip: String,
  mailingCountry: String,
  gender: String,
  race: String,
  birthDate: String,
  registrationDate: String,
  partyAffiliation: String,
  precinct: String,
  precinctGroup: String,
  precinctSplit: String,
  precinctSuffix: String,
  voterStatus: String,
  congressionalDistrict: String,
  houseDistrict: String,
  senateDistrict: String,
  countyCommissionDistrict: String,
  schoolBoardDistrict: String,
  areaCode: String,
  phoneNumber: String,
  phoneExtension: String,
  emailAddress: String
})

VoterSchema.virtual('voterId').get(function() {
  return this._id;
})

let Voter = mongoose.model('Voter', VoterSchema)

module.exports = Voter;
