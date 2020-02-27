import React, { Component } from 'react';
import '../../style/Groups.css'

import QrReader from 'react-qr-reader'
 
/** Displays all groups (connect component)*/

class QRCode extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: '',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      this.props.history.push("/") 
    }
    
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    
    return (
        <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    );
   }
}
 

export default QRCode;