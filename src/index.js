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

           sortString(text_field.value);

        });

    }

    sortTextField();

    function sortString(text) {

        let table = document.querySelector("table");
        let tbody = table.querySelector("tbody");

        let arr_rows = [].slice.call(tbody.rows);

        text = text.toLowerCase();

        arr_rows.sort(function(a, b) {

            var lower = a.cells[1].innerHTML.toLowerCase();

           if(lower.indexOf(text) == 0)  return -1;

        });

        arr_rows.map(function(elem) {
            tbody.appendChild(elem);
        });

    }








};