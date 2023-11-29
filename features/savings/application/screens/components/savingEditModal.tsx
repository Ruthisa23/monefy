import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Saving from '../../../domain/entities/savings';
import { EditSavingProvider, useEditSavingState } from '../../providers/editSavingProvider';
import React, { useEffect} from 'react';

interface SavingEditViewProps {

    savingEdit: Saving,
    onSaved: Function,
    isVisible: boolean;
    closeModal: Function;
}

const EditSavingModal: React.FC<SavingEditViewProps> = ({ 
    savingEdit,
    onSaved,
    isVisible, 
    closeModal,
}) => {

    const { 
        loading,
        saved, 

        saving, 

        setSavingProp, 
        saveSaving,
        setSaving,
    } = useEditSavingState();

    //al recibir el usuario a editar, pasarlo al proveedor de estado

    useEffect(() => {
        setSaving(savingEdit)
    }, [savingEdit]);



    return (
        <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
            <Text style={styles.info}>Actualizar Ingreso</Text>

            <View style={styles.inputView}>
            <TextInput style={styles.inputText}
                placeholder="Escribe aqui"
                placeholderTextColor="#808080"
                value={saving?.description || ''}
                onChangeText={(text) => {
                    setSavingProp('name', text);
                }}
                textContentType="name"
                />
            </View>

            <View style={styles.buttonContainer}>
            
            <TouchableOpacity onPress={() => saveSaving(onSaved)}>
                <Button style={styles.button} buttonColor='#f45572' >
                    <Icon name="check" size={20} color="white" /> 
                </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeModal(null)}> 
                <Button style={styles.button} buttonColor='#6a9eda'>
                    <Icon name="close" size={20} color="white" /> 
                </Button>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
    };

const EditSavingScreen = (props: SavingEditViewProps) => (
        <EditSavingProvider>
          <EditSavingModal {...props} />
        </EditSavingProvider>
);

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    
},
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
},
button: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8

},
info: {
    marginBottom: 2,
    textAlign: "center",
    color: 'black',
    fontSize: 16,
    marginTop: 25,
},
inputView: {
  width: "80%",
  marginTop: 10,
  backgroundColor: "#fff", // Fondo blanco
  borderRadius: 10,
  height: 50,
  justifyContent: "center",
  padding: 15, // Reducido el relleno
  shadowColor: "#000", // Sombra
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // Sombra para plataformas Android
},
inputText: {
  textAlign: 'center',
  alignContent: 'center',
  height: 50,
  color: "#333", // Texto oscuro
},

});


export default EditSavingScreen;
