var express = require('express');
const ExpenseController = require('../controllers/expense');
var router = express.Router();


router.post('/', ExpenseController.createExpense);
router.get('/expense/:id', ExpenseController.getExpense);
router.post('/expenseCategory', ExpenseController.createExpenseCategory);
router.put("/:id", ExpenseController.editExpense);
router.get('/expenseCategory/:userId',
    ExpenseController.getAllExpenseCategory);

router.get("/:userId", ExpenseController.getAllExpense);
router.delete("/:expenseId", ExpenseController.deleteExpense);

module.exports = router;