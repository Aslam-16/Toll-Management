import react from 'react'
import {Link} from 'react-router-dom'
import {Modal} from './Modal'
import vehicleData from '../data/vehicledata.json'
import tollData from '../data/tolldata.json'



class TollEntry extends react.Component{
    constructor(props){
        super(props)
        this.state={
            showModal:false,
            modalType:"",
            filterToggle: false,
            search:'',
            tolls:'',
            tollData:[],
            loaded:false,
            searchparam:['tollname','vehicle_number'],
            filterparam:['All'],
            
        }
    }
    
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
            this.setState({ tollData: vehicleData,loaded:true})
        }
        else {
            this.setState({ tollData: vehdata,loaded:true})
        }
    }

     openModal = (e) => {
        this.setState({showModal:true,modalType:e.target.name})
    };
    closeModal = () => {
        this.setState({ showModal: false, modalType:'' })
    };
    toggle = () => {
        this.setState({ filterToggle: !this.state.filterToggle })
    };
    
    onSearch = (e) => {
        this.setState({ search: e })
    }
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
        let vehicleData = this.state.tollData.length > 0 ? this.state.tollData:[]
        return(
           this.state.loaded && <div>
                {this.state.showModal ? <Modal setShowModal={this.closeModal} modalType={this.state.modalType} tolls={this.state.tolls} tollData={this.state.tollData}/> : null}

                <div id='header'>
                <div id="left-header">
                <h3>Toll entries/Vehicle entries</h3>
                <span id='between'>|</span>
                        <select className="custom-select" aria-label="Filter Countries By Region" onChange={(e) => {
                            this.filtered(e.target.value);
                        }}>
        <option value="All">Filter By Region</option>
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
                    <thead>
                        <tr>
                            <th scope="col">VEHICLE TYPE</th>
                            <th scope="col">VEHICLE NUMBER</th>
                            <th scope="col">DATE/TIME</th>
                            <th scope="col">TOLL NAME</th>
                            <th scope="col">TARIFF</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loaded && this.search(vehicleData).length > 0 ? this.search(vehicleData).map((veh, i) => <tr key={i}>
                            <td>{veh.vehicle_type}</td>
                            <td>{veh.vehicle_number}</td>
                            <td>{veh.date}</td>
                            <td>{veh.tollname}</td>
                            <td>{veh.tariff}</td>
                        </tr>) : <tr>No such vehicle is available</tr>}
                       
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TollEntry