// users hardcoded for simplicity, store in a db for production applications
const consumers = [
                {
                    id: 1,
                    username: 'test1',
                    password: 'test1',
                    firstName: 'Test1',
                    lastName: 'User1',
                    scope: "consumer"
                }]
const merchants = [
    {
        id: 2,
        username: 'test2',
        password: 'test2',
        firstName: 'Test2',
        lastName: 'User2',
        scope: "merchant"
    }
    ];

module.exports = {
    authenticate
};



//NOTE TO KHALED: MODIFY THIS CODE
async function authenticate(username, password) {
    var user = consumers.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    user = merchants.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

