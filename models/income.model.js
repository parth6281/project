const IncomeSchema = require("./income");
const IncomeCategorySchema = require("./incomeCategory");

class IncomeModel {

    static async getIncome(id) {
        try {
            const income = await new IncomeSchema().income.find({ _id: id });
            return income;
        } catch (err) {
            return err;
        }
    }

    static async createIncome(
        title,
        amount,
        dateOfIncome,
        paymentMethod,
        categoryId,
        userId
    ) {
        try {
            await new IncomeSchema().income.create({
                title,
                amount,
                dateOfIncome,
                paymentMethod,
                categoryId,
                userId,
            });
            return true;
        } catch (error) {
            console.error("Error in model create Income", error);
            return false;
        }
    }

    static async editIncome(
        id,
        title,
        amount,
        dateOfIncome,
        paymentMethod,
        categoryId,
        userId
    ) {
        try {
            await new IncomeSchema().income.findOneAndUpdate(
                { _id: id },
                {
                    title,
                    amount,
                    dateOfIncome,
                    paymentMethod,
                    categoryId,
                    userId,
                }
            );
            return true;
        } catch (error) {
            console.error("Error in model edit Income", error);
            return false;
        }
    }


    static async getAllIncomes(userId) {
        try {
            let Incomes = await new IncomeSchema().income.find({ userId });
            return Incomes;
        } catch (error) {
            console.error("Error in model getAll Income", error);
            return null;
        }
    }


    static async deleteIncome(IncomeId) {
        try {
            await new IncomeSchema().income.deleteOne({ _id: IncomeId });
            return true;
        } catch (error) {
            console.error("Error in model delete Income", error);
            return false;
        }
    }


    static async createIncomeCategory(name, userId) {
        try {
            await new IncomeCategorySchema().incomeCategory.create({
                name,
                userId,
            });
            return true;
        } catch (error) {
            console.error("Error in model create Income Category", error);
            return false;
        }
    }


    static async getAllIncomeCategories(userId) {
        try {
            const IncomeCategories =
                await new IncomeCategorySchema().incomeCategory.find({ userId });
            return IncomeCategories;
        } catch (error) {
            console.error("Error in model getAll Income Category", error);
            return null;
        }
    }

    static async getIncomesByDateRange(userId, startDate, endDate) {
        try {
            const Incomes = await new IncomeSchema().Income.find({
                userId,
                dateOfIncome: { $gte: startDate, $lte: endDate },
            });
            return Incomes;
        } catch (error) {
            console.error("Error in model getIncomesByDateRange", error);
            return null;
        }
    }
}
module.exports = IncomeModel;
