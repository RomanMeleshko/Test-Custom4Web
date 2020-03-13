window.onload = function() {

    var config = {
        method: 'GET',
        url: "db.json",
    }

    let data;

    function getHttpRequest(conf) {

        let xml = new XMLHttpRequest();

        xml.onreadystatechange = function() {
            if (xml.readyState == 4 && xml.status == 200) {
                data = JSON.parse(xml.responseText);

                deletePreLoader();

                setTableData( data );

                pagination();

               // showRows();

            }
        }

        preLoader();

        xml.open(conf.method, conf.url, true);

        xml.send();
    }

    getHttpRequest( config );

    function preLoader() {

        let elem = document.getElementsByClassName("table-block");

        let createElemContainer = document.createElement("div");

        let createElem = document.createElement("div");

        createElemContainer.classList.add("container-loader");
        createElem.classList.add("circle");

        createElemContainer.append(createElem);
        elem[0].prepend(createElemContainer);
    }

    function deletePreLoader() {

        let elem = document.getElementsByClassName("container-loader");
        elem[0].remove();

    }

    function activeHeaderLine() {

        var colIndex = -1,
            count = 0;

        var arr_elem_th = document.getElementsByTagName("th");

        for(var i = 0; i < arr_elem_th.length; i++ ) {

            arr_elem_th[i].addEventListener("click", function () {

                if(count == 3) count = 0;

                sortTable(this.cellIndex, colIndex == this.cellIndex, count);

                colIndex = (colIndex == this.cellIndex) ? -1 : this.cellIndex;

                count++;

            });

        }

    }

    activeHeaderLine();

    function setTableData(data) {

        var elem = document.getElementsByClassName("table-block__info");

        var arr;

        for(var i = 0; i < data.length; i++) {

            var createTr = document.createElement("tr");

            arr = getArrFromData( data[i] );

            for(var j = 0; j < arr.length; j++) {

                var createTd = document.createElement("td");

                createTd.innerHTML = arr[j];

                createTr.appendChild(createTd);

            }

            elem[0].appendChild(createTr);

        }

    }

    function getArrFromData(obj) {

        var arr = [];

        for(var key in obj) {

            arr.push(obj[key]);

        }

        return arr;

    }


    function sortTable(index, reverse, update) {

        let table = document.querySelector("table");
        let tbody = table.querySelector("tbody");

        let arr_rows = [].slice.call(tbody.rows);

        sortRows( index, arr_rows );

        if(index == 2) {

            sortColPrice( index, arr_rows);

        }

        if(reverse) arr_rows.reverse();

        arr_rows.map(function(elem) {
            tbody.appendChild(elem);
        });

        if(update == 2) {

           removeRows(arr_rows, tbody);

           setTableData(data);

        }

    }

    function sortRows(index, arr) {

        arr.sort(function(a, b) {
            let row_a = a.cells[index].innerHTML;
            let row_b = b.cells[index].innerHTML;

            if(row_a < row_b) return -1;

        });
    }

    function sortColPrice(index, arr) {

        arr.sort(function(a, b) {
            let row_a = a.cells[index].innerHTML;
            let row_b = b.cells[index].innerHTML;

            if(row_b < row_a) return row_a - row_b;

        });
    }

    function removeRows(arr, tbody) {

        arr.map(function(elem) {
           tbody.removeChild(elem);
        });

    }

    function sortTextField() {

        var text_field = document.getElementsByClassName("table-block__input")[0];

        text_field.addEventListener("keyup", function(event) {

           sortString(text_field.value, event.code);

        });

    }

    sortTextField();


    function sortString(text, code) {

        let table = document.querySelector("table");
        let tbody = table.querySelector("tbody");

        let arr_rows = [].slice.call(tbody.rows);

        var result = [];

        if(code == "Backspace") {

                removeRows(arr_rows, tbody);

                setTableData(data);

            return;

        }

        for(var i = 0; i < arr_rows.length; i++) {

            var str = arr_rows[i].cells[1].innerHTML.toLowerCase();

            if(str.indexOf(text) == 0) {

                result.push(arr_rows[i]);

            }

        }

        console.log(table.clientHeight);

        removeRows(arr_rows, tbody);

        result.map(function(elem) {
            tbody.append(elem);
        });

    }


    function pagination() {

        let pagination = document.getElementsByClassName("pagination")[0];

        let table_block = document.getElementsByClassName("table-block__table")[0];

        let table = document.getElementsByClassName("table")[0];

        table_block.style.height = table.clientHeight / 10 + "px";

        let count = 0;

        let create_li;

        for(var i = 0; i < 2; i++) {

            create_li = document.createElement("li");

            if(i == 0) {

                create_li.innerText = "Up";

                create_li.addEventListener("click", function(){

                    if(count == 0 || count > 0) return;

                    table.style.marginTop = (count += table.clientHeight / 10 - 5) + "px";

                });
            }

            if(i == 1) {

                create_li.innerText = "Down";

                create_li.addEventListener("click", function(){

                     if(count <= -table.clientHeight) return;

                     table.style.marginTop = (count -= table.clientHeight / 10 - 5) + "px";

                });

            }

            create_li.classList.add("item");

            pagination.appendChild(create_li);
        }

    }




};