import axios from "axios";

export function storeExpense(expenseDate) {
    axios.post('https://react-native-course-c5540-default-rtdb.firebaseio.com/expenses.json',
        expenseDate      
    )
}