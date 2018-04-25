import React, { Component } from 'react';
import './App.css';
import display from './components/display';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentValue: '0',
            expression: '',
            result: true,
        };
    };

    VALUE = 0;
    CURRENT_OPERATION = "";

    componentDidMount() {
        window.onkeypress = (e) => {
            this.handleKeyPress(e.keyCode);
        }
        window.onkeydown = (e) => {
            this.handleControl(e.keyCode);
        }
    }

    render() {
        return (
            <div className="App">
                {display(this.state.currentValue, this.state.expression)}
            </div>
        );
    }

    handleKeyPress = (keyCode) => {
        switch (keyCode) {
            case 49://1
                this.handleNumeric('1')
                break;
            case 48://0
                this.handleNumeric('0')
                break;
            case 43://+
                this.handleOperation('+')
                break;
            case 45://-
                this.handleOperation('-')
                break;
            case 42://*
                this.handleOperation('*')
                break;
            case 47:// /
                this.handleOperation('/')
                break;
            case 13://enter
                this.handleControl('eval')
                break;

            default:
                break;
        }
    }

    handleOperation = (type) => {
        if (this.state.result) {
            this.setState({
                expression: this.state.expression
                    ? this.state.expression.slice(0, -3) + ` ${type} `
                    : this.state.currentValue + ` ${type} `
            })
            this.CURRENT_OPERATION = type;
            return;
        }
        this.VALUE = this.CURRENT_OPERATION === ''
            ? this.binToInt(this.state.currentValue)
            : this.doMath(this.VALUE, this.binToInt(this.state.currentValue), this.CURRENT_OPERATION)
        this.CURRENT_OPERATION = type;
        this.setState({
            currentValue: this.intToBin(this.VALUE),
            result: true,
            expression: this.state.expression + this.state.currentValue + ` ${type} `
        })
    }

    handleNumeric = (num) => {
        if (num === '0' && this.state.currentValue === '0') return;
        this.setState({
            currentValue: this.state.result
                ? `${num}`
                : this.state.currentValue + `${num}`,
            result: false
        })
    }

    doMath = (left, right, type) => {// radix = 10 for all
        let result;
        switch (type) {
            case "+":
                result = left + right
                break;
            case "-":
                result = left - right
                break;
            case "*":
                result = left * right
                break;
            case "/":
                result = left / right
                break;

            default:
                return left;
        }
        this.CURRENT_OPERATION = '';
        return result;
    }

    handleControl = (controlCode) => {
        switch (controlCode) {
            case 8://backspace
                this.setState({
                    currentValue: this.state.result || this.state.currentValue.length === 1
                        ? '0'
                        : this.state.currentValue.slice(0, -1)
                })
                if (this.state.currentValue === '0') this.setState({ result: true })
                break;
            case 46://delete
                this.VALUE = 0;
                this.setState({ currentValue: this.intToBin(this.VALUE), result: true });
                break;
            case 'eval'://enter
                if (this.CURRENT_OPERATION === '') return;
                this.VALUE = this.doMath(this.VALUE, this.binToInt(this.state.currentValue), this.CURRENT_OPERATION);
                this.CURRENT_OPERATION = '';
                this.setState({ result: true, expression: '', currentValue: this.intToBin(this.VALUE) });
                break;

            default:
                break;
        }
    }

    binToInt = (bin) => { return parseInt(bin, 2) }
    intToBin = (int) => { return int.toString(2) }
}

export default App;
