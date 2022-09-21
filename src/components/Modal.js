
import React from "react";
import Addvehicle from './Addvehicle'
import Addtoll from './Addtoll'

export const Modal =({closeModal,modalType,tolls,vehicles})=>{
  
    if(modalType==='vehicle')
    return (
        <Addvehicle closeModal={closeModal} modalType={modalType} tolls={tolls} vehicles={vehicles} />
            
    )
    else 
    return (
        <Addtoll closeModal={closeModal} modalType={modalType} tolls={tolls} vehicles={vehicles} />
    )
   
}
