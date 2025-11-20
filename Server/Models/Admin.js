const { Schema, model } = require("mongoose");
const { hashSync, compareSync } = require("bcrypt");

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

AdminSchema.methods.comparePassword = function (password) {
    return compareSync(password, this.password)
}cm

AdminSchema.pre("save", function (next) {
    if (this.isModified) {
        this.password = hashSync(this.password, 10);
    }
    next();
})

module.exports = model("Admins", AdminSchema);