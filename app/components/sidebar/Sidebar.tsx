import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import MobileFooter from "@/app/components/sidebar/MobileFooter";

async function Sidebar({ children}: {
    children : React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    return ( 
        <div className="h-full">
            {/* npm install next-superjson-plugin */}
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar