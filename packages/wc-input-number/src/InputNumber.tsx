import React, { useRef, useState } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import BigNumber from 'bignumber.js';
import classnames from 'classnames';

const STEP_INTERVAL = 200;
const STEP_DELAY = 600;

type InputNumberValueType = string | number;

export interface InputNumberProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onInput' | 'onChange'
  > {
  defaultValue?: InputNumberValueType;
  value?: InputNumberValueType;
  prefixCls?: string;

  upNode?: React.ReactNode;
  downNode?: React.ReactNode;

  min?: InputNumberValueType;
  max?: InputNumberValueType;
  step?: InputNumberValueType;
  precision?: number;
  decimalSeparator?: string;
  keyboard?: boolean;
  formatter?: (value: InputNumberValueType | undefined) => string;
  parser?: (disPlayValue: string) => string;

  onStep?: (value: InputNumberValueType, type: 'up' | 'down') => void;
  onChange?: (value: InputNumberValueType) => void;
  onInput?: (value: InputNumberValueType) => void;
}

const InputNumber = React.forwardRef(
  (props: InputNumberProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      prefixCls = 'wc-input-number',
      decimalSeparator = '.',
      className,
      style,
      disabled,
      keyboard = true,
      upNode,
      downNode,
      value,
      defaultValue,
      step = 1,
      precision = 0,
      onChange,
      onStep,
      onInput,
      min,
      max,
      formatter,
      parser,
      ...inputProps
    } = props;
    const stepTimeoutRef = useRef<any>();
    const stepRef = useRef<any>();

    const [focus, setFocus] = useState(false);
    const [realValue, setRealValue] = useState<BigNumber>(() => {
      const initValue = defaultValue ?? value ?? 0;
      return new BigNumber(initValue);
    });

    const refreshValue = (data: BigNumber) => {
      const formatValue = data.toFixed();
      const [intNum, decimalNum] = formatValue.split('.');
      if (precision < 1) {
        return intNum;
      }
      if (!decimalNum) {
        return `${formatValue}.`
          .padEnd(`${formatValue}.`.length + precision, '0')
          .replace('.', decimalSeparator);
      }
      if (decimalNum.length > precision) {
        return formatValue
          .substr(0, formatValue.length - (decimalNum.length - precision))
          .replace('.', decimalSeparator);
      }
      return formatValue
        .padEnd(formatValue.length + (precision - decimalNum.length), '0')
        .replace('.', decimalSeparator);
    };

    const [inputValue, setInputValue] = useState<string>(
      formatter ? formatter(refreshValue(realValue)) : refreshValue(realValue)
    );

    const handleBlur = () => {
      setInputValue(formatter ? formatter(refreshValue(realValue)) : refreshValue(realValue));
      setFocus(false);
    };

    const getBoundaryValue = (data: BigNumber, up: boolean) => {
      let finalValue;
      if (up) {
        finalValue = data.plus(new BigNumber(step));
        if (finalValue.isGreaterThanOrEqualTo(new BigNumber(max))) {
          return new BigNumber(max);
        }
        if (finalValue.isLessThan(new BigNumber(min))) {
          return new BigNumber(min);
        }
        return finalValue;
      }
      finalValue = data.minus(new BigNumber(step));
      if (finalValue.isGreaterThan(new BigNumber(max))) {
        return new BigNumber(max);
      }
      if (finalValue.isLessThanOrEqualTo(new BigNumber(min))) {
        return new BigNumber(min);
      }
      return finalValue;
    };

    const handleStep = (e: React.MouseEvent, up: boolean) => {
      e.preventDefault();
      if (disabled) {
        return;
      }
      let tempRealValue;
      setRealValue((oldRealValue) => {
        tempRealValue = getBoundaryValue(oldRealValue, up);
        setInputValue(
          formatter ? formatter(refreshValue(tempRealValue)) : refreshValue(tempRealValue)
        );
        onChange?.(refreshValue(tempRealValue));
        onStep?.(refreshValue(tempRealValue), up ? 'up' : 'down');
        return tempRealValue;
      });
    };

    const handleMouseDown = (up) => (e: React.MouseEvent) => {
      stepRef.current = handleStep;
      stepRef.current(e, up);
      // handle step when hold mouse down
      function loopStep() {
        stepRef.current(e, up);
        stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
      }
      stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
    };

    const handleStop = () => {
      clearTimeout(stepTimeoutRef.current);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!keyboard) {
        return;
      }
      if (e.which === KeyCode.UP || e.which === KeyCode.DOWN) {
        handleStep(e as any, e.which === KeyCode.UP);
      }
    };

    const innerParseValue = (data: string): string => {
      const parsedValue = data.replaceAll(/[^\w.-]+|[a-zA-Z]+/gi, '');
      if (!parsedValue) {
        return '0';
      }
      // filter all special word except '.'
      const parsedValueArray = parsedValue.split('.');
      const intNum = parsedValueArray[0];
      let decimalNum;
      if (parsedValueArray.length < 2) {
        return parsedValue;
      }
      if (parsedValueArray.slice(1).length > 0) {
        decimalNum = parsedValueArray.slice(1).join('');
      }
      return `${intNum}.${decimalNum}`;
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      let data = innerParseValue(e.target.value);
      if (parser) {
        data = parser(data);
      }
      let newRealValue = new BigNumber(data);
      if (newRealValue.isGreaterThanOrEqualTo(new BigNumber(max))) {
        newRealValue = new BigNumber(max);
      }
      if (newRealValue.isLessThanOrEqualTo(new BigNumber(min))) {
        newRealValue = new BigNumber(min);
      }
      setRealValue(newRealValue);
      setInputValue(formatter ? formatter(data) : data);
      onChange?.(refreshValue(newRealValue));
      onInput?.(refreshValue(newRealValue));
    };

    return (
      <div
        style={style}
        className={classnames(prefixCls, className, {
          [`${prefixCls}--disabled`]: disabled,
          [`${prefixCls}--focus`]: focus,
          [`${prefixCls}--exception`]:
            realValue.isGreaterThan(new BigNumber(max)) || realValue.isLessThan(new BigNumber(min)),
        })}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <div className={`${prefixCls}__input-wrap`}>
          <input
            value={inputValue}
            disabled={disabled}
            onChange={handleChange}
            ref={ref}
            {...inputProps}
          />
        </div>
        <div className={`${prefixCls}__handler-wrap`}>
          <span
            className={`${prefixCls}__up`}
            onMouseDown={handleMouseDown(true)}
            onMouseLeave={handleStop}
            onMouseUp={handleStop}
          >
            {upNode || <span className={`${prefixCls}__up-icon`} />}
          </span>
          <span
            className={`${prefixCls}__down`}
            onMouseDown={handleMouseDown(false)}
            onMouseLeave={handleStop}
            onMouseUp={handleStop}
          >
            {downNode || <span className={`${prefixCls}__down-icon`} />}
          </span>
        </div>
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
