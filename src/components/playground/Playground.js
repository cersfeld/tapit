import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import IntroCountdown from './IntroCountdown';
import GameWithCountdown from './GameWithCountdown';
import AddHighscore from './AddHighscore';


const PATH_INTRO = 'intro';
const PATH_GAME = 'game';
const PATH_ADD_HIGHSCORE = 'add_highscore';

export default class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: PATH_INTRO,
        };
    }


    onGameFinishedSuccesfully = ({ secondsLeft }) => {
        this.setState({
            secondsLeft,
        });
    }

    navigateToPath = (path) => {
        this.setState({ activePath: path });
    };


    render() {
        const { onPressGoToMenu } = this.props;

        switch (this.state.activePath) {
            case PATH_ADD_HIGHSCORE:
                return (
                    <AddHighscore
                        secondsLeft={this.state.secondsLeft}
                        onHighscoreSaved={onPressGoToMenu}
                    />
                );
            case PATH_GAME:
                return (
                    <GameWithCountdown
                        onGameFinishedSuccesfully={(parameters) => {
                            this.onGameFinishedSuccesfully(parameters);
                            this.navigateToPath(PATH_ADD_HIGHSCORE);
                        }}
                        onGameFinishedWihtoutSuccess={onPressGoToMenu}
                    />
                );
            case PATH_INTRO:
            default:
                return (
                    <IntroCountdown
                        onPressGoToMenu={onPressGoToMenu}
                        onCountdownEnd={() => this.navigateToPath(PATH_GAME)}
                    />
                );
        }
    }
}

Playground.propTypes = {
    onPressGoToMenu: PropTypes.func.isRequired,
};
