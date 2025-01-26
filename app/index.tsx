import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>환영합니다!</Text>
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
