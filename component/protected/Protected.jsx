import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function Protected({ children }) {
    const { data: session, status } = useSession();
    const loadingSession = status === 'loading';
    const router = useRouter();
    if (!loadingSession) {
        if (session) {
        } else {
            router.push('/login');
        }
    }
    return !loadingSession && session ? children : <p>Loading...</p>;
}

export default Protected;
