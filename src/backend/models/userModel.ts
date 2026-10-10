import mongoose, { Schema } from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { generateUserToken } from "../services/token.js";

interface LoginCredentials {
    email: string;
    password: string;
}

export interface userPayload {
    name: string,
    email: string
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
}, { timestamps: true });

userSchema.pre('save', function () {
    if (!this.isModified("password")) return;

    const salt = randomBytes(16).toString('hex');
    this.password = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');
    this.salt = salt;
});

userSchema.static('generateAndReturnToken', async function ({ email, password }: LoginCredentials) {
    const user = await this.findOne({ email });
    if (!user) throw new Error(`User with email ${email} does not exist`);

    const salt = user.salt;
    if (!salt) throw new Error("User password salt is missing");

    // now match with the provided password
    const providedPasswordHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex'); // returns the password as a hex string

    if (providedPasswordHash !== user.password)
        throw new Error("Incorrect password");

    const token = generateUserToken(user);
    return token; // token goes to the function caller, i.e the signin route

})

export const User = mongoose.model('user', userSchema);