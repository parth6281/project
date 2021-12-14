
const ExpenseSchema = require("./expense");
const IncomeSchema = require("./income");
const ExpenseCategorySchema = require("./expenseCategory");

class DashboardModel {
    static async getAllExpenses(userId) {
        try {
            let expenses = await new ExpenseSchema().expense
                .find({ userId })
                .limit(4);
            return expenses;
        } catch (error) {
            console.error("Error in model getAll Expense", error);
            return null;
        }
    }

    static async getAllIncomes(userId) {
        try {
            let incomes = await new IncomeSchema().income.find({ userId }).limit(4);
            return incomes;
        } catch (error) {
            console.error("Error in model getAll income", error);
            return null;
        }
    }

    static async getAllExpensesDetails(userId) {
        try {
            let expenses = await new ExpenseSchema().expense.find({ userId });
            return expenses;
        } catch (error) {
            console.error("Error in model getAll Expense", error);
            return null;
        }
    }
}
module.exports = DashboardModel;
