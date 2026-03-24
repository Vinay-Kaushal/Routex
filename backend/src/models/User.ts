import mongoose, {Document , Schema} from "mongoose";

export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
}

const userSchema = new Schema<IUser>({
    name : String,
    email: {type:String, unique:true},
    password: String
});


export default mongoose.model<IUser>("User" , userSchema);