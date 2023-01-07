import { View, Text,FlatList ,ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'


import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }

    const db = SQLite.openDatabase("example.db");
    return db;
}

const db = openDatabase();

const LikeCitation = () => {
    const [data,setData]=useState([])
    const [isLoading, setLoading] = useState(true);
    const isFocused = useIsFocused()
    const [activity,setActivity]=useState("");


    const getData = () => {
      db.transaction(
          (tx) => {
              tx.executeSql("select * from citations", [], (_, { rows }) =>
              setData(rows._array)
              );
          },
      );
    
  }  
  const deleteData=(id)=>{
    db.transaction(
      tx => {
        tx.executeSql(`delete from citations where id = ?;`, [id]);
      }, null, getData
    )    

  }
    useEffect(() => {
      getData()
      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS citations (id INTEGER PRIMARY KEY AUTOINCREMENT, activity VARCHAR(255))')
      });
      setLoading(false); 
     
  }, []);


  
  if (data === null || data.length === 0) {
    return null;
}

      

  return (
    <SafeAreaView style={styles.container} >
    
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
          <Text style={styles.itemName}>{item.activity}</Text>
          <TouchableOpacity style={styles.Deletebutton} onPress={() => deleteData(item.id)}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 15, fontWeight: "150", }} > Delete</Text>
        </TouchableOpacity>
          </View>
          
         
        )}
        />
    
   
    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: '3%'
  },
   itemContainer: {
    borderWidth: 1,
    borderColor: "#b556b6",
    marginTop: 15
  },
    itemName: {
    fontWeight: "bold",
    padding: '3%',
    fontSize: 22,

  },
  Deletebutton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "30%",
    height: 30,
    marginTop: 5,
    marginRight: 50,


  },
})

export default LikeCitation