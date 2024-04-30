import * as labels from "../constants/labels.js";
import Logger from "../logger/logger.js";
import * as t from "@babel/types";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

class Bytecode {
  constructor(ast, debugMode = true) {
    this.ast = ast;
    this.debugMode = debugMode;
  }

  decodeBytecode(bytecodeData) {
    const { bytecodeString, decryptionKey, magicNumber } = bytecodeData;
    const bytecodeLength = bytecodeString.length;
    const decryptionKeyLength = decryptionKey.length;
    const baseLength = decryptionKeyLength - magicNumber;

    let decodedBytecode = [];
    let bytecodeIndex = 0;

    while (bytecodeIndex < bytecodeLength) {
      let currentByte = 0;
      let multiplier = 1;

      while (true) {
        const charIndex = decryptionKey.indexOf(
          bytecodeString[bytecodeIndex++]
        );
        if (
          ((currentByte += multiplier * (charIndex % magicNumber)),
          charIndex < magicNumber)
        ) {
          decodedBytecode.push(currentByte | 0);
          break;
        }
        currentByte += magicNumber * multiplier;
        multiplier *= baseLength;
      }
    }

    return decodedBytecode;
  }

  decodeBytecodeStrings(decodedBytecode) {
    const stringsIndex =
      decodedBytecode[decodedBytecode.length - 1] ^ decodedBytecode.length;
    const bytecodeStrings = decodedBytecode.splice(
      stringsIndex,
      decodedBytecode[stringsIndex + 1] + 2
    );

    const bytecodeIndex = [0];

    bytecodeStrings[bytecodeIndex[0]++];
    
    const stringLength = bytecodeStrings[bytecodeIndex[0]++];

    let decodedStrings = "";
    let charIndex;

    for (let i = 0; i < stringLength; i++) {
      charIndex = bytecodeStrings[bytecodeIndex[0]++];
      decodedStrings += String.fromCharCode(
        (charIndex & 4294967232) | ((charIndex * 39) & 63)
      );
    }

    return decodedStrings;
  }

  getBytecodeData() {
    const bytecodeString = this.getBytecodeString();
    const [decryptionKey, magicNumber] = this.getDecryptionData();

    if (this.debugMode) {
      Logger("Found bytecode: ", `${bytecodeString.substring(0, 16)}...${bytecodeString.substring(bytecodeString.length - 16)}`)
      Logger("Found decryption key: ", decryptionKey)
      Logger("Found magic number: ", magicNumber)
    }
    
    return {
      bytecodeString: bytecodeString,
      decryptionKey: decryptionKey,
      magicNumber: magicNumber
    };
  };

  getBytecodeString() {
    let bytecode = "";
    
    traverse(this.ast, {
      VariableDeclarator(path) {
        const { id, init } = path.node;

        if (!t.isIdentifier(id) && !t.isStringLiteral(init)) return;

        if (id.name === labels.ENCODED_BYTECODE) {
          bytecode = init.value;
        }

        path.stop();
      }
    })

    return bytecode;
  }

  getDecryptionData() {
    let decryptionKey = "";
    let magicNumber = 0;

    traverse(this.ast, {
      CallExpression(path) {
        const callee = path.get("callee");
        const args = path.get("arguments");

        if (t.isIdentifier(callee) && args.length === 3 && callee.node.name === labels.DECODE_BYTECODE) {
          decryptionKey = args[1].node.value;
          magicNumber = args[2].node.value;
          path.stop();
        }
      }
    })

    return [decryptionKey, magicNumber]
  }
}

export default Bytecode;
