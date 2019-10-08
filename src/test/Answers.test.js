import React, { Component } from 'react';
//Adding the .test.js file extension makes jest automatically look for tests in the specified file.
const TestRunner = require("jest-runner")
import Answers from '.././components/Answers/Answers'

it('should render answers component', () =>{
    const component =  <Answers />;

    expect(component).toMatchSnapshot();
})