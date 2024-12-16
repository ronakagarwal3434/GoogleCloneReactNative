import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import BottomTabsNavigator from './BottomTabsNavigator';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import VoiceSearchScreen from '../screens/VoiceSearchScreen';
import CameraScreen from '../screens/CameraScreen';
import CropScreen from '../screens/CropScreen';
import ResultsScreen from '../screens/ResultsScreen';

import {SCREEN_NAMES} from '../util/constants';

export default function AppNavigator() {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        initialRouteName={SCREEN_NAMES.MAIN_TABS}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={SCREEN_NAMES.MAIN_TABS}
          component={BottomTabsNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAMES.SEARCH}
          component={SearchScreen}
          options={{
            animation: 'fade',
          }}
          sharedElements={() => {
            return ['searchInput'];
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.SEARCH_RESULTS}
          component={SearchResultsScreen}
          sharedElements={() => {
            return ['searchInput'];
          }}
        />
        <Stack.Screen
          name={SCREEN_NAMES.VOICE_SEARCH}
          component={VoiceSearchScreen}
        />
        <Stack.Screen name={SCREEN_NAMES.CAMERA} component={CameraScreen} />
        <Stack.Screen name={SCREEN_NAMES.CROP} component={CropScreen} />
        <Stack.Screen name={SCREEN_NAMES.RESULTS} component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
