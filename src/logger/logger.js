import chalk from "chalk";

const defaultPrefix = "LOG";

const Logger = (textSubject = "", textArgument = "") => {
    const coloredPrefix = colorPrefix(defaultPrefix);
    const coloredTextArgument = colorString(textArgument);
    
    console.log(coloredPrefix + textSubject + coloredTextArgument)
}

const colorPrefix = (prefix = defaultPrefix) => {
    return "[" + colorString(prefix) + "] ";
}

const colorString = (string) => {
    return chalk.magentaBright(string)
}

export default Logger;
