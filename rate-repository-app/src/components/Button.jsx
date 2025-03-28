import { Animated, Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import globalStyles from '../globalStyles';
import theme from '../theme';

const styles = StyleSheet.create({
  container: { flexGrow: 1, },
});

const Button = ({
  children,
  onPress,
  bgColor = theme.colors.primary,
  textColor = 'white'
}) => {
  const backgroundColorRef = new Animated.Value(0);
  const handlePress = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };
  const handleRelease = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColor = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: [bgColor, theme.colors.textSecondary],
  });

  const isDisabled = !onPress;

  return (
    <Pressable
      style={styles.container}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={handlePress}
      onPressOut={handleRelease}
    >
      <Animated.View style={[
        globalStyles.button,
        { backgroundColor },
        isDisabled && globalStyles.buttonDisabled
      ]}>
        <Text
          style={globalStyles.buttonText}
          fontSize="subheading"
          fontWeight="bold"
          color={textColor}
          textAlign="center"
        >
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;
