var express = require('express');
const IncomeController = require('../controllers/income');
var router = express.Router();


router.post('/', IncomeController.createIncome);
router.get('/income/:id', IncomeController.getIncome);
router.post('/incomeCategory', IncomeController.createIncomeCategory);
router.put("/:id", IncomeController.editIncome);
router.get(
    "/incomeCategory/:userId",
    IncomeController.getAllIncomeCategory
);

router.get("/:userId", IncomeController.getAllIncome);
router.delete("/:IncomeId", IncomeController.deleteIncome);

module.exports = router;