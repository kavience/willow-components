import React, { Component } from 'react';
import InputNumber from '../../src';
import '../../assets/index.less';

export default class Normal extends Component {
  state = {
    disabled: false,
    keyboard: true,
    stringMode: false,
    precision: 2,
    step: 0.01,
    decimalSeparator: '.',
  };

  handleSetState = (data) => () => {
    this.setState(data);
  };

  handleChange = (value) => {
    console.log(value);
  };
  
  render() {
    const { disabled, keyboard, stringMode, step, precision, decimalSeparator } = this.state;

    const upNode = <div>x</div>;
    const downNode = <div style={{ color: 'red' }}>y</div>;

    return (
      <div>
        <h3>actions</h3>
        <div>
          <button onClick={this.handleSetState({ disabled: !disabled })}>
            disabled({String(disabled)})
          </button>
          <button onClick={this.handleSetState({ keyboard: !keyboard })}>
            keyboard({String(keyboard)})
          </button>
          <button onClick={this.handleSetState({ stringMode: !stringMode })}>
            stringMode({String(stringMode)})
          </button>
          <button
            onClick={this.handleSetState({
              step: step < 99 ? step * 10 : precision < 1 ? 1 : `0.${Array(precision).join('0')}1`,
            })}
          >
            step({step})
          </button>
          <button onClick={this.handleSetState({ precision: precision < 6 ? precision + 1 : 0 })}>
            precision({precision})
          </button>
          <button
            onClick={this.handleSetState({
              decimalSeparator: decimalSeparator === ',' ? '.' : ',',
            })}
          >
            decimalSeparator({decimalSeparator})
          </button>
        </div>
        <hr />
        <h3>show</h3>
        <hr />
        <div>
          <InputNumber
            disabled={disabled}
            keyboard={keyboard}
            step={step}
            precision={precision}
            decimalSeparator={decimalSeparator}
            upNode={upNode}
            downNode={downNode}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
