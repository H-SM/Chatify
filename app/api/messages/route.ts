import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherClient, pusherServer } from "@/app/libs/pusher";

export async function POST(
    request : Request
){
    try{ 
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
        } = body;

        if(!currentUser?.id || !currentUser?.email ) {
            return new NextResponse("Unautherized" , { status : 401})
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    }
                },
                sender: { 
                    connect: {
                        id: currentUser.id,
                    }
                },
                seen:{
                    connect: { 
                        id : currentUser.id,
                    }
                }
            },
            include: { 
                seen: true,
                sender: true,
            }
        
        });

        const updateConversation = await prisma.conversation.update({
            where: { 
                id: conversationId
            },
            data : {
                lastMessageAt: new Date(),
                messages: { 
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include:{
                users: true,
                messages:{
                    include: {
                         seen: true,
                    }
                }
            }
        });

        // PUSHER OF CONERSATION & MESSAGE ON THE SERVER
        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = updateConversation.messages[updateConversation.messages.length - 1];

        updateConversation.users.map((user) =>  {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        });

        return NextResponse.json(newMessage);

    }catch(e: any){
        console.log(e, "ERROR_MESSAGE!")
        return new NextResponse('Internal Error', { status : 500})
    }
}