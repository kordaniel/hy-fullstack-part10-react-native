import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'rate-repository-app-auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(this.#accessTokenKey());
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.#accessTokenKey(), accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.#accessTokenKey());
  }

  #accessTokenKey() {
    return `${this.namespace}:accessToken`;
  }
}

export default AuthStorage;
