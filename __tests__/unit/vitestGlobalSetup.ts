import getPort from 'get-port'
import { Server } from 'net'
import { type ViteDevServer } from 'vite'
import { build, createServer, serve } from 'vitepress'

let server: ViteDevServer | Server

//const root = '__tests__/e2e'
const root = '';

export async function setup() {
    const port = await getPort()
    process.env['PORT'] = port.toString()

    if (process.env['VITE_TEST_BUILD']) {
        await build(root)
        server = (await serve({ root, port })).server
    } else {
        server = await createServer(root, { port })
        await server!.listen()
    }
}

export async function teardown() {
    if ('ws' in server) {
        await server.close()
    } else {
        await new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()))
        })
    }
}