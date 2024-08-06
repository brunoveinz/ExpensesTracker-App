import axios from "axios";

const BACKEND_URL = "https://react-native-course-c5540-default-rtdb.firebaseio.com"

export async function storeExpense(expenseDate) {
    const response = await axios.post( BACKEND_URL + '/expenses.json', expenseDate);
    const id = response.data.name;
    return id; 
}

export async function fecthExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    
    const expenses =  [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    };

    return expenses
}


export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);

}