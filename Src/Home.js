import {View, Text, StyleSheet, Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

//function to open data base
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

const Home = ({navigation}) => {
    const [data,setData]=useState([])
    const [isLoading, setLoading] = useState(true);
    const [activity,setActivity]=useState("");

     


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
        tx.executeSql('CREATE TABLE IF NOT EXISTS citations (id INTEGER PRIMARY KEY AUTOINCREMENT, activity VARCHAR(255))')
      });
      setLoading(false); 
     }, []);
    
      const addFavoriteData = () => {
          db.transaction(
              (tx) => {
                  tx.executeSql("insert into citations (activity) values (?)", [data.activity]);
                  tx.executeSql("select * from citations", [], (_, { rows }) =>
                      console.log(JSON.stringify(rows))
                  );
              },
          );
        
      }  
    
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="smileo" size={40} color="#5b3a70" />
      <View style={styles.bodyHome}>
      <Text style={styles.data}>{data.activity}</Text>
     
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
        //marginTop:"30%",
        fontSize:50
        
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