import React from 'react';
import InputNumber from '../src/input-number';
import { mount } from 'enzyme';

describe('input number click', () => {
  describe('up', () => {
    it('should value increased by step', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number__up').simulate('mouseDown');
      expect(onChange).toHaveBeenCalledWith('9');
      expect(onStep).toHaveBeenCalledWith('9', 'up');
      wrapper.unmount();
    });
    it('should value decreased by step', () => {
      const onChange = jest.fn();
      const onStep = jest.fn();
      const wrapper = mount(<InputNumber onChange={onChange} onStep={onStep} value={8} />);
      wrapper.find('.wc-input-number__down').simulate('mouseDown');
      expect(onChange).toHaveBeenCalledWith('7');
      expect(onStep).toHaveBeenCalledWith('7', 'down');
      wrapper.unmount();
    });
  })
});