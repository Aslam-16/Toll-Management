
import React from "react";
import Addvehicle from './Addvehicle'
import Addtoll from './Addtoll'
let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']

export class Modal extends React.Component {
  
  render(){
    
    if(this.props.modalType==='vehicle')
    return (
            <Addvehicle setShowModal={this.props.setShowModal} modalType={this.props.modalType} tolls={this.props.tolls} tollData={this.props.tollData} />
            
    )
    else 
    return (
        <Addtoll setShowModal={this.props.setShowModal} modalType={this.props.modalType} tolls={this.props.tolls} tollData={this.props.tollData} />
    )
   
}
}