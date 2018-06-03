import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Countdown from '../Countdown';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class IntroCountdown extends React.Component {
    render() {
        const { onPressGoToMenu, onCountdownEnd } = this.props;
        return (
            <View style={styles.container}>
                <Countdown
                    onCountdownEnd={onCountdownEnd}
                    seconds={5}
                >
                    {({ secondsLeft }) => (
                        <View>
                            <Text>{`In ${secondsLeft} Sekunden geht es los!`}</Text>
                            <Button
                                onPress={onPressGoToMenu}
                                title="Zurück zum Menü"
                            />
                        </View>
                    )}
                </Countdown>
            </View>
        );
    }
}

IntroCountdown.propTypes = {
    onCountdownEnd: PropTypes.func.isRequired,
    onPressGoToMenu: PropTypes.func.isRequired,
};
