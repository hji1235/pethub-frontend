import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function Layout() {
  return (
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: '대문 페이지' }} />
          <Stack.Screen name="(auth)/login" options={{ title: '로그인' }} />
          <Stack.Screen name="(main)/home" options={{ title: '홈' }} />
        </Stack>
      </AuthProvider>
  );
}
