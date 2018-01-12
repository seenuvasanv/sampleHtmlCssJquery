$(document).ready(function() {
    var dealSearch = $("#dealSearch"),
        searchIcon = $("#searchIcon"),
        yuMeTable = $("#YuMetable"),
        dataRow = $(".YuMeTable-cell.content"),
        expandTitle,
        rowMarker;
    
    dealSearch.keyup(function(event) {
        if (dealSearch.val()) {
            searchIcon.removeClass("fa-search").addClass("fa-close");
        } else {
            searchIcon.removeClass("fa-close").addClass("fa-search");
        }
    });

    searchIcon.click(function() {
        if($(this).hasClass("fa-close")) {
            dealSearch.val("");
            searchIcon.removeClass("fa-close").addClass("fa-search");
        }
    });

    yuMeTable.on('click', '.actionBarCancel > .fa-close', function() {
        $(".rowExpander").slideUp(600);
    });

    yuMeTable.on('click', '.YuMeTable-cell.content', function() {
        rowPosition = parseInt($(this).attr("data-yume-key")) - 1;
        expandTitle = `${dealData[rowPosition].name} - Report`;                       
        rowMarker = $(this).nextAll(".rowExpander").first().find(".rowMarker");
        $(".rowExpander").slideUp(600);
        if(rowMarker.parent().css("display") === 'block') {
            return false;
        } else if(rowMarker.children().length === 0) {            
            rowMarker.append(`
                <div class="expandTitle">${expandTitle}</div>
            `);
            $.each(dealData[rowPosition], function(index, value) {
                if(index !== 'status' && index !== 'priority' && index !== 'name' && index !== 'complete' &&
                        index !== 'cpm' && index !== 'impressionsGoal') {
                    classNames = index+" YuMeExpand-cell";
                    index = index.replace(/^[a-z]|[A-Z]/g, function(v, i) {
                        return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
                    });
                    rowMarker.append(`
                        <div class="${classNames}">
                            <div class="expandValue">${value}</div>
                            <div  class="expandLabel">${index}</div>
                        </div>
                    `);
                }
            });            
        }
        $(this).nextAll(".rowExpander").first().slideDown(600);  
    });

    function loadDealData() {
        var classNames,
            defaultDisplayColumn = 9,
            m,
            rowPosition;

        for(var i=0; i<dealData.length; i++) {
            m = 0;
            $.each(dealData[i], function(index, value) {                
                if(m === defaultDisplayColumn) {
                    return false;
                }
                m++;
                rowPosition =`data-yume-key=${dealData[i].priority}`;
                if(i%2 !== 0) {
                    classNames = index+" YuMeTable-cell content even rowPosition";
                } else {
                    classNames = index+" YuMeTable-cell content odd rowPosition";
                }
                if(index === "complete" || index === "impressionsGoal") {
                    yuMeTable.append(
                        `<div class='${classNames}' ${rowPosition}>
                            <span>${value}</span>
                            <div class="progressBarHolder">
                                <div class="progressBar" style="width: ${value};"></div>
                            </div>
                        </div>`);
                } else if(index === "status") {
                    yuMeTable.append(
                        `<div class='${classNames}' ${rowPosition}>
                            <span class="fa fa-clock-o"></span>
                        </div>`);
                } else if(index === "cpm") {
                    yuMeTable.append(
                        `<div class='${classNames}' ${rowPosition}>
                            <div class="marginT8">${value}</div>
                            <span class="fa fa-ellipsis-v"></span>
                        </div>`);
                } else if(index === "priority") {                    
                    yuMeTable.append(
                        `<div class='${classNames}' ${rowPosition}>
                            <div class="marginT8">
                                <span class="fa fa-arrows-v"></span>
                                <span>${value}</span>
                            </div>
                        </div>`);
                } else {
                    yuMeTable.append(
                        `<div class='${classNames}' ${rowPosition}>
                            <div class="marginT8">${value}</div>
                        </div>`);
                }                
            });
            yuMeTable.append(`<div style="width: 100%;" class="rowExpander">
                                    <div class="rowMarker" style='width: 90%;'></div>
                                    <div class="actionBar">
                                        <div class="actionBarEdit"><span>Edit Deal</span></div>
                                        <div class="actionBarClone"><span>Clone Deal</span></div>
                                        <div class="actionBarCancel">
                                            <span class="fa fa-close"></span>
                                        </div>
                                    </div>
                            </div>`);
        }
    }

    loadDealData();
})