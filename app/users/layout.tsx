import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

export default async function UsersLayout({
    children
}: { 
    children: React.ReactNode;
}){
    const users = await getUsers();
    console.log(users);
    return(
        // @ts-ignore
        <Sidebar>
            <div className="h-full">
                <UserList items={users}/>
                {children}
            </div>
        </Sidebar>
    )
}