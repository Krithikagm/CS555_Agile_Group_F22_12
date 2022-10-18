const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
// const { all } = require('../routes/doctors');
const doctors = mongoCollections.doctors;
const path = require('path');

//Create
async function create(firstName,lastName,street,city,state,zipCode,phoneNumber,speciality,online_appointment){
	
	try{
	    const doctorCollection = await doctors();
	    const newDoctor = {
		    First_Name : firstName,
            Last_Name : lastName,
            Address : {'Street' : street, 'City' : city, 'State' : state, 'Zip' : zipCode},
            Ph_No : phoneNumber,
            Speciality : speciality,
            Reviews : [],
            Online_Appointments : online_appointment,
	    };
	    const insertDoctor = await doctorCollection.insertOne(newDoctor);
	    if (insertDoctor.insertedCount === 0) {
		    throw `Error while adding ${newDoctor}`;
	    }   
	    return await get(doctorId);
	    }catch(e){
	    throw e;
	}
}

//Get All
async function getAll() {
	const doctorCollection = await doctors();
	const allDoctors = await doctorCollection.find({}).toArray();
	return allDoctors;
}

	module.exports={
		create,
		getAll
	}