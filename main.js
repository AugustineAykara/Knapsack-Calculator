var num_rows
var knapsackCapacity

function createTable() {
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    var theader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Weight</th><th scope="col">Profit</th></tr>';
    var tbody = '';

    for (var i = 0; i < num_rows; i++) {

        tbody += '<tbody><tr>';
        tbody += '<td>';
        tbody += 'Item ' + i
        tbody += '</td>'
        for (var j = 0; j < 2; j++) {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}





