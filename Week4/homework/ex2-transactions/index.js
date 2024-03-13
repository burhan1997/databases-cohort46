const { setup } = require("./setup.js");
const { transferMoney } = require("./transfer.js");

(async () => {
  await setup();
  await transferMoney(101, 102, 500, "Expense for lunch");
})();
