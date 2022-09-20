
import React from "react";
import tollData from '../data/tolldata.json'
let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']

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
           for(let i=0;i<vehicleTypes.length;i++){
            let obj={
                vehicletype:'',
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
        else if (name === 'vehicleType') {

           if(value!==""){ 
            let newtype = this.state.type
            newtype[i].vehicletype = value
               newtype[i].typerror = false
            this.setState({ type: newtype })
               console.log("if",this.state.type[i]);
        }
           else {
                let newtype = this.state.type
                newtype[i].vehicletype = value
                newtype[i].typerror = true
                this.setState({ type: newtype })
                console.log(this.state.type[i]);
            }
            
        }
        


    }

    // optionfilter(items){
    //      let selectedvehicletype = this.state.type.map((name) => { if (name.vehicletype != ""){ 
    //         console.log('a');
    //         return name.vehicletype} 
    //     else{
    //          console.log('b');
    //     } }).filter(option=>option!==undefined)
        
    //     console.log(selectedvehicletype);
    //     if (selectedvehicletype.length==0){
    //         return this.state.vehicleTypes
    //     }
    //     else{
    //         let newoption = selectedvehicletype.map((type) => items.filter((veh) => veh !== type))
    //         return newoption

    //     }


        //console.log('op',newoption);
        
        
    //    // let newoption= items.filter((item,i)=>item!==selectedvehicletype[i].vehicletype
           
        

    //     //)
        
    //    // console.log(newoption,selectedvehicletype);
    //     if(newoption.length==0){
    //         return this.state.vehicleTypes
    //     }
    //     else{
    //          this.setState({vehicleTypes:newoption})
    //         return this.state.vehicleTypes
    //     }
       
    // }
    //}
    onAdd =()=>{

        if(!this.state.tollname==""){
        let obj={}
        obj["tollname"]=this.state.tollname
        let data=this.state.type
        for(let i=0;i<data.length;i++){
            let curr = this.state.type[i]
            obj[curr.vehicletype]={
                'singlejourney':curr.singlejourney,
                'returnjourney':curr.returnjourney
            }
        }

        if (!localStorage.getItem('tolldata')) {
            let tolls =this.props.tolls
            tolls.push(obj)

            let str_tolls = JSON.stringify(tolls)
            localStorage.setItem('tolldata', str_tolls)


        }
        else {
            let tolls = JSON.parse(localStorage.getItem('tolldata'))
            tolls.push(obj)
            console.log(tolls);
            let str_tolls = JSON.stringify(tolls)
            localStorage.setItem('tolldata', str_tolls)

        }
        window.location.reload()
        this.props.setShowModal()

        console.log(obj);
    }
    else{
        this.setState({tollerror:true})
    }
    }
    handleDisabledOptionClick=function (a,b) {
        console.log('Option is disabled: ', arguments);
    
    }

    render() {
        //console.log(this.optionfilter(this.state.vehicleTypes))
        const options = this.state.vehicleTypes.map((option) => {
            return (
                <option
                   name='option'
                  value={option}
                >
                    {option}
                </option>
            )
        })
        let { vehicleType } = this.state
        let a = this.state.vehicleTypes.map((type, i) =>
            <option key={i} value={type}>{type}</option>)
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
                            <input type='text' id='tollname' name='tollname' value={this.state.tollname} onChange={(e) => this.onChange(e)} />
                            {this.state.tollerror?<p>Toll name is required</p>:null}
                            <label html-for='drop-veh'>Vehicle fare details</label>
                            {vehicleTypes.map((type, i) => <div className="vehicle-fare" key={i}>

                                <select id='drop-veh' name='vehicleType' onChange={(e) => this.onChange(e,i)} 
                                    className={this.state.type[i].typerror ? 'error' : 'clear'}
                                   >
                                    <option value="" >select vehicle type</option>
                                    {
                                        options}

                                </select>
                                
                                <input type='number' name="singlejourney" className={ this.state.type[i].singlejourneyerror ? 'error' : 'clear' }value={this.state.type[i].singlejourney} onChange={(e) => this.onChange(e,i)} />
                                
                                <input type='number' name="returnjourney" className={this.state.type[i].returnjourneyerror ? 'error' : 'clear'}value={this.state.type[i].returnjourney} onChange={(e) => this.onChange(e,i)} />
                                

                            </div>)}
                           

                        </div>
                        <button type='button' className='modal-button' onClick={this.onAdd}>Add details</button>
                    </div>
                </div>
            

            )
}

    }
export default Addtoll