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

export default class GameOver extends React.Component {
    render() {
        const { onPressGoToMenu } = this.props;
        return (
            <View style={styles.container}>
                <Text>Sie haben es leider nicht geschafft</Text>
                <Button
                    onPress={onPressGoToMenu}
                    title="Zurück zum Menü"
                />
            </View>
        );
    }
}

GameOver.propTypes = {
    onPressGoToMenu: PropTypes.func.isRequired,
};
