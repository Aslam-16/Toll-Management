
import React, { useState } from "react";
import Addvehicle from './'

let vehicleType = ['car_jeep_van', 'lcv', 'heavy_behicle', 'truck_bus']
export class Modal extends React.Component {
    constructor(props){
        super(props)
            this.state={
                tollname:'',
                vehicleType:'',
                singlejourney:{
                    car_jeep_van:"",
                    lcv:"",
                    heavy_vehicle:"",
                    truck_bus:""
                },
                returnjourney:{
                    car_jeep_van: "",
                    lcv: "",
                    heavy_vehicle: "",
                    truck_bus: ""
                },
                sj:'',
                rj:'',
                type:[]
            }
        
    }
    onChange=(e,i=0)=>{
        
        let name = e.target.name
        let value = e.target.value

        let reg=/^singlejourney|returnjourney/
        console.log(name,value,i);
        if(reg.test(name)){
            console.log(name);
            let [journey,type] =name.split('-');
            if (journey === 'singlejourney') {
                if (value !== "") {
                    let obj = this.state.singlejourney
                    obj[type] = value

                    this.setState({ singlejourney: obj })
                    this.setState({ sj: value })
                }
            }
            else if (journey === 'returnjourney') {
                if (value !== "") {
                    let obj = this.state.returnjourney
                    obj[type] = value

                    this.setState({ returnjourney: obj })
                    this.setState({rj:value})
                }
            }
            
        }
        if(name==='tollname'){
            if(value!==""){
                this.setState({tollname:value})
            }
        }
        else if (name === 'vehicleType') {
            if (value !== "") {
                this.setState({ vehicleType: value })
            }
        }

        else if (name === 'singlejourney') {
            if (value !== "") {
                let obj=this.state.singlejourney
                obj[this.state.vehicleType]=value

                this.setState({ singlejourney: obj })
                //this.setState({ sj: value })
            }
        }
        else if (name === 'returnjourney') {
            if (value !== "") {
                let obj = this.state.returnjourney
                obj[this.state.vehicleType] = value

                this.setState({ returnjourney: obj })
                //this.setState({rj:value})
            }
        }
        // else if(this.state.vehicleType){
        //     this.setState({type:{...this.state.type,
        //         [this.state.vehicleType]:[90,30]
        //     }})
        // }

        // if(this.state.singlejourney && this.state.returnjourney){
        
        //     let data=[...this.state.type]
        //     // this.setState({singlejourney:this.state.singlejourney})
        //     // this.setState({ singlejourney: this.state.returnjourney })
        //     data[i][this.state.vehicleType]=[this.state.singlejourney,this.state.returnjourney]
        //     this.setState({ type: value, returnjourney: value })
        // }

        
        
        console.log(this.state)
    }
    
  render(){
    
    if(this.props.modalType==='vehicle')
    return (
        <div className="container">
            <div className="modal">
                <h2>Add new Entry</h2>
                <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                <div id='modal-main'>
                <label for ='drop-toll'>Select toll name</label>
                <select id='drop-toll'>
                    <option value='chengal'>chengal</option>
                    <option value='ecr'>ECR</option>
                    <option value='omr'>OMR</option>
                </select>
                <label for='drop-veh'>Select vehicle type</label>
                    <select id='drop-veh' >
                        <option value="">select vehicle type</option>
                        {
                            vehicleType.map((type, i) => 
                                <option value={type}>{type}</option>)}
                    

                </select>
                <label for='veh-number'>Vehicle Number</label>
                <input type='text' id='veh-number'/>
                <label for='tariff'>Tariff</label>
                <input type='text' id='tariff' />
                    
                </div>
                <button type='button' class='modal-button'>Add new toll</button>
            </div>
        </div>
    
    )
    else 
    return (
        <div className="container">
            <div className="modal">
                <h2>Add new Toll</h2>
                <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                <div id='modal-main'>
                    <label for='tollname'>Toll Name</label>
                    <input type='text' id='tollname' name='tollname' value={this.state.tollname} onChange={(e)=>this.onChange(e)}/>
                    <label for='drop-veh'>Vehicle fare details</label>
                    {vehicleType.map((type,i)=><div className="vehicle-fare" key={i}>
                    
                        <select id='drop-veh'  name='vehicleType'onChange={(e) => this.onChange(e)}>
                            <option value="">select vehicle type</option>
                            {
                                vehicleType.map((type, i) =>
                                    <option value={type}>{type}</option>)}
                        
                    </select>
                        {console.log("html", this.state.singlejourney, this.state.vehicleType)}
                        <input type='text' name={`singlejourney-${type}`}  value={this.state.singlejourney[this.state.vehicleType]} onChange={(e) => this.onChange(e,i)} />
                        <input type='text' name={`returnjourney-${type}`} value={this.state.returnjourney[this.state.vehicleType]} onChange={(e) => this.onChange(e,i)} />
                    </div>)}
                   
                </div>
                <button type='button' class='modal-button'>Add details</button>
            </div>
        </div>
    )
   
}
}

//  <div className="vehicle-fare">

//                                 <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
//                                     <option value="" >select vehicle type</option>
//                                     {
//                                         vehicleTypes.map((type, i) =>
//                                             <option key={i} value={type}>{type}</option>)}

//                                 </select>
//                                 <input type='text' name="singlejourney-1" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                                 <input type='text' name="returnjourney-1" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                             </div>
//                             <div className="vehicle-fare">

//                                 <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
//                                     <option value="" >select vehicle type</option>
//                                     {
//                                         vehicleTypes.map((type, i) =>
//                                             <option key={i} value={type}>{type}</option>)}

//                                 </select>
//                                 <input type='text' name="singlejourney-2" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                                 <input type='text' name="returnjourney-2" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                             </div>
//                             <div className="vehicle-fare">

//                                 <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
//                                     <option value="" >select vehicle type</option>
//                                     {
//                                         vehicleTypes.map((type, i) =>
//                                             <option key={i} value={type}>{type}</option>)}

//                                 </select>
//                                 <input type='text' name="singlejourney-3" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                                 <input type='text' name="returnjourney-3" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
//                             </div>
//-------------------------------------------------------------------
// const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
// const event2 = new Date(Date.UTC(2012, 11, 21, 3, 0, 0));
// // British English uses day-month-year order and 24-hour time without AM/PM
// console.log(event.toLocaleString(), event.getHours());
// // expected output: 20/12/2012, 0:00:00

// // Korean uses year-month-day order and 12-hour time with AM/PM
// console.log(event.toLocaleString('ko-KR', { timeZone: 'UTC' }));
// // expected output: 2012. 12. 20. 오전 3:00:00

// const date1 = new Date('7/13/2010');
// const date2 = new Date('7/14/2010');
// const diffTime = Math.abs(date2 - date1);
// let seconds = Math.floor(diffTime / 1000);
// let minutes = Math.floor(seconds / 60);
// let hours = Math.floor(minutes / 60);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// console.log(hours + " milliseconds", date1, date2);
// console.log(diffDays + " days");
