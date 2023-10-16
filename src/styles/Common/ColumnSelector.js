// ## Table setting
//	* default settings
//		- columnSelector: true
//		- resize: true
function SetTableSettings(settings) {

	if (settings == undefined) {
		settings = {
			columnSelector: true,
			resize: true
		};
	}

	var targetList = $(document).find('table[selector=true]');
	if (targetList.length > 0) {

		$.each(targetList, function (idx, item) {

			// column selector 기능을 추가합니다.
			if (settings.columnSelector === true) {
				var tableClass = 'selectorclass' + idx;
				var popOverClass = 'targetclass' + idx;
				var chkboxClass = 'buttonclass' + idx;

				// settings
				$(item).before('<div class="hidden"><div id="popover-target" class="' + popOverClass + ' removeFirstCol"></div></div>');
				$(item).addClass(tableClass);
				$(item).find('#popover').addClass(chkboxClass);
				var objJson = {
					tableClass: tableClass,
					popOverClass: popOverClass,
					chkboxClass: chkboxClass
				}

				// column selector 기능을 추가합니다.
				AddColumnSelector(objJson);
			}

			// column에 resize를 기능을 추가합니다.
			if (settings.resize === true) {
				// column selector를 사용하는 table에 resize 기능을 추가합니다.
				// - resizableColumns() : column selector 후에 실행 되어야 합니다.
				//						  그렇지 않으면 정상 동작되지 않습니다.
				// - resizableColumns()에서 모든 th에 .css('position', 'relative')로 설정합니다.
				//	 첫번째 th가 relative로 설정이 되면, column selector 팝업이 짤려서 팝업됩니다.
				//   그러므로 column selector와 resize를 같이 사용하는 경우, 첫번째 th의 .css('position', 'relative') 디자인을 변경합니다.
				AddColumnResize(item);
				$(item).find("th:first-child").css('position', 'inherit');
			}
		});

		// column selector 기능 - 이벤트는 한번만 연결합니다.
		if (settings.columnSelector === true) {
			// popover영역이 아닌 곳을 클릭하면 팝업을 닫습니다.
			BlurPopOverDivPopup();
		}
	}
}

// column selector 기능을 추가합니다.
function AddColumnSelector(objJson) {
    /*  2019 12 29 배성민
     * 
     *  Min에 아직 반영되지 않음
     *  필요한 js 파일
     *  jquery.tablesorter.js
     *  jquery.tablesorter.widgets.js
     *  widget-columnSelector.js
     *  사용법 : 
     *  1) 원하는 테이블의 클래스에 selectorclass 입력
     *  2) 히든div 추가
     *          <div class="hidden">
     *              <div id="popover-target" class="targetclass"></div>
     *          </div>
     *  3)  <th class="column-title" data-sorter="false">
	            <input id="popover" type="checkbox" class="popoverclass" data-sorter="false">
            </th>
     *  4) columnSelector.css 추가
     *  5) <th>와 <td> 개수가 일치해야함  
     *  
     */

	$("." + objJson.tableClass).tablesorter({
		theme: 'blue',
		widgets: ['zebra', 'columnSelector', 'stickyHeaders'],
		headers: {
			// disable sorting of the first & second column - before we would have to had made two entries
			// note that "first-name" is a class on the span INSIDE the first column th cell
			'th': {
				// disable it by setting the property sorter to false
				sorter: false
			}
		}
	});

	$.tablesorter.columnSelector.attachTo($('.' + objJson.tableClass), '.' + objJson.popOverClass);

	$('.' + objJson.chkboxClass)
		.popover({
			placement: 'auto top',
			html: true,
			content: $('.' + objJson.popOverClass)
		});

	// "No matching records found" td의 colspan을 변경합니다.
	$('.' + objJson.tableClass).on('change', function () {
		var length = $(this).find('th:visible').length;

		// "No matching records found" td의 colspan을 변경합니다.
		var emptyTd = $(this).find('.dataTables_empty');
		$(emptyTd).attr('colspan', length);
	});
	$('.' + objJson.tableClass).change();

	// popup이 띄워지기 전에 호출됩니다.
	$('.' + objJson.chkboxClass).on('show.bs.popover', function () {
		// 다른 팝업을 닫습니다.
		var buttonObject = $('img[aria-describedby]');
		if (buttonObject.length > 0) {
			$(buttonObject).click();
		}
	});
}

// popover영역이 아닌 곳을 클릭하면 팝업을 닫습니다.
// (popover 팝업에 blur이벤트와 유사한 기능을 설정합니다.)
function BlurPopOverDivPopup() {

	// blur, focusout 이벤트를 설정해 보았으나, 잘 안되어 아래처럼 처리합니다.
	// document에 클릭이벤트를 설정하고 popover 영역이 아닐 경우 처리합니다.
	// column selecotr popup이 띄워진 후 호출됩니다.
	$(document).click(function (e) {

		// column selecotr popup이 있을 때만 aria-describedby attribute가 생깁니다.
		var buttonObject = $('img[aria-describedby]');
		if (buttonObject.length > 0) {

			var popupID = $(buttonObject).attr('aria-describedby');

			// 현재 popup 영역이 아닌 곳을 클릭하면 팝업을 닫습니다.
			if ($(e.target).parents('#' + popupID).length == 0) {

				// 단, button객체를 클릭할 경우는 제외합니다.
				if ($(e.target).is(buttonObject)) {
					return;
				}

				$(buttonObject).click();
			}
		}
	});
}

// column에 resize를 기능을 추가합니다.
function AddColumnResize(obj) {
	/*
		resizableColumns.min.js 파일을 추가하여 사용합니다.
	 */
	$(obj).addClass('resizable');	// resizable class를 추가해야 resizableColumns() 함수가 정상 작동합니다.
	$(obj).resizableColumns();
	$(obj).mousemove(function () {

		//$(this).find('th:not(:visible)').css('width', '1px');
		//$(this).find('th:not(:visible)').attr('width', '1');
	});
}