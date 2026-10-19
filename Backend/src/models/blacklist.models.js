const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"]
    }
},{
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const tokenBlacklistModel = mongoose.model('blacklistToken', blacklistTokenSchema);

module.exports = tokenBlacklistModel;