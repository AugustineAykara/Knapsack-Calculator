function createTable() {
    const knapsackCapacity = document.getElementById('capacity').value;
    const numOfObjects = document.getElementById('rows').value;
    var tableHeader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th></tr>';
    var tableBody = '';

    for (var i = 0; i < numOfObjects; i++) {

        tableBody += '<tbody><tr>';
        tableBody += '<td>';
        tableBody += 'Item ' + i
        tableBody += '</td>'
        for (var j = 0; j < 2; j++) {
            tableBody += '<td>';
            tableBody += '<input type="number" class="form-control" placeholder="Value"/>'
            tableBody += '</td>'
        }
        tableBody += '</tr></tbody>\n';
    }
    var tableFooter = '</table>';
    document.getElementById('wrapper').innerHTML = tableHeader + tableBody + tableFooter;
}

var weightValue, profitValue;
var profit = [];
var weight = [];
var density = [];
var tempList = [];
var resultantSolution = [];
var i, j, knapsackResultantProfit = 0;

function generateResult() {

    const knapsackCapacity = document.getElementById('capacity').value;
    const numOfObjects = document.getElementById('rows').value;
    
    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    density = [];
    tempList = [];

    var resultClass = document.getElementsByClassName("result");
    console.log(resultClass.length);
    
    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    var tableId = document.getElementById("table")
    for (var i = 1; i <= numOfObjects; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }
    knapsack01Algorithm(knapsackCapacity, numOfObjects)
    sortLists()

    console.log("profit = " + profit);
    console.log("weight = " + weight);
    console.log("density = " + density);
    
    knapsackAlgorithm(knapsackCapacity, numOfObjects);
    
    console.log(knapsackResultantProfit);

}


function sortLists(num_rows) {

    // to find density
    for (i = 0; i < num_rows; i++) {
        density[i] = (profit[i] / weight[i])
    }       
    console.log(tempList);

    // to sort density in decreasing order along with profit and weight list
    var list = [];
    for (i = 0; i < num_rows; i++)
        list.push({ 'density': density[i], 'profit': profit[i], 'weight': weight[i] });


    list.sort(function (a, b) {
        return ((a.density > b.density) ? -1 : ((a.density == b.density) ? 0 : 1));
    });

    for (i = 0; i < num_rows; i++) {
        density[i] = +(list[i].density).toFixed(3)
        profit[i] = list[i].profit;
        weight[i] = list[i].weight;
    }
}

// 9    4   4   2.5     2.5     2   0.625       >density
// 18   20  12  25      10      22  5           >profit
// 2    5   3   10      4       11  8           >weight
// 23

// 20, 25, 10, 12, 5, 22, 1 

// applying knapsack algorithm
function knapsackAlgorithm(knapsackCapacity, numOfObjects) {

    const kpResultantProfitId = document.getElementById("kpResultantProfit");
    const kpProfitId = document.getElementById("kpProfit");
    const kpWeightId = document.getElementById("kpWeight");
    const kpProfitWeightId = document.getElementById("kpProfitWeight");
    const kpResultantSolutionId = document.getElementById("kpResultantSolution");

    for (i = 0; i < numOfObjects; i++) {
        if (weight[i] <= knapsackCapacity) {
            knapsackCapacity -= weight[i]
            knapsackResultantProfit += +profit[i]
            tempList[tempList.indexOf(profit[i])] = 1
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = +knapsackResultantProfit + +(profit[i] * (knapsackCapacity / weight[i]))
            tempList[tempList.indexOf(profit[i])] = knapsackCapacity + "/" + weight[i]
            knapsackCapacity = 0;
        }
        else {
            tempList[tempList.indexOf(profit[i])] = 0
        }
    }

    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3);
    kpProfitId.innerHTML = profit;
    kpWeightId.innerHTML = weight;
    kpProfitWeightId.innerHTML = density;
    kpResultantSolutionId.innerHTML = tempList;
}

// applying knapsack 0/1 algorithm
function knapsack01Algorithm(knapsackCapacity, numOfObjects) {

    const kp01ResultantProfitId = document.getElementById("kp01ResultantProfit");
    const kp01ProfitId = document.getElementById("kp01Profit");
    const kp01WeightId = document.getElementById("kp01Weight");
    const kp01ResultantSolutionId = document.getElementById("kp01ResultantSolution");

    var knapsackTable = new Array(numOfObjects)
    for (i = 0; i <= numOfObjects; i++) {

        knapsackTable[i] = Array(knapsackCapacity)
        for (j = 0; j <= knapsackCapacity; j++) {
            knapsackTable[i][j] = 0;
        }
    }

    const tableHeader = '<table class="table table-bordered">';
    var tableBody = '';

    for (i = 1; i <= numOfObjects; i++) {
        for (j = 0; j <= knapsackCapacity; j++) {
            if (weight[i - 1] <= j) {
                knapsackTable[i][j] = (Math.max(knapsackTable[i - 1][j], +knapsackTable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tableBody += '<td>';
                tableBody += knapsackTable[i][j];
                tableBody += '</td>'
            }
            else {
                knapsackTable[i][j] = knapsackTable[i - 1][j]
                tableBody += '<td>';
                tableBody += knapsackTable[i][j];
                tableBody += '</td>'
            }
        }
        tableBody += '</tr></tbody>\n';
    }

    const tableFooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = tableHeader + tableBody + tableFooter;

    console.log(knapsackTable);
    console.log(knapsackTable[numOfObjects][knapsackCapacity]);


    kp01ResultantProfitId.innerHTML = knapsackTable[numOfObjects][knapsackCapacity];
    kp01ProfitId.innerHTML = profit;
    kp01WeightId.innerHTML = weight;

}