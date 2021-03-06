import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()})

/**
 * Factory funtion to create ShallowWrapper for app component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props}/>);
    if(state) wrapper.setState(state)
    return wrapper;
}

/**
 * Funtion to return ShallowWrapper by passing data-test attribute value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - value of the data-test attribute
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error',() => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper,'component-app');
    expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper,'increment-button');
    expect(button.length).toBe(1);
});

test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper,'decrement-button');
    expect(button.length).toBe(1);
});

test('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper,'counter-display');
    expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
});

test('clicking increment button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, {counter});

    //find increment button and click
    const button = findByTestAttr(wrapper,'increment-button');
    button.simulate('click');

    //find counter display and check value
    const counterDisplay = findByTestAttr(wrapper,'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1)
});

test('clicking decrement button decrements the counter', () => {
    const counter = 3;
    const wrapper = setup(null,{counter});

    //find the decrement button and click
    const button = findByTestAttr(wrapper,'decrement-button');
    button.simulate('click');

    //find counter display and check value
    const counterDisplay = findByTestAttr(wrapper,'counter-display');
    expect(counterDisplay.text()).toContain(counter-1);
});

test('No counter below 0',() => {
    const counter = 0;
    const wrapper = setup(null,{counter});

    //find the decrement button and click
    const button = findByTestAttr(wrapper,'decrement-button');
    button.simulate('click');
    const error = findByTestAttr(wrapper,'error-message');
    expect(error.text()).toContain('Counter cannot go below 0');
});

test('No error above 0', () => {
    const counter = 0;
    const wrapper = setup(null,{counter});

    //find the increment and click
    const button = findByTestAttr(wrapper,'increment-button');
    button.simulate('click');
    const error = findByTestAttr(wrapper,'error-message');
    expect(error).toBeUndefined()
})
