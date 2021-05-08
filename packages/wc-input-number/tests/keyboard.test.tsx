import React from 'react';
import InputNumber from '../src/input-number';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';

describe('input number keyboard event', () => {
  describe('up', () => {
    it('should value increased by step when keyboard is true', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number').simulate('keydown', { which: KeyCode.UP });
      expect(onChange).toHaveBeenCalledWith('9');
      expect(onStep).toHaveBeenCalledWith('9', 'up');
      wrapper.unmount();
    });
    it('should\'t call onChange and onStep', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber keyboard={false} onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number').simulate('keydown', { which: KeyCode.UP });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(onStep).toHaveBeenCalledTimes(0);
      wrapper.unmount();
    });
  })

  describe('down', () => {
    it('should value decreased by step when keyboard is true', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number').simulate('keydown', { which: KeyCode.DOWN });
      expect(onChange).toHaveBeenCalledWith('7');
      expect(onStep).toHaveBeenCalledWith('7', 'down');
      wrapper.unmount();
    });
    it('should\'t call onChange and onStep', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber keyboard={false} onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number').simulate('keydown', { which: KeyCode.DOWN });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(onStep).toHaveBeenCalledTimes(0);
      wrapper.unmount();
    });
  })

  describe('other keyboard', () => {
    it('should\'t call onChange and onStep', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber keyboard={false} onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number').simulate('keydown', { which: KeyCode.ESC });
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(onStep).toHaveBeenCalledTimes(0);
      wrapper.unmount();
    });
  })
})
