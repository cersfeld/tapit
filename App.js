import React from 'react';
import Home from './src/components/home/Home';
import Playground from './src/components/playground/Playground';
import Highscore from './src/components/highscore/Highscore';

import { PLAYGROUND, HOME, HIGHSCORE } from './src/constants/pathnames';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: HOME,
        };
    }

    navigateToPath = (path) => {
        this.setState({ activePath: path });
    };


    render() {
        switch (this.state.activePath) {
            case PLAYGROUND:
                return (
                    <Playground
                        onPressGoToMenu={() => this.navigateToPath(HOME)}
                    />
                );
            case HIGHSCORE:
                return (
                    <Highscore
                        onPressGoToMenu={() => this.navigateToPath(HOME)}
                    />
                );
            default:
            case HOME:
                return (
                    <Home
                        onPressStartGame={() => this.navigateToPath(PLAYGROUND)}
                        onPressShowHighscore={() => this.navigateToPath(HIGHSCORE)}
                    />
                );
        }
    }
}
