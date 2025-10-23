const {Schema,model}=require('mongoose');

const commentSchema=new Schema({
    body:{
        type:String,
        required:true
    },
    coverUrl:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true})

const Blog=model('blog',blogSchema)

module.exports=Blog;