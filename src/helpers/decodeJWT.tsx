import { User } from "@/interfaces/User";


export const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c=> "%" + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
        return JSON.parse(jsonPayload);
    
    } catch (error){
        console.error("Error decoding JWT:", error);
        return null;
    }
}
export const getUserFromToken = (token: string): User | null => {
    try {
            const payload= decodeJWT(token);
            if (!payload){
                console.warn("No payload found in token");
                return null;
            }

        
            const user: User ={
                firstName: payload.firstName || "",
                lastName: payload.lastName || "",
                email: payload.email || "",
                token: token,
                role: payload.role || "",
           
            };

            return user;
        }   
        
     catch (error) {
        console.error("Error getting user from token:", error);
        return null;
    }
        
    
}