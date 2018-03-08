import React from 'react'

export class FromToSuggestions extends React.Component {
    onFieldChange(event) {
        this.props.onChange(event.target.value,event.target.id);
    }

    render() {
        return(
            <div>
                <input  id={this.props.id}
                        type="text" 
                        list= {"destination-list-"+this.props.id}                        
                        onChange={this.onFieldChange.bind(this)} />
                <datalist id={"destination-list-"+this.props.id}>
                    {this.props.options.map(
                        (op,i)=><option key={i}>{op.name}</option>
                    )}
                </datalist>
            </div>
        )
    }

}

export default FromToSuggestions