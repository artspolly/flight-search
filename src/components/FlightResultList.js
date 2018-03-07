import '../stylesheets/ui.scss'
import React from 'react'
import { FlightResultRow } from './FlightResultRow';

export const FlightResultList = (props) => {   
  
    const { error, isLoaded, data } = props;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="flight-list">
                <table>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date and Time</th>
                            <th>Price</th>
                        </tr>       
                    </thead>
                        {
                            data.map((row,i)=> {                                
                             return (
                                <tbody key={i}>
                                    <FlightResultRow key={i*1000}
                                                     resultRow = {row} /> 
                                    {
                                        row.route.map((r,k)=>
                                                <FlightResultRow key={i*1000+k}
                                                                 resultRow = {r} />
                                        ) 
                                    }   
                                </tbody>)                          
                            })                            
                        }
                </table>
            </div>
        )
    }    
}