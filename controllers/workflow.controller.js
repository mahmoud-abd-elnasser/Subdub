import {serve} from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve( async (ctx) => {
    const { subscriptionId } = ctx.requestPayload
    const subscription = await fetchSubscription(ctx, subscriptionId)

    if(!subscription || subscription.status !== 'Active') return

    const renewalDate = dayjs(subscription.renewalDate)
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`)
        return
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(ctx, `Reminder-${daysBefore} days before`, reminderDate)

            // Extract ONLY what the email sender actually needs to avoid circular JSON loops
            const emailData = {
                email: subscription.user.email,
                name: subscription.user.name,
                planName: subscription.name, // or whatever your field is called
                renewalDate: subscription.renewalDate
            }

            await triggerReminder(ctx, `${daysBefore} days before reminder`, emailData)
        } }

},{
    baseUrl: `${process.env.SERVER_URL || "http://localhost:3000"}`
}
)

const fetchSubscription = async (ctx, subscriptionId) => {
    return await ctx.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email').lean()
    })
}

const sleepUntilReminder = async (ctx, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`)
    await ctx.sleepUntil(label, date.toDate())
}

const triggerReminder = async (ctx, label, subscription) => {
    return await ctx.run(label, async ()=>{
        console.log(`Triggering ${label} reminder`)
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}

