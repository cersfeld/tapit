import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class Home extends React.Component {
    render() {
        const { onPressStartGame, onPressShowHighscore } = this.props;
        return (
            <View style={styles.container}>
                <Text>Willkommen zu TapIt!</Text>
                <Button
                    onPress={onPressStartGame}
                    title="Spiel starten"
                />
                <Button
                    onPress={onPressShowHighscore}
                    title="Highscore anzeigen"
                />
            </View>
        );
    }
}

Home.propTypes = {
    onPressShowHighscore: PropTypes.func.isRequired,
    onPressStartGame: PropTypes.func.isRequired,
};
