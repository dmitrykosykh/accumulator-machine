import React from 'react';
import PropTypes from 'prop-types';
import './ControlCpuView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDoubleRight, faPause } from '@fortawesome/free-solid-svg-icons';

function ControlCpuView(props) {
  return (
    <div className="ControlCpuView">
      <div className="ControlCpuView__buttons">
        {
          !props.isRun
            ? (
              <button className="ControlCpuView__cpu-run-button" type="button" onClick={props.onClickRunCPU}>
                <FontAwesomeIcon icon={faPlay} size="1x" />
                &nbsp;
                Run
              </button>
            )
            : (
              <button className="ControlCpuView__cpu-stop-button" type="button" onClick={props.onClickStopCPU}>
                <FontAwesomeIcon icon={faPause} size="1x" />
                &nbsp;
                Stop
              </button>
            )
        }
        <button className="ControlCpuView__cpu-step-button" type="button" onClick={props.onClickStepCPU}>
          <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
          &nbsp;
          Step
        </button>
        <button className="ControlCpuView__cpu-reset-button" type="button" onClick={props.onClickResetCPU}>Reset</button>
      </div>
    </div>
  );
}

ControlCpuView.propTypes = {
  onClickStopCPU: PropTypes.func,
  onClickRunCPU: PropTypes.func,
  onClickStepCPU: PropTypes.func,
  onClickResetCPU: PropTypes.func,
  isRun: PropTypes.bool,
};

ControlCpuView.defaultProps = {
  isRun: false,
  onClickStopCPU: () => { },
  onClickRunCPU: () => { },
  onClickStepCPU: () => { },
  onClickResetCPU: () => { },
};

export default ControlCpuView;
