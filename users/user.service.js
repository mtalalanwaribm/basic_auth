// users hardcoded for simplicity, store in a db for production applications
const consumers = [
                {
                    id: 1,
                    username: 'consumer1',
                    password: 'consumer1',
                    firstName: 'consumer1',
                    lastName: 'Consumer1',
                    scope: "consumer"
                }]
const merchants = [
    {
        id: 2,
        username: 'merchant1',
        password: 'merchant1',
        firstName: 'merchant1',
        lastName: 'merchant1',
        scope: "merchant"
    },
    {
        id: 3,
        username: 'admin1',
        password: 'admin1',
        firstName: 'admin1',
        lastName: 'admin1',
        scope: "admin"
    },
    {
        id: 4,
        username: 'operator1',
        password: 'operator1',
        firstName: 'operator1',
        lastName: 'operator1',
        scope: "operator"
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

