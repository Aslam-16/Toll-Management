import react from 'react'
import {Link} from 'react-router-dom'
import { Modal } from './Modal'
import Tableheader from './Tableheader'
import vehicleData from '../data/vehicledata.json'
import tollData from '../data/tolldata.json'




class TollList extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            modalType: "",
            search:'',
            tolls: '',
            vehicles: [],
            loaded: false
           
        }
    }
    //to load initial data
    componentDidMount() {
        console.log();
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
            this.setState({ vehicles: vehicleData, loaded: true })
        }
        else {
            this.setState({ vehicles: vehdata, loaded: true })
        }
        
    }
   
    openModal = (e) => {
        this.setState({ showModal: true, modalType: e.target.name })
    };
    closeModal = () => {
        this.setState({ showModal: false, modalType: '' })
    };
    onSearch=(e)=>{
        console.log(e);
        this.setState({search:e})
    }

    //searching
    search=(items) =>{
    return items.filter((item) => {
        
            return (
                item["tollname"]
                    .toString()
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) > -1
            );
        
    });
} 
    render() {
        if(!this.state.loaded){
            return <>Loading!...</>
        }
        return (
            <div>
                {this.state.showModal ? <Modal closeModal={this.closeModal} modalType={this.state.modalType} tolls={this.state.tolls} vehicles={this.state.vehicles} /> : null}

                <div id='header'>
                    <div id="left-header">
                        <h3 style={{width:160,gap:0}}>Tollgate List</h3>
                        <span id='between'>|</span>
                        <input type='search' name='search' className="nosubmit" placeholder='Search a toll' 
                        value={this.state.search} 
                            onChange={(e) => this.onSearch(e.target.value)}
                        />
                    </div>
                    <div id="right-header">
                        <button type='button'  name='vehicle' onClick={(e) => this.openModal(e)}>Add vehicle entry</button>
                        <button type='button' name='toll' onClick={(e) => this.openModal(e)}>Add new toll</button>
                        <Link to='/'><button type='button'>Back to vehicle logs</button></Link>
                    </div>
                </div>
                <table>
                    <Tableheader type={this.state.modalType}  />

                   
                    <tbody>
                        {this.search(this.state.tolls).length > 0 ? this.search(this.state.tolls).map((toll,i)=><tr key={i}>
                            <td>{toll.tollname}</td>
                            <td>{toll['car/jeep/van']['singlejourney']}/{toll['car/jeep/van']['returnjourney']}</td>
                            <td>{toll.lcv[['singlejourney']]}/{toll.lcv['returnjourney']}</td>
                            <td>{toll["truck/bus"]['singlejourney']}/{toll["truck/bus"]['returnjourney']}</td>
                            <td>{toll.heavy_vehicle['singlejourney']}/{toll.heavy_vehicle['returnjourney']}</td>
                        </tr>) : <tr><td colSpan={5}>No such toll is available</td></tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TollList