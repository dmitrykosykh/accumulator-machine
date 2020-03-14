import React from 'react';
import PropTypes from 'prop-types';
import './MemoryView.css';
import classNames from 'classnames';

function MemoryView({ memory, instrPointer }) {
  return (
    <div className="MemoryView">
      <div className="MemoryView__title">
        <p className="MemoryView__title__title">RAM</p>
      </div>
      <div className="MemoryView__cells">
        {
        memory.data.map((value, index) => (
          <div className={classNames('MemoryView__cells__item', { MemoryView__cells__item__instrPointer: instrPointer === index })} key={index}>
            {value}
          </div>
        ))
        }
      </div>
    </div>
  );
}

MemoryView.propTypes = {
  memory: PropTypes.shape({
    data: PropTypes.array,
  }),
  instrPointer: PropTypes.number,
};

MemoryView.defaultProps = {
  memory: {
    data: [],
  },
  instrPointer: 0,
};

export default MemoryView;
