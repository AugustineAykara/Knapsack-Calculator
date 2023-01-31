function createTable() {
    const numOfObjects = document.getElementById('rows').value;
    var tableHeader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th></tr>';
    var tableBody = '';

    for (var i = 0; i < numOfObjects; i++) {

        tableBody += '<tbody><tr>';
        tableBody += '<td>';
        tableBody += 'Item ' + i;
        tableBody += '</td>';
        for (var j = 0; j < 2; j++) {
            tableBody += '<td>';
            tableBody += '<input type="number" class="form-control" placeholder="Value"/>';
            tableBody += '</td>';
        }
        tableBody += '</tr></tbody>\n';
    }
    var tableFooter = '</table>';
    document.getElementById('wrapper').innerHTML = tableHeader + tableBody + tableFooter;
}

function generateResult() {
    
    const knapsackCapacity = document.getElementById('capacity').value;
    const numOfObjects = document.getElementById('rows').value;
    
    const profitArr = [];
    const weightArr = [];

    // Variables for storing values taken from user; before adding them to the profit and weight arrays.
    var weightValue, profitValue;

    var resultClass = document.getElementsByClassName("result");
    console.log(resultClass.length);
    
    for (var i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    var tableId = document.getElementById("table")
    for (var i = 1; i <= numOfObjects; i++) {
        profitValue = parseInt(tableId.rows[i].cells[1].children[0].value);
        profitArr.push(profitValue);
        
        weightValue = parseInt(tableId.rows[i].cells[2].children[0].value);
        weightArr.push(weightValue);
    }

    knapsack01Algorithm(knapsackCapacity, profitArr, weightArr, numOfObjects);
    
    knapsackAlgorithm(knapsackCapacity, profitArr, weightArr, numOfObjects);

}


function sortLists(densityArr, profitArr, weightArr, numOfObjects) {

    // Loop for initializing density values.
    for (var i = 0; i < numOfObjects; i++) {
        
        // For detecting integer densities.
        if(Number.isInteger( profitArr[i] / weightArr[i] )) {
            densityArr[i] = Math.round(profitArr[i] / weightArr[i]);
            continue;
        }
        densityArr[i] = (profitArr[i] / weightArr[i]).toFixed(2);
        
    }       

    // to sort density in decreasing order along with profit and weight list
    var list = [];
    for (var i = 0; i < numOfObjects; i++)
        list.push({ 'density': densityArr[i], 'profit': profitArr[i], 'weight': weightArr[i] });


    list.sort(function (a, b) {
        return ((a.density > b.density) ? -1 : ((a.density == b.density) ? 0 : 1));
    });

    for (var i = 0; i < numOfObjects; i++) {
        densityArr[i] = list[i].density;
        profitArr[i] = list[i].profit;
        weightArr[i] = list[i].weight;
    }
}

// 9    4   4   2.5     2.5     2   0.625       >density
// 18   20  12  25      10      22  5           >profit
// 2    5   3   10      4       11  8           >weight
// 23

// 20, 25, 10, 12, 5, 22, 1 

// applying knapsack algorithm
function knapsackAlgorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {


    // An array for storing the densities of the objects.
    const densityArr = [];
    sortLists(densityArr, profitArr, weightArr, numOfObjects);

    // A variable for storing the resultant profit of the knapsack; initialized with 0.
    var knapsackResultantProfit = 0;


    // An array for storing the solution of the problem
    const kpResultantSolutionArr = [];


    const kpResultantProfitId = document.getElementById("kpResultantProfit");
    const kpProfitId = document.getElementById("kpProfit");
    const kpWeightId = document.getElementById("kpWeight");
    const kpProfitWeightId = document.getElementById("kpProfitWeight");
    const kpResultantSolutionId = document.getElementById("kpResultantSolution");

    for (var i = 0; i < numOfObjects; i++) {
        if (weightArr[i] <= knapsackCapacity) {
            knapsackCapacity -= weightArr[i];
            knapsackResultantProfit += profitArr[i];
            kpResultantSolutionArr[i] = 1;
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = knapsackResultantProfit + (profitArr[i] * (knapsackCapacity / weightArr[i]));
            kpResultantSolutionArr[i] = knapsackCapacity + "/" + weightArr[i];
            knapsackCapacity = 0;
        }
        else {
            kpResultantSolutionArr[i] = 0;
        }
    }

    console.log("profit = " + profitArr);
    console.log("weight = " + weightArr);
    console.log("density = " + densityArr);

    console.log(knapsackResultantProfit);

    kpResultantProfitId.innerHTML = parseFloat(knapsackResultantProfit.toFixed(2));
    kpProfitId.innerHTML = profitArr;
    kpWeightId.innerHTML = weightArr;
    kpProfitWeightId.innerHTML = densityArr;
    kpResultantSolutionId.innerHTML = kpResultantSolutionArr;
}

function find01Solution(objToSelect, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr) {
    // The base case will be reached in any scenario because the 0th row is initialized with 0 values.
    if( objToSelect == 0 ) {
        return;
    }

    // The current object is not selected.
    if(table[objToSelect][capLeft] == table[objToSelect - 1][capLeft]) {
        solutionArr[objToSelect - 1] = 0;
        find01Solution(objToSelect - 1, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr);
    }
    else if(capLeft >= weightArr[objToSelect - 1]) {
        // The current object is selected.
        if( table[objToSelect][capLeft] == (table[objToSelect - 1][capLeft - weightArr[objToSelect - 1]] + profitArr[objToSelect - 1]) ) {
            solutionArr[objToSelect - 1] = 1;
            find01Solution(objToSelect - 1, capLeft - weightArr[objToSelect - 1], solutionArr, table, numOfObjects, profitArr, weightArr);
        }
    }
}

// applying knapsack 0/1 algorithm
function knapsack01Algorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {

    const kp01ResultantProfitId = document.getElementById("kp01ResultantProfit");
    const kp01ProfitId = document.getElementById("kp01Profit");
    const kp01WeightId = document.getElementById("kp01Weight");
    const kp01ResultantSolutionId = document.getElementById("kp01ResultantSolution");

    var knapsackTable = new Array(numOfObjects + 1);

    for (objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {

        knapsackTable[objConsidered] = Array(knapsackCapacity + 1);
        for (capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
            knapsackTable[objConsidered][capConsidered] = 0;
        }
    }

    const tableHeader = '<table class="table table-bordered">';
    var tableBody = '';

    for (var objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {
        for (var capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
            
            if(objConsidered == 0) {
                continue;
            }

            if (weightArr[objConsidered - 1] <= capConsidered) {
                knapsackTable[objConsidered][capConsidered] = 
                (Math.max(
                    knapsackTable[objConsidered - 1][capConsidered], 
                    knapsackTable[objConsidered - 1][capConsidered - weightArr[objConsidered - 1]] + profitArr[objConsidered - 1]));
                tableBody += '<td>';
                tableBody += knapsackTable[objConsidered][capConsidered];
                tableBody += '</td>'
            }
            else {
                knapsackTable[objConsidered][capConsidered] = knapsackTable[objConsidered - 1][capConsidered]
                tableBody += '<td>';
                tableBody += knapsackTable[objConsidered][capConsidered];
                tableBody += '</td>'
            }
        }
        tableBody += '</tr></tbody>\n';
    }

    const tableFooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = tableHeader + tableBody + tableFooter;

    // console.log(knapsackTable);
    // console.log(knapsackTable[numOfObjects][knapsackCapacity]);

    var solutionArr = [];
    for(let i = 0; i < numOfObjects; i++) {
        solutionArr.push(0);
    }
    find01Solution(parseInt(numOfObjects), parseInt(knapsackCapacity), solutionArr, knapsackTable, parseInt(numOfObjects), profitArr, weightArr);


    kp01ResultantProfitId.innerHTML = knapsackTable[numOfObjects][knapsackCapacity];
    kp01ProfitId.innerHTML = profitArr;
    kp01WeightId.innerHTML = weightArr;
    kp01ResultantSolutionId.innerHTML = solutionArr;
}