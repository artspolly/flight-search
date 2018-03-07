import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import {FlightResultList} from './FlightResultList'
import '../stylesheets/paginate.css'


export class FlightResultPaginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      perPage: 5,
      isLoaded: false,
      error: null
    }
  }

createRenderObject = (result) => {
    return result.map(
            (row) => {
              return  {
                    distFrom : row.cityFrom,
                    distTo: row.cityTo,
                    route: row.route.map((r)=>{
                        return {
                            distFrom: r.cityFrom,
                            distTo: r.cityTo,
                            fDateTime: this.convertToTime(r.dTime), 
                            price:""
                        }
                    }),
                    price: row.conversion.EUR,
                    fDateTime: ""                  
                }
            })
}
convertToTime(unix_timestamp){
    let date = new Date(unix_timestamp*1000);
    return Intl.DateTimeFormat('en-GB').format(date) +' '
            + date.getHours() + ':' + ("0" + date.getMinutes()).substr(-2);

}

  loadSearchData() {
    const {distFrom,distTo,fDate} =  this.props.location.state;
    const params = "flyFrom=" + distFrom + "&to=" + distTo 
                    + "&dateFrom=" + new Intl.DateTimeFormat('en-GB').format(Date.parse(fDate))
                    + "&dateTo=" +  new Intl.DateTimeFormat('en-GB').format(Date.parse(fDate))
                    + "&limit=" + this.state.perPage+ "&offset=" +this.state.offset; 
    console.log(params);
    fetch("https://api.skypicker.com/flights?"+params)
         .then(res => res.json())
         .then(
           (result) => {
            this.setState({
               isLoaded: true,
               data:  this.createRenderObject(result.data),
               pageCount: Math.ceil(result._results / this.state.perPage)
             });
           },
           (error) => {
             this.setState({
               isLoaded: true,
              error
             });
           }
         )     
  }

  componentDidMount() {
    this.loadSearchData();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({offset: offset}, () => {
      this.loadSearchData();
    });
  };

  render() {
    return (
      <div>
        <FlightResultList data={this.state.data} 
                          error = {this.state.error}
                          isLoaded = {this.state.isLoaded}/>
        <div id="react-paginate">
            <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
        </div>
        <a href="/">Back To Search</a>
      </div>
    );
  }
};

