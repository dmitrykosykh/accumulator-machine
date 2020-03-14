/* global describe, test, expect */
import CPU from './cpu';
import Memory from './memory';
import opcodes from './opcodes';

describe('cpu', () => {
  test('opcode MOV_CONSTANT_TO_REG', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.MOV_CONSTANT_TO_REG,
      opcodes.Registers.ACC,
      7,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(0);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    expect(cpu.instrPointer).toBe(3);
  });

  test('opcode MOV_ADDRESS_TO_REG', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.MOV_CONSTANT_TO_ADDRESS,
      100,
      7,
      opcodes.MOV_ADDRESS_TO_REG,
      opcodes.Registers.ACC,
      100,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(0);
    expect(memory.read(100)).toBe(0);
    cpu.step();
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(3);
    expect(memory.read(100)).toBe(7);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    expect(cpu.instrPointer).toBe(6);
    expect(memory.read(100)).toBe(7);
  });

  test('opcode MOV_REG_TO_ADDRESS', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.MOV_CONSTANT_TO_REG,
      opcodes.Registers.ACC,
      7,
      opcodes.MOV_REG_TO_ADDRESS,
      100,
      opcodes.Registers.ACC,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(0);
    expect(memory.read(100)).toBe(0);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    expect(cpu.instrPointer).toBe(3);
    expect(memory.read(100)).toBe(0);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    expect(cpu.instrPointer).toBe(6);
    expect(memory.read(100)).toBe(7);
  });

  test('opcode MOV_CONSTANT_TO_ADDRESS', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.MOV_CONSTANT_TO_ADDRESS,
      43,
      77,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(0);
    expect(memory.read(43)).toBe(0);
    cpu.step();
    expect(cpu.registers.ACC).toBe(0);
    expect(cpu.instrPointer).toBe(3);
    expect(memory.read(43)).toBe(77);
  });

  test('opcode ADD_CONSTANT_TO_REG', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.ADD_CONSTANT_TO_REG,
      opcodes.Registers.ACC,
      7,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    expect(cpu.instrPointer).toBe(3);
  });

  test('opcode JZ_ADDRESS', () => {
    const memory = new Memory(256);
    const testOpcodes = [
      opcodes.MOV_CONSTANT_TO_REG,
      opcodes.Registers.ACC,
      7,
      opcodes.CMP_CONSTANT_WITH_REG,
      opcodes.Registers.ACC,
      7,
      opcodes.JZ_ADDRESS,
      100,
    ];

    testOpcodes.forEach((opcode, index) => {
      memory.write(index, opcode);
    });

    const cpu = new CPU(memory);
    cpu.step();
    expect(cpu.registers.ACC).toBe(7);
    cpu.step();
    expect(cpu.flags.zero).toBeTruthy();
    cpu.step();
    expect(cpu.instrPointer).toBe(100);
    expect(cpu.flags.zero).toBeTruthy();
  });
});
