class Memory {
  constructor(size) {
    this.data = [...Array(size)].fill(0);
    this.lastAccess = -1;
  }

  read = (address) => {
    if (address < 0 && address >= this.data.length) {
      throw new Error(`Memory access violation at ${address}`);
    }
    this.lastAccess = address;
    return this.data[address];
  }

  write = (address, value) => {
    if (address < 0 && address >= this.data.length) {
      throw new Error(`Memory access violation at ${address}`);
    }
    this.lastAccess = address;
    this.data[address] = value;
  }

  reset = () => {
    this.lastAccess = -1;
    this.data.fill(0);
  };

  loadOpcodes = (opcodes) => {
    opcodes.forEach((opcode, index) => {
      this.data[index] = opcode;
    });
  }
}

export default Memory;
