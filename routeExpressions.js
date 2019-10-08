const mexp = require('math-expression-evaluator');

function routeExpressions(server) {
  /*
  Sample input: { "expr": "3*(2+7)" }
  */
  server.post('/expr', (req, res) => {
    const exprObj = req.body;
    console.log('Expression', exprObj);

    const value = mexp.eval(exprObj.expr);

    res.json({ message: value });
  });
}

module.exports = {
  routeExpressions,
};