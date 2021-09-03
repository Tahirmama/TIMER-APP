import React, { Component } from 'react';
import TimerButton from '../../TimerButton/TimerButton';
import './Timer.css';


class Timer extends Component<{}, { isOn: boolean, minutes: number, seconds: number }> {
    myInterval: any;
    constructor(props: any) {
        super(props);
        this.state = {
            minutes: 60,
            seconds: 0,
            isOn: false,
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer(): any {

        if (this.state.isOn === true) {
            return;
        }

        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state;

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1,
                }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval);
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59,
                    }));
                }
            }
        }, 1000);
        this.setState({ isOn: true });
    }

    stopTimer(): any {
        clearInterval(this.myInterval);
        this.setState({ isOn: false });
    }

    resetTimer(): any {
        this.stopTimer();
        this.setState({
            minutes: 60,
            seconds: 0,
        });
    }

    render = () => {
        const { minutes, seconds } = this.state;
        var date = new Date().getFullYear();
        return (
            <div className="timer-container">
                <div className="time-display">

                    TIMER: <strong>
                        <i>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </i>
                    </strong>
                </div>
                <div className="timer-button-container">
                    <TimerButton

                        buttonAction={this.startTimer}
                        buttonValue={'Start'}
                    />
                    <TimerButton

                        buttonAction={this.stopTimer}
                        buttonValue={'Stop'}
                    />
                    <TimerButton

                        buttonAction={this.resetTimer}
                        buttonValue={'Reset'}
                    />
                </div>
                <h3>
                    Copyrights @ Tahir {" "}
                    {date}
                </h3>
            </div>
        );
    };
}

export default Timer;