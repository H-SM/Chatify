import { withAuth } from "next-auth/middleware";
//this redirect us to the login scren after log out 
export default withAuth({ 
    pages : {
        signIn: "/",
    }
})

export const config = { 
    matcher :  [ 
        "/users/:path*"
    ]
}