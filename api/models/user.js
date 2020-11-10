import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required"
    },
    roles: {
        type: Array,
        of: String
    },
    connected: {
        twitch: {
            name: {
                type: String,
                unique: true
            },
            userId: {
                type: String,
                unique: true
            },
            channels: {
                type: Array,
                of: String,
                default: []
            }
        }
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    console.log(JSON.stringify(this))
    next()
})

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model('user', userSchema)