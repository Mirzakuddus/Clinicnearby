
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');


const doctorSchema=new mongoose.Schema
({
    clinicName:{ type:String, required:true},
    email:{ type:String, required:true, unique:true},
    phone:{ type:String, required:true},
    licenseNumber:{ type:String, required:true},

    password:{ type:String, required:true,minLength:[8, 'Password must be at least 8 characters long']},
    confirmPassword:{ type:String, required:true,minLength:[8, 'Password must be at least 8 characters long']}


})
doctorSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10);
        this.confirmPassword= await bcrypt.hash(this.confirmPassword, 10);
    }
    next();
});
doctorSchema.methods.generateToken= function () {
    const token=jsonwebtoken.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}
doctorSchema.methods.comparePassword=async function(password){
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;