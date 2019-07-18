const sum = require('./sum');
const multiple = require('./multiple')


test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('a plus b to equal a*b',async () =>{
    expect(multiple(3,4).toBe(11));
})


