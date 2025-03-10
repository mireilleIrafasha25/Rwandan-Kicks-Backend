import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    Name: {
        type: String,
        required: false,
        message: ["Please enter your Name"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: {
            values: ["buyer", "seller", "admin"],
            message: "Role must be buyer or  seller"
        },
        default: "buyer"
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpires: {
        type: Date,
        required: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Ensure only one admin exists
userSchema.pre("save", async function (next) {
    if (this.role === "admin" && this.isNew) {  // ✅ Only check when creating a NEW admin
        const existingAdmin = await mongoose.model("User").findOne({ role: "admin" });
        if (existingAdmin) {
            const error = new Error("An admin already exists. You cannot create another one.");
            return next(error);
        }
    }
    next();
});


const UserModel = mongoose.model("User", userSchema);
export default UserModel;
