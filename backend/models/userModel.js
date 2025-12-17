import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
  minlength: [10, "Phone number must be exactly 10 digits"],
  maxlength: [10, "Phone number must be exactly 10 digits"],
  match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    cartData: {
        type: Object,
        default: {}
    }
},
{
    timestamps: true,
    minimize: false
}
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
