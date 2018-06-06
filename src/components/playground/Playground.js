import PropTypes from 'prop-types';
import React from 'react';
import IntroCountdown from './IntroCountdown';
import GameWithCountdown from './GameWithCountdown';
import AddHighscore from './AddHighscore';
import GameOver from './GameOver';
import {
    PLAYGROUND_INTRO,
    PLAYGROUND_GAME,
    PLAYGROUND_ADD_HIGHSCORE,
    PLAYGROUND_GAMEOVER,
} from '../../constants/pathnames';

export default class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: PLAYGROUND_INTRO,
        };
    }

    onGameFinishedSuccesfully = ({ secondsLeft }) => {
        this.setState({
            secondsLeft,
        });
    }

    navigateToPath = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { onPressGoToMenu } = this.props;

        switch (this.state.activePath) {
            case PLAYGROUND_ADD_HIGHSCORE:
                return (
                    <AddHighscore
                        secondsLeft={this.state.secondsLeft}
                        onHighscoreSaved={onPressGoToMenu}
                    />
                );
            case PLAYGROUND_GAMEOVER:
                return (
                    <GameOver
                        onPressGoToMenu={onPressGoToMenu}
                    />
                );
            case PLAYGROUND_GAME:
                return (
                    <GameWithCountdown
                        onGameFinishedSuccesfully={(parameters) => {
                            this.onGameFinishedSuccesfully(parameters);
                            this.navigateToPath(PLAYGROUND_ADD_HIGHSCORE);
                        }}
                        onGameFinishedWithoutSuccess={() => this.navigateToPath(PLAYGROUND_GAMEOVER)}
                    />
                );
            case PLAYGROUND_INTRO:
            default:
                return (
                    <IntroCountdown
                        onPressGoToMenu={onPressGoToMenu}
                        onCountdownEnd={() => this.navigateToPath(PLAYGROUND_GAME)}
                    />
                );
        }
    }
}

Playground.propTypes = {
    onPressGoToMenu: PropTypes.func.isRequired,
};
