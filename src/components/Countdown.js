import PropTypes from 'prop-types';
import React from 'react';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            secondsLeft: props.seconds,
        });
    }

    decrementSecondsLeft = () => {
        const result = this.state.secondsLeft - 1;
        if (result > 0) {
            this.setState({
                secondsLeft: result,
            });
        } else {
            this.props.onCountdownEnd();
            clearInterval(this.intervalHandle);
            this.intervalHandle = null;
        }
    }

    componentDidMount() {
        this.intervalHandle = setInterval(this.decrementSecondsLeft, 1000);
    }

    componentWillUnmount() {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = null;
        }
    }

    render() {
        return this.props.children({ secondsLeft: this.state.secondsLeft });
    }
}

Countdown.propTypes = {
    children: PropTypes.any,
    onCountdownEnd: PropTypes.func.isRequired,
    seconds: PropTypes.number.isRequired,
};

export default Countdown;
