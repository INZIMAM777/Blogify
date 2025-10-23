const {Schema,model}=require('mongoose');

const blogSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    coverUrl:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId
    }
})