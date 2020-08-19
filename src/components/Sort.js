import React, { Component } from 'react';

class Sort extends Component {
  sortTable = (name,status) => {
    this.props.sortTable(name,status)
  }
  
  render() {
    return (

      <div className="btn-group">
        <button type="button" className="btn btn-primary">Sắp Xếp</button>
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
        </button>
        <div className="dropdown-menu">
          <a className= 
            {(this.props.sort.name === 'name' && this.props.sort.by === 1) 
            ? 'dropdown-item sort-select' : 'dropdown-item'  }
          href=' #' onClick = {() => this.sortTable("name",1) }>Name A-Z</a>
          <a className=
          {(this.props.sort.name === 'name' && this.props.sort.by === -1) 
            ? 'dropdown-item sort-select' : 'dropdown-item'  } 
          href=' #' onClick = {() => this.sortTable("name",-1) }>Name Z-A</a>
          <div className="dropdown-divider"></div>
          <a className=
          {(this.props.sort.name === 'status' && this.props.sort.by === 1) 
          ? 'dropdown-item sort-select' : 'dropdown-item'  }
          href=' #' onClick = {() => this.sortTable('status',1) }>Ẩn </a>
          <a className=
           {(this.props.sort.name === 'status' && this.props.sort.by === -1) 
           ? 'dropdown-item sort-select' : 'dropdown-item'  }
          href=' #' onClick = {() => this.sortTable('status',-1) }>Hiện</a>
        </div>
      </div>

    );
  }
}

export default Sort;
