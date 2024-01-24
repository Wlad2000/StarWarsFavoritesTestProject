import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CharacterDetails = ({ route }) => {
    const { character } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.tableRow}>
                <Text>Name:</Text>
                <Text>{character.name}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Height:</Text>
                <Text>{character.height}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Mass:</Text>
                <Text>{character.mass}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Hair Color:</Text>
                <Text>{character.hair_color}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Skin Color:</Text>
                <Text>{character.skin_color}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Eye Color:</Text>
                <Text>{character.eye_color}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Birth Year:</Text>
                <Text>{character.birth_year}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Gender:</Text>
                <Text>{character.gender}</Text>
            </View>

            <View style={styles.tableRow}>
                <Text>Homeworld:</Text>
                <Text>{character.homeworld}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    }
});

export default CharacterDetails;
