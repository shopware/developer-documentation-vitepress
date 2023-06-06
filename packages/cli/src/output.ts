import cli from 'cli-color';

const transform = (data: any) => {
    if (typeof data === 'function') {
        return data();
    }

    return data;
}

const error = (msg: string) => cli.red.bold(transform(msg));
const warn = (msg: string) => cli.yellow(transform(msg));
const notice = (msg: string) => cli.blue(transform(msg));
const success = (msg: string) => cli.green(transform(msg));

class Output {
    isVerbose = false;
    isDebug = false;

    setVerbose(verbose: boolean) {
        this.isVerbose = verbose;
    }

    setDebug(debug: boolean) {
        this.isDebug = debug;
    }

    verbose(...messages: string[]) {
        if (this.isVerbose) {
            messages.forEach((message) => console.log(warn(message)));
        }
    }

    debug(...messages: string[]) {
        if (this.isDebug) {
            messages.forEach((message) => console.log(warn(message)));
        }
    }

    log(...messages: string[]) {
        console.log(...messages);
    }

    lines(...lines: string[]) {
        lines.forEach((line) => this.log(line));
    }

    warn(...messages: string[]) {
        messages.forEach((message) => console.log(this.makeWarn(message)));
    }

    makeWarn(message: string) {
        return warn(message);
    }

    notice(...messages: string[]) {
        messages.forEach((message) => console.log(this.makeNotice(message)));
    }

    makeNotice(message: string) {
        return notice(message);
    }

    error(...messages: string[] | any[]) {
        messages.forEach((message) => console.log(this.makeError(message)));

        return this;
    }

    makeError(message: string) {
        return error(message);
    }

    success(...messages: string[]) {
        messages.forEach((message) => console.log(this.makeSuccess(message)));
    }

    makeSuccess(message: string) {
        return success(message);
    }
}

export const output = new Output();