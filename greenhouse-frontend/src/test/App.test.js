import React from 'react';
import { configure, shallow, mount} from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import App from '../App';
import ConnectedGroups, {Groups}  from '../components/Groups/Groups';
import {Group} from '../components/Groups/Group';
import ConnectedSensor, {Sensor} from '../components/Groups/Sensor';
import ConnectedButton, {Button} from '../components/Groups/Button';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import Profiles from '../components/Profiles/Profiles';
import GrowingPrograms from '../components/GrowingPrograms/GrowingPrograms';
import Charts from '../components/Charts/Charts';
import EditDeletePage from '../components/EditDeletePage/EditDeletePage';
import  groupReducer  from '../reducers/groupReducer';
import  deviceReducer  from '../reducers/deviceReducer';
import  growingProgramReducer  from '../reducers/growingProgramReducer';

import  *  as action from '../actions/group';
import  *  as deviceAction from '../actions/device';
import  *  as growingProgramAction from '../actions/growingProgram';
import * as state from '../state';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App Component testing', function() {

  it('App renders main page', () => {
    const app = shallow(<App />);
    const editText = <Router>
                      <div className="App">
                        <Navbar/>
                        <div className='app-body'>
                          <Route exact path="/" component={ConnectedGroups} />
                          <Route path="/profiles" component={Profiles} />
                          <Route path="/growing_program" component={GrowingPrograms} />
                          <Route path="/charts" component={Charts} />
                          <Route path="/allgroups" component={EditDeletePage} />
                        </div>
                      </div>
                    </Router>;
    expect(app).to.contain(editText);

});

  chai.use(chaiEnzyme())
});


describe('Connected component testing', function() {

const initialState = state;
    const mockStore = configureStore();
    let store, container;
    beforeEach(()=>{
      store = mockStore(initialState);
      container = shallow(<ConnectedSensor store={store} /> );
  })

it('Sensor component', () => {
  const editText = <Sensor  store={store} dispatch={[] } groups={[undefined]} />;
  expect(container.length).to.equal(1);
});

it('Groups component', () => {
  const groups = shallow(<ConnectedGroups store={store} /> );
  const editText = <Groups  store={store}  />;
  // expect(groups).to.contain(editText);
  expect(groups.length).to.equal(1);
});

// it('Button component', () => {
//   const devices=state.devices
//   const button = shallow(<Button devices={devices}/> );
//   expect(button.length).to.equal(1);
// });

  chai.use(chaiEnzyme())
});


describe('Group Actions', () => { 
  
  it('create group', () => { 
    const  data = 'group'
    const expectedAction = {
      type: action.CREATE_GROUP,
      data
    }
    expect(action.createGroup(data)).to.eql(expectedAction) 
    
  })

  it('delete group', () => { 
    const  id = 1
    const expectedAction = {
      type: action.DELETE_GROUP,
      id
    }
    expect(action.deleteGroup(id)).to.eql(expectedAction) 
    
  })

  it('edit group', () => { 
    const  group = {id:1, title:'group', devices:[1,2,3]}
    const  {id, title, devices} = group
    const expectedAction = {
      type: action.EDIT_GROUP,
      id, title, devices
    }
    expect(action.editGroup(group)).to.eql(expectedAction) 
   
  })

})

describe('Device Actions', () => { 
  
  it('create device', () => { 
    const  data = 'device'
    const expectedAction = {
      type: deviceAction.CREATE_DEVICE,
      data
    }
    expect(deviceAction.createDevice(data)).to.eql(expectedAction) 
    
  })

  it('delete device', () => { 
    const  id = 1
    const expectedAction = {
      type: deviceAction.DELETE_DEVICE,
      id
    }
    expect(deviceAction.deleteDevice(id)).to.eql(expectedAction) 
    
  })

  it('edit device', () => { 
    const  device = {id:1, name:'group', typeDevice:'1', value:'1234'}
    const  {id, name, typeDevice, value} = device
    const expectedAction = {
      type: deviceAction.EDIT_DEVICE,
      id, name, typeDevice, value
    }
    expect(deviceAction.editDevice(device)).to.eql(expectedAction) 
    
  })

})

describe('Growing program Actions', () => { 
  
  it('create growing program', () => { 
    const  data = 'program'
    const expectedAction = {
      type: growingProgramAction.CREATE_PROGRAM,
      data
    }
    expect(growingProgramAction.createProgram(data)).to.eql(expectedAction) 
    
  })

  it('delete growing program', () => { 
    const  id = 1
    const expectedAction = {
      type: growingProgramAction.DELETE_PROGRAM,
      id
    }
    expect(growingProgramAction.deleteProgram(id)).to.eql(expectedAction) 
    
  })

  it('edit growing program', () => { 
    const  program = {id:1, programName:'group', group:'1', days:'1234',blocks:[
      {id:1, blockDays:10, airTemperature:"1234",waterTemperature:"1234",airHumidity:"1234",waterHumidity:"1234",lightPeriod:"1234"},
      {id:2, blockDays:10, airTemperature:"1234",waterTemperature:"1234",airHumidity:"1234",waterHumidity:"1234",lightPeriod:"1234"},
      {id:3, blockDays:10, airTemperature:"1234",waterTemperature:"1234",airHumidity:"1234",waterHumidity:"1234",lightPeriod:"1234"}
  ]}
    const {id, programName, group, days, blocks} = program
    const expectedAction = {
      type: growingProgramAction.EDIT_PROGRAM,
      id, programName, group, days, blocks
    }
    expect(growingProgramAction.editProgram(program)).to.eql(expectedAction) 
    
  })

})

describe('Groups reducer', () => { 
  
  it('Create group', () => { 
    const  data = 'group'
    const expectedAction = {
      type: action.CREATE_GROUP,
      data
    }
    expect(groupReducer(state.sensorsData, expectedAction)).to.eql([...state.sensorsData,data])
  })

  it('Edit group', () => { 
    const  group = {id:1, title:'group', devices:[1,2,3]}
    const  {id, title, devices} = group
    const expectedAction = {
      type: action.EDIT_GROUP,
      id, title, devices
    }
    const expectedState = state.sensorsData.map(group => {
      if (group.id === expectedAction.id) {
        group.title = expectedAction.title;
        group.devices = expectedAction.devices
      }
    })
    expect(groupReducer(state.sensorsData, expectedAction)).to.eql(state.sensorsData)
  })

  it('Delete group', () => { 
    const  id = 1
    const expectedAction = {
      type: action.DELETE_GROUP,
      id
    }
    expect(groupReducer(state.sensorsData, expectedAction)).to.eql(state.sensorsData.filter(group => group.id !== id))
  })

})

describe('Devices reducer', () => { 
  
  it('Create device', () => { 
    const  data = 'device'
    const expectedAction = {
      type: deviceAction.CREATE_DEVICE,
      data
    }
    expect(deviceReducer(state.devices, expectedAction)).to.eql([...state.devices,data])
  })

  it('Edit device', () => { 
    const  group = {id:1, title:'group', devices:[1,2,3]}
    const  {id, title, devices} = group
    const expectedAction = {
      type: deviceAction.EDIT_DEVICE,
      id, title, devices
    }
    const expectedState = state.sensorsData.map(group => {
      if (group.id === expectedAction.id) {
        group.title = expectedAction.title;
        group.devices = expectedAction.devices
      }
    })
    expect(deviceReducer(state.devices, expectedAction)).to.eql(state.devices)
  })

  it('Delete device', () => { 
    const  id = 1
    const expectedAction = {
      type: deviceAction.DELETE_DEVICE,
      id
    }
    expect(deviceReducer(state.devices, expectedAction)).to.eql(state.devices.filter(device => device.id !== id))
  })

})

describe('Growing Programs reducer', () => { 
  
  it('Create program', () => { 
    const  data = 'program'
    const expectedAction = {
      type: growingProgramAction.CREATE_PROGRAM,
      data
    }
    expect(growingProgramReducer(state.growingPrograms, expectedAction)).to.eql([...state.growingPrograms,data])
  })

  it('Edit program', () => { 
    const  program = {id:1, title:'program', devices:[1,2,3]}
    const  {id, title, devices} = program
    const expectedAction = {
      type: growingProgramAction.EDIT_PROGRAM,
      id, title, devices
    }
    // const expectedState = state.sensorsData.map(group => {
    //   if (group.id === expectedAction.id) {
    //     group.title = expectedAction.title;
    //     group.devices = expectedAction.devices
    //   }
    // })
    expect(growingProgramReducer(state.growingPrograms, expectedAction)).to.eql(state.growingPrograms)
  })

  it('Delete program', () => { 
    const  id = 1
    const expectedAction = {
      type: growingProgramAction.DELETE_PROGRAM,
      id
    }
    expect(growingProgramReducer(state.growingPrograms, expectedAction)).to.eql(state.growingPrograms.filter(group => group.id !== id))
  })

})

