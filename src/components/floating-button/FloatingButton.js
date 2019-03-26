import React, { Component } from 'react';
import './FloatingButton.css';

export default class FloatingButton extends Component {
  constructor() {
    super();

    this.handleModalMode = this.handleModalMode.bind(this);
  }

  handleModalMode(mode) {
    this.props.setModalMode(mode);
  }

  render() {
    return (
      <div className="floating-button">
        <button
          onClick={() => this.handleModalMode('post')}
          type="button"
          className="btn btn-primary"
          data-target="#taskModal"
          data-toggle="modal"
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    );
  }
}
