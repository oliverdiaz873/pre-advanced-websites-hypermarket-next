import { describe, expect, it } from '@jest/globals'
import { createSerialQueue } from './mutation-queue'

describe('createSerialQueue', () => {
    it('ejecuta las tareas en orden de llegada A → B → C', async () => {
        const order: string[] = []
        const queue = createSerialQueue()

        await Promise.all([
            queue.push(async () => {
                order.push('A')
            }),
            queue.push(async () => {
                order.push('B')
            }),
            queue.push(async () => {
                order.push('C')
            }),
        ])

        expect(order).toEqual(['A', 'B', 'C'])
    })

    it('nunca ejecuta dos tareas de forma concurrente (cola serializada)', async () => {
        let active = 0
        let maxActive = 0
        const queue = createSerialQueue()

        const task = async () => {
            active += 1
            maxActive = Math.max(maxActive, active)
            await new Promise<void>((r) => setTimeout(r, 5))
            active -= 1
        }

        await Promise.all([queue.push(task), queue.push(task), queue.push(task), queue.push(task)])

        expect(maxActive).toBe(1)
    })

    it('evita read-modify-write destructivo: cada tarea ve el último valor aplicado', async () => {
        const queue = createSerialQueue()
        let serverQuantity = 0

        const increment = () =>
            queue.push(async () => {
                // Lectura + escritura en el momento de ejecución (nada de estados obsoletos).
                const next = serverQuantity + 1
                await new Promise<void>((r) => setTimeout(r, 2))
                serverQuantity = next
            })

        await Promise.all([increment(), increment(), increment(), increment(), increment()])

        expect(serverQuantity).toBe(5)
    })

    it('un fallo en una tarea no rompe la cola: la siguiente se ejecuta', async () => {
        const order: string[] = []
        const queue = createSerialQueue()

        const first = queue.push(async () => {
            order.push('A')
            throw new Error('boom')
        })
        const second = queue.push(async () => {
            order.push('B')
        })

        await expect(first).rejects.toThrow('boom')
        await second

        expect(order).toEqual(['A', 'B'])
    })
})