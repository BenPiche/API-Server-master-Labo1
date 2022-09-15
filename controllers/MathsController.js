const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {
            if (this.HttpContext.path.queryString == "?") {
                // Send helpPage
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let htmlContent = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", htmlContent);
            } else {
                // travailler sur les parametres
                if (this.HttpContext.path.params.op) {

                    if (this.HttpContext.path.params.op == ' ')
                        this.HttpContext.path.params.op = '+';


                    let knownParams = ['op', 'x', 'y', 'n', 'error', 'value'];
                    let params = this.HttpContext.path.params;
                    let x = parseInt(this.HttpContext.path.params.x);
                    let y = parseInt(this.HttpContext.path.params.y);
                    let n = parseInt(this.HttpContext.path.params.n);


                    switch (this.HttpContext.path.params.op) {
                        case '+':

                            this.HttpContext.path.params.error = ValidateParamsXY(params.x, params.y)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });

                            if (this.HttpContext.path.params.error == null)
                                this.HttpContext.path.params.value = x + y;

                            this.HttpContext.response.JSON(this.HttpContext.path.params);

                            break;
                        case '-':

                            this.HttpContext.path.params.error = ValidateParamsXY(params.x, params.y)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x - y;

                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '*':
                            this.HttpContext.path.params.error = ValidateParamsXY(params.x, params.y)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x * y;

                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '/':

                            this.HttpContext.path.params.error = ValidateParamsXY(params.x, params.y)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x * y;

                            if (y == 0)
                                this.HttpContext.path.params.error = "Cannot divide by 0";

                                if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x / y;
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '%':
                            this.HttpContext.path.params.error = ValidateParamsXY(params.x, params.y)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x * y;

                            if (y == 0)
                                this.HttpContext.path.params.error = "Cannot modulo 0";

                                if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = x % y;
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '!':
                            this.HttpContext.path.params.error = ValidateParamN(params.n)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = factorial(n);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case 'p':
                            this.HttpContext.path.params.error = ValidateParamN(params.n)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = isPrime(n);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case 'np':
                            this.HttpContext.path.params.error = ValidateParamN(params.n)

                            Object.keys(params).forEach(key => {
                                if (!knownParams.includes(key)) {
                                    this.HttpContext.path.params.error = `${key} is an unknown parameter`;
                                }
                            });
                            if (this.HttpContext.path.params.error == null)
                            this.HttpContext.path.params.value = findPrime(n);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                    }
                } else {
                    this.HttpContext.path.params.error = "parameter 'op' is missing"
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }



            function factorial(n) {
                if (n === 0 || n === 1) {
                    return 1;
                }
                return n * factorial(n - 1);
            }

            function isPrime(value) {
                for (var i = 2; i < value; i++) {
                    if (value % i === 0) {
                        return false;
                    }
                }
                return value > 1;
            }
            function findPrime(n) {
                let primeNumer = 0;
                for (let i = 0; i < n; i++) {
                    primeNumer++;
                    while (!isPrime(primeNumer)) {
                        primeNumer++;
                    }
                }
                return primeNumer;
            }


            function ValidateParamsXY(x, y) {


                if (x && y) {
                    if (isNaN(x) || isNaN(y))
                        return "Parameters (x,y) need to be numbers";

                }
                else
                    return "Missing parameter(s)";

            }

            function ValidateParamN(n) {
                if (n) {
                    if (isNaN(n))
                        return "Parameter 'n' needs to be a number";
                    else if (n < 0)
                        return "Parameter 'n' cannot be negative";
                }
                else
                    return "Missing parameter n"
            }
        }


    }