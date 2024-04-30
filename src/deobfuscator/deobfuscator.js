import * as labels  from "../constants/labels.js";
import * as t from "@babel/types";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import beautify from "js-beautify";
const traverse = _traverse.default;
const generate = _generate.default;

class Deobfuscator {
    constructor(ast, debugMode = true) {
        this.ast = ast;
        this.debugMode = debugMode;
        this.transformers = [
            this.labelEncodedBytecode,
            this.labelDecodedBytecode,
            this.labelDecodeBytecodeFunc,
            this.labelOpcodesArray,
        ];
    }

    deobfuscate() {
        this.transformers.map((transformer => transformer(this.ast)));

        let deobfuscatedCode = generate(this.ast, {
            comments: false,
        }).code;

        deobfuscatedCode = beautify(deobfuscatedCode, {
            indent_size: 2,
            space_in_empty_paren: true,
        });

        return deobfuscatedCode;
    }

    labelEncodedBytecode(ast) {
        traverse(ast, {
            ForStatement(path) {
                const oldName = path.node.init.declarations[0].id.name;
                path.scope.rename(oldName, labels.ENCODED_BYTECODE);
                path.stop();
            }
        })
    };
    

    labelDecodedBytecode(ast) {
        traverse(ast, {
            VariableDeclarator(path) {
                const { id, init } = path.node;

                if (!t.isIdentifier(id) || !t.isCallExpression(init)) return;

                const callee = init.callee;

                const args = init.arguments;

                if (t.isIdentifier(callee) && args.length === 3 && t.isIdentifier(args[0]) && args[0].name === "ENCODED_BYTECODE") {
                    const oldName = id.name;
                    path.scope.rename(oldName, labels.DECODED_BYTECODE)
                    path.stop()
                }
            }
        })
    };

    labelDecodeBytecodeFunc(ast) {
        traverse(ast, {
            CallExpression(path) {
                const callee = path.get("callee")
                const args = path.get("arguments");

                if (t.isIdentifier(callee) && args.length === 3 && args[0].node.name === labels.ENCODED_BYTECODE) {
                    const oldName = callee.node.name;
                    path.scope.rename(oldName, labels.DECODE_BYTECODE);
                    path.stop();
                }

            }
        })
    };

    labelOpcodesArray(ast) {
        traverse(ast, {
            VariableDeclarator(path) {
                const { id, init } = path.node;

                if (!t.isIdentifier(id) || !t.isArrayExpression(init)) return;

                const oldName = id.name;

                const elements = init.elements;

                if (elements.every((element => !t.isFunctionExpression(element)))) return;

                path.scope.rename(oldName, labels.OPCODE_HANDLERS)
                path.stop();
            }
        })
    };
}
export default Deobfuscator;