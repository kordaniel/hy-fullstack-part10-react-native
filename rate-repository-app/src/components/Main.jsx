import { Platform, StyleSheet, Text, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import Constants from 'expo-constants';

import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import SignIn from './SignIn';
import SignUp from './SignUp';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const WhatIsMyPlatform = () => {
  return (
    <>
      <Text>Your platform is: {Platform.OS}</Text>
      <Text>Version: {Platform.Version}</Text>
      <Text>Env: {Constants.expoConfig.extra.env}</Text>
      <Text>Apollo URI: {Constants.expoConfig.extra.apolloUri}</Text>
    </>
  );
}

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <WhatIsMyPlatform />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository">
          <Route path=":repositoryId" element={<RepositoryView />} />
        </Route>
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
