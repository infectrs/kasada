import * as labels from "../constants/labels.js";
import * as opcodes from "../constants/opcodes.js"

import Logger from "../logger/logger.js";
import * as t from "@babel/types";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
const traverse = _traverse.default;

class Opcodes {
    constructor(ast, debugMode = true) {
        this.ast = ast;
        this.debugMode = debugMode;

        this.transformers = [
            this.findOpcodeHandlers
        ]
    }

    parse() {
        const parsedOpcodes = this.findOpcodeHandlers(this);

        if (this.debugMode) {
            Logger("Parsed opcodes: ", Object.keys(parsedOpcodes).length);
        }
        
        return parsedOpcodes
    }

    findOpcodeHandlers(self) {
        let parsedOpcodes = {};
        let opcodeIndex = 0;
        
        traverse(self.ast, {
            VariableDeclarator: (path) =>  {
                const { id, init } = path.node;

                const isOpcodeHandlersArray = self.isOpcodeHandlersArray(id, init)

                if (isOpcodeHandlersArray) {
                    
                    const opcodeHandlers = init.elements;

                    for (let i = 0; i < opcodeHandlers.length; i++) {
                        const opcodeHandler = opcodeHandlers[i];
                        const opcodeBody = opcodeHandler.body;

                        if (!t.isBlockStatement(opcodeBody)) return;

                        const bodies = opcodeBody.body;

                        for (let j = 0; j < bodies.length; j++) {
                            const body = bodies[j];
                            
                            if (t.isExpressionStatement(body)) {
                                const expression = body.expression;
                                const callee = expression.callee;
                                const args = expression.arguments;

                                if (t.isIdentifier(callee) && args.length === 2 && t.isIdentifier(args[0]) && t.isBinaryExpression(args[1])) {
                                    const binaryExpr = args[1];

                                    const { left, right, operator } = binaryExpr;

                                    if (t.isCallExpression(left) && t.isCallExpression(right)) {
                                        const translatedOpcode = self.translateOperator(operator);
                                        parsedOpcodes[opcodeIndex++] = {
                                            name: translatedOpcode,
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return parsedOpcodes;
    };

    translateOperator(operator) {
        if (opcodes.arithmeticOpcodes.has(operator)) {
            return opcodes.arithmeticOpcodes.get(operator);
        } else if (opcodes.logicalOpcodes.has(operator)) {
            return opcodes.logicalOpcodes.get(operator);
        } else if (opcodes.bitwiseOpcodes.has(operator)) {
            return opcodes.bitwiseOpcodes.get(operator);
        }
    }


    isOpcodeHandlersArray = (id, init) => t.isIdentifier(id) && t.isArrayExpression(init) && id.name === labels.OPCODE_HANDLERS && init.elements.every((element => t.isFunctionExpression(element)));
}

export default Opcodes;