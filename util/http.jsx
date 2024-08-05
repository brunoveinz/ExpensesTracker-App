import axios from "axios";

const BACKEND_URL = "https://react-native-course-c5540-default-rtdb.firebaseio.com"

export function storeExpense(expenseDate) {
    axios.post( BACKEND_URL + '/expenses.json', expenseDate);
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

