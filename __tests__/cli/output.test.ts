import {output} from "../../cli/src/output";
import {vi} from "vitest";

describe('output', async () => {
    let myLog = [];
    let log;
    beforeEach(() => {
        myLog = [];
        log = mockLog();
    });
    afterEach(() => {
        myLog = [];
        log = null;
        vi.restoreAllMocks();
    });

    const mockLog = () => {
        return vi.spyOn(console, "log")
            .mockImplementation((...messages) => messages.forEach(message => myLog.push(message)));
    }

    test('is verbose', async () => {
        output.setVerbose(true);
        output.verbose('My verbose message');

        expect(myLog).toEqual(["\x1B[33mMy verbose message\x1B[39m"]);
        expect(log).toBeCalled();
    })

    test('is not verbose (default)', async () => {
        output.setVerbose(false);
        output.verbose('My verbose message');

        expect(myLog).toEqual([]);
        expect(log).not.toBeCalled();
    })

    test('is debug', async () => {
        output.setDebug(true);
        output.debug('My debug message');

        expect(myLog).toEqual(["\x1B[33mMy debug message\x1B[39m"]);
        expect(log).toBeCalled();
    })

    test('is not debug (default)', async () => {
        output.setDebug(false);
        output.debug('My debug message');

        expect(myLog).toEqual([]);
        expect(log).not.toBeCalled();
    })

    test('log', async () => {
        output.log('My log');

        expect(myLog).toEqual(['My log']);
    })

    test('lines', async () => {
        output.lines('My foo', 'My bar');

        expect(myLog).toEqual(['My foo', 'My bar']);
    })

    test('warn', async () => {
        output.warn('My warn');

        expect(myLog).toEqual(['\u001b[33mMy warn\u001b[39m']);
    })

    test('makeWarn', async () => {
        const warn = output.makeWarn('My makeWarn');

        expect(warn).toEqual('\u001b[33mMy makeWarn\u001b[39m');
        expect(myLog).toEqual([]);
    })

    test('notice', async () => {
        output.notice('My notice');

        expect(myLog).toEqual(['\u001b[34mMy notice\u001b[39m']);
    })

    test('makeNotice', async () => {
        const notice = output.makeNotice('My makeNotice');

        expect(notice).toEqual('\u001b[34mMy makeNotice\u001b[39m');
        expect(myLog).toEqual([]);
    })

    test('error', async () => {
        output.error('My error');

        expect(myLog).toEqual(['\u001b[1m\u001b[31mMy error\u001b[39m\u001b[22m']);
    })

    test('makeError', async () => {
        const error = output.makeError('My makeError');

        expect(error).toEqual('\u001b[1m\u001b[31mMy makeError\u001b[39m\u001b[22m');
        expect(myLog).toEqual([]);
    })

    test('success', async () => {
        output.success('My success');

        expect(myLog).toEqual(['\u001b[32mMy success\u001b[39m']);
    })

    test('makeSuccess', async () => {
        const success = output.makeSuccess('My makeSuccess');

        expect(success).toEqual('\u001b[32mMy makeSuccess\u001b[39m');
        expect(myLog).toEqual([]);
    })
})