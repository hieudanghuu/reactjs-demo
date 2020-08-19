import React, { Component } from 'react';

class Search extends Component {
  constructor(){
    super()
    this.state={
      keyword : ''
    }
  }
  Onchange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    })
  }
  onSearch = () => {
    this.props.onSearch(this.state.keyword)
  }
  render() {
    return (
      <div className="input-group md-form form-sm form-2 pl-0 col-8">
        <input className="form-control my-0 py-1 red-border" 
        type="text" placeholder="Search" 
        aria-label="Search"
        name = 'keyword' 
        value = { this.state.keyword }
        onChange = { this.Onchange }
        />
        <div className="input-group-append">
          <span className="input-group-text red lighten-3" onClick= { this.onSearch } >
            <i 
          className="fa fa-search text-grey"
            aria-hidden="true"></i></span>
        </div>
      </div>
    );
  }
}

export default Search;
