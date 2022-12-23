import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Home';
import LikeCitation from './Src/LikeCitation';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/> 
        <Stack.Screen name='LikeCitation' component={LikeCitation}/> 
        </Stack.Navigator>
        </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
