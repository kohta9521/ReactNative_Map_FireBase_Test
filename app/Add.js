import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native';
import { firebase } from '../config';

const Home = () => {
  const todoRef = firebase.firestore().collection('newData');
  const [addData, setAddData] = useState('');
  const [latestData, setLatestData] = useState('');

  // add a new field
  const addField = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  // get the latest data from Firestore
  const getLatestData = () => {
    todoRef
      .orderBy('createdAt', 'desc') // order by timestamp in descending order
      .limit(1) // limit to only 1 document (the latest one)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // check if there is data
          const latestDoc = querySnapshot.docs[0].data();
          setLatestData(latestDoc.heading);
        } else {
          // no data found
          setLatestData('');
        }
      })
      .catch((error) => {
        console.error('Error getting latest data: ', error);
      });
  };

  useEffect(() => {
    getLatestData();
  }, []); // Run once on component mount

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Add some text"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          multiline={true}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addField}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.latestDataContainer}>
        <Text style={styles.latestDataTitle}>Latest Data:</Text>
        <Text style={styles.latestData}>{latestData}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'gray',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  latestDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  latestDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  latestData: {
    fontSize: 14,
  },
});

export default Home;
