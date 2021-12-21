var curPage=1;
    var perPage=100;
    var totalData = [];

    

    function fnPrev(){
        if(curPage==1){
            
            return;
        }
        curPage = curPage-1;
        fnRenderData();
    }
    function fnGoTo(){
        curPage=Number(document.querySelector('input').value);
        fnRenderData();
    }
    function fnNext(){
        if(curPage==totalData.length/perPage) return;
        curPage = curPage+1;
        fnRenderData();
    }

    function fnRenderData(){
        var end = curPage*perPage;
        var start = end-perPage
        var tbleData = totalData.slice(start,end);
        prepareTable(tbleData);
        document.querySelector('span').innerHTML=curPage;
    }

    function prepareHeader(){
        return '<tr><th>ID</th><th>TITLE</th><th>URL</th><tr>';
    }

    function prepareData(data){
        var trs='';
        data.forEach(function(obj){
            trs = trs+'<tr><td>'+obj.id+'</td><td>'+obj.title+'</td><td>'+obj.url+'</td></tr>'
        });
        return trs;
    }
    function prepareTable(tableData){
        var tbl='<table border="2px solid black">'+prepareHeader()+prepareData(tableData)+'</table>';
        document.querySelector('div').innerHTML=tbl;
    }

    function getPhotos(){
        fetch("https://jsonplaceholder.typicode.com/photos",{
            method:'get'
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            totalData=data;
            var tableData = data.splice(0,100);
            prepareTable(tableData);
            document.querySelector('p').removeAttribute('style');
            
        })
        .catch(function(data){
        })
    }