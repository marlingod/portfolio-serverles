import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work';

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
  },
  {
    'title': "Work Example",
    'image': {
      'desc': "example screenshot of a project involving cats",
      'src': "images/example3.png",
      'comment': `"Bengals Cats by Roberto Shabs is licensed.
      the photo link is "`
    }
  }
]
ReactDOM.render(<ExampleWork work={myWork}/> , document.getElementById("example-work"));
