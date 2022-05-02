import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Song = (props:any) =>{
    const[songid,setSongid] = useState()
    const navigation = useNavigation();
    const solicitud_detallada = async(song_id:any) => {
        var respuesta = await fetch(`http://127.0.0.1:5000/songDetails/${song_id}`);
        setSongid(await respuesta.json())
    }
    useEffect (()=> {
        solicitud_detallada(props.id)
    },[solicitud_detallada]);

    return(
        <View>
            <Text>La cancion numero {props.id} es:</Text>
            <Button
                title={props.nombre}
                onPress={() => {
                    console.log(songid)

                    console.log(songid[0].name)
                    navigation.navigate('Detalle', {nombreCancion: songid[0].name, nombreAutor: songid[0].author})

                }}
            />
        </View>
    )
}

export default function App() {
  return(
      <NavigationContainer linking={{enabled: true}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
              name="Principal"
              component={Principal}
          />
          <Stack.Screen
              name="Detalle"
              component={Detalle}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const Principal = ({navigation} : any) =>{

  const[datos, setDatos] = useState();

  const solicitud = async() => {
    var respuesta = await fetch("http://127.0.0.1:5000/");
    setDatos(await respuesta.json())
  }

  solicitud();

  return(
      <View style={styles.container}>
        <Text> Canciones que le gustan a Félix y Ortiz </Text>
          <FlatList
              data={datos}
              renderItem={({item} : any) =>
                  <Song
                      nombre={item.name}
                      id={item.id}
                      navigation={navigation}
                  />
                }
          />
        <StatusBar style="auto"/>
      </View>
  )

}

const Detalle = ({navigation, route} : any) =>{
  return(
    <View style={styles.container}>
        <Text> Nombre de la canción: {route.params.nombreCancion}  </Text>
        <Text> Nombre del autor: {route.params.nombreAutor}  </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
