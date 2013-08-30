var csssprites = {

    ioconf: { 
        method: 'POST', 
        form: { 
            id: 'f', 
            upload: true 
        } 
    },
    
    moreFields: function() {

        var mf = document.getElementById('more-fields');
        var initial = mf.parentNode.getElementsByTagName('div')[0];
        var new_div = document.createElement('div');
        var new_input = document.createElement('input');
        new_input.type = 'file';
        new_input.name = 'img[]';
        new_input.className = 'choose-file';
        new_div.appendChild(new_input);
        new_div.appendChild(document.createTextNode('\u00A0'));
        new_div.appendChild(new_input.cloneNode(true));
        new_div.appendChild(document.createTextNode('\u00A0'));
        new_div.appendChild(new_input.cloneNode(true));
        var inserted = initial.parentNode.insertBefore(new_div, mf);
    },

    options: function() {
        var el = document.getElementById('the-options');
        if (el.style.display === "block") {
            el.style.display = "none";
        } else {
            el.style.display = 'block';
        }
    },

    createTable: function(sprite, res) {

        // creates <table> and <tbody> elements
        var table     = document.createElement("table");
        var tablebody = document.createElement("tbody");
        var thediv, im, x, y;

        var current_row = document.createElement("tr");
        var current_cell = document.createElement("th");
        current_cell.appendChild(document.createTextNode('To display this image...'));
        current_row.appendChild(current_cell);
        current_cell = document.createElement("th");
        current_cell.appendChild(document.createTextNode('...use this style'));
        current_row.appendChild(current_cell);
        tablebody.appendChild(current_row);

        var the_background = "url(results/"+ sprite.id +"/result.png?a"+ Math.random(0, 1000) + '=' + Math.random(0, 1000) + ")";

        // creating all cells
        for(var i = 0; i < sprite.images.length; i++) {
            // creates a <tr> element
            current_row = document.createElement("tr");

            // creates a <td> element
            current_cell = document.createElement("td");            

            thediv = document.createElement('div');
            im = sprite.images[i];
            x = im[0];
            y = im[1];
            if (x > 0) x = '-' + x;
            if (y > 0) y = '-' + y;
            thediv.style.background = the_background;
            thediv.style.backgroundPosition = x +"px "+ y +"px";
            thediv.style.width = im[2] +"px";
            thediv.style.height = im[3] +"px";
            thediv.appendChild(document.createTextNode('\u00A0'));
            current_cell.appendChild(thediv);
            current_row.appendChild(current_cell);


            current_cell = document.createElement("td");

            currenttext = document.createTextNode("background-position: "+ x +"px "+ y +"px;");

            current_cell.appendChild(currenttext);
            // appends the cell <td> into the row <tr>
            current_row.appendChild(current_cell);

            // appends the row <tr> into <tbody>
            tablebody.appendChild(current_row);
        }

        // appends <tbody> into <table>
        table.appendChild(tablebody);
        // appends <table>
        res.appendChild(table);

    },

    showResults: function(sprite) {

        var res = document.getElementById('results');
        res.style.display = 'none';
        if (res.getElementsByTagName('table')[0]) {
            var tab = res.getElementsByTagName('table')[0];
            tab.parentNode.removeChild(tab);
        }

        var link, i = 0, links = res.getElementsByTagName('a');
        for (i = 0; i < links.length; i++) {
            link = links[i];
            link.innerHTML = link.innerHTML.replace(/SID/, sprite.id);
            link.href      = link.href.replace(/SID/, sprite.id);

        }

        var thecode = res.getElementsByTagName('code')[0];
        thecode.innerHTML = thecode.innerHTML.replace(/SID/, sprite.id);

        csssprites.createTable(sprite, res);

        res.style.display = 'block';

        var to = csssprites.Y.get('#page-wrap');
        if (to) {
            to = to.getComputedStyle('backgroundColor');
        } else {
            to = '#fff';
        }

        new csssprites.Y.Anim({
                node:'#results', 
                from: {backgroundColor: '#feff8f'},
                to: {backgroundColor: to}
            }).run();

    },

    uploadCallback: function(id, o){
        try {
            var sprite = csssprites.Y.JSON.parse(o.responseText);
        } catch (e) {
            alert('Wacky response from the spriting server, sorry it didn\'t work out.');
            return false;
        }
        csssprites.showResults(sprite);
    },

    uploadFale: function(id, o) {
        alert('Sorry, something went wrong, cross your fingers and try again');
    },

    makeRequest: function (e) {
        var cnt = 0, 
            i, 
            els = document.getElementsByName('img[]');
        
        e.halt();
           
        for (i=0; i < els.length; i++) {
            if (els[i].value != '') {
                cnt++;
            }
        }

        if (cnt < 2){
            alert('Please upload at least two images to create a CSS sprite');
            return false;
        }
        
        csssprites.Y.io('upload.php', csssprites.ioconf);
        
    },

    init: function() {
        var Y = csssprites.Y;
        Y.on('click', csssprites.moreFields, '#more-fields');
        Y.on('click', csssprites.options, '#more-options');
        Y.on('submit', csssprites.makeRequest, '#f');
        Y.on('io:complete', csssprites.uploadCallback);
        Y.on('io:error', csssprites.uploadFale);

    }

}


csssprites.Y = YUI().use('*');
csssprites.init();


