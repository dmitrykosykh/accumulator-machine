import React from 'react';
import PropTypes from 'prop-types';
import './CodeEditorView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

function CodeEditorView(props) {
  return (
    <div className="CodeEditorView">
      <div className="CodeEditorView__title">
        <p className="CodeEditorView__title__title">
          Code&nbsp;
          <span>
            (
            <a href="https://schweigi.github.io/assembler-simulator/instruction-set.html">Instruction Set</a>
            )
          </span>
        </p>
      </div>
      <div className="CodeEditorView__editor">
        <div className="CodeEditorView__editor__editor-area">
          {props.codeMapping[props.instrPointer] === undefined ? null
            : (
              <div style={{ marginTop: props.codeMapping[props.instrPointer] * 21 + 11 }}>
                <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" />
              </div>
            )}
          <div>
            <textarea
              name="code"
              id="code"
              rows="30"
              cols="55"
              className="CodeEditorView__editor__editor"
              onChange={props.onChangeSourceCode}
              value={props.sourceCode}
              spellCheck={false}
            />
          </div>
        </div>
        <button type="button" className="CodeEditorView__editor__assemble-button" onClick={props.onClickAssemble}>Assemble</button>
      </div>
    </div>
  );
}

CodeEditorView.propTypes = {
  codeMapping: PropTypes.shape({}),
  instrPointer: PropTypes.number,
  sourceCode: PropTypes.string,
  onChangeSourceCode: PropTypes.func,
  onClickAssemble: PropTypes.func,
};

CodeEditorView.defaultProps = {
  codeMapping: {},
  instrPointer: -1,
  sourceCode: ['ADD acc, 35', 'HALT'].join('\n'),
  onChangeSourceCode: () => {},
  onClickAssemble: () => {},
};

export default CodeEditorView;
