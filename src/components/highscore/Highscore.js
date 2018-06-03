import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { getHighscores } from '../../store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});


export default class Highscore extends Component {
    constructor(props) {
        super(props);
        this.state = { highscores: [] };
    }

    componentDidMount() {
        getHighscores().then(highscores => this.setState(() => ({ highscores })));
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.props.onPressGoToMenu}
                    title="Zurück"
                />
                <FlatList
                    data={this.state.highscores}
                    renderItem={({ item }) =>
                        <Text style={styles.item}>{`${item.seconds} Sekunden, ${item.playerName}`}</Text>
                    }
                />
            </View>
        );
    }
}

Highscore.propTypes = {
    onPressGoToMenu: PropTypes.func.isRequired,
};
