async function test(req, res) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.send('Hello World!');
}

module.exports = { test };