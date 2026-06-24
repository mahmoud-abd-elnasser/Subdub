import mongoose from "mongoose";


const subSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Subscription Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'EGP'],
        default: 'USD',
        minLength: 3,
        maxLength: 3
    },
    frequency: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        default: 'Monthly',
    },
    category: {
        type: String,
        enum: ['Entertainment', 'Health', 'Education', 'Business', 'Other'],
        default: 'Other',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Apple Pay', 'Google Pay'],
        default: 'Credit Card',
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Expired'],
        default: 'Active',
        required: true
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription Start Date is required'],
        validate: {
            validator: (val) => val <= Date.now(),
            message: 'Subscription Start Date must be in the past'
        },
        default: Date.now
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (val) { return val > this.startDate },
            message: 'Subscription Renewal Date must be in the future'
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true })

subSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency.toLowerCase()])
    }
    if(this.renewalDate < new Date()) {
        this.status = 'Expired'
    }
})

const Subscription = mongoose.model('Subscription', subSchema)

export default Subscription
