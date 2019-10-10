import React from 'react';
import { shallow } from 'enzyme';
import Answer from './Answer';

describe('Answers component', () =>{
    it('should render correctly with related child component info', ()=>{
        const component = shallow(<Answer />);

        expect(component).toMatchSnapshot();
    })
})

