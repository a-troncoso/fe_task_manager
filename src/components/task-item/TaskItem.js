import React, { Component } from 'react';

export default class TaskItem extends Component {
  constructor() {
    super();

    this.handleModalMode = this.handleModalMode.bind(this);
    this.handleMarkTaskAsDone = this.handleMarkTaskAsDone.bind(this);
  }

  handleModalMode(mode, taskId) {
    this.props.setModalMode(mode, taskId);
  }

  handleMarkTaskAsDone() {
    this.props.markTaskAsDone(this.props.id);
  }

  render() {
    return (
      <div className="list-group-item d-flex justify-content-between">
        {this.props.title}
        {/* Dropdown de opciones */}
        <div className="dropleft">
          <button className="btn btn-secondary" data-toggle="dropdown">
            <i className="fas fa-ellipsis-h" />
          </button>
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => this.handleMarkTaskAsDone(this.props.id)}
            >
              Hecho
            </button>
            <button
              className="dropdown-item"
              onClick={() => this.handleModalMode('put', this.props.id)}
              data-target="#taskModal"
              data-toggle="modal"
            >
              Editar
            </button>
            <button
              className="dropdown-item"
              onClick={() => this.handleModalMode('delete', this.props.id)}
              data-target="#taskModal"
              data-toggle="modal"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
