import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getAccessToken, removeAccessToken } from '../utils/storage';
import { refreshAccessToken } from '../api/auth';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                let token = await getAccessToken();

                if (!token) {
                    // 액세스 토큰이 없으면 리프레시 토큰을 이용한 갱신 시도
                    const refreshed = await refreshAccessToken();
                    if (refreshed) {
                        router.replace('/home'); // 갱신 성공 시 홈 이동
                        return;
                    } else {
                        await removeAccessToken();
                        setLoading(false); // 리프레시 실패 시 로그인 화면 표시
                    }
                } else {
                    router.replace('/home'); // 토큰이 있으면 홈 이동
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패:', error);
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text>로그인 상태 확인 중...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>펫 허브에 오신걸 환영합니다!</Text>
            <Button title="로그인하기" onPress={() => router.push('/login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
