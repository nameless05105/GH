import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/session";
import {sendData} from '../index';
import Greenhouses from './Greenhouses/Greenhouses';
import MainUsersComponent from './Users/MainUsersComponent';

import Modal from './Modal/Modal';
import { openModal } from '../actions/modal';


import { updateGreenhouse } from '../actions/greenhouse';

class Dashboard extends Component {

  constructor(props){
      super(props)
      this.state = {
          greenhouse:[],
      }
      this.logout = this.logout.bind(this);
  }

  componentDidMount(){
  }


  changeGreenhouse(){
    this.props.changeGreenhouse();
  }

  createGreenhouse(){
    this.props.createGreenhouse();
  }


  logout(){
    this.props.logout();
  }


render() {

  let display = null;
      if(this.props.session.role == "1"){
        display = 
          <div>
              <h1>Теплица: {this.props.greenhouse.id}</h1>
              <Modal isOpen = {this.props.modal.isOpen} titleModal={this.props.modal.titleModal} typeModal={this.props.modal.typeModal}  content={this.props.modal.content}/>
              <div className='row second-menu justify-content-md-center'>
                <div className='col-3'>
                  <p  onClick={this.createGreenhouse.bind(this)}>Создать новую теплицу</p>
                </div>
                <div className='col-3'>
                  <p  onClick={this.changeGreenhouse.bind(this)}>Изменить теплицу</p>
                </div>
              </div>
              <MainUsersComponent/>
          </div>
      } else  {
        let select_greenhouse = this.props.greenhouses.find(greenhouse => greenhouse.technologist === this.props.session.userId);
        this.props.updateGreenhouse(select_greenhouse);
        console.log(select_greenhouse)
        display = 

        <div><h1>Теплица: {this.props.greenhouse.name}</h1></div>

      } 

  return (
      <div className="pr-5 pl-5">
        <div ><h1>Логин: {this.props.session.username}</h1></div>
        <div><h1>Роль пользователя: {this.props.session.role}</h1></div>

        {display}
        <button className='btn btn-success' onClick={this.logout}>Выйти</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    greenhouse: state.greenhouseReducer,
    greenhouses: state.greenhousesReducer,
    modal: state.modalReducer,
  };
}; 

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  },
  updateGreenhouse: data => {
    console.log(data)
    dispatch(updateGreenhouse(data))

  },
  changeGreenhouse: container => {
    dispatch(openModal({
      typeModal: 'selectGreenhouse',
      content: container,
      titleModal:'Выбрать теплицу'
    }
    ))
  },
  createGreenhouse: container => {
    dispatch(openModal({
      typeModal: 'createGreenhouse',
      content: container,
      titleModal:'Создать новую теплицу'
    }
    ))
  },
});

export default connect( mapStateToProps, mapDispatchToProps)(Dashboard);
