import React, { Component } from 'react';

class Craete extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            status: false,
        }
    }
    CloseForm = () => {
        this.props.CloseForm()
    }

    onchange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }
    Onsubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.CloseForm();
        this.submitBT();
    }
    submitBT = () => {
        this.setState({
            name: "",
            status: false
        })
    }
    componentDidMount() {
        if (this.props.EditForm !== null) {
            this.setState({
                id: this.props.EditForm.id,
                name: this.props.EditForm.name,
                status: this.props.EditForm.status,
            })
        }
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops && nextprops.EditForm) {
            this.setState({
                id: nextprops.EditForm.id,
                name: nextprops.EditForm.name,
                status: nextprops.EditForm.status,
            })
        } else if (!nextprops.EditForm) {
            this.setState({
                id: '',
                name: '',
                status: false,
            })
        }
    }
    render() {
        return (
            <div className="card">
                <div className="card-body p-3">
                    <h4 className="card-title br-color p-2 text-white"> {this.props.EditForm === null ? 'Thêm Công Việc' : 'Sửa Công Viêc'}
                        <i className="fa fa-window-close" onClick={this.CloseForm}></i> </h4>
                    <form onSubmit={this.Onsubmit}>
                        <div className="form-group ">
                            <label > Tên Công Việc</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onchange} />
                        </div>
                        <div className="form-group">
                            <label >Trạng Thái</label>
                            <select className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.onchange}>
                                <option value={true}>Hiện</option>
                                <option value={false}>Ẩn</option>
                            </select>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary"  >Lưu</button>
                            <button type="reset" className="btn btn-danger ml-2" onClick={this.submitBT}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Craete;
