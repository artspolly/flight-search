import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {FlightSearch} from './components/FlightSearch'
import {FlightResultPaginator} from './components/FlightResultPaginator'

const routes = (
    <BrowserRouter >
        <div>
            <Route exact path="/" component = {FlightSearch}/>
            <Route path="/searchResult"  component = {FlightResultPaginator}/>   
        </div>
    </BrowserRouter>
)

export default routes