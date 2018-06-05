import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const createShuffledList = (minValue, maxValue, size) => {
    const result = [];
    for (let i = minValue; i <= maxValue; i++) {
        result.push(i);
    }
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, size);
};


const styles = StyleSheet.create({
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
    buttonLabel: {
        width: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 100,
        height: 100,
    },
});

/* eslint-disable react/no-array-index-key */
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.generateGameConfiguration(1, 99),
            currentIndex: 0,
        };
    }

    generateGameConfiguration = (minValue, maxValue) => {
        const unsortedNumbers = createShuffledList(minValue, maxValue, 9);
        const sortedNumbers = unsortedNumbers.concat().sort((a, b) => (a - b));
        return {
            unsortedNumbers,
            sortedNumbers,
        };
    };


    finishGame = (gameFinisehdSuccesfully) => {
        if (gameFinisehdSuccesfully) {
            this.props.onGameFinishedSuccesfully();
        } else {
            this.props.onGameFinishedWithoutSuccess();
        }
    };

    onNumberButtonClicked = (clickedNumber) => {
        const { currentIndex, unsortedNumbers, sortedNumbers } = this.state;
        const isClickedNumberCorrect = sortedNumbers[currentIndex] === clickedNumber;
        const nextIndex = currentIndex + 1;
        const isLastNumber = nextIndex === sortedNumbers.length;

        if (isClickedNumberCorrect) {
            if (isLastNumber) {
                this.finishGame(true);
                return;
            }
            const nextUnsortedNumbers = unsortedNumbers.map((number) => {
                if (number === clickedNumber) {
                    return null;
                }
                return number;
            });
            this.setState({
                currentIndex: nextIndex,
                unsortedNumbers: nextUnsortedNumbers,
            });
        } else {
            this.finishGame(false);
        }
    }

    render() {
        return (
            <View style={styles.grid}>
                {this.state.unsortedNumbers.map((number, index) => {
                    if (number === null) {
                        return (<View
                            key={`button_${index}`}
                            style={styles.disabledButton}
                        />);
                    }
                    return (
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.onNumberButtonClicked(number)}
                            key={`button_${index}`}
                        >
                            <Text style={styles.buttonLabel} textAlign="center"> {number} </Text>
                        </TouchableHighlight>
                    );
                })}
            </View>
        );
    }
}

Game.propTypes = {
    onGameFinishedSuccesfully: PropTypes.func.isRequired,
    onGameFinishedWithoutSuccess: PropTypes.func.isRequired,
};
