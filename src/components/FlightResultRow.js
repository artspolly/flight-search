import React from 'react'

export const FlightResultRow = ({resultRow}) => {

    return (
        <tr>
            <td>{resultRow.distFrom}</td>
            <td>{resultRow.distTo}</td>
            <td>{resultRow.fDateTime}</td>
            <td>{resultRow.price}</td>
        </tr>
    )
}