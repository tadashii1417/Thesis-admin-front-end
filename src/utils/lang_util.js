export async function setIntervalImmediate(fn, interval) {
    await fn();
    return setInterval(fn, interval);
}

