const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text:{ type:String, required:true },
    isDone:{ type:Boolean, default:false },
    owner:{ type:Types.ObjectId, ref:'User' },
})

module.exports = model('Todo',schema);
