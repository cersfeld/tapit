import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createHighscoreEntry } from '../../store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class AddHighscore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    saveHighscore = () => {
        createHighscoreEntry(this.state.name, this.props.secondsLeft).then(() => {
            this.props.onHighscoreSaved();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{`Sie hatten ${this.props.secondsLeft} Sekunden übrig. Glückwünsch!`}</Text>
                <TextInput
                    style={{ height: 40, width: '90%' }}
                    placeholder="Ihr Name"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <Button
                    title="Speichern"
                    onPress={this.saveHighscore}
                    disabled={this.state.name.length < 2}
                />
            </View>
        );
    }
}

AddHighscore.propTypes = {
    onHighscoreSaved: PropTypes.func.isRequired,
    secondsLeft: PropTypes.number,
};
