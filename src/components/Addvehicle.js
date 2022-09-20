
import React from "react";

let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']

export class Addvehicle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicle: {
                tollname: "",
                vehicle_type: '',
                vehicle_number: '',
                tariff: '',
                date: ''
            },
            filterfromdata: '',
            filteredjourney: '',
            filteredreturn: '',
            disabled:true,
            valueerror:false,
            typeerror:true,
            numbererror:true,
            lengtherror:false,
            buttonerror:true,
            vehicletypeerror:false,
            tollerror:false



        }

    }



    onChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let vehicle = { ...this.state.vehicle }
        if (name === 'vehicle_tollname') {
            if (value !== "") {
                
                vehicle.tollname = value;
                this.setState({ vehicle: vehicle })
                let filteredtoll = this.props.tolls.filter((toll) => toll.tollname === value
                )
                this.setState({
                    filterfromdata: filteredtoll,
                    typeerror:false,
                    tollerror:false

                })
            }else{
                vehicle.tollname = value;
                this.setState({
                    vehicle: vehicle,
                    typeerror: true,
                    tollerror:true

                })
            }
        }
        else if (name === 'vehicle_vehicletype') {
            let vehicle = { ...this.state.vehicle }
            
            if (value !== "") {
                vehicle.vehicle_type = value;
                vehicle.tariff = this.state.filterfromdata[0][value]['singlejourney']
                this.setState({ vehicle: vehicle, filteredjourney: this.state.filterfromdata[0][value], numbererror: false, vehicletypeerror: false  })

            }
            else{

                vehicle.tariff=""
                vehicle.vehicle_type = value;
                this.setState({ vehicle: vehicle, numbererror: true, vehicletypeerror: true, buttonerror: true})

            }
        }

        else if (name === 'vehicle_number') {

            let vehicle = { ...this.state.vehicle }
            if(value!==""){
            

                vehicle.vehicle_number = value
            if (value.split('').length >= 6) {
                let filteredveh = this.props.tollData.filter((veh) => veh.vehicle_number.toUpperCase() === value.toUpperCase())

                if (filteredveh.length === 0 || filteredveh.length % 2 === 0) {
                    vehicle.tariff = this.state.filteredjourney['singlejourney']
                    vehicle.date = new Date().toLocaleString()
                    vehicle.vehicle_number = value.toUpperCase()
                    this.setState({ vehicle: vehicle, valueerror: false, lengtherror: false, buttonerror: false })
                    
                    

                }
                else if (filteredveh.length % 2 !== 0) {
                    let num = value.toUpperCase()
                    let curTime = new Date().toLocaleString()
                    let tollTime = this.props.tollData.filter((toll) => toll.vehicle_number.toUpperCase() === num)
                    tollTime = tollTime[tollTime.length - 1].date

                    
                    const diffTime = new Date(curTime) - new Date(tollTime)
                    let seconds = Math.floor(diffTime / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);

                    vehicle.date = new Date().toLocaleString()

                    vehicle.tariff = hours <= 1 ? this.state.filteredjourney['singlejourney'] - this.state.filteredjourney['returnjourney'] : this.state.filteredjourney['singlejourney']
                    this.setState({ vehicle: vehicle, valueerror: false, lengtherror: false, buttonerror: false })
                }
            }
            else {
                vehicle.tariff = ""
                vehicle.vehicle_number = value
                this.setState({ vehicle: vehicle, valueerror: false, lengtherror: true, buttonerror: true })
            }
                
        }
        else{
                vehicle.vehicle_number = value
                this.setState({ vehicle: vehicle, valueerror: true, lengtherror: false, buttonerror: true })

        }



        }
        // if ( !this.state.numbererror 
        //     && !this.state.lengtherror){
        //     this.setState({buttonerror:false})}
        // else {
        //     this.setState({ buttonerror: true })
        // }
    }
   
    onAddToll = () => {

        if (!this.state.vehicletypeerror && !this.state.valueerror && !this.state.typeerror && !this.state.numbererror
            && !this.state.lengtherror) {

            if (!localStorage.getItem('vehdata')) {
                let vehicleData = this.props.tollData
                vehicleData.push(this.state.vehicle)
                let str_veh = JSON.stringify(vehicleData)
                localStorage.setItem('vehdata', str_veh)


            }
            else {
                let vehicleData = JSON.parse(localStorage.getItem('vehdata'))
                vehicleData.push(this.state.vehicle)
                let str_veh = JSON.stringify(vehicleData)
                localStorage.setItem('vehdata', str_veh)

            }
            window.location.reload()
            this.props.setShowModal()


            }
            else{
                alert('Fill all the required fields')
            }
       
    }

    render() {

            return (
                <div className="container">
                    <div className="modal">
                        <h2>Add new Entry</h2>
                        <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                        <div id='modal-main'>
                            <label html-for='drop-toll'>Select toll name</label>
                            <select id='drop-toll' name='vehicle_tollname' onChange={(e) => this.onChange(e)}>
                                <option value="">select toll</option>
                                {this.props.tolls && this.props.tolls.map((toll, i) => <option key={i} value={toll.tollname}>{toll.tollname}</option>)}

                            </select>
                            {this.state.tollerror ? <p>Tollname is required</p> : null} 
                            {/* {this.state.tollerror?<p>this field is required</p>:null} */}
                            <label html-for='drop-veh'>Select vehicle type</label>
                            <select id='drop-veh' name='vehicle_vehicletype' onChange={(e) => this.onChange(e)} disabled={this.state.typeerror}>
                                <option value="">select vehicle type</option>
                                {
                                    vehicleTypes.map((type, i) =>
                                        <option key={i} value={type}>{type}</option>)}


                            </select>
                            {this.state.vehicletypeerror? <p>Vehicle type is required</p> : null}
                            <label html-for='veh-number'>Vehicle Number</label>
                            <input type='text' name='vehicle_number' value={this.state.vehicle.vehicle_number} onChange={(e) => this.onChange(e)} disabled={this.state.numbererror} />
                             {this.state.valueerror ? <p>vehicle number is required</p> : null} 
                            {this.state.lengtherror ? <p>Number should be greater than 6</p> : null} 
                            <label html-for='tariff'>Tariff</label>
                            <input type='text' name='tariff' value={this.state.vehicle.tariff} onChange={(e) => this.onChange(e)} disabled={true} />

                        </div>
                        <button type='button' className='modal-button' onClick={this.onAddToll} disabled={this.state.buttonerror}>Add new Vehicle</button>
                    </div>
                </div>

            )
       
            

    }
}
export default Addvehicle