import React from 'react';
import PropTypes from 'prop-types';
import './RegisterView.css';

function RegisterView({ registerACC, instrPointer, flagZero }) {
  return (
    <div className="RegisterView">
      <div className="RegisterView__title">
        <p className="RegisterView__title__title">Registers</p>
      </div>
      <div className="RegisterView__registers">
        <div className="RegisterView__register">
          <div className="RegisterView__register__title">ACC</div>
          <div className="RegisterView__register__value">{registerACC}</div>
        </div>
        <div className="RegisterView__register">
          <div className="RegisterView__register__title">IP</div>
          <div className="RegisterView__register__value">{instrPointer}</div>
        </div>
        <div className="RegisterView__register">
          <div className="RegisterView__register__title">Zero</div>
          <div className="RegisterView__register__value">{flagZero ? 'True' : 'False'}</div>
        </div>
      </div>
    </div>
  );
}

RegisterView.propTypes = {
  registerACC: PropTypes.number,
  instrPointer: PropTypes.number,
  flagZero: PropTypes.bool,
};

RegisterView.defaultProps = {
  registerACC: 0,
  instrPointer: 0,
  flagZero: false,
};

export default RegisterView;
