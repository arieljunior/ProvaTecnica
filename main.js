
$(function(){

    var data = $.getJSON("data.json", function() {
        // console.log( "success" );
        localStorage.setItem('dataJSON', JSON.stringify(data.responseJSON));
        insertSelect(data.responseJSON.categories, 'categoriaSelect');
        insertSelect(data.responseJSON.product[0].names, 'produtoSelect');
        insertSelect(data.responseJSON.brands[0].names, 'marcaSelect');
        
        init(data.responseJSON);
    
      })
        .done(function() {
          //console.log( "second success" );
        })
        .fail(function() {
        //   console.log( "error" );
        })
        .always(function() {
        //   console.log( "complete" );
        });


});

function init(dataJson, idMarcaProduto){
    // console.log(dataJson);



    google.charts.load('current', {packages: ['corechart']});  
    google.charts.setOnLoadCallback(function(){
        
        var arrayToTable = [];
        switch(idMarcaProduto){
            case 'ca1':
                arrayToTable = [
                    ['Mês', 'Quantidade'],
                    ['Março',  90],
                    ['Junho',  10],
                    ['Agosto',  100]
                ];
                break;
            case 'ad1':
                arrayToTable = [
                    ['Mês', 'Quantidade'],
                    ['Janeiro',  100],
                    ['Fevereiro',  110],
                    ['Março',  70],
                    ['Novembro',  300],
                    ['Dezembro',  400]
                ];
            break;
            case 'am1':
                arrayToTable = [
                    ['Mês', 'Quantidade'],
                    ['Janeiro',  100],
                    ['Março',  520],
                    ['Maio',  500]
                ];
            break;
            case 'an1':
                arrayToTable = [
                    ['Mês', 'Quantidade'],
                    ['Maio',  1000]
                ];
            break;
            default:
                arrayToTable = [
                    ['Mês', 'Quantidade'],
                    ['Janeiro',  100],
                    ['Fevereiro',  100],
                    ['Março',  50],
                    ['Abril',  250],
                    ['Maio',  500]
                ];
            break;
        }

        var data = google.visualization.arrayToDataTable(arrayToTable);
    
        var options = {title: 'Quantidade de vendas'}; 
    
        var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        chart.draw(data, options);
    });
    
}

function insertSelect(dataArray, idElement){
    var optionsCategory = '';
    for(var index in dataArray){
        optionsCategory += '<option value="'+ dataArray[index].id +'">' + dataArray[index].name + '</option>';
    }
    $('#'+idElement).empty();
    $('#'+idElement).append(optionsCategory);
    return dataArray[0].id;
}

function updateSelects(idSelected, idElement){
    var dataJson = JSON.parse(localStorage.getItem('dataJSON'));

    switch(idElement){
        case 'categoriaSelect':
            var productId = '';
            for(var i in dataJson.product){
                if(dataJson.product[i].idCategory === idSelected){
                    insertSelect(dataJson.product[i].names,"produtoSelect");
                    productId = dataJson.product[i].names[0].id;
                    break;
                }
            }
            for(var i in dataJson.brands){
                if(dataJson.brands[i].idProduct === productId){
                    var idBrand = insertSelect(dataJson.brands[i].names,"marcaSelect");
                    restartChart(idBrand);
                }
            }
            break;

        case 'produtoSelect' :
            for(var i in dataJson.brands){
                if(dataJson.brands[i].idProduct === idSelected){
                    var idBrand = insertSelect(dataJson.brands[i].names,"marcaSelect");

                    restartChart(idBrand);
                }
            }
            break;
    }
    

}


function restartChart(idBrand){
    $('#chart').empty();
    var dataJson = JSON.parse(localStorage.getItem('dataJSON'));
    init(dataJson,idBrand);
}