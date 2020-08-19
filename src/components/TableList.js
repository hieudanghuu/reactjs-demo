import React, { Component } from 'react';

class TableList extends Component {
  changeStatus = (id) => {
    this.props.changeStatus(id)
  }
  OnDelete = (id) => {
    this.props.OnDelete(id)
  }
  Update = (id) => {
    this.props.Update(id)
  }
  render() {
    var { tasks } = this.props;

    return (
      <tr>
        <td >{this.props.index + 1}</td>
        <td>{tasks.name}</td>
        <td className={tasks.status === true ? " text-danger" : "text-primary"}
          onClick={() => this.changeStatus(tasks.id)}>
          {tasks.status === true ? "Hiện" : "Ẩn"}
        </td>
        <td>
          <button type="button" className="btn btn-warning" onClick={() => this.Update(tasks.id)}>Sửa</button>
          <button type="button" className="btn btn-danger ml-2" onClick={() => this.OnDelete(tasks.id)}>Xóa</button>
        </td>
      </tr>
    );
  }
}

export default TableList;
