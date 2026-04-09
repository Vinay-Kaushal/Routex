import mongoose, {Document , Schema} from "mongoose";

export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
    googleId: string; 
}

const userSchema = new Schema<IUser>({
    name : String,
    email: {type:String, unique:true},
    password: String,
    googleId: { type: String, required: true, unique: true },
});


export default mongoose.model<IUser>("User" , userSchema);