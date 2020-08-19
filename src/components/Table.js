import React, { Component } from 'react';
import TableList from './TableList';

class Table extends Component {
    constructor(){
        super()
        this.state =({
            fillter_name : '',
            fillter_status :-1
        })
    }
    Onchange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
        this.props.fillte(
            name === "fillter_name" ? value : this.state.fillter_name,
            name === "fillter_status" ? value : this.state.fillter_status
            )
    }
    render() {

        var { tasks } = this.props;
        var elements = tasks.map((task, index) => {
            return <TableList key={index}
                tasks={task}
                index={index}
                changeStatus={this.props.changeStatus}
                OnDelete={this.props.OnDelete}
                Update={this.props.Update}
            />
        })
        
        return (
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tên Công Việc</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td ></td>
                        <td><input className="form-control"
                            type="text"
                            name="fillter_name"
                            value = {this.state.fillter_name}
                            onChange={this.Onchange}
                        /></td>
                        <td>
                            <div className="form-group">
                                <select className="form-control"
                                    onChange={this.Onchange}
                                    value = {this.state.fillter_status}
                                    name="fillter_status" >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Ẩn </option>
                                    <option value={1}>Hiện</option>
                                </select>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }
}
export default Table;
