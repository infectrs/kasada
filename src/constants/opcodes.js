export const arithmeticOpcodes = new Map([
    ["+", "ADD"],
    ["-", "SUBTRACT"],
    ["*", "MULTIPLY"],
    ["/", "DIVIDE"],
    ["%", "MODULO"]
]);

export const logicalOpcodes = new Map([
    ["<", "LESS THAN"],
    ["<=", "LESS THAN OR EQUAL"],
    [">", "GREATER THAN"],
    [">=", "GREATER THAN OR EQUAL"],
    ["==", "EQUAL"],
    ["===", "STRICTLY EQUAL"],
    ["!==", "STRICTLY NOT EQUAL"],
    ["!=", "NOT EQUAL"],
    ["in", "IN"],
    ["instanceof", "INSTANCEOF"]
]);

export const bitwiseOpcodes = new Map([
    ["<<", "SHIFT LEFT"],
    [">>", "SHIFT RIGHT"],
    [">>>", "UNSIGNED SHIFT RIGHT"],
    ["^", "BITWISE XOR"],
    ["|", "BITWISE OR"],
    ["&", "BITWISE AND"]
]);