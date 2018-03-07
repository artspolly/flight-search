import '../stylesheets/ui.scss'
import React from 'react'


export const FlightSearch = (props) => {
    let _distFrom, _distTo, _fDate

    const submit = (e) => {
        e.preventDefault()       
        props.history.push('/searchResult',{distFrom : _distFrom.value,
                                           distTo: _distTo.value,
                                           fDate: _fDate.value }        
        );
    };

    return  ( 
        <form onSubmit={submit} className = "flight-search">
            <label htmlFor="distFrom">Form:</label>
            <input type="text" 
                    id="distFrom"
                    ref={input => _distFrom = input}
                    required></input>
            <label htmlFor="distTo">To:</label>
            <input type="text" 
                    id="distTo"
                    ref={input => _distTo = input}
                    required></input>
            <label htmlFor="fDate">Date:</label>
            <input type="date" 
                    id="fDate"
                    ref={input => _fDate = input}
                    required></input>
            <button>Search</button>
        </form>
    );              
    
}

