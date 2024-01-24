import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const CharactersList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [genderCounts, setGenderCounts] = useState({
        male: [],
        female: [],
        other: [],
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchText, setSearchText] = useState('');

    //DATA
    useEffect(() => {
        axios.get('https://swapi.dev/api/people')
            .then(response => {
                setCharacters(response.data.results); setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleCharacterPress = (character) => {
        const genderArray =
            character.gender.toLowerCase() === 'n/a'
                ? genderCounts.other
                : genderCounts[character.gender.toLowerCase()];

        if (genderArray.includes(character)) {
            setGenderCounts(prevCounts => ({
                ...prevCounts,
                [character.gender.toLowerCase() === 'n/a' ? 'other' : character.gender.toLowerCase()]: genderArray.filter(
                    (char) => char !== character
                ),
            }));
        } else {
            setGenderCounts(prevCounts => ({
                ...prevCounts,
                [character.gender.toLowerCase() === 'n/a' ? 'other' : character.gender.toLowerCase()]: [
                    ...genderArray,
                    character,
                ],
            }))
        };
    }

    const updateGenderCounts = () => {
        setGenderCounts({ male: [], female: [], other: [] });
    };

    const sortedData = useMemo(() => {
        let sortableData = [...characters];
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [characters, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredData = useMemo(() => {
        let filteredData = [];
        if (searchText) {
            filteredData = characters.filter(item => {
                return item.name.toLowerCase().includes(searchText.toLowerCase())
            });
        }
        return filteredData;
    }, [characters, searchText]);


    //item list
    const renderItem = ({ item }) => {
        return (
            <View style={styles.tableRow}>
                <CheckBox
                    style={{ width: 60 }}
                    value={genderCounts[item.gender.toLowerCase() === 'n/a' ? 'other' : item.gender.toLowerCase()].includes(item)}
                    onValueChange={() => handleCharacterPress(item)}
                />
                <TouchableOpacity onPress={() => { navigation.navigate('CharacterDetails', { character: item }) }}>
                    <Text style={styles.tableTextName}>{item.name}</Text>
                </TouchableOpacity >
                <Text style={styles.tableText}>{item.birth_year}</Text>
                <Text style={styles.tableText}>{item.gender}</Text>
            </View>
        );
    }
    //LOADER
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View >
            <View style={styles.tableRow}>
                <Text style={styles.addedCharacterText}>Male: {genderCounts.male.length}</Text>
                <Text style={styles.addedCharacterText}>Female: {genderCounts.female.length}</Text>
                <Text style={styles.addedCharacterText}>Other: {genderCounts.other.length}</Text>
                <Button title="clear" onPress={() => updateGenderCounts()} />
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name..."
                value={searchText}
                onChangeText={(text) => { setSearchText(text) }}
            />
            {filteredData.length <= 0 && searchText.length > 0
                ?
                <View style={styles.errorContainer}>
                    <Text style={styles.tableTextName}>Not Found</Text>
                </View >
                :
                <View style={{ height: 550 }}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableTitle}>ADD</Text>
                        <TouchableOpacity onPress={() => { requestSort('name') }}>
                            <Text style={styles.tableTitleSort}>{`Sort by Name`}</Text>
                        </TouchableOpacity >
                        <Text style={styles.tableTitle}>birth</Text>
                        <Text style={styles.tableTitle}>gender</Text>
                    </View>
                    <FlatList
                        initialNumToRender={5}
                        onEndReachedThreshold={0.3}
                        data={filteredData.length > 0 ? filteredData : sortedData}
                        keyExtractor={(item) => item.name}
                        renderItem={renderItem}
                    />
                </View >
            }
        </View >
    );
};
const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addedCharacterText: {
        backgroundColor: 'beige',
        padding: 10,
        fontSize: 20
    },
    tableTitle: {
        color: 'grey',
        fontWeight: 'bold',
        width: 60
    },
    tableText: {
        color: 'black',
        width: 60
    },
    tableTextName: {
        color: 'black',
        fontWeight: 'bold',
        width: 90
    },
    tableTitleSort: {
        color: 'blue',
        fontWeight: 'bold',
        width: 90
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CharactersList;
