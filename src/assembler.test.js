/* global describe, test, expect */
import opcodes from './opcodes';
import Assembler from './assembler';

describe('Assembler', () => {
  describe('assemble', () => {
    test('ADD', () => {
      const sourceCode = [
        'ADD acc, 35',
      ].join('\n');
      const assembler = new Assembler();
      const { machineCode } = assembler.assemble(sourceCode);
      expect(machineCode[0]).toBe(opcodes.ADD_CONSTANT_TO_REG);
      expect(machineCode[1]).toBe(opcodes.Registers.ACC);
      expect(machineCode[2]).toBe(35);
    });

    test('ADD + HALT', () => {
      const sourceCode = [
        'ADD acc, 35',
        'HALT',
      ].join('\n');
      const assembler = new Assembler();
      const { machineCode } = assembler.assemble(sourceCode);
      expect(machineCode[0]).toBe(opcodes.ADD_CONSTANT_TO_REG);
      expect(machineCode[1]).toBe(opcodes.Registers.ACC);
      expect(machineCode[2]).toBe(35);
      expect(machineCode[3]).toBe(opcodes.HALT);
    });

    test('MOV acc, [100]', () => {
      const sourceCode = 'MOV acc, [100]';
      const assembler = new Assembler();
      const { machineCode } = assembler.assemble(sourceCode);
      expect(machineCode[0]).toBe(opcodes.MOV_ADDRESS_TO_REG);
      expect(machineCode[1]).toBe(opcodes.Registers.ACC);
      expect(machineCode[2]).toBe(100);
    });

    test('program 1', () => {
      const sourceCode = [
        'MOV [100], 0', // 1
        'MOV [101], 5', // 2
        'MOV acc, 5', // 3
        'ADD acc, [101]', // 4
        'MOV [102], acc', // 5
        'MOV acc, [100]', // 6
        'ADD acc, 1', // 7
        'MOV [100], acc', // 8
        'CMP acc, [101]', // 9
        'MOV acc, [102]', // 10
        'JZ [9]', // 11
        'HALT', // 12
      ].join('\n');
      const assembler = new Assembler();
      const { machineCode } = assembler.assemble(sourceCode);

      // 1
      expect(machineCode[0]).toBe(opcodes.MOV_CONSTANT_TO_ADDRESS);
      expect(machineCode[1]).toBe(100);
      expect(machineCode[2]).toBe(0);

      // 2
      expect(machineCode[3]).toBe(opcodes.MOV_CONSTANT_TO_ADDRESS);
      expect(machineCode[4]).toBe(101);
      expect(machineCode[5]).toBe(5);

      // 3
      expect(machineCode[6]).toBe(opcodes.MOV_CONSTANT_TO_REG);
      expect(machineCode[7]).toBe(opcodes.Registers.ACC);
      expect(machineCode[8]).toBe(5);

      // 4
      expect(machineCode[9]).toBe(opcodes.ADD_ADDRESS_TO_REG);
      expect(machineCode[10]).toBe(opcodes.Registers.ACC);
      expect(machineCode[11]).toBe(101);

      // 5
      expect(machineCode[12]).toBe(opcodes.MOV_REG_TO_ADDRESS);
      expect(machineCode[13]).toBe(102);
      expect(machineCode[14]).toBe(opcodes.Registers.ACC);

      // 6
      expect(machineCode[15]).toBe(opcodes.MOV_ADDRESS_TO_REG);
      expect(machineCode[16]).toBe(opcodes.Registers.ACC);
      expect(machineCode[17]).toBe(100);

      // 7
      expect(machineCode[18]).toBe(opcodes.ADD_CONSTANT_TO_REG);
      expect(machineCode[19]).toBe(opcodes.Registers.ACC);
      expect(machineCode[20]).toBe(1);

      // 8
      expect(machineCode[21]).toBe(opcodes.MOV_REG_TO_ADDRESS);
      expect(machineCode[22]).toBe(100);
      expect(machineCode[23]).toBe(opcodes.Registers.ACC);

      // 9
      expect(machineCode[24]).toBe(opcodes.CMP_ADDRESS_WITH_REG);
      expect(machineCode[25]).toBe(opcodes.Registers.ACC);
      expect(machineCode[26]).toBe(101);

      // 10
      expect(machineCode[27]).toBe(opcodes.MOV_ADDRESS_TO_REG);
      expect(machineCode[28]).toBe(opcodes.Registers.ACC);
      expect(machineCode[29]).toBe(102);

      // 11
      expect(machineCode[30]).toBe(opcodes.JZ_ADDRESS);
      expect(machineCode[31]).toBe(9);

      // 12
      expect(machineCode[32]).toBe(opcodes.HALT);
    });
  });
});
