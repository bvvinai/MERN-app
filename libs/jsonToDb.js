import data from './data.json';

const jsonToDb = async () => {
    for (let user of data) {
        try {
            const { first_name, last_name, email, gender, avatar, domain } = user;
            const res = await fetch('http://localhost:3000/api/users', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, email, gender, avatar, domain }),
            });
            if (res.ok) {
                console.log(user.id);
            }
            else {
                throw new Error("User Creation Failed");
            }
        } catch (error) { console.log(error); }
    }
};

export default jsonToDb;