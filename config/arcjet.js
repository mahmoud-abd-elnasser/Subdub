import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import {ARCJET_KEY} from "../config/env.js";



const aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:PREVIEW",
                "POSTMAN"
            ],
        }),
        slidingWindow({
            mode: "LIVE",
            interval: 60,
            max: 10,
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
});

export default aj;