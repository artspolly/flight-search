import '../stylesheets/ui.scss'
import React from 'react'
import {FromToSuggestions} from './FromToSuggestions'


export class FlightSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query:'',
            resultsFrom:[],
            resultsTo:[]
        }
        this.submit = this.submit.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this); 
    }

    submit = (e) => {
        e.preventDefault() 
        this.props.history.push('/searchResult',{   
                                                    distFrom : this.state.distFrom,
                                                    distTo: this.state.distTo,
                                                    fDate: this._fDate.value 
                                                }        
        );
    };

    handleInputChange = (value,id) => {      
        this.setState({query: value},
                      () => {this.loadSuggestion(id)} 
        )
        this.setState({[id]: value});
    }

    loadSuggestion=(direction)=> {
        fetch("https://api.skypicker.com/locations/?term="+ this.state.query+"&v=2&locale=en-US&limit=7")
         .then(res => res.json())
         .then(
           (result) => {
               if (direction == "distFrom"){
                this.setState({
                    resultsFrom: result.locations,
                    resultsTo:[]               
                });
               } 
                else {
                    this.setState({
                        resultsTo: result.locations,
                        resultsFrom:[]               
                    });
                }
                   
           });
    }
	

    render(){
        return  ( 
            <form onSubmit={this.submit} className = "flight-search" autoComplete="off">
                <label htmlFor="distFrom">Form:</label>
                <FromToSuggestions type="text" 
                        id="distFrom"
                        onChange={this.handleInputChange}
                        options={this.state.resultsFrom}
                        required />
                <label htmlFor="distTo">To:</label>
                <FromToSuggestions 
                        id="distTo"
                        onChange={this.handleInputChange}
                        options={this.state.resultsTo}
                        required/>
                <label htmlFor="fDate">Date:</label>
                <input type="date" 
                        id="fDate"
                        ref={input => this._fDate = input}
                        required></input>
                <button>Search!</button>
            </form>
        );      
    }
}

