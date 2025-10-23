const {Schema,model} = require('mongoose');


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
        default:"User"
    }

},{timestamps:true}
)

userSchema.pre("save", function (next) {
  const user = this;

  // Only hash if password is modified or new
  if (!user.isModified("password")) return next();

  try {
    // Generate a 16-byte random salt (hex)
    user.salt = crypto.randomBytes(16).toString("hex");

    // Create HMAC-SHA256 hash using salt as key
    const hash = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");

    // Replace plain password with hash
    user.password = hash;

    next();
  } catch (err) {
    next(err);
  }
});

const User=model('user',userSchema);

module.exports=User;