import {useContext} from 'react'
import AuthContext from '../components/AuthContext'

// const context = useContext(AuthContext)

const useAuth = () => {
    const {user, setUser, token, setToken,isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

    return {user, setUser, token, setToken,isLoggedIn,setIsLoggedIn}
}

export default useAuth
