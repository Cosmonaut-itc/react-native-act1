import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Song = (props:any, {navigation}:any) =>{
    const[songid,setSongid] = useState(1)

    const solicitud_detallada = async(song_id:any) => {
        var respuesta = await fetch("http://127.0.0.1:5000/songDetails/${song_id}");
        setSongid(await respuesta.json())
    }

    return(
        <View>
            <Text>La cancion numero {props.id} es:</Text>
            <Button
                title={props.nombre}
                onPress={() => {
                    navigation.navigate("Detalle")
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
        <Text> Nombre de la canción: {route.params.nombreDato} </Text>
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
