import { View, StyleSheet, ToastAndroid, Image } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';

export default function IncomesScreen(){

return (
     
    <View style={styles.container}>
      <View style={styles.coning}>

        <Image
            style={styles.img}
            source={require('../../../../assets/in.png')}
        />
      </View>
    <Text style={styles.title}>Ingresa Tus Gastos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff', 
  },
  coning: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  img:{
    width: 150,
    height: 150,
    marginBottom:50,
    justifyContent: 'center',
    shadowColor: "#ccc",
    shadowOpacity: 0.8,
  },
});