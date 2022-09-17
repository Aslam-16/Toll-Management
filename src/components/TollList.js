import react from 'react'
import {Link} from 'react-router-dom'
import { Modal } from './Modal'

class TollList extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            modalType: ""
        }
    }
    openModal = (e) => {
        this.setState({ showModal: true, modalType: e.target.name })
        console.log('yes', e.target.name)
    };
    closeModal = () => {
        this.setState({ showModal: false, modalType: '' })
    };

    render() {
        return (
            <div>
                {this.state.showModal ? <Modal setShowModal={this.closeModal} modalType={this.state.modalType} /> : null}

                <div id='header'>
                    <div id="left-header">
                        <h3 style={{width:160,gap:0}}>Tollgate List</h3>
                        <span id='between'>|</span>
                        <input type='search' name='search' class="nosubmit" placeholder='Search a toll' />
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
                        <tr>
                            <td>Visa - 3412</td>
                            <td>04/01/2016</td>
                            <td>$1,190</td>
                            <td>03/01/2016 - 03/31/2016</td>
                        </tr>
                        <tr>
                            <td>Visa - 6076</td>
                            <td>03/01/2016</td>
                            <td>$2,443</td>
                            <td>02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td>Corporate AMEX</td>
                            <td>03/01/2016</td>
                            <td>$1,181</td>
                            <td>02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td>Visa - 3412</td>
                            <td>02/01/2016</td>
                            <td>$842</td>
                            <td>01/01/2016 - 01/31/2016</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TollList