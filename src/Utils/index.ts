export async function timeout(time?: number): Promise<void> {
    const trigger = time ?? 1000
    return new Promise((r) => {
        setTimeout(() => {
            r()
        }, trigger)
    })
}
