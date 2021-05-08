import React from 'react';
import InputNumber from '../src/input-number';
import { mount } from 'enzyme';

describe('input number dynamic class name', () => {
  describe('focus', () => {
    it('should exist focus class', () => {
      const wrapper = mount(<InputNumber />);
      wrapper.find('.wc-input-number').simulate('focus');
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--focus')).toEqual(true);
      wrapper.unmount();
    });

    it('should\'t exist focus class', () => {
      const wrapper = mount(<InputNumber />);
      wrapper.find('.wc-input-number').simulate('blur');
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--focus')).toEqual(false);
      wrapper.unmount();
    });
  });

  describe('disabled', () => {
    it('should exist disabled class', () => {
      const wrapper = mount(<InputNumber disabled={true} />);
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--disabled')).toEqual(true);
      wrapper.unmount();
    });
    it('should\'t exist disabled class', () => {
      const wrapper = mount(<InputNumber disabled={false} />);
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--disabled')).toEqual(false);
      wrapper.unmount();
    });
  });

  describe('exception', () => {
    it('should exist exception class', () => {
      const wrapper = mount(<InputNumber value={99} min={0} max={10} />);
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--exception')).toEqual(true);
      wrapper.unmount();
    });
    it('should\'t exist exception class', () => {
      const wrapper = mount(<InputNumber />);
      expect(wrapper.find('.wc-input-number').hasClass('wc-input-number--exception')).toEqual(false);
      wrapper.unmount();
    });
  });
});