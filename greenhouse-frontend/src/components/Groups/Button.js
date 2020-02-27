import React, { Component } from 'react';
/**Button component - type of device */
class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            stateButton: true
        };
        this.prob = "OFF";
    }
    pressButton = () => {

        this.prob = (this.state.stateButton === true ) ?   "ON":"OFF";
        this.setState({
            stateButton: !this.state.stateButton
        });
    };   

    render(){
        return(
            <div className='sensor col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6'>
                <div className='button wrapperSensor'>
                    <div className='row' >
                        <div className='button-name'>
                            <p>{this.props.device.name}</p>
                        </div>
                    </div>
                    <div className='row'> 
                        <div className='button-value' onClick={ this.pressButton }><p>{this.prob}</p></div>
                    </div> 
                </div>
            </div>
        );
    }
}
export default Button;