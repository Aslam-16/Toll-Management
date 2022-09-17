import React, { useRef } from "react";

export const Modal = ({ setShowModal,modalType }) => {
    
    if(modalType==='vehicle')
    return (
        <div className="container">
            <div className="modal">
                <h2>Add new Entry</h2>
                <button onClick={() => setShowModal()} id='modal-close'>X</button>
                <div id='modal-main'>
                <label for ='drop-toll'>Select toll name</label>
                <select id='drop-toll'>
                    <option value='chengal'>chengal</option>
                    <option value='ecr'>ECR</option>
                    <option value='omr'>OMR</option>
                </select>
                <label for='drop-veh'>Select vehicle type</label>
                <select id='drop-veh'>
                    <option value='jeep/van/bike'>JEEP/VAN/BIKE</option>
                    <option value='bus'>bus</option>
                    <option value='lorry'>LORRY</option>

                </select>
                <label for='veh-number'>Vehicle Number</label>
                <input type='text' id='veh-number'/>
                <label for='tariff'>Tariff</label>
                <input type='text' id='tariff' />
                    
                </div>
                <button type='button' class='modal-button'>Add new toll</button>
            </div>
        </div>
    
    )
    else 
    return (
        <div className="container">
            <div className="modal">
                <h2>Add new Toll</h2>
                <button onClick={() => setShowModal()} id='modal-close'>X</button>
                <div id='modal-main'>
                    <label for='toll_name'>Toll Name</label>
                    <input type='text' id='toll_name' />
                    <label for='drop-veh'>Vehicle fare details</label>
                    <div className="vehicle-fare">
                    
                    <select id='drop-veh'>
                        <option value=''>select vehicle type</option>

                        <option value='jeep/van/bike'>JEEP/VAN/BIKE</option>
                        <option value='bus'>bus</option>
                        <option value='lorry'>LORRY</option>
                        <option value='heavy'>HEAVY</option>

                    </select>
                    <input type='text' id='single' />
                    <input type='text' id='return' />
                    </div>
                    <div className="vehicle-fare">
                        
                        <select id='drop-veh'>
                            <option value=''>select vehicle type</option>
                            <option value='jeep/van/bike'>JEEP/VAN/BIKE</option>
                            <option value='bus'>bus</option>
                            <option value='lorry'>LORRY</option>
                            <option value='heavy'>HEAVY</option>

                        </select>
                        <input type='text' id='single' />
                        <input type='text' id='return' />
                    </div>
                    <div className="vehicle-fare">
                       
                        <select id='drop-veh'>
                            <option value=''>select vehicle type</option>
                            <option value='jeep/van/bike'>JEEP/VAN/BIKE</option>
                            <option value='bus'>bus</option>
                            <option value='lorry'>LORRY</option>
                            <option value='heavy'>HEAVY</option>

                        </select>
                        <input type='text' id='single' />
                        <input type='text' id='return' />
                    </div>
                    
                    <div className="vehicle-fare"> 
                        <select id='drop-veh'>
                            <option value=''>select vehicle type</option>
                            <option value='jeep/van/bike'>JEEP/VAN/BIKE</option>
                            <option value='bus'>bus</option>
                            <option value='lorry'>LORRY</option>
                            <option value='heavy'>HEAVY</option>

                        </select>
                        <input type='text' id='single' />
                        <input type='text' id='return' />
                    </div>

                </div>
                <button type='button' class='modal-button'>Add details</button>
            </div>
        </div>
    )
   
}