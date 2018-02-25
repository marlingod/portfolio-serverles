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

  it("should be a 'span' element", () => {
    expect(component.type()).toEqual('span');
  });

  it("Should contains as many childrean as they are works example", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });

  it ("should allow the modal to open and then closed", () => {
    component.instance().openModal();
    expect(component.instance().state.modalOpen).toBe(true);
    component.instance().closeModal();
    expect(component.instance().state.modalOpen).toBe(false);
  })
});

describe("ExampleWorkBubble Component", () => {
  let mockOpenModalFn = jest.fn();

  let component = shallow(<ExampleWorkBubble example={myWork[1]}
    openModal = {mockOpenModalFn}/>);

  let images = component.find("img");
  it("shloud contains a single image",() => {
    expect(images.length).toEqual(1);
  } );
  it("should have an image src set correctly" ,() => {
    expect(images.getElement(1).props.src).toEqual(myWork[1].image.src);
  });

    it("should call the openmodal handler when clicked", () => {
      component.find(".section__exampleWrapper").simulate("click");
      expect(mockOpenModalFn).toHaveBeenCalled();
    })
});
