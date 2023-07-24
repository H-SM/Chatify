"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface bodyProps { 
    initialMessages : FullMessageType[]
}
const Body : React.FC<bodyProps>= ({
    initialMessages
}) => {
    const [messages, setMessages] =useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(()=> {
        axios.post(`/api/conversations/${conversationId}/seen`);
    },[conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId); //listen to conversationId channel 
        bottomRef?.current?.scrollIntoView();

        // PUSHER OVER THE CLIENT SIDE & followed by the function abt what to do over finding such a connection aka a new message in the conversation
        const messageHandler = (message: FullMessageType) => {
            // npm install lodash -> to simplify a few comparisons 
            // npm install -D @types/lodash 
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
                //is there a message of the id with that message (prevents falsy multiuploads)
                if(find(current, { id: message.id})){
                    return current;
                }
                return [...current , message];
            });

            bottomRef?.current?.scrollIntoView();
        }
        pusherClient.bind('messages:new', messageHandler);

        //unbound or unbid the client connection
        return ()  => { 
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
        }
    },[conversationId])
    return ( 
        <div className="
            flex-1 overflow-y-auto
        ">
            {messages.map((m, i) => (
                <MessageBox
                isLast={i === messages.length-1}
                key={m.id}
                data={m}
                />
            ))}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    )
}
export default Body;