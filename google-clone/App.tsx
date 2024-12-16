import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';
import {AuthProvider} from './context/AuthContext';

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: {fontFamily: 'Roboto-Regular'},
    medium: {fontFamily: 'Roboto-Medium'},
    light: {fontFamily: 'Roboto-Light'},
    thin: {fontFamily: 'Roboto-Thin'},
  },
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView>
        <AuthProvider>
          <View style={styles.safeArea}>
            <AppNavigator />
          </View>
        </AuthProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
