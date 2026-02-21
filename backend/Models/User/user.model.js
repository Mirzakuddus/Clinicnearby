const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');

const userSchema=new mongoose.Schema
({
    firstName:{ type:String, required:true},
    lastName:{ type:String, required:true},
    email:{ type:String, required:true, unique:true},

    phone:{ type:String, required:true},
    password:{ type:String, required:true,minLength:[8, 'Password must be at least 8 characters long']},
    confirmPassword:{ type:String, required:true,minLength:[8, 'Password must be at least 8 characters long']},
},{ timestamps: true });
userSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10);
        this.confirmPassword= await bcrypt.hash(this.confirmPassword, 10);
    }
    next();
});



userSchema.methods.generateToken= function () {
    const token=jsonwebtoken.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}



userSchema.methods.comparePassword=async function(password){
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
// Doctor Schema registration



const User=mongoose.model('User',userSchema);
module.exports=User
;
