import opcodes from './opcodes';

class Assembler {
  constructor() {
    this.machineCode = [];
    this.labels = {};
    this.mapping = {};
  }

  getRegister = () => opcodes.Registers.ACC;

  getAddress = (line) => {
    const regex = /\[(\d+)\]/;
    return Number(line.match(regex)[1]);
  }

  getConstant = (line) => {
    const regex = /, (\d+)/;
    return Number(line.match(regex)[1]);
  }

  /**
   * @param {string} line
   */
  isInstructionHALT = (line) => {
    const regex = /^halt/i;
    return regex.test(line);
  }

  addInstructionHALT = () => {
    this.machineCode.push(opcodes.HALT);
  }

  isAddConstantToReg = (line) => {
    const regex = /^add acc, \d+/i;
    return regex.test(line);
  }

  isAddAddressToReg = (line) => {
    const regex = /^add acc, \[\d+\]/i;
    return regex.test(line);
  }

  addInstructionADD = (line) => {
    if (this.isAddConstantToReg(line)) {
      this.machineCode.push(opcodes.ADD_CONSTANT_TO_REG, this.getRegister(line), this.getConstant(line));
    } else if (this.isAddAddressToReg(line)) {
      this.machineCode.push(opcodes.ADD_ADDRESS_TO_REG, this.getRegister(line), this.getAddress(line));
    }
  }

  /**
   * @param {string} line
   */
  isInstructionADD = (line) => {
    const regex = /^add /i;
    return regex.test(line);
  }

  isInstructionMOV = (line) => {
    const regex = /^mov /i;
    return regex.test(line);
  }

  isMovConstantToReg = (line) => {
    const regex = /^mov acc, \d+/i;
    return regex.test(line);
  }

  isMovAddressToReg = (line) => {
    const regex = /^mov acc, \[\d+\]/i;
    return regex.test(line);
  }

  isMovRegToAddress = (line) => {
    const regex = /^mov \[\d+\], acc/i;
    return regex.test(line);
  }

  isMovConstantToAddress = (line) => {
    const regex = /^mov \[\d+\], \d+/i;
    return regex.test(line);
  }

  addInstructionMOV = (line) => {
    if (this.isMovConstantToReg(line)) {
      this.machineCode.push(opcodes.MOV_CONSTANT_TO_REG, this.getRegister(line), this.getConstant(line));
    } else if (this.isMovAddressToReg(line)) {
      this.machineCode.push(opcodes.MOV_ADDRESS_TO_REG, this.getRegister(line), this.getAddress(line));
    } else if (this.isMovRegToAddress(line)) {
      this.machineCode.push(opcodes.MOV_REG_TO_ADDRESS, this.getAddress(line), this.getRegister(line));
    } else if (this.isMovConstantToAddress(line)) {
      this.machineCode.push(opcodes.MOV_CONSTANT_TO_ADDRESS, this.getAddress(line), this.getConstant(line));
    } else {
      throw new Error();
    }
  }

  isInstructionJZ = (line) => {
    const regex = /^jz \[\d+\]/i;
    return regex.test(line);
  }

  addInstructionJZ = (line) => {
    this.machineCode.push(opcodes.JZ_ADDRESS, this.getAddress(line));
  }

  isInstructionCMP = (line) => {
    const regex = /^cmp /i;
    return regex.test(line);
  }

  isCmpAddressWithReg = (line) => {
    const regex = /^cmp acc, \[\d+\]/i;
    return regex.test(line);
  }

  isCmpConstantWithReg = (line) => {
    const regex = /^cmp acc, \d+/i;
    return regex.test(line);
  }

  addInstructionCMP = (line) => {
    if (this.isCmpAddressWithReg(line)) {
      this.machineCode.push(opcodes.CMP_ADDRESS_WITH_REG, this.getRegister(line), this.getAddress(line));
    } else if (this.isCmpConstantWithReg(line)) {
      this.machineCode.push(opcodes.CMP_CONSTANT_WITH_REG, this.getRegister(line), this.getConstant(line));
    }
  }

  isInstructionJNZ = (line) => {
    const regex = /^jnz \[\d+\]/i;
    return regex.test(line);
  }

  addInstructionJNZ = (line) => {
    this.machineCode.push(opcodes.JNZ_ADDRESS, this.getAddress(line));
  }

  /**
   * @param {string} line
   */
  addInstruction = (line) => {
    if (this.isInstructionHALT(line)) {
      this.addInstructionHALT(line);
    } else if (this.isInstructionADD(line)) {
      this.addInstructionADD(line);
    } else if (this.isInstructionMOV(line)) {
      this.addInstructionMOV(line);
    } else if (this.isInstructionCMP(line)) {
      this.addInstructionCMP(line);
    } else if (this.isInstructionJZ(line)) {
      this.addInstructionJZ(line);
    } else if (this.isInstructionJNZ(line)) {
      this.addInstructionJNZ(line);
    }
  }

  /**
   * @param {string} sourceCode
   */
  assemble = (sourceCode) => {
    sourceCode.split('\n').forEach((line, index) => {
      if (line.trim().length !== 0) {
        this.mapping[this.machineCode.length] = index;
        this.addInstruction(line);
      }
    });
    return { machineCode: this.machineCode, labels: this.labels, mapping: this.mapping };
  }
}

export default Assembler;
