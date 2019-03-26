import React, { Component } from 'react';
import axios from 'axios';

import TaskItem from '../task-item/TaskItem';
import FloatingButton from '../floating-button/FloatingButton';
import Modal from '../modal/Modal';

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.setModalMode = this.setModalMode.bind(this);
    this.handleExecAction = this.handleExecAction.bind(this);
    this.getTasks = this.getTasks.bind(this);

    this.state = {
      tasks: [],
      modal: { mode: null, task: { id: null, title: '' } }
    };
  }

  componentDidMount() {
    // Obtenemos todas las tareas pendientes y activas
    this.getTasks();
  }

  async getTasks() {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      const { data } = await response.data;
      this.setState({ tasks: data });
    } catch (error) {
      console.error(error);
    }
  }

  async setModalMode(mode, taskId) {
    const state = this.state;
    state.modal.task.title = '';
    state.modal.mode = mode;
    state.modal.task.id = taskId;
    if (mode === 'put') await this.getTask(taskId);
    this.setState(state);
  }

  // Función que obtiene una tarea en particular
  async getTask(id) {
    try {
      const response = await axios.get(`http://localhost:8080/tasks/${id}`);
      const { data } = await response.data;
      const state = this.state;
      state.modal.task.title = data.title;
      this.setState(state);
    } catch (error) {
      console.error(error);
    }
  }

  // Función que ejecuta las llamadas a servicios (create, update o delete)
  async handleExecAction(taskTitle) {
    const taskId = this.state.modal.task.id;
    let route, payload;
    switch (this.state.modal.mode) {
      case 'post':
        route = 'http://localhost:8080/tasks';
        payload = { title: taskTitle };
        break;
      case 'put':
        route = `http://localhost:8080/tasks/${taskId}`;
        payload = { title: taskTitle };
        break;
      case 'delete':
        route = `http://localhost:8080/tasks/${taskId}`;
        break;
      default:
        break;
    }
    try {
      await axios[this.state.modal.mode](route, payload);
      this.getTasks();
    } catch (error) {
      console.error(error);
    }
  }

  // Función que actualiza una tarea y la establece como hecha
  async handleMarkTaskAsDone(id) {
    try {
      await axios.put(`http://localhost:8080/tasks/${id}`, {
        isFinished: true
      });
      this.getTasks();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const tasks = this.state.tasks.map(task => (
      <TaskItem
        key={task.id}
        id={task.id}
        title={task.title}
        setModalMode={this.setModalMode}
        markTaskAsDone={id => this.handleMarkTaskAsDone(id)}
      />
    ));
    return (
      <div className="App">
        <header className="App-header"> Administrador de tareas </header>

        <h1>Tareas ({this.state.tasks.length})</h1>
        <h2>Hoy</h2>
        {/* Si hay tareas por hacer se muestra la lista, de lo contrario se muestra un mensaje */}
        {this.state.tasks.length > 0 ? (
          <ul className="list-group">{tasks}</ul>
        ): (
          <div className="alert alert-success">
            <span>Puedes descansar, tienes tu lista vacía </span>
            <i className="far fa-smile-wink"></i>
          </div>)
        }

        {/* Botón que abre modal para agregar una tarea */}
        <FloatingButton setModalMode={this.setModalMode} />

        {/* Componente modal */}
        <Modal
          mode={this.state.modal.mode}
          execAction={taskTitle => this.handleExecAction(taskTitle)}
          task={this.state.modal.task}
        />
      </div>
    );
  }
}

export default App;
