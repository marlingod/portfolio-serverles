import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme  from 'enzyme';

Enzyme.configure({ adapter : new Adapter() });

const myWork = [
  {
    'title': "Work Example",
    'image': {
      'desc': "example screenshot of a project involving code",
      'src': "images/example1.png",
      'comment': ""
    }
  },
  {
    'title': "Portfolio BoilerPlate",
    'image': {
      'desc': "A ServerLess Portfolio",
      'src': "images/example2.png",
      'comment': ""
    }
  }
];

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork}/>);

  it("should be a 'section' element", () => {
    expect(component.type()).toEqual('section');
  });

  it("Should contains as many childrean as they are works example", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });
});

describe("ExampleWorkBubble Component", () => {
  let component = shallow(<ExampleWorkBubble example={myWork[1]}/>);

  let images = component.find("img");
  it("shloud contains a single image",() => {
    expect(images.length).toEqual(1);
  } );
  it("should have an image src set correctly" ,() => {
    expect(images.getElement(1).props.src).toEqual(myWork[1].image.src);
  });
});
