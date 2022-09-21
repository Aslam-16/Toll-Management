import React from 'react'

export default function Tableheader({type}) {
   let vehicleheader =  ['VEHICLE TYPE', 'VEHICLE NUMBER', 'DATE/TIME', 'TOLL NAME', 'TARIFF'];
   let tollheader =  ['TOLL NAME', 'CARE/JEEP/VAN', 'LCV', 'TRUCK/BUS', 'HEAVY VEHICLE','DELETE']
  return (
      <thead>
          <tr>
              {type==="vehicle"?vehicleheader.map((value,id)=><th key ={id}scope="col">{value}</th>):
                  tollheader.map((value, id) => <th key={id} scope="col">{value}</th>) }
              </tr>
      </thead>
  )
}
