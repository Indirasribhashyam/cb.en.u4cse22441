function calculateCorrelation(x, y) {
    const n = x.length;
    if (n !== y.length || n === 0) return 0;

    const meanX = x.reduce((a, b) => a + b) / n;
    const meanY = y.reduce((a, b) => a + b) / n;

    let numerator = 0;
    let denominatorX = 0;
    let denominatorY = 0;

    for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;
        numerator += dx * dy;
        denominatorX += dx * dx;
        denominatorY += dy * dy;
    }

    const denominator = Math.sqrt(denominatorX * denominatorY);
    return denominator ? parseFloat((numerator / denominator).toFixed(4)) : 0;
}

module.exports = { calculateCorrelation };

