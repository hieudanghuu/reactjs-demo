import React, { Component } from 'react';
import Create from "./components/Craete";
import Control from "./components/Control";
import Table from "./components/Table";
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      displayCreateForm: false,
      EditForm: null,
      fullter: {
        fillterName: '',
        fillterStatus: -1
      },
      keyword : '',
      sort : {
        name : '',
        by : ''
      }
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"))
      this.setState({
        tasks: tasks
      })
    }
  }
  gererate = () => {
    var tasks = [
      {
        id: this.createId(),
        name: 'Ăn sáng',
        status: true
      },
      {
        id: this.createId(),
        name: 'Uống cafe',
        status: false
      },
      {
        id: this.createId(),
        name: 'Học bài',
        status: true
      }
    ];
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  createId() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4()
  }
  CreateForm = () => {
    if (this.EditForm === null) {
      this.setState({
        displayCreateForm: !this.state.displayCreateForm,
        EditForm: null
      })
    } else {
      this.setState({
        displayCreateForm: true,
        EditForm: null
      })
    }

  }
  showForm() {
    this.setState({
      displayCreateForm: true
    })
  }
  EditForm() {
    this.setState({
      EditForm: !null
    })
  }
  CloseForm = () => {
    this.setState({
      displayCreateForm: false
    })
  }
  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.createId();
      tasks.push(data);
    } else {
      var index = this.getIndex(data.id)
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      EditForm: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  changeStatus = (id) => {
    var { tasks } = this.state;
    var index = this.getIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  getIndex(id) {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index
      }
    })
    return result
  }
  OnDelete = (id) => {
    var { tasks } = this.state;
    var index = this.getIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.CloseForm();
  }
  Update = (id) => {
    this.showForm()
    var { tasks } = this.state;
    var index = this.getIndex(id);
    var EditForm = tasks[index]
    if (index !== -1) {
      this.setState({
        EditForm: EditForm
      })
    };
  }
  fillte = (fillterName, fillterStatus) => {
    fillterStatus = parseInt(fillterStatus, 10)
    this.setState({
      fillter: {
        fillterName: fillterName.toLowerCase(),
        fillterStatus: fillterStatus
      }
    })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword : keyword.toLowerCase()
    })
  }
  sortTable = (name,status) => {
  
    this.setState({
      sort : {
        name : name,
        by : status
      }
    })
  }
  render() {
    var { displayCreateForm, tasks, EditForm, fillter, keyword,sort  } = this.state;
    if (fillter) {
      if (fillter.fillterName) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(fillter.fillterName) !== -1
        })
      }
      if (fillter.fillterStatus === -1) {
        tasks = tasks.filter((task) => {
          return task
        })
      } else {
        tasks = tasks.filter((task) => {
          return task.status === (fillter.fillterStatus === 1 ? true : false)
        })
      }
    }
    if(sort.name === 'name') {
      tasks.sort((a,b) => {
        if(a.name > b.name ){ return sort.by}
        else if ( a.name < b.name) { return -sort.by}
        else return 0
      })
    }else {
      tasks.sort((a,b) => {
        if(a.status > b.status ){ return sort.by}
        else if ( a.status < b.status) { return -sort.by}
        else return 0
      })
    }
    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }
    var eleForm = (displayCreateForm ?
      <Create onSubmit={this.onSubmit}
        CloseForm={this.CloseForm}
        EditForm={EditForm}
      /> : "")
    return (
      <div className="container mt-4 text-center">
        <h1> Quản Lý Công Việc</h1>
        <div className="row">
          <div className={displayCreateForm ? "col-sm-4 " : ""}>
            {/* form create */}
            {eleForm}
          </div>
          {/* content */}
          <div className={displayCreateForm ? " col-sm-8 text-left " : "col-sm-12 text-left"}>
            <button type="button" className="btn btn-success" onClick={this.CreateForm}>Thêm mới</button>
            <button type="button" className="btn btn-primary ml-2" onClick={this.gererate}>Gererate Date</button>
            {/* Search and sort */}
            <Control onSearch={this.onSearch} sortTable = { this.sortTable } sort = {sort}/>
            {/* table */}
            <Table tasks={tasks}
              changeStatus={this.changeStatus}
              OnDelete={this.OnDelete}
              Update={this.Update}
              fillte={this.fillte}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
