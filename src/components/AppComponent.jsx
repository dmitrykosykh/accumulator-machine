import React from 'react';
import './AppComponent.css';
import MemoryView from './MemoryView';
import CodeEditorView from './CodeEditorView';
import ControlCpuView from './ControlCpuView';
import RegisterView from './RegisterView';
import Memory from '../memory';
import Assembler from '../assembler';
import CPU from '../cpu';


class AppComponent extends React.Component {
  constructor() {
    super();
    this.memory = new Memory(256);
    this.cpu = new CPU(this.memory);
    this.state = {
      sourceCode: [
        'MOV [100], 1',
        'MOV [101], 5',
        'MOV acc, 5',
        'ADD acc, [101]',
        'MOV [102], acc',
        'MOV acc, [100]',
        'ADD acc, 1',
        'MOV [100], acc',
        'CMP acc, [101]',
        'MOV acc, [102]',
        'JNZ [9]',
        'HALT',
      ].join('\n'),
      accRegister: this.cpu.registers.ACC,
      instrPointer: this.cpu.instrPointer,
      flagZero: this.cpu.flags.zero,
      codeMapping: {},
      isRun: false,
      cpuIntervalID: undefined,
    };
  }

  handleChangeSourceCode = (event) => {
    this.setState({ sourceCode: event.target.value });
  }

  handleClickAssemble = () => {
    const assembler = new Assembler();
    const { machineCode, mapping } = assembler.assemble(this.state.sourceCode);
    console.log(mapping);
    this.memory.loadOpcodes(machineCode);
    this.setState({
      codeMapping: mapping,
    });
  }

  handleRunCPU = () => {
    this.setState({
      isRun: true,
      cpuIntervalID: window.setInterval(() => {
        const result = this.cpu.step();
        if (!result) {
          window.clearInterval(this.state.cpuIntervalID);
          this.setState({
            accRegister: this.cpu.registers.ACC,
            instrPointer: this.cpu.instrPointer,
            flagZero: this.cpu.flags.zero,
            cpuIntervalID: undefined,
            isRun: false,
          });
        } else {
          this.setState({
            accRegister: this.cpu.registers.ACC,
            instrPointer: this.cpu.instrPointer,
            flagZero: this.cpu.flags.zero,
          });
        }
      }, 200),
    });
  }

  handleStopCPU = () => {
    window.clearInterval(this.state.cpuIntervalID);
    this.setState({
      isRun: false,
      cpuIntervalID: undefined,
    });
  }

  handleStepCPU = () => {
    this.cpu.step();
    this.setState({
      accRegister: this.cpu.registers.ACC,
      instrPointer: this.cpu.instrPointer,
      flagZero: this.cpu.flags.zero,
    });
  }

  handleResetCPU = () => {
    this.cpu.reset();
    this.setState({
      accRegister: this.cpu.registers.ACC,
      instrPointer: this.cpu.instrPointer,
      flagZero: this.cpu.flags.zero,
      codeMapping: {},
      isRun: false,
      cpuIntervalID: undefined,
    });
  }

  render = () => (
    <div className="AppComponent">
      <ControlCpuView
        onClickRunCPU={this.handleRunCPU}
        onClickStopCPU={this.handleStopCPU}
        onClickStepCPU={this.handleStepCPU}
        onClickResetCPU={this.handleResetCPU}
        isRun={this.state.isRun}
      />
      <div className="AppComponent__dashboard">
        <div className="AppComponent__CodeEditorView">
          <CodeEditorView
            onChangeSourceCode={this.handleChangeSourceCode}
            onClickAssemble={this.handleClickAssemble}
            sourceCode={this.state.sourceCode}
            codeMapping={this.state.codeMapping}
            instrPointer={this.state.instrPointer}
          />
        </div>
        <div className="AppComponent__ComputerState">
          <RegisterView
            registerACC={this.state.accRegister}
            instrPointer={this.state.instrPointer}
            flagZero={this.state.flagZero}
          />
          <div className="AppComponent__ComputerState__MemoryView">
            <MemoryView memory={this.memory} instrPointer={this.state.instrPointer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppComponent;
