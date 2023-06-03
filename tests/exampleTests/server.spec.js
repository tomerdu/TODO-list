const {test, expect} = require("@playwright/test");
const {baseUrl} = require('../../constants');
const {Todos} = require("server/model/Todos.json");


test('Server - return all the todos with status 200', async ({request}) => {
    const todos = await request.get(`${baseUrl.server}/todos`);
    expect(todos.status()).toBe(200);
    expect(await todos.json()).toEqual({Todos})
});
