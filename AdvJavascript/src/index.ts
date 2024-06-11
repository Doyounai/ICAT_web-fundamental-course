import axios from "axios";

type hobbie = {
    hobbyName: string,
    rate: number
}

type user = {
    name: string,
    age: number,
    hobbie: hobbie[],
}

const getMostHobbie = (hobbies: hobbie[]) => {
    return hobbies.reduce((prev, current) => (prev && prev.rate > current.rate) ? prev : current)
}

const getUsersMostLikeHobbie = (users: user[]) => {
    const newUsersList = users.map((item) => {
        return {name: item.name, age: item.age, hobbyName: getMostHobbie(item.hobbie)}
    });

    return newUsersList;
}

const getData = async () => {
    const APIUrl = 'https://icat-trainee-api.onrender.com/getData';
    const res = await axios.get(APIUrl);

    const userHobbieList = getUsersMostLikeHobbie(res.data.data.data);

    return userHobbieList;
}

const result = getData();
console.log(result);