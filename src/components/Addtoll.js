
import React from "react";
let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']

export class Addtoll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tollname: '',
            vehicleType: '',
            singlejourney: {
                car_jeep_van: "",
                lcv: "",
                heavy_vehicle: "",
                truck_bus: ""
            },
            returnjourney: {
                car_jeep_van: "",
                lcv: "",
                heavy_vehicle: "",
                truck_bus: ""
            },
            sj: '',
            rj: '',
            type: [],
           
        }

    }



    onChange = (e) => {
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

    }

    render() {
        let { vehicleType } = this.state

       
            return ( 
                <div className="container">
                    <div className="modal">
                        <h2>Add new Toll</h2>
                        <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                        <div id='modal-main'>
                            <label html-for='tollname'>Toll Name</label>
                            <input type='text' id='tollname' name='tollname' value={this.state.tollname} onChange={(e) => this.onChange(e)} />
                            <label html-for='drop-veh'>Vehicle fare details</label>
                            <div className="vehicle-fare">

                                <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e)} ref={this.callRef}>
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
export default Addtoll