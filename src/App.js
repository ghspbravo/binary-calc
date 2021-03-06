import React, { Component } from 'react';
import './App.css';
import display from './components/display';
import buttons from './components/buttons';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentValue: '0',
            expression: '',
            result: true,
        };
        this.handleNumeric = this.handleNumeric.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
        this.handleControl = this.handleControl.bind(this);
    };

    VALUE = 0;
    CURRENT_VALUE = 0;
    CURRENT_OPERATION = "";

    componentDidMount() {
        window.onkeypress = (e) => {
            this.handleKeyPress(e.keyCode);
        }
        window.onkeydown = (e) => {
            this.handleKeyDown(e.keyCode);
        }
        document.getElementsByClassName('panelWrapper')[0].childNodes
            .forEach((div) => div.addEventListener('onPress',
                () => {
                    div.classList.toggle("btn-pressed")
                    setTimeout(() => div.classList.toggle("btn-pressed"), 100)
                }, false))
        document.getElementsByClassName('currentValue')[0].addEventListener('click', () => {
            if (isNaN(this.state.currentValue)) return;
            this.setState({
                currentValue: this.intToBin(this.CURRENT_VALUE) === this.state.currentValue
                    ? this.CURRENT_VALUE.toString()
                    : this.intToBin(this.CURRENT_VALUE),
            })
        })
    }

    render() {
        return (
            <div className="App">
                {display(this.state.currentValue, this.state.expression)}
                {buttons(this.handleNumeric, this.handleOperation, this.handleControl)}
            </div>
        );
    }

    handleKeyPress = (keyCode) => {
        switch (keyCode) {
            case 49://1
                this.handleNumeric('1')
                this.dispatchPressById('1')
                break;
            case 48://0
                this.handleNumeric('0')
                this.dispatchPressById('0')
                break;
            case 43://+
                this.handleOperation('+')
                this.dispatchPressById('+')
                break;
            case 45://-
                this.handleOperation('-')
                this.dispatchPressById('-')
                break;
            case 42://*
                this.handleOperation('*')
                this.dispatchPressById('*')
                break;
            case 47:// /
                this.handleOperation('/')
                this.dispatchPressById('/')
                break;
            case 13://enter
                this.handleControl('eval')
                this.dispatchPressById('eval')
                break;

            default:
                break;
        }
    }

    handleKeyDown = (keyCode) => {
        switch (keyCode) {
            case 8://backspace
                this.handleControl('delete')
                this.dispatchPressById('delete')
                break;
            case 46://delete
                this.handleControl('clear')
                this.dispatchPressById('clear')
                break;
            case 27://escape
                this.handleControl('clearAll')
                this.dispatchPressById('clearAll')
                break;

            default:
                break;
        }
    }

    handleOperation(type) {
        if (isNaN(this.CURRENT_VALUE)) this.CURRENT_VALUE = 0;
        if (type === 'not') {
            this.CURRENT_VALUE = this.doMath(this.CURRENT_VALUE, this.CURRENT_VALUE, type)
            this.setState({
                currentValue: this.intToBin(this.CURRENT_VALUE),
                expression: this.state.expression,
                result: false
            })
            return;
        }
        if (this.state.result) {
            this.VALUE = this.state.expression ? this.VALUE : this.CURRENT_VALUE;
            this.setState({
                expression: this.state.expression
                    ? `${this.state.expression.slice(0, (this.CURRENT_OPERATION.length+2)*(-1))} ${type} `
                    : `(${this.intToBin(this.CURRENT_VALUE)} ${type} `
            })
            this.CURRENT_OPERATION = type;
            return;
        }
        this.VALUE = !this.CURRENT_OPERATION
            ? this.CURRENT_VALUE
            : this.doMath(this.VALUE, this.CURRENT_VALUE, this.CURRENT_OPERATION)
        this.CURRENT_OPERATION = type;
        this.setState({
            currentValue: this.intToBin(this.VALUE),
            result: true,
            expression: this.state.expression
                ? `(${this.state.expression}${this.intToBin(this.CURRENT_VALUE)}) ${type} `
                : `(${this.intToBin(this.CURRENT_VALUE)} ${type} `
        })
        this.CURRENT_VALUE = this.VALUE
        document.getElementsByClassName('expression')[0]
            .scrollBy(document.getElementsByClassName('expression')[0].scrollWidth, 0)
    }

    handleNumeric(num) {
        if (num === '0' && this.state.currentValue === '0') return;
        this.CURRENT_VALUE = this.state.result ? this.binToInt(num) : this.binToInt(this.intToBin(this.CURRENT_VALUE) + `${num}`)
        this.setState({
            currentValue: this.intToBin(this.CURRENT_VALUE),
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
            case "not":
                result = left ^ this.binToInt('1'.repeat(this.intToBin(right).length))
                break;
            case "and":
                result = left & right
                break;
            case "or":
                result = left | right
                break;

            default:
                return left;
        }
        if (type !== "not") this.CURRENT_OPERATION = '';
        return result >= 0 ? Math.floor(result) : 0;
    }

    handleControl(controlCode) {
        switch (controlCode) {
            case 'delete':
                this.CURRENT_VALUE = this.state.result || this.intToBin(this.CURRENT_VALUE).length === 1
                    ? 0
                    : this.CURRENT_VALUE >> 1
                this.setState({
                    currentValue: this.intToBin(this.CURRENT_VALUE)
                })
                break;
            case 'clear':
                this.setState({ currentValue: '0', result: true });
                this.CURRENT_VALUE = this.binToInt(this.state.currentValue)
                break;
            case 'clearAll':
                this.VALUE = 0; this.CURRENT_OPERATION = ''; this.CURRENT_VALUE = 0;
                this.setState({ expression: '', currentValue: '0', result: true });
                break;
            case 'eval':
                if (this.CURRENT_OPERATION === '') return;
                this.CURRENT_VALUE = this.doMath(this.VALUE, this.CURRENT_VALUE, this.CURRENT_OPERATION);
                this.CURRENT_OPERATION = ''; this.VALUE = 0;
                this.setState({ result: true, expression: '', currentValue: this.intToBin(this.CURRENT_VALUE) });
                break;

            default:
                break;
        }
    }

    dispatchPressById = (id) => {
        let pressed = new Event('onPress')
        document.getElementById(id).dispatchEvent(pressed)
    }
    binToInt = (bin) => { return parseInt(bin, 2) }
    intToBin = (int) => { return int.toString(2) }
}

export default App;
