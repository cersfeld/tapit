import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Countdown from '../Countdown';
import Game from './Game';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default class GameWithCountdown extends React.Component {
    render() {
        const { onGameFinishedWithoutSuccess, onGameFinishedSuccesfully } = this.props;
        return (
            <View style={styles.container}>
                <Countdown
                    onCountdownEnd={onGameFinishedWithoutSuccess}
                    seconds={20}
                >
                    {({ secondsLeft }) => (
                        <View style={styles.container}>
                            <Text>{`Noch ${secondsLeft} Sekunden`}</Text>
                            <Text>Klicke die Zahlen in der richtigen Reihenfolge an, von der kleinsten angefangen.</Text>
                            <Game
                                secondsLeft={secondsLeft}
                                onGameFinishedWithoutSuccess={onGameFinishedWithoutSuccess}
                                onGameFinishedSuccesfully={parameters =>
                                    onGameFinishedSuccesfully({ ...parameters, secondsLeft })}
                            />
                        </View>
                    )}
                </Countdown>
            </View>
        );
    }
}

GameWithCountdown.propTypes = {
    onGameFinishedSuccesfully: PropTypes.func.isRequired,
    onGameFinishedWithoutSuccess: PropTypes.func.isRequired,
};
