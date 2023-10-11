//import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
//import { useState } from 'react';
import { View, StyleSheet, ToastAndroid, Image } from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';




export default function CategorysScreen(){
   
    /*const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        const auth = getAuth(firebaseApp);

    //Autenticar por Email y Contraseña.

    signInWithEmailAndPassword(auth, email.toLocaleLowerCase(), password)
    .then((userCredential) => {
        console.log(userCredential.user);
        console.log("Usuario autenticado");
    })
    .catch((error) => {
        console.log(error.message)
        console.log(error)
    })
}*/

return (
    
    <View style={styles.container}>
      <View style={styles.coning}>

        <Image
            style={styles.img}
            source={require('../../../../assets/ca.png')}
        />
      </View>        
    <Text style={styles.title}>Ingresa Una Categoria</Text>
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