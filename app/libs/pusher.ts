// npm install pusher pusher-js <- after signin pusher and adding details in env

import PusherServer from "pusher";
import PusherClient from "pusher-js";

// export const pusherServer = new PusherServer({ 
//     appId: process.env.PUSHER_APP_ID!,
//     key: process.env.NEXT_PUSHER_KEY!,
//     secret: process.env.PUSHER_SECRET!,
//     cluster: 'ap2',
//     useTLS: true
// });

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "ap2",
    useTLS: true
  });
  

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    {
    cluster: 'ap2',
    }
);

