import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal';
import {createGroup} from '../../actions/group';
import {sendData} from '../../actions/socket';
import uuidv4  from 'uuid/v4';

class CreateGroupModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checkedItems: [],
            err:''
          }
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const i = e.target.id;
        let id = i; 
        const isChecked = e.target.checked;
        let arr = this.state.checkedItems;
        if (isChecked === true){
        
        arr.push(id);} else { 
          arr = arr.filter(val => val !== id);
        }
        this.setState({checkedItems: arr});
      }

    close(){
        this.props.close();
    }
    
    save(){
        
        const id = uuidv4();
        const title = this.getTitle.value;
        const solution = this.getSolution.value;
        const plant = this.getPlant.value;
        const program = this.getProgram.value;
        const devices = this.state.checkedItems;
        if ((title !== '') && (solution !== '')  && (plant !== '')  && (program !== '') && (devices !== '')) {
            const data = {
                id,
                title,
                devices,
                solution,
                plant,
                program
            };
            this.setState({err:''})
            this.props.createGroup(data);
            this.close();
        }
        else this.setState({err:'Все поля должны быть заполнены'})
    }
    changeTitle(title) {
        this.setState({title})
    }
    render(){
       
        return (
            <div>
              <p>{this.state.err}</p>
                <div className='modal-body'>
                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getTitle = input)} />
                            <span className='label'>Group name</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>

                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getSolution = input)} />
                            <span className='label'>Solution</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>

                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getPlant = input)} />
                            <span className='label'>Plant</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>

                    <div className='row modal-input-row'>
                      <div className='col-12'>
                        <label  className='inp'>
                          <input type='text' placeholder="&nbsp;" ref={input => (this.getProgram = input)} />
                            <span className='label'>Growing Program</span>
                            <span className='border'></span>
                        </label>
                      </div>
                    </div>


                    {
                      this.props.devices.map(item => (
                        <div key={item.id} className='row checkbox'>
                          <div className='col-3'>
                            <input type='checkbox' item={item} id={item.id} value={item.name} onChange={this.handleChange} />
                          </div>
                          <div className='col-9 item'>
                            <p>{item.name}</p>
                          </div>   
                        </div>

                      ))
                    }
                        
                </div>
                <div class='modal-footer'>
                    <button type='button' className='btn btn-success' onClick={this.save}>Save</button>
                    <button type='button' className='btn btn-secondary' onClick={this.close}>Close</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modal: state.modalReducer,
        devices: state.deviceReducer,
        group: state.groupReducer
    };
  };
const mapDispatchToProps = dispatch => ({
    createGroup: data => {
        dispatch(sendData(data,'CREATE_GROUP'))
        // if (request){
          // dispatch(createGroup(data))
        // }
    },
    close: () => {
      dispatch(closeModal())
    },
    
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateGroupModal);