import React, { Component } from 'react';
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component{
  render(){
    return (
        <div className="control-form pt-2 row">
            <Search onSearch = {this.props.onSearch}/>
            <Sort sortTable = { this.props.sortTable } sort = {this.props.sort}/>
        </div>
    );
  }
}

export default Control;
