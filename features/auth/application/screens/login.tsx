import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, FC  } from "react";

import {Button, StyleSheet, TextInput, View, Text, Image } from "react-native";

import firebaseApp from '../../../../config/database/firebase';

type Props = {
    navigation: any,
}

const LoginScreen :FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
   
   const onLogin = () => {
       const auth = getAuth(firebaseApp);

        //autenticar po email y contrasena
        signInWithEmailAndPassword(auth, email.toLocaleLowerCase(), password)
        .then((userCredential) => {
            console.log(userCredential.user);
            console.log("Usuario autenticado");
            navigation.replace('Savings')
        })
        .catch((error) => {
            console.log(error.message);
            console.log(error);  
        });
   }

    return (
        <View style={styles.container} >
            <Image
                source={require('../../../../assets/adaptive-icon.png')}
                style={styles.backgroundImage}
            />
            <Text style={styles.title}> Ingresa a tu cuenta </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setpassword(text)}
                textContentType="password"
            ></TextInput>
            
            <Button
                title="Ingresar"
                onPress={onLogin}
            />
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 128, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60,
      fontSize: 22,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        backgroundColor: 'white', // Cambiar color de fondo del input
        padding: 10,
        width: '80%', // Ancho al 80% del contenedor
        maxWidth: 300, // Ancho máximo del cuadro de texto
    },
    backgroundImage: {
        flex: 1,
        width: '50%', // Opcional: Ancho al 100% del componente padre
        height: '50%', // Opcional: Alto al 100% del componente padre
        resizeMode: 'contain', // Ajusta cómo la imagen se redimensiona dentro del componente
        marginBottom: 60, // Ajusta el margen inferior de la imagen
         marginTop: 80,
    },
});

export default LoginScreen; 