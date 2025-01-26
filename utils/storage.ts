import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAccessToken = async (token: string) => {
    await AsyncStorage.setItem('accessToken', token);
};

export const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

export const removeAccessToken = async () => {
    await AsyncStorage.removeItem('accessToken');
};
