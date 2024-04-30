
import Logger from "../logger/logger.js";

class Disassembler {
  constructor(decodedBytecode, decodedStrings, opcodes, debugMode = true) {
    this.decodedBytecode = decodedBytecode;
    this.decodedStrings = decodedStrings;
    this.opcodes = opcodes;
    this.debugMode = debugMode;
  }

  dissasemble() {
    
    let instructionPointer = 0;

    while (instructionPointer < this.decodedBytecode.length) {
      
      const opcode = this.opcodes[this.decodedBytecode[instructionPointer++]];

      if (this.debugMode) {
        if (!opcode || opcode === undefined) {
          Logger("Opcode not found!")
        } else {
          Logger("Opcode found: ", JSON.stringify(opcode))
        }
      }
    }
  }
}

export default Disassembler;
