'use client';

import AvatarGroup from "@/app/components/AvatarGroup";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}
const Header : React.FC<HeaderProps>= ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation);

    const [drawer ,setDrawer]= useState(false);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => { 
        if(conversation.isGroup){
            return `${conversation.users.length} members`;
        }

        return isActive ? "Online" : "Offline"; 
    },[conversation, isActive]);


    return ( 
        <>
        <ProfileDrawer 
            data={conversation} 
            isOpen={drawer} 
            onClose={() => setDrawer(false)}
        />
        <div className=" 
            bg-white
            w-full
            flex
            border-b-[1px]
            sm:px-4
            py-3
            px-4
            lg:px-6
            justify-between
            items-center
            shadow-sm
        ">
            {/* mobile navbar here */}
            <div className="
                flex gap-3 items-center
            ">
                <Link 
                className="
                    lg:hidden
                    block
                    text-sky-500
                    hover:text-sky-600
                    transition
                    cursor-pointer
                "
                href="/conversations">
                    <HiChevronLeft size={32}/>
                </Link>
                {conversation.isGroup ? ( 
                    <AvatarGroup users={conversation.users}/>
                ):(
                    <Avatar user={otherUser}/>
                )}
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal 
                size={32} 
                onClick={() => setDrawer(true)}
                className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
            />
        </div>
        </>
    )
}
export default Header;