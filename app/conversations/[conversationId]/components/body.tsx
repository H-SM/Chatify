"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

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