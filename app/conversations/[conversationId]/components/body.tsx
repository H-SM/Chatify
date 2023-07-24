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

        const messageHandler = (message: FullMessageType) => { 
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
            
                if(find(current, { id: message.id})){
                    return current;
                }
                return [...current , message];
            });

            bottomRef?.current?.scrollIntoView();
        }

        //UPDATE THE SEEN FOR THE MESSAGE REAL TIME
        const updateMessageHandler = (newMessage: FullMessageType) => { 
            setMessages((current) => current.map((currentMessage) => {
                if(currentMessage.id === newMessage.id) { 
                    return newMessage;
                }
                return currentMessage; 
            }))
        }

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('messages:update', updateMessageHandler);

        //unbound or unbid the client connection
        return ()  => { 
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('messages:update', updateMessageHandler);
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