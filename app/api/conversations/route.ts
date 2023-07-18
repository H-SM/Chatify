import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request : Request
){
    try{ 
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;

        if(!currentUser?.id || !currentUser?.email ) {
            return new NextResponse("Unautherized" , { status : 401})
        }

        if(isGroup && (!members || members.length < 2 || !name )){
            return new NextResponse('Invalid Data', { status : 400})
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data :  {
                    name,
                    isGroup,
                    users : {
                        connect : [
                        ...members.map((member:{ value : string}) => ({
                            id: member.value
                        })),
                        {
                            id: currentUser.id
                        }
                        ]
                    }
                },
                include: {
                    users: true, //populates the users when we fetch the conversation
                }
            });


            return NextResponse.json(newConversation);
        }

        //single chat logic below -> userId => trying to start a conversation with this user
        const existingConversations =  await prisma.conversation.findMany({
            where : {
                OR: [
                    {
                        userIds: {
                            equals:[currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals:[ userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];

        if(singleConversation){//return the existing query
            return NextResponse.json(singleConversation);
        }

        //no existing chat

        const nextConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect:[
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(nextConversation);

    }catch(e: any){
        return new NextResponse('Internal Error', { status : 500})
    }
}