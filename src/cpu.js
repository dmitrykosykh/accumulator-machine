import opcodes from './opcodes';

class CPU {
  constructor(memory) {
    this.memory = memory;
    this.instrPointer = 0;

    this.registers = {
      ACC: 0,
    };

    this.flags = {
      zero: false,
    };
  }

  setRegister = (register, value) => {
    switch (register) {
      case opcodes.Registers.ACC:
        this.registers.ACC = value;
        break;
      default:
        throw new Error(`Invalid register: ${register}`);
    }
  };

  getRegister = (register) => {
    switch (register) {
      case opcodes.Registers.ACC:
        return this.registers.ACC;
      default:
        throw new Error(`Invalid opcode register: ${register}`);
    }
  };

  setAddress = (address, value) => {
    this.memory.write(address, value);
  };

  checkOperation = (value) => {
    this.flags.zero = false;
    if (value === 0) {
      this.flags.zero = true;
    } else {
      this.flags.zero = false;
    }
  }

  reset = () => {
    this.instrPointer = 0;
    this.flags.zero = 0;
    this.registers.ACC = 0;
    this.memory.reset();
  }

  step = () => {
    const instruction = this.memory.read(this.instrPointer);

    switch (instruction) {
      // HALT opcode
      case opcodes.HALT: {
        return false;
      }

      // ADD opcodes
      case opcodes.ADD_CONSTANT_TO_REG: {
        this.instrPointer += 1;
        const registerTo = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const constant = this.memory.read(this.instrPointer);
        this.setRegister(registerTo, this.getRegister(registerTo) + constant);
        this.instrPointer += 1;
        return true;
      }
      case opcodes.ADD_ADDRESS_TO_REG: {
        this.instrPointer += 1;
        const registerTo = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const address = this.memory.read(this.instrPointer);
        this.setRegister(registerTo, this.getRegister(registerTo) + this.memory.read(address));
        this.instrPointer += 1;
        return true;
      }

      // MOV opcodes
      case opcodes.MOV_CONSTANT_TO_REG: {
        this.instrPointer += 1;
        const register = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const constant = this.memory.read(this.instrPointer);
        this.setRegister(register, constant);
        this.instrPointer += 1;
        return true;
      }
      case opcodes.MOV_ADDRESS_TO_REG: {
        this.instrPointer += 1;
        const register = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const address = this.memory.read(this.instrPointer);
        this.setRegister(register, this.memory.read(address));
        this.instrPointer += 1;
        return true;
      }
      case opcodes.MOV_REG_TO_ADDRESS: {
        this.instrPointer += 1;
        const address = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const register = this.memory.read(this.instrPointer);
        this.setAddress(address, this.getRegister(register));
        this.instrPointer += 1;
        return true;
      }
      case opcodes.MOV_CONSTANT_TO_ADDRESS: {
        this.instrPointer += 1;
        const address = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const constant = this.memory.read(this.instrPointer);
        this.setAddress(address, constant);
        this.instrPointer += 1;
        return true;
      }

      // CMP opcodes
      case opcodes.CMP_CONSTANT_WITH_REG: {
        this.instrPointer += 1;
        const register = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const constant = this.memory.read(this.instrPointer);
        this.checkOperation(this.getRegister(register) - constant);
        this.instrPointer += 1;
        return true;
      }
      case opcodes.CMP_ADDRESS_WITH_REG: {
        this.instrPointer += 1;
        const register = this.memory.read(this.instrPointer);
        this.instrPointer += 1;
        const address = this.memory.read(this.instrPointer);
        this.checkOperation(this.getRegister(register) - this.memory.read(address));
        this.instrPointer += 1;
        return true;
      }

      // JMP opcodes
      case opcodes.JZ_ADDRESS: {
        this.instrPointer += 1;
        if (this.flags.zero) {
          this.instrPointer = this.memory.read(this.instrPointer);
        } else {
          this.instrPointer += 1;
        }
        return true;
      }
      case opcodes.JNZ_ADDRESS: {
        this.instrPointer += 1;
        if (!this.flags.zero) {
          this.instrPointer = this.memory.read(this.instrPointer);
        } else {
          this.instrPointer += 1;
        }
        return true;
      }

      default: {
        this.instrPointer += 1;
        return true;
      }
    }
  }
}

export default CPU;
