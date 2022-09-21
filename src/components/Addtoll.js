
import React from "react";
import tollData from '../data/tolldata.json'
let vehicleType = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']
let vehicleTypes = [{ id: 0, vehicle: 'car_jeep_van', disabled: false }, { id: 1, vehicle: 'lcv', disabled: false },
    { id: 2, vehicle: 'heavy_vehicle', disabled: false }, { id: 3, vehicle: 'truck/bus', disabled: false }]

export class Addtoll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tollname: '',
            type: [],
            vehicleTypes:[],
            tollerror:false,

            
           
        }

    }

    componentDidMount(){
        this.setState({vehicleTypes:vehicleTypes})
        let arr=[]
           for(let i=0;i<vehicleType.length;i++){
            let obj={
                vehicletype:vehicleType[i],
                singlejourney:'',
                returnjourney:'',
                singljourneyerror:false,
                returnjourneyerror:false,
                typerror:false
                
            }
            arr.push(obj)

            
            
           }
        this.setState({
            type: arr
        })
    
    }

    optionfilter(items) {
        let selectedvehicletype = this.state.type.map((name) => {
            if (name.vehicletype != "") {
                console.log('a');
                return name.vehicletype
            }
            else {
                console.log('b');
            }
        }).filter(option => option !== undefined)

        console.log(selectedvehicletype);
        if (selectedvehicletype.length == 0) {
            return this.state.vehicleTypes
        }
        else {
            let newoption = selectedvehicletype.map((type) => items.filter((veh) => veh !== type))

            console.log([...newoption]);
            return newoption[0]

        }
    }

    onChange = (e,i=0) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'tollname') {
            if(value!==""){
                this.setState({tollname:value,tollerror:false})
            }
            else {
                this.setState({ tollname: value,tollerror:true })
            }
        }
        if(name==='singlejourney'){
            if(value!==""){
                let newtype = this.state.type
                newtype[i].singlejourney = value
                newtype[i].singlejourneyerror = false
            


            this.setState({type:newtype} )
            }
            else{
                let newtype = this.state.type
                newtype[i].singlejourney = value
                newtype[i].singlejourneyerror = true

                this.setState({ type: newtype})

            }

        }
        else if (name === 'returnjourney') {


           
            if(value!=="") {
                let newtype = this.state.type
                newtype[i].returnjourney = value
                newtype[i].returnjourneyerror = false

            this.setState({ type: newtype})
            }
            else{
                let newtype = this.state.type
                newtype[i].returnjourney = value
                newtype[i].returnjourneyerror = true
                this.setState({ type: newtype})
            }
     
        }
        
        


    }

   
    onAdd =()=>{

        if(!this.state.tollname==""){
        let obj={}
        obj["tollname"]=this.state.tollname
        let data=this.state.type
        for(let i=0;i<data.length;i++){
            let curr = this.state.type[i]
            console.log(curr['vehicletype'])
            // if(curr['vehicletype']==""){
            //     console.log('hii');
            //     data[i].typerror=true
            //     console.log('hii',data);
            //     this.setState({ type: data})
                
            // }

             if (curr['singlejourney'] == ""){
                data[i].singlejourneyerror = true
                this.setState({ type: data })
            }
             if (curr['returnjourney'] == "") {
                data[i].returnjourneyerror = true
                this.setState({ type: data })
            }
            else{
            
            obj[curr.vehicletype]={
                'singlejourney':curr.singlejourney,
                'returnjourney':curr.returnjourney
            
            }
        }
            
        }
        let keycount = Object.keys(obj)
        if(keycount.length==5){
        if (!localStorage.getItem('tolldata')) {
            let tolls =this.props.tolls
            tolls.push(obj)

            let str_tolls = JSON.stringify(tolls)
            localStorage.setItem('tolldata', str_tolls)
            window.location.reload()
            this.props.setShowModal()


        }
        else {
            let tolls = JSON.parse(localStorage.getItem('tolldata'))
            tolls.push(obj)
            console.log(tolls);
            let str_tolls = JSON.stringify(tolls)
            localStorage.setItem('tolldata', str_tolls)
            window.location.reload()
            this.props.setShowModal()

        }
    }
       

        console.log(obj,keycount);
    }
    else{
        this.setState({tollerror:true})
    }
    }
    handleDisabledOptionClick=(a,i)=>{
        console.log('Option is disabled: ',a);
    
    }

    render() {
        //console.log(this.optionfilter(this.state.vehicleTypes))
       
       
        //console.log(this.state.type);

        if(this.state.type.length===0){
            return (
                <h4>Loading</h4>
            )
        }
       else
            return ( 
                <div className="container">
                    <div className="modal">
                        <h2>Add new Toll</h2>
                        <button onClick={() => this.props.setShowModal()} id='modal-close'>X</button>
                        <div id='modal-main'>
                            <label html-for='tollname'>Toll Name</label>
                            <input type='text' id='tollname' placeholder="Toll Name" name='tollname' value={this.state.tollname} onChange={(e) => this.onChange(e)} />
                            {this.state.tollerror?<p>Toll name is required</p>:null}
                            <label html-for='drop-veh'>Vehicle fare details</label>
                            {this.state.vehicleTypes.map.length>0 && this.state.vehicleTypes.map((type, i) => <div className="vehicle-fare" key={i}>

                                <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e,type.id)} 
                                    className={this.state.type[i].typerror ? 'error' : 'clear'} disabled={true}
                                   >
                                    <option value="" >{type.vehicle}</option>
                                    {/* {this.state.vehicleTypes.map((option,i) => {
                                        return (
                                            <option key={i}
                                                name='option'
                                                value={option.vehicle}
                                                disabled={option.disabled}
                                                onClick={() => this.handleDisabledOptionClick(option,i)}
                                            >
                                                {option.vehicle}
                                            </option>
                                        )
                                    })} */}

                                </select>
                                
                                <input type='number' name="singlejourney" placeholder="Single Journey"className={ this.state.type[i].singlejourneyerror ? 'error' : 'clear' }value={this.state.type[i].singlejourney} onChange={(e) => this.onChange(e,i)} />
                                
                                <input type='number' name="returnjourney" placeholder="Return Journey"className={this.state.type[i].returnjourneyerror ? 'error' : 'clear'}value={this.state.type[i].returnjourney} onChange={(e) => this.onChange(e,i)} />
                                

                            </div>)}
                           

                        </div>
                        <button type='button' className='modal-button' onClick={this.onAdd}>Add details</button>
                    </div>
                </div>
            

            )
}

    }
export default Addtoll