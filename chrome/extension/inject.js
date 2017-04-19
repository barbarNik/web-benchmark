import React, { Component } from 'react';
import { render } from 'react-dom';
import runMonitor from './monitoring';
import download from './download';

class InjectApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            time: 0,
            addSelector: "",
            deleteSelector: "",
            matchSelector: "",
        };
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleTimeChane = this.handleTimeChane.bind(this);
        this.handleRemoveChange = this.handleRemoveChange.bind(this);
        this.handleMatchChange = this.handleMatchChange.bind(this);
        this.buttonOnClick = this.buttonOnClick.bind(this);
    }

    buttonOnClick = () => {
        if (this.state.time && this.state.addSelector && this.state.deleteSelector && this.state.deleteSelector) {
            this.setState({ isDisabled: true });
            runMonitor(this.state.time, this.state.addSelector, this.state.deleteSelector, this.state.matchSelector)
                .then((data) => {
                    console.log(data);
                    download(data, window.location.hostname + '.csv')
                });
        }
    };

    handleTimeChane(event) {
        this.setState({ time: event.target.value });
    }

    handleAddChange(event) {
        this.setState({ addSelector: event.target.value });
    }

    handleRemoveChange(event) {
        this.setState({ deleteSelector: event.target.value });
    }

    handleMatchChange(event) {
        this.setState({ matchSelector: event.target.value });
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'orange',
                color: 'white',
                position: 'fixed',
                top: 30 + 'px',
                right: 50 + 'px',
                zIndex: 10000
            }}>
                <label htmlFor="time">Test Duration</label>
                <input style={{ color: 'black' }} id="time" value={this.state.time} type="number"
                       onChange={this.handleTimeChane}/><br/>
                <label htmlFor="addSelector">Add Selector</label>
                <input style={{ color: 'black' }} id="addSelector" value={this.state.addSelector}
                       onChange={this.handleAddChange}/><br/>
                <label htmlFor="removeSelector">Remove Selector</label>
                <input style={{ color: 'black' }} id="removeSelector" value={this.state.deleteSelector}
                       onChange={this.handleRemoveChange}/><br/>
                <label htmlFor="matchSelector">Match Selector</label>
                <input style={{ color: 'black' }} id="matchSelector" value={this.state.matchSelector}
                       onChange={this.handleMatchChange}/><br/>
                <button disabled={ this.state.isDisabled } style={{ color: 'black' }} onClick={this.buttonOnClick}>
                    Run Test
                </button>
            </div>
        );
    }
}

(function() {
    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react-example';
    document.body.appendChild(injectDOM);
    render(<InjectApp />, injectDOM);
})();
