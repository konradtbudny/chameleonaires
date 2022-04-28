import {useContext} from 'react'
import AuthContext from '../components/AuthContext'

const useAuth = () => {
    const {user, setUser, token, setToken,isLoggedIn, setIsLoggedIn,products,orders} = useContext(AuthContext)

    return {user, setUser, token, setToken,isLoggedIn,setIsLoggedIn,products,orders}
}

export default useAuth
