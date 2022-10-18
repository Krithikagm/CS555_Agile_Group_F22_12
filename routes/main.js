const express = require("express");
const router = express.Router();
const mongoCollections=require('../config/mongoCollections');
const usersData = require('../data/main');
const main = mongoCollections.main;
const doctorsData = require('../data/doctors')
const  xss= require('xss'); // Cross Site Scripting


router.get('/',async(req,res)=>{
    if(!req.session.user){
        res.render('landingPage');
        return;
    }else{
        res.redirect('loggedIn');
        return;
    }
});

router.get('/signup', async(req,res)=>{
    if(!req.session.user){
        res.render('signup');
        return;
    }else{
        res.redirect('loggedIn');
        return;
    }
});

router.post('/signup',async(req,res)=>{
    try{
        let fname = xss(req.body.firstName);
        let lname = xss(req.body.lastName);
        let uname = xss(req.body.username);
        let pnumber = xss(req.body.phoneNumber);
        let pass = xss(req.body.password);
        let u_dob = xss(req.body.dob);
        let u_street = xss(req.body.street);
        let u_city = xss(req.body.city);
        let u_state = xss(req.body.state);
        let u_zipcode = xss(req.body.zipCode);
        let u_email = xss(req.body.email);
        rusername=rusername.toLowerCase();
        if(!fname||!lname||!uname||!pnumber||!pass || !u_dob||!u_street||!u_city||!u_state||!u_zipcode || !u_email){
            res.status(400).render('signup',{error:'All inputs must be provided'});
            return;
        }
        if(typeof fname !='string'||typeof lname!='string'||typeof uname !='string'||typeof pnumber!='string'||typeof pass!='string' 
            || typeof u_dob !='string'||typeof u_street!='string'||typeof u_city !='string'||typeof u_state!='string'||typeof u_zipcode!='string' || typeof u_email!='string'){
            res.status(400).render('signup',{error:'All inputs must be a string'});
            return;
        }
        if(fname.length===0 || lname.length===0 || uname.length===0||pnumber.length===0||pass.length===0 
            ||u_dob.length===0 || u_street.length===0 || u_city.length===0||u_state.length===0||u_zipcode.length===0 || u_email.length===0){
            res.status(400).render('signup',{error:'Inputs cannot be empty'});
            return;
        }
        if(fname.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'First Name cannot contain empty spaces'});
            return;
        }
        if(lname.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Last Name cannot contain empty spaces'});
            return;
        }
        if(uname.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Username cannot contain empty spaces'});
            return;
        }
        if(pass.indexOf(' ')>=0) { 
            res.status(400).render('signup',{error:' Password cannot contain empty spaces'});
            return;
        }
        if(u_dob.indexOf(' ')>=0) { 
            res.status(400).render('signup',{error:'Date of birth cannot contain empty spaces'});
            return;
        }
        // if(street.indexOf(' ')>=0) { 
        //    res.status(400).render('signup',{error:'Street cannot contain empty spaces'});
        //    return;    
        //}
        // if(city.indexOf(' ')>=0) { 
        //    res.status(400).render('signup',{error:'City cannot contain empty spaces'});
        //    return;      
        //}
        if(u_state.indexOf(' ')>=0) { 
            res.status(400).render('signup',{error:'State cannot contain empty spaces'});
            return;
        }
        if(u_zipcode.indexOf(' ')>=0) { 
            res.status(400).render('signup',{error:'Zip Code cannot contain empty spaces'});
            return;
        }
        if(u_email.indexOf(' ')>=0) { 
            res.status(400).render('signup',{error:'Email cannot contain empty spaces'});
            return;
        }
        let regExp_p = /^[0-9]*$/
        if(!pnumber.match(regExp_p)){
            res.status(400).render('signup',{error:'Phone Number can only contain Numbers'});
            return;
        }
        if(!u_zipcode.match(regExp_p)){
            res.status(400).render('signup',{error:'Zip code can only contain Numbers'});
            return;
        }
        if(pnumber.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Phone Number cannot contain empty spaces'});
            return;
        }
        if(uname.length < 4){
            res.status(400).render('signup',{error:'Username must be atleast 4 characters long'});
            return;
        }
        if(pass.length < 6){
            res.status(400).render('signup',{error:'Password must atleast have 6 characters'});
            return;
        }
        if(pnumber.length  != 10){
            res.status(400).render('signup',{error:'Phone number must be 10 characters long'});
            return;
        }
        if(u_zipcode.length != 5){
            res.status(400).render('signup',{error:'Zip Code must have 5 characters'});
            return;
        }
        let regExp_specialC = /[^0-9a-z]/gi

        if(uname.match(regExp_specialC)){
            res.status(400).render('signup',{error:'Username cannot contain special characters'});
            return;
        }
        if(pnumber.match(regExp_specialC)){
            res.status(400).render('signup',{error:'Phone Number cannot contain special characters'});
            return;
        }
        if(fname.match(regExp_specialC)){
            res.status(400).render('signup',{error:'First Name cannot contain special characters'});
            return;
        }
        if(lname.match(regExp_specialC)){
            res.status(400).render('signup',{error:'Last Name cannot contain special characters'});
            return;
        }
        if(u_state.match(regExp_specialC)){
            res.status(400).render('signup',{error:'State cannot contain special characters'});
            return;
        }
        let regex_n = /\d/;
        if(fname.match(regex_n)){
            res.status(400).render('signup',{error:'First Name cannot contain numbers'});
            return;
        }
        if(lname.match(regex_n)){
            res.status(400).render('signup',{error:'Last Name cannot contain numbers'});
            return;
        }
        if(u_city.match(regex_n)){
            res.status(400).render('signup',{error:'City cannot contain numbers'});
            return;
        }
        if(u_state.match(regex_n)){
            res.status(400).render('signup',{error:'State cannot contain numbers'});
            return;
        }
        let regexp_on = /^\d+$/;
        if(uname.match(regexp_on)){
            res.status(400).render('signup',{error:'Username cannot contain only numbers'});
            return;
        }
        // Regular Expression for email

        let rege_Email =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        u_email.toLowerCase();
        if(!u_email.match(rege_Email)) { 
            res.status(400).render('signup',{error:'Invalid Email'});
            return;
         }

        // Regular Expression for date of birth

        let regexp_dob = /(0[1-9]|1[0-2])\/(((0|1)[0-9]|2[0-9]|3[0-1])\/((19|20)\d\d))$/;
        var dateString = u_dob;
        if(!dateString.match(regexp_dob)){
            res.status(400).render('signup',{error:'Invalid date of birth'});
            return;
        }
        else {
            var parts = dateString.split("/");
            var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);

            if(parseInt(parts[0]) > 12 || parseInt(parts[0]) < 1) {
                res.status(400).render('signup',{error:'Invalid Month'});
                return;
            } 
            if(parseInt(parts[1]) == 31 && parseInt(parts[0]) == 2 || parseInt(parts[1]) == 31 && parseInt(parts[0]) == 4 || parseInt(parts[1]) == 31 && parseInt(parts[0]) == 6 || parseInt(parts[1]) == 31 && parseInt(parts[0]) == 9 || parseInt(parts[1]) == 31 && parseInt(parts[0]) == 11) {
                res.status(400).render('signup',{error:'Invalid date of birth'});
                return;
            }  
            var dtCurrent = new Date();
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 0) {
                if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                    res.status(400).render('signup',{error:'Invalid date of birth'});
                return;
                }
            }
        }
        const u_signup = await usersData.createUsers(fname,lname,u_dob, u_street,u_city,u_state,u_zipcode,pnumber,u_email,uname,pass);
        if(u_signup){
            res.redirect('/login');
        }
        }catch(e){
            res.status(e.error||500).render('signup',{error:e||'Internal Server Error'});
            return;
    }
});

module.exports=router;