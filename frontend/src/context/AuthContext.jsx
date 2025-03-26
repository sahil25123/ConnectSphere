import { Children, createContext, useContext } from "react";

export const AuthContext = createContext();



const client = axios.create({
    baseURL: "http://localhost:5000/api/v1/users",

})

export const AuthProvider = ({Children})=>
    {
    const authContext = useContext(AuthContext)

    const [userData, setUserData] =  useContext(authContext);

    const handleRegister = async (name. username, email, password)=>{
        try {
            let request  = await client.post("/register",{
                name: name, 
                username = username, 
                password = password, 
            } )
            if (request.status === httpStatus.CREATED){
                return request.data.manage;
            }
        }
        catch(err){
            throw err;
        }
    }

    const router = useNavigate()

    const data = {
        userData, setUserData , handleRegister
    }
    return (
        <AuthContext.Provider value = {data}>
            {Children}

        </AuthContext.Provider>
    )