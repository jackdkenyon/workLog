var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    
    username: { type: String, unique: true },
    hashed_password: String    
     
});
mongoose.model('User', UserSchema);

var WorkLogSchema = new Schema({
    creator_id : {type: Schema.ObjectId, ref: 'User' },
    date: String,
    summary: String,    
});
mongoose.model('WorkLog', WorkLogSchema);
