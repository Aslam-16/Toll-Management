import react from 'react'
import {Link} from 'react-router-dom'
import { Modal } from './Modal'
import vehicleData from '../data/vehicledata.json'
import tollData from '../data/tolldata.json'
let vehicleTypes = ['car_jeep_van', 'lcv', 'heavy_vehicle', 'truck_bus']
// tollData.push({
//     "tollname": "omr",
//     "car/jeep/van": [60, 30],
//     "lcv": [90, 40],
//     "truck/bus": [70, 50],
//     "heavy_vehicle": [80, 60]

// })
//console.log(localStorage.getItem('tolldata'))


class TollList extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            modalType: "",
            search:'',
            tolls: '',
            tollData: [],
            loaded: false
           
        }
    }

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
            this.setState({ tollData: vehicleData, loaded: true })
        }
        else {
            this.setState({ tollData: vehdata, loaded: true })
        }
    }
   
    openModal = (e) => {
        this.setState({ showModal: true, modalType: e.target.name })
        console.log('yes', e.target.name)
    };
    closeModal = () => {
        this.setState({ showModal: false, modalType: '' })
    };
    onSearch=(e)=>{
        console.log(e);
        this.setState({search:e})
    }
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
        return (
            <div>
                {this.state.showModal ? <Modal setShowModal={this.closeModal} modalType={this.state.modalType} tolls={this.state.tolls} tollData={this.state.tollData} /> : null}

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
                        <button type='button' name='vehicle' onClick={(e) => this.openModal(e)}>Add vehicle entry</button>
                        <button type='button' name='toll' onClick={(e) => this.openModal(e)}>Add new toll</button>
                        <Link to='/'><button type='button'>Back to vehicle logs</button></Link>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">TOLL NAME</th>
                            <th scope="col">CARE/JEEP/VAN</th>
                            <th scope="col">LCV</th>
                            <th scope="col">TRUCK/BUS</th>
                            <th scope="col">HEAVY VEHICLE</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.search(tollData).length > 0 ? this.search(tollData).map((toll,i)=><tr key={i}>
                            <td>{toll.tollname}</td>
                            <td>{toll['car_jeep_van']['singlejourney']}/{toll['car_jeep_van']['returnjourney']}</td>
                            <td>{toll.lcv[['singlejourney']]}/{toll.lcv['returnjourney']}</td>
                            <td>{toll["truck_bus"]['singlejourney']}/{toll["truck_bus"]['returnjourney']}</td>
                            <td>{toll.heavy_vehicle['singlejourney']}/{toll.heavy_vehicle['returnjourney']}</td>
                        </tr>):<tr>No such Toll is available</tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TollList