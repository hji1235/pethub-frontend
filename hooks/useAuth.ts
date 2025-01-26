import { loginUser } from '../api/auth';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { setUser } = useAuthContext();

    const handleLogin = async (email: string, password: string) => {
        const success = await loginUser(email, password);
        if (success) {
            setUser({ email });
        }
        return success;
    };

    return { handleLogin };
};
