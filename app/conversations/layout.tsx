import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}){
    const conversations = await getConversations();

    return (
        //@ts-ignore
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations}
                //adding new attributes to the schema eg_ messages go to app/types for the solution
                // interface ConversationListProps {
                //     initialItems : FullConversationType[]
                // }
                // ^ this is the import of it ^ 
                />

                {children}
            </div>
        </Sidebar>
    )
}