import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SavingCard from './components/incomesCard';

//import { SavingsProvider, useSavingsState } from '../providers/SavingsProvider';
import { SavingsProvider, useSavingsState } from '../providers/incomesProvider'; //la ultima carpeta no se llama asi, error y no error

import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Cambia MaterialIcons por el conjunto de íconos que desees usar


import AddSavingScreen from './components/addIncomeScreen';


import EditSavingScreen from './components/incomeEditModal';

const SavingsScreenView = () => {

  const { 
    savings,
    loading,
    savingSelected,

    //actions
    getSavings,
    setSavingSelected,
    onUpdateSaving,
   } = useSavingsState();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderCards = () => {
    if(!savings)
    {
      return null;
    }
    
    return savings?.map((saving) => (
      <SavingCard 
      key={`saving${saving.id}`} 
      saving={saving} 
      onEdit={setSavingSelected}
      />
      )
    );
  }

  useEffect(() => {
    getSavings();
  }, []);

    return (
    <ScrollView>

    <View style={styles.buttonContainer}>
      <Button style={styles.button} buttonColor='#6a9eda' mode="contained" onPress={toggleModal}>
          <Icon name="add" size={25} color="white" />
      </Button>
    </View>
   
      <View style={styles.container}>
      
      {renderCards()}

    
      </View>
      
      <AddSavingScreen 
      isVisible={isModalVisible} 
      closeModal={toggleModal}
      />

      {!!savingSelected ? (

        <EditSavingScreen
        savingEdit={savingSelected}
        isVisible={!!savingSelected}
        onSaved={onUpdateSaving}
        closeModal={setSavingSelected}
        />

      ) : null }
      
      
  
    </ScrollView>
  );
}

const IncomesScreen = (props: any) => (
  <SavingsProvider>
    <SavingsScreenView {...props} /> 
  </SavingsProvider>
)


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection:'row'
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: 'auto',
    height: 70,
    justifyContent:'center'

  }

});

export default IncomesScreen;
