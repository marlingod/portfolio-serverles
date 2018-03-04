import React from 'react';
import { shallow } from 'enzyme';
import  ExampleWorkModal from '../js/example-work-modal';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme  from 'enzyme';

Enzyme.configure({ adapter : new Adapter() });
const myExample =  {
    'title': "Work Example",
    'href' : "https://example.com",
    'desc' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    'image': {
      'desc': "example screenshot of a project involving code",
      'src': "images/example1.png",
      'comment': ""
    }
  };
describe("ExampleWork Modela component", () => {
  let component = shallow(<ExampleWorkModal example={myExample}
    open={false}  />);
    let Opencomponent = shallow(<ExampleWorkModal example={myExample}
      open={true} />);
  let anchor = component.find("a");
  it ("Should be a single 'a' element ",() => {
    expect(anchor.length).toEqual(1);
  });

  it("should link to out project", () =>{
    expect(anchor.getElement(0).props.href).toEqual(myExample.href);
  });

    it ("should have the modal class set correctly", () => {
      expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true)
      expect(Opencomponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true)

    });

});
