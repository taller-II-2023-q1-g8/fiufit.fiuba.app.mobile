import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

export default function CoffeeAutonomous() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Ahora fetchea data de unos cafes, la idea seria
   * x ejemplo que haga un fetch de los perfiles de otros usuarios
   * cuando tocas un boton. */
  /* const [state, dispatch] = useStateValue();
   * mediante eso se tiene acceso al estado global x si se necesitara
   * Ahi deberia estar el usuario actual con sus datos, el token para hacer request a gateway
   * El dispatch es para actualizar el estado de ser necesario */

  const fetchData = async () => {
    const resp = await fetch('https://api.sampleapis.com/coffee/hot');
    const dataResponse = await resp.json();
    setData(dataResponse);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
      {item.title}
    </Text>
  );

  return (
    <View>
      <Text> Fetch API</Text>
      {loading && <Text>Loading..</Text>}
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
