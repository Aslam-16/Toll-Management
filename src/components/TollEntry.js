import react from 'react'
import {Link} from 'react-router-dom'
import {Modal} from './Modal'
import vehicleData from '../data/vehicledata.json'
import tollData from '../data/tolldata.json'
import Tableheader from './Tableheader'

class TollEntry extends react.Component{
    constructor(props){
        super(props)
        this.state={
            showModal:false,
            modalType:'vehicle',
            search:'',
            tolls:'',
            vehicles:[],
            loaded:false,
            searchparam:['tollname','vehicle_number'],
            filterparam:'All',
            
        }
    }
    //To load initial data
    componentDidMount(){
        
        let data = JSON.parse(localStorage.getItem('tolldata'))
        let vehdata = JSON.parse(localStorage.getItem('vehdata'))
        if (!data) {
            let str_toll = JSON.stringify(tollData)
            localStorage.setItem('tolldata', str_toll)

            this.setState({ tolls: tollData, loaded: true })
        }
        else {
            
            this.setState({ tolls: data, loaded: true })
        }

        if (!vehdata) {
            let str_veh = JSON.stringify(vehicleData)
            localStorage.setItem('vehdata', str_veh)
            this.setState({ vehicles: vehicleData,loaded:true})
        }
        else {
            this.setState({ vehicles: vehdata,loaded:true})
        }
    }
    //For modal
     openModal = (e) => {
        this.setState({showModal:true,modalType:e.target.name})
    };
    closeModal = () => {
        this.setState({ showModal: false, modalType:'' })
    };

   
    
    onSearch = (e) => {
        this.setState({ search: e })
    }
    filtered=(e)=>{
        this.setState({filterparam:e})
    }
    //for search and filter
    search = (items) => {
        
        return items.filter((item) => {
           
            

            if (item.tollname === this.state.filterparam) {
                return this.state.searchparam.some((newItem) => {
                    return (
                        
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(this.state.search.toLowerCase()) > -1
                    );
                });
            } else if (this.state.filterparam === "All") {
          
                return this.state.searchparam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(this.state.search.toLowerCase()) > -1
                    );
                });
            }
        });
        
    }

    render(){
        let vehicleData = this.state.vehicles.length > 0 ? this.state.vehicles:[]
        return(
           this.state.loaded && <div>
                {this.state.showModal ? <Modal closeModal={this.closeModal} modalType={this.state.modalType} tolls={this.state.tolls} vehicles={this.state.vehicles}/> : null}

                <div id='header'>
                <div id="left-header">
                <h3>Toll entries/Vehicle entries</h3>
                <span id='between'>|</span>
                        <select className="custom-select" aria-label="Filter Countries By Region" onChange={(e) => {
                            this.filtered(e.target.value);
                        }}>
        <option value="All">Filter By Toll Name</option>
                            {this.state.tolls && this.state.tolls.map((toll,i)=> <option key={i}value={toll.tollname}>{toll.tollname}</option>)}
       
        </select>
        <span className="focus"></span>
                        <input type='search' name='search' className="nosubmit" placeholder='Search Vehicle' value={this.state.search}onChange={e=>this.onSearch(e.target.value)}/>
                </div>
                    <div id="right-header">
                        <button type='button' name='vehicle'onClick={(e)=>this.openModal(e)}>Add vehicle entry</button>
                        <button type='button' name='toll' onClick={(e) => this.openModal(e)}>Add new toll</button>
                        <Link to='/tollList'> <button type='button'>View all tolls</button></Link>
                    </div>
                </div>
                <table>
                    <Tableheader type={this.state.modalType} />
                    <tbody>
                        {
            this.state.loaded && this.search(vehicleData).length > 0 ?  this.search(vehicleData).map((veh, i) => <tr key={i}>
                            <td>{veh.vehicle_type}</td>
                            <td>{veh.vehicle_number}</td>
                            <td>{veh.date}</td>
                            <td>{veh.tollname}</td>
                            <td>{veh.tariff}</td>
            </tr>) : <tr><td colSpan={5}>No such vehicle is available</td></tr> }
                       
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TollEntry