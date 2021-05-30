import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginForm', () => {
  const props = {
    isLoading: false,
    onSubmit: jest.fn(),
  };

  const render = () => shallow(<LoginForm {...props} />);

  test('should render', () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
  });

  test('snapshot testing', () =>{
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
});

  test('snapshot testing withisLoading', () =>{
      const wrapper = render();
      wrapper.setProps({isLoading:true})
      expect(wrapper).toMatchSnapshot();
  });

  test('should submit credentials', () => {
    const wrapper = render();
   

    const usernameField = wrapper.find('.loginForm-field').at(0);
    usernameField.props().onChange({target: {name: 'username', value: 'jaime'}})

    const passwordField = wrapper.find('.loginForm-field').at(1);
    passwordField.props().onChange({target: {name: 'password', value: 'password'}})

    const form = wrapper.find('.loginForm');
    form.simulate('submit',{preventDefault:() => {}});

    expect(props.onSubmit).toHaveBeenCalled()
  });
})