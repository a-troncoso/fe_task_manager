import React, { Component } from 'react';

export default class Modal extends Component {
  constructor() {
    super();

    this.state = {
      task: { id: null, title: '' },
      ui: { button: { disabled: true } }
    };

    this.handleAction = this.handleAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps() {
    const state = this.state;
    state.task.title = this.props.task.title;
    this.setState(state);
  }

  // Obtiene el título según la acción que se va a realizar
  getTitle() {
    switch (this.props.mode) {
      case 'post':
        return 'Agregar tarea';
      case 'put':
        return 'Editar tarea';
      case 'delete':
        return '¿Realmente desea eliminar la tarea?';
      default:
        break;
    }
  }

  handleAction(taskTitle) {
    this.props.execAction(taskTitle);
  }

  // Función que retorna el botón de acción según se va a agregar, actualizar o eliminar una tarea
  getActionButton() {
    switch (this.props.mode) {
      case 'post':
      case 'put':
        return (
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={() => this.handleAction(this.state.task.title)}
            disabled={this.state.ui.button.disabled}
          >
            Guardar
          </button>
        );
      case 'delete':
        return (
          <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={() => this.handleAction()}
          >
            Eliminar
          </button>
        );
      default:
        break;
    }
  }

  handleChange(ev) {
    const state = this.state;
    const taskTitle = ev.target.value;

    state.task.title = taskTitle;
    if (taskTitle) state.ui.button.disabled = false;
    else state.ui.button.disabled = true;
    this.setState(state);
  }

  render() {
    const title = this.getTitle();
    const actionButton = this.getActionButton();

    return (
      <div className="modal" tabIndex="-1" role="dialog" id="taskModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* Sólo se muestra el cuerpo si se agrega o edita una tarea */}
            {this.props.mode !== 'delete' && (
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="taskTitle">Título</label>
                  <input
                    value={this.state.task.title}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="taskTitle"
                    placeholder="Título de la tarea"
                  />
                </div>
              </div>
            )}
            <div className="modal-footer">{actionButton}</div>
          </div>
        </div>
      </div>
    );
  }
}
