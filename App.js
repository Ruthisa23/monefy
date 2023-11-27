import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './features/auth/application/screens/login';
import NavigationSavi from './components/navigator';

const Stack = createNativeStackNavigator() 


function Stacks(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="Login"
      component={LoginScreen}
      />
      <Stack.Screen
      name="Monefy"
      component={NavigationSavi}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <Stacks/>
    </NavigationContainer>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
