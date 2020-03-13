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



    // function setTableData(data) {
    //
    //     let table = document.getElementsByClassName("table")[0];
    //
    //     let arr;
    //
    //     for(var i = 0; i < 9; i++) {
    //
    //         let create_tbody = document.createElement("tbody");
    //
    //         table.appendChild( create_tbody );
    //     }
    //
    //     let tbody = document.getElementsByTagName("tbody");
    //
    //     for(var j = 0; j < tbody.length; j++) {
    //
    //          for(var t = 0; t < 20; t++) {
    //
    //              let create_tr = document.createElement("tr");
    //
    //              arr = getArrFromData( data[t] );
    //
    //              for(var f = 0; f < arr.length; f++) {
    //
    //                  let create_td = document.createElement("td");
    //
    //                  create_td.innerHTML = arr[f];
    //
    //                  create_tr.appendChild(create_td);
    //
    //              }
    //
    //              tbody[j].appendChild(create_tr);
    //
    //          }
    //
    //        // console.log(tbody);
    //
    //     }
    //
    //
    //     console.log( table );
    //
    // }


    function setTableData(data) {

        var table = document.getElementsByClassName("table")[0];

        let arr;

        for(var i = 0; i < data.length / 20; i++) {

            var create_tbody = document.createElement("tbody");

            create_tbody.classList.add("table-block__tbody");

            for(var j = 0; j < 20; j++) {

                var create_tr = document.createElement("tr");

                create_tbody.appendChild( create_tr );

            }

            table.appendChild( create_tbody );
        }



        var elem = document.getElementsByTagName("tr");

      //  console.log(data);

        for(var t = 0; t < data.length; t++) {

           arr = getArrFromData( data[t] );

            for(var f = 0; f < arr.length; f++) {

                var create_td = document.createElement("td");

                create_td.innerHTML = arr[f];

                elem[t + 1].appendChild(create_td);

            }


        }

        console.log( table );

    }

    function getArrFromData(obj) {

        var arr = [];

        for(var key in obj) {

            arr.push(obj[key]);

        }

        return arr;

    }

};


