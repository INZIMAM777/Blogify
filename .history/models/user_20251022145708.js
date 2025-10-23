const {Schema,model} = require('mongoose');
const {createHmac, randomBytes} = require('crypto');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImgUrl:{
        type:String,
        default:'/images/default-profile.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }

},{timestamps:true}
)

// Pre-save hook to hash password
userSchema.pre("save", function (next) {
  const user = this;

  // Only hash if password is new or modified
  if (!user.isModified("password")) return next();

  try {
    // Generate 16-byte random salt
    user.salt = randomBytes(16).toString("hex");

    // Hash password with HMAC-SHA256 using salt as key
    const hash = createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");

    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.static('matchPassword',function(email,password){
    const user=this.findOne({email});
    if(!user) return false;

    const hash=createHmac('sha256',user.salt).
})

const User=model('user',userSchema);

module.exports=User;