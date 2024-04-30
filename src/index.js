import { readFileSync, writeFileSync } from "fs";
import { parse } from "@babel/parser";
import Bytecode from "./disassembler/bytecode.js";
import Disassembler from "./disassembler/disassembler.js";
import Opcodes from "./disassembler/opcodes.js";
import Deobfuscator from "./deobfuscator/deobfuscator.js";

const debugMode = true;

const ipsScript = readFileSync("assets/scripts/ips.js", "utf-8");

const Start = () => {
    const ast = parse(ipsScript);

    const deobfuscator = new Deobfuscator(ast);
    const deobfuscatedCode = deobfuscator.deobfuscate();
    writeFileSync("assets/scripts/labeled_ips.js", deobfuscatedCode);
    
    const newAst = parse(deobfuscatedCode);
    
    const bytecode = new Bytecode(newAst, debugMode);
    const bytecodeData = bytecode.getBytecodeData();
    const decodedBytecode = bytecode.decodeBytecode(bytecodeData);
    const decodedBytecodeStrings = bytecode.decodeBytecodeStrings(decodedBytecode);

    const opcodes = new Opcodes(newAst, debugMode);
    const parsedOpcodes = opcodes.parse();
    
    const dissasembler = new Disassembler(decodedBytecode, decodedBytecodeStrings, parsedOpcodes, debugMode);
    dissasembler.dissasemble();
}

Start();

