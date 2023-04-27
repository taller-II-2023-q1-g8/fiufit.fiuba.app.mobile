import {
    View,
    Text,
    FlatList,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import React, {useEffect, useState} from "react";
import { scrollviewStyle, styles } from "./styles";
import SearchUsers from "./layout";
import {texts} from "../../texts";
import TextField from "../../components/Fields/TextField";
import {emailFieldType, textFieldType} from "../../components/Fields/constants";

export default function SearchUsersScreen({navigation}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [search, setSearch] = useState("");

    const fetchData = async (search) => {
        const response = await fetch(
            "https://api-gateway-k1nl.onrender.com/user/usernames?prefix="+ search,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
            }
        );
        const json = await response.json();
        console.log(json.message)
        setData(json.message);
        setLoading(false);
        setVisible(false)
    };

    const handleSearchPress = async () => {
        fetchData(search)
    };

    const Item = ({title}) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log(title)}
        >
            <View style={styles.usernameContainer}>
                <Text style={styles.username}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#000000',
                }}
            />
        );
    };
    const fields = [<FlatList
        data={data}
        renderItem={({item}) => <Item title={item} />}
        ItemSeparatorComponent={ItemSeparatorView}
    />]

    const handleOnSearchChange = (search) => setSearch(search);

    const searchTextfield = [<TextField
        keyboardType={textFieldType}
        onChangeText={handleOnSearchChange}
        placeholder={texts.Fields.searchUsersPlaceholder}
    />,]

    return (
        <SearchUsers
            userlist={fields}
            searchTextField={searchTextfield}
            handleSearchPress={handleSearchPress}
        />
    );
}

