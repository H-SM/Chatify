import getConversationById from "@/app/actions/getConversationsById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/header";
import Body from "./components/body";
import Form from "./components/Form";


interface IParams {
    conversationId : string,
};

const conversationId = async ({ params } : {params : IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if(!conversation){
        return (
            <div className="
                lg:pl-80
                h-full
            ">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
            </div>
        )
    }


    return ( 
        <div className="
            lg:pl-80
            h-full
        ">
            <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
            <Body/>
            <Form/>
            </div>
        </div>
    )
};

export default conversationId;

