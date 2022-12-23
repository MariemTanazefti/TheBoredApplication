import { View, Text,FlatList ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import { openDatabase } from 'expo-sqlite';
var db= openDatabase({name:'example.db'})

const LikeCitation = () => {
    const [data,setData]=useState([])
    const [isLoading, setLoading] = useState(true);
    const isFocused = useIsFocused()
    const [activity,setActivity]=useState("");
    const [type,setType]=useState("");
    const [participants,setParticipants]=useState("");
    const [price,setPrice]=useState("");
    const [link,setLink]=useState("");
    const [key,setKey]=useState("");
    const [accessibility,setAccessibility]=useState("");

    const viewData = () => {
 
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM data',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp);
          }
        );
      });
   
    }
      useEffect(() => {
        viewData();
      }, []);

      

  return (
    <View style={{ flex: 1, padding: 24 }}>
       {isLoading ? <ActivityIndicator /> : (
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.userItem}>
                    <Text>hello</Text>

              <Text style={styles.itemText}>activity:{item.activity}</Text>
              <Text style={styles.itemText}>type: {item.type}</Text>
              <Text style={styles.itemText}>participants{ item.participants}</Text>
              <Text style={styles.itemText}>price: {item.price}</Text>
              <Text style={styles.itemText}>link: {item.link}</Text>
              <Text style={styles.itemText}>key: {item.key}</Text>
              <Text style={styles.itemText}> accessibility{item.accessibility}</Text>




              </View>
          )}}
          />
       )}
   
    
    </View>
  )
}

export default LikeCitation