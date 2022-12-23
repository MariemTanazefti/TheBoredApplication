import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { openDatabase } from 'expo-sqlite';
var db= openDatabase({name:'example.db'})


const Home = ({navigation}) => {
    const [data,setData]=useState([])
    const [isLoading, setLoading] = useState(true);
    const [activity,setActivity]=useState("");
    const [type,setType]=useState("");
    const [participants,setParticipants]=useState("");
    const [price,setPrice]=useState("");
    const [link,setLink]=useState("");
    const [key,setKey]=useState("");
    const [accessibility,setAccessibility]=useState("");
     


    const GetData = async () => {
        try {
         const response = await fetch('https://www.boredapi.com/api/activity');
         const json = await response.json();
         setData(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
   
     useEffect(() => {
       GetData();
        db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, activity VARCHAR(255), type VARCHAR(255), participants INTEGER, price INTEGER, link VARCHAR(255), key INTEGER, accessibility INTEGER)')
      });
  
     /*  db.transaction(tx => {
        tx.executeSql('SELECT * FROM data', null,
          (txObj, resultSet) => setData(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });  */
  
      setLoading(false); 
     }, []);
    
      const addFavoriteData = () => {
        db.transaction(function (tx) {
          console.log("hello")
          tx.executeSql('INSERT INTO data (activity,type,participants,price,link,key,accessibility) values (?,?,?,?,?,?,?)', 
          [activity,type,participants,price,link,key,accessibility],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert('Data Inserted Successfully....');
            } 
            else alert('Failed....');
          }
        );}
          )
        
      }  
    
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="smileo" size={40} color="#5b3a70" />
      <View style={styles.bodyHome}>
      <Text style={styles.data}>activity: {data.activity}</Text>
      <Text style={styles.data}>type: {data.type}</Text>
      <Text style={styles.data}>participants: {data.participants}</Text>
      <Text style={styles.data}>price: {data.price}</Text>
      <Text style={styles.data}>link: {data.link}</Text>
      <Text style={styles.data}>key: {data.key}</Text>
      <Text style={styles.data}>accessibility: {data.accessibility}</Text> 
     
      </View>
      <View style={styles.footer}>
      <Icon  name="closecircleo" size={40} color="#FF5E51" onPress={GetData}/>
      <Icon  name="star" size={30} color="#07A6FF" onPress={() => navigation.navigate("LikeCitation")} />
      <AntDesign name='hearto' size={40} style={{ color: "#00D387" }} onPress={addFavoriteData }  />

      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
      flexDirection: "column",
      padding: '2%', 
    },
    icon:{
        textAlign: 'center'

    },
    bodyHome:{
        backgroundColor:"#D9D9D9",
        //opacity:'40%',
        height:'70%',
        marginTop:'7%'
    },
    data:{
        textAlign:'center',
        //marginTop:"30%"
    },
    footer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:"5%",
        marginLeft:"25%",
        marginRight:'25%'
    },
    itemContainer: {
     
        marginTop: 15
      },
})

export default Home