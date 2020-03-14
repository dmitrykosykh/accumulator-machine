const opcodes = {
  HALT: 1,

  // ADD opcodes
  ADD_CONSTANT_TO_REG: 2,
  ADD_ADDRESS_TO_REG: 3,

  // MOV opcodes
  MOV_CONSTANT_TO_REG: 22,
  MOV_ADDRESS_TO_REG: 23,
  MOV_REG_TO_ADDRESS: 24,
  MOV_CONSTANT_TO_ADDRESS: 25,

  // CMP opcodes
  CMP_ADDRESS_WITH_REG: 144,
  CMP_CONSTANT_WITH_REG: 145,


  // JMP opcodes
  JZ_ADDRESS: 60,
  JNZ_ADDRESS: 61,

  Registers: {
    ACC: 100,
  },
};

export default opcodes;
