import { type } from "@testing-library/user-event/dist/type";
import React, { useState,useRef } from "react";

let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']

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
                type:[],
                vehicle:{
                    tollname:"",
                    vehicle_type:'',
                    vehicle_number:'',
                    tariff:'',
                    date:''
                },
                filterfromdata:'',
                filteredjourney:'',
                filteredreturn:''
                

            }
        
    }
     
    
    
    onChange=(e)=>{
        console.log(this.props.tollData);
        let name = e.target.name
        let value = e.target.value

        // let reg = /^singlejourney|returnjourney/
        // console.log(name, value);
        // if (reg.test(name)) {
        //     console.log(name);
        //     let [journey, type] = name.split('-');
        //     if (journey === 'singlejourney') {
        //         if (value !== "") {
        //             let obj = this.state.singlejourney
        //             obj[type] = value

        //             this.setState({ singlejourney: obj })
        //             this.setState({ sj: value })
        //         }
        //     }
        //     else if (journey === 'returnjourney') {
        //         if (value !== "") {
        //             let obj = this.state.returnjourney
        //             obj[type] = value

        //             this.setState({ returnjourney: obj })
        //             this.setState({ rj: value })
        //         }
        //     }

        // }
        // if(name==='tollname'){
        //     if(value!==""){
        //         this.setState({tollname:value})
        //     }
        // }
        // else if (name === 'vehicleType') {
        //     if (value !== "") {
        //         this.setState({ vehicleType: value })
        //     }
        // }

        // else if (name === 'singlejourney') {
        //     if (value !== "") {
        //         let obj=this.state.singlejourney
        //         obj[this.state.vehicleType]=value

        //         this.setState({ singlejourney: obj })
        //         //this.setState({ sj: value })
        //     }
        // }
        // else if (name === 'returnjourney') {
        //     if (value !== "") {
        //         let obj = this.state.returnjourney
        //         obj[this.state.vehicleType] = value

        //         this.setState({ returnjourney: obj })
        //         //this.setState({rj:value})
        //     }
        // }
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

        if (name === 'vehicle_tollname') {
            if (value !== "") {
                let vehicle = { ...this.state.vehicle }
                vehicle.tollname = value;
                this.setState({vehicle:vehicle})
                console.log(value);
                let filteredtoll = this.props.tolls.filter((toll) => toll.tollname === value
                                )
                this.setState({
                    filterfromdata:filteredtoll,
                    
                })
                console.log(this.state.filterfromdata,value);
            }
        }
        else if (name === 'vehicle_vehicletype') {
            if (value !== "") {
              let vehicle = { ...this.state.vehicle }
                vehicle.vehicle_type = value;
                this.setState({ vehicle: vehicle })
                console.log(this.state.filterfromdata[0][value],value);
                this.setState({filteredjourney:this.state.filterfromdata[0][value]})

            }
        }

        else if (name === 'vehicle_number') {
            //let vehicle = { ...this.state.vehicle }
            
               let vehicle = { ...this.state.vehicle }
                vehicle.vehicle_number = value
                
                
                console.log(1);
                if(value.split('').length>=9){
                let filteredveh=this.props.tollData.filter((veh)=>veh.vehicle_number===value)
                    console.log(2);
                
                    if (filteredveh.length == 0 || filteredveh.length % 2 == 0){
                    vehicle.tariff = this.state.filteredjourney['singlejourney']
                        vehicle.date = new Date().toLocaleString()
                        this.setState({ vehicle: vehicle })
                    //this.onTariff('tariff', this.state.filteredjourney['singlejourney'])
                    console.log(this.state.tariff, this.state.filteredjourney['singlejourney']);
                    console.log(3);
                    vehicle.vehicle_number = value
                   
                }
                else if (filteredveh.length%2!=0){
                    let num=value
                        let curTime = new Date().toLocaleString()
                        let tollTime=this.props.tollData.filter((toll)=>toll.vehicle_number==num)
                        tollTime=tollTime[tollTime.length-1].date 
                        
                        console.log(new Date(curTime) - new Date(tollTime), new Date(curTime) , new Date(tollTime))
                         const diffTime = new Date(curTime) - new Date(tollTime)
                         let seconds = Math.floor(diffTime / 1000);
                                 let minutes = Math.floor(seconds / 60);
                                 let hours = Math.floor(minutes / 60);
                        console.log(hours)
                        vehicle.date=new Date().toLocaleString()

                        vehicle.tariff = hours <= 1 ? this.state.filteredjourney['singlejourney'] - this.state.filteredjourney['returnjourney'] : this.state.filteredjourney['singlejourney']
                        this.setState({ vehicle: vehicle })
                }
            }
            else{
                    vehicle.tariff =""
                    vehicle.vehicle_number=value
                    this.setState({ vehicle: vehicle })
            }
                
                
                //this.setState({ vehicle: vehicle })
                //console.log(filteredveh)
            
               

        
             //vehicle.vehicleNumber = value
             //this.setState({ vehicle: vehicle })
        }
        // else if (name === 'tariff') {
        //     let vehicle = { ...this.state.vehicle }
        //     vehicle.tariff = value;
        //     this.setState({ vehicle: vehicle })
        // }
        
        
        //console.log(this.state)
    }
    onTariff(name,value){
    let vehicle = { ...this.state.vehicle }
             vehicle.tariff = value;
            this.setState({ vehicle: vehicle })
    }
    onAddToll=()=>{
        if (!localStorage.getItem('vehdata')) {
            let vehicleData=this.props.tollData
            vehicleData.push(this.state.vehicle)
            let str_veh = JSON.stringify(vehicleData)
            localStorage.setItem('vehdata', str_veh)
            
            console.log('l1');
           
        }
        else {
            let vehicleData = JSON.parse(localStorage.getItem('vehdata'))
            vehicleData.push(this.state.vehicle)
            let str_veh = JSON.stringify(vehicleData)
            localStorage.setItem('vehdata', str_veh)
            console.log('log-2');

        }
        window.location.reload()
        this.props.setShowModal()
        

    }
    
  render(){
    let {vehicleType}=this.state
    
    if(this.props.modalType==='vehicle')
    return (
        <div className="container">
            <div className="modal">
                <h2>Add new Entry</h2>
                <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                <div id='modal-main'>
                <label html-for ='drop-toll'>Select toll name</label>
                <select id='drop-toll' name='vehicle_tollname' onChange={(e)=>this.onChange(e)}>
                        <option value="">select vehicle type</option>
                        {this.props.tolls && this.props.tolls.map((toll,i)=> <option key={i} value={toll.tollname}>{toll.tollname}</option>)}

                </select>
                <label html-for='drop-veh'>Select vehicle type</label>
                    <select id='drop-veh' name='vehicle_vehicletype' onChange={(e) => this.onChange(e)}>
                        <option value="">select vehicle type</option>
                        {
                            vehicleTypes.map((type, i) => 
                                <option key={i}value={type}>{type}</option>)}
                    

                </select>
                <label html-for='veh-number'>Vehicle Number</label>
                    <input type='text' name='vehicle_number' value={this.state.vehicle.vehicle_number} onChange={(e) => this.onChange(e)} />
                <label html-for='tariff'>Tariff</label>
                    <input type='text' name='tariff' value={this.state.vehicle.tariff} onChange={(e) => this.onChange(e)} disabled={true}/>
                    
                </div>
                <button type='button' className='modal-button' onClick={this.onAddToll}>Add new toll</button>
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
                    <label html-for='tollname'>Toll Name</label>
                    <input type='text' id='tollname' name='tollname' value={this.state.tollname} onChange={(e)=>this.onChange(e)}/>
                    <label html-for='drop-veh'>Vehicle fare details</label>
                   <div className="vehicle-fare">
                    
                        <select id='drop-veh'  name='vehicleType'onChange={(e) => this.onChange(e)} ref={this.callRef}>
                            <option value="" >select vehicle type</option>
                            {
                                vehicleTypes.map((type, i) =>
                                    <option key={i} value={type}>{type}</option>)}
                                    {console.log('aslam')}
                        
                    </select>
                        <input type='text' name="singlejourney-0" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                        <input type='text' name="returnjourney-0" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="vehicle-fare">

                        <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
                            <option value="" >select vehicle type</option>
                            {
                                vehicleTypes.map((type, i) =>
                                    <option key={i} value={type}>{type}</option>)}

                        </select>
                        <input type='text' name="singlejourney-1" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                        <input type='text' name="returnjourney-1" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="vehicle-fare">

                        <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
                            <option value="" >select vehicle type</option>
                            {
                                vehicleTypes.map((type, i) =>
                                    <option key={i} value={type}>{type}</option>)}

                        </select>
                        <input type='text' name="singlejourney-2" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                        <input type='text' name="returnjourney-2" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="vehicle-fare">

                        <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)}>
                            <option value="" >select vehicle type</option>
                            {
                                vehicleTypes.map((type, i) =>
                                    <option key={i} value={type}>{type}</option>)}

                        </select>
                        <input type='text' name="singlejourney-3" value={this.state.singlejourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                        <input type='text' name="returnjourney-3" value={this.state.returnjourney[vehicleType]} onChange={(e) => this.onChange(e)} />
                    </div>
                   
                </div>
                <button type='button' className='modal-button'>Add details</button>
            </div>
        </div>
    )
   
}
}