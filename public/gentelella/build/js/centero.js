
$(document).ready(function () {
    //menu
    $(".item1").mouseover(function () {
        $(this).children().addClass("active");
        $(".gnb_depth2").stop().slideDown(200);
        $(".gnb_sub_bg").stop().slideDown(200);
    });
    $(".item1").mouseout(function () {
        $(this).children().removeClass('active');
        $(".gnb_depth2").stop().slideUp(200);
        $(".gnb_sub_bg").stop().slideUp(200);
    });
    $(".gnb_sub_bg").mouseover(function () {
        $(this).children().addClass("active");
        $(".gnb_depth2").stop().slideDown(200);
        $(".gnb_sub_bg").stop().slideDown(200);
    }).mouseout(function () {
        $(this).children().removeClass('active');
        $(".gnb_depth2").stop().slideUp(200);
        $(".gnb_sub_bg").stop().slideUp(200);
    });

});


function menuSet(menu) {
    $('.nav-item a.nav-link span.fa').removeClass('fa-chevron-down');
    $('.nav-item a.nav-link span.fa').addClass('fa-chevron-right');

    if (menu[0].getAttribute('aria-expanded') == 'true') {
        menu[0].children[2].setAttribute('class', 'fa fa-chevron-right');
    }
    else {
        if (menu[0].children[2].hasAttribute('class')) {
            if (menu[0].children[2].getAttribute('class') == 'fa fa-chevron-right') {
                menu[0].children[2].setAttribute('class', 'fa fa-chevron-down');
            }
            else if (menu[0].children[2].getAttribute('class') == 'fa fa-chevron-down') {
                menu[0].children[2].setAttribute('class', 'fa fa-chevron-right');
            }
        }
    }
}

/**
 * JSON 데이터에서 오프젝트 찾기
 * @param {any} obj JSONDATA
 * @param {any} key Search Key
 * @param {any} val Search Value
 */
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


/**
 * 선택된 태그에 대해서 정렬 하기
 * @param {any} col  컬러명
 * @param {any} sort 정렬 
 * @param {any} tag  선택된 태그 요소 
 * @param {any} flag  재조회 여부
 */
function ChangeSort(col, sort, tag,flag) {

    
    // initialize sort
    var lstCol = tag.closest('tr').getElementsByTagName('i');

    // if select id(tag.id) and selected column's val are not equal then initailize sort 
    if (col.val() != tag.id) {
        for (var i = 0; i < lstCol.length; i++) {
            lstCol[i].className = 'fa-solid fa-sort';
        }
    }
    if (flag) {
        // set sort
        var sortClass = $(tag).find('i:first-child').attr('class');

        if (sortClass == "fa-solid fa-sort") {
            $(tag).find('i:first-child').removeClass('fa-sort');
            $(tag).find('i:first-child').addClass('fa-sort-up');
            col.val(tag.id);
            sort.val('ASC');
        }
        else if (sortClass == "fa-solid fa-sort-up") {
            $(tag).find('i:first-child').removeClass('fa-sort-up');
            $(tag).find('i:first-child').addClass('fa-sort-down');
            col.val(tag.id);
            sort.val('DESC');
        }
        else {
            $(tag).find('i:first-child').removeClass('fa-sort-down');
            $(tag).find('i:first-child').addClass('fa-sort');
            col.val('');
            sort.val('');
        }

        var url = location.href;
        var urlParams = new URLSearchParams(location.search);
        if (urlParams == '') { //param 없을경우
            if (url.indexOf('PAGE_SORT') == -1 || url.indexOf('PAGE_SORT_COL') == -1) {//PAGE_SORT,PAGE_SORT_COL 파라미터 존재 x
                url += '?PAGE_SORT=' + sort.val() + '&PAGE_SORT_COL=' + col.val();
            }
            else {//PAGE_SORT,PAGE_SORT_COL 파라미터 존재 O
                urlParams.set('PAGE_SORT', sort.val());
                urlParams.set('PAGE_SORT_COL', col.val());
                url = location.origin + location.pathname + '?' + urlParams;
            }
        }
        else { //param 있을경우
            if (url.indexOf('PAGE_SORT') == -1 || url.indexOf('PAGE_SORT_COL') == -1) {//PAGE_SORT,PAGE_SORT_COL 파라미터 존재 x
                url += '&PAGE_SORT=' + sort.val() + '&PAGE_SORT_COL=' + col.val();
            }
            else {//PAGE_SORT,PAGE_SORT_COL 파라미터 존재 O
                urlParams.set('PAGE_SORT', sort.val());
                urlParams.set('PAGE_SORT_COL', col.val());
                url = location.origin + location.pathname + '?' + urlParams;
            }
        }
        
       
        location.href = url;

    } else { // Action 처리 후 저장된 설정 값으로 설정
        $(tag).find('i:first-child').removeClass('fa-sort');

        if (sort.val() == "ASC") {
            $(tag).find('i:first-child').addClass('fa-sort-up');
        }
        else if (sort.val() == "DESC") {
            $(tag).find('i:first-child').addClass('fa-sort-down');
        }
        else {
            $(tag).find('i:first-child').addClass('fa-sort');
            col.val('');
            sort.val('');
        }
    }
    
}

/**
 * 날짜 시간 변환 method
 * @param {any} value  날짜 데이터
 */
function convertToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return dt.getFullYear() + "-" + (("00" + (dt.getMonth() + 1)).slice(-2)) + "-" +
        ("00" + dt.getDate()).slice(-2) + " " + ("00" + dt.getHours()).slice(-2) + ":" + ("00" + dt.getMinutes()).slice(-2) + ":" + ("00" + dt.getSeconds()).slice(-2);
}

/**
 * 다른 데이터 입력 시 숫자만 입력하도록 처리 (replace)
 * @param {any} obj
 */
function replaceNum(obj) {
    obj.value = obj.value.replace(/[^0-9]/g, "");
}

/**
 * 레이아웃 공통 기능 및 fnc
 */
var g =
{
    sections:
    {
        search:
        {
            // -------- Values
            selectorSection: ".section-search"
            , selectorBtnClear: ".section-search-btn-clear"
            , selectorBtnSearch: ".section-search-btn-search"

            // -------- Methods
            , onBtnClearClick: function () {
                if ($(g.sections.search.selectorSection).length == 0) {
                    throw g.sections.search.selectorSection + " 를 찾을 수 없습니다.";
                }
                else {
                    $(g.sections.search.selectorSection).find("input, select").each(function (i, obj) {
                        if ($(obj).attr("type") != undefined) {
                            var type = $(obj).attr("type").toLowerCase();
                            if (type == "radio" || type == "checkbox") {
                                var defaultChecked = $(obj).attr("default-checked");
                                if (defaultChecked != undefined && defaultChecked == "true") {
                                    $(obj).prop("checked", true);
                                }
                                else {
                                    $(obj).prop("checked", false);
                                }
                            }
                            else if ($(obj).attr("type").toLowerCase() != "hidden") {
                                $(obj).val("");
                            }
                        }
                        else {
                            $(obj).val("");
                        }
                    });
                }
            }

            , onBtnSearchClick: function () {
                if ($(g.sections.search.selectorSection).length == 0) {
                    throw g.sections.search.selectorSection + " 를 찾을 수 없습니다.";
                }
                else {
                    $(g.sections.search.selectorSection + " #searchForm").submit();
                }
            }

            // -------- Buttons
            , setButtons: function () {
                if ($(g.sections.search.selectorBtnClear).length == 0) {
                    console.log(g.sections.search.selectorBtnClear + " 를 찾을 수 없습니다.");
                }
                else {
                    $(g.sections.search.selectorBtnClear).click(this.onBtnClearClick);
                }
                
                if ($(g.sections.search.selectorBtnSearch).length == 0) {
                    console.log(g.sections.search.selectorBtnSearch + " 를 찾을 수 없습니다.");
                }
                else {
                    $(g.sections.search.selectorBtnSearch).click(this.onBtnSearchClick);
                }
            }

            // -------- Events
            , setControlsKeyPress: function () {
                $(g.sections.search.selectorSection).find("input").each(function (i, obj) {
                    $(obj).on("keypress", function (e) {
                        if (e.which == 13) {
                            g.sections.search.onBtnSearchClick();
                        }
                    });
                });
            }

            // -------- Activate
            , activate: function () {
                this.setButtons();
                this.setControlsKeyPress();
            }
        }

        , list:
        {
            activate: function () {
                // None
            }
        }

        , activate: function () {
            this.search.activate();
            this.list.activate();
        }
    }

    , controls:
    {
        setDatepicker: function () {
            var selector = ".control-wrap-date-from-to";

            $(selector + " input").each(function (i, obj) {
                $(obj).attr(
                    "datepicker-shown", false
                ).datepicker({
                    autoHide: true,
                    todayHighlight: true,
                    format: "yyyy-mm-dd"
                }).on('changeDate', function (e) {
                    $(obj).datepicker('hide').attr("datepicker-shown", false);
                }).focus(function (_this) {
                    $(obj).attr("datepicker-shown", true);
                }).focusout(function (_this) {
                    $(obj).attr("datepicker-shown", false);
                }).next().click(function (_this) {
                    if ($(obj).attr("datepicker-shown") == "true") {
                        $(obj).datepicker("hide").attr("datepicker-shown", false);
                    }
                    else {
                        $(obj).datepicker("show").attr("datepicker-shown", true);
                    }
                });

                if ($(obj).val() == "0001-01-01") {
                    $(obj).datepicker("clearDates");
                }

                $(obj).on("change", function () {
                    var index = $(selector + " input").index($(this));
                    if (index % 2 == 0) {
                        $(selector + " input").eq(i + 1).datepicker("setStartDate", $(obj).datepicker("getDate"));
                    }
                    else {
                        $(selector + " input").eq(i - 1).datepicker("setEndDate", $(obj).datepicker("getDate"));
                    }
                });
            });
        }

        , activate: function () {
            this.setDatepicker();
        }
    }

    , fnc:
    {
        toURL: function (params) {
            rs = "";
            for (key in params) {
                if (rs == "") {
                    rs += "?" + key + "=" + params[key];
                }
                else {
                    rs += "&" + key + "=" + params[key];
                }
            }
            return rs;
        }

        , getURLParams: function () {
            rs = {};
            var search = window.location.search;
            if (search.length != 0) {
                if (search.substr(0, 1) == "?") {
                    search = search.substr(1, search.length - 1);
                }

                var arr = search.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var node = arr[i].split("=");
                    rs[node[0]] = node[1];
                }
            }
            return rs;
        }

        , validate: function (info) {
            for (var i = 0; i < info.length; i++) {
                if (info[i].length < 2) {
                    throw "error - g.fnc.validate - 파라미터의 갯수가 올바르지 않습니다.";
                }
                else {
                    var control = $(info[i][0]);

                    if (control.length == 0) {
                        throw "error - g.fnc.validate - 요청한 Selector를 찾을 수 없습니다. - Selector : " + info[i][0];
                    }
                    else {
                        var tagName = control.eq(0)[0].tagName.toLowerCase();
                        var type = (control.eq(0).attr("type") == undefined ? "" : control.eq(0).attr("type")).toLowerCase();

                        if (tagName == "input" && (type == "radio" || type == "checkbox")) {
                            if ($(info[i][0] + ":checked").length == 0) {
                                GtDivMsg.OpenWarning(info[i][1], '$("' + info[i][0] + '").focus();');
                                return false;
                            }
                            else {
                                if (info[i].length > 2) {
                                    for (var k = 2; k < info[i].length; k = k + 3) {
                                        if ($(info[i][0] + '[value="' + info[i][k] + '"]:checked').length == 1) {
                                            if ($(info[i][k + 1]).length == 0) {
                                                throw "error - g.fnc.validate - 추가 validation 조건 Selector를 찾을 수 없습니다. - Selector : " + info[i][k + 1];
                                            } else if ($(info[i][k + 1]).length > 1) {
                                                throw "error - g.fnc.validate - 추가 validation 조건 Selector가 1개 이상입니다. - Selector : " + info[i][k + 1];
                                            } else {
                                                if ($(info[i][k + 1]).val().trim() == "") {
                                                    GtDivMsg.OpenWarning(info[i][k + 2], '$("' + info[i][k + 1] + '").focus();');
                                                    return false;
                                                }
                                            }
                                        }
                                        else if ($(info[i][0] + '[value="' + info[i][k] + '"]:checked').length > 1) {
                                            throw "error - g.fnc.validate - 추가 validation 조건 값이 1개 이상입니다. - Selector : " + info[i][0] + '[value="' + info[i][k] + '"]:checked';
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (control.length > 1) {
                                throw "error - g.fnc.validate - 요청한 " + tagName + " " + type + " Selector의 갯수가 1개 이상입니다. - Selector : " + info[i][0];
                            }
                            else {
                                if (control.val().trim() == "") {
                                    GtDivMsg.OpenWarning(info[i][1], '$("' + info[i][0] + '").focus();');
                                    return false;
                                }
                            }
                        }

                        if (control.val().trim() == "") {
                            GtDivMsg.OpenWarning(info[i][1], '$("' + info[i][0] + '").focus();');
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        , onInputID: function (e) {
            e.value = e.value.replace(/[^0-9a-zA-Z\-\_]/ig, '')
        }

        , onInputPhone: function (e) {
            e.value = e.value.replace(/[^0-9\-\+]/ig, '')
        }

        , onInputEmail: function (e) {
            e.value = e.value.replace(/[^0-9A-Za-z\-\_\@\.]/ig, '')
        }

        , activateOnInput: function () {
            $(".onInputID").each(function (i, obj) {
                $(obj).attr("oninput", "g.fnc.onInputID(this)");
            });
            $(".onInputPhone").each(function (i, obj) {
                $(obj).attr("oninput", "g.fnc.onInputPhone(this)");
            });
            $(".onInputEmail").each(function (i, obj) {
                $(obj).attr("oninput", "g.fnc.onInputEmail(this)");
            });
        }
    }

    , activate: function () {
        this.sections.activate();
        this.controls.activate();
    }
}

timeoutChecker = {
    // Values
      timeoutUrl: "/Default/IsTimeout"
    , logoutUrl: "/Default/Logout"
    , counterCookieName: "ASP.NET_Max"
    , delay: 2000

    // Ref
    , count: 0

    // Methods
    , tick: function (delay) {
        setTimeout(function () {
            timeoutChecker.count += delay / 1000;

            if (timeoutChecker.count > Number(timeoutChecker.getCookie(timeoutChecker.counterCookieName)) * 60) {
                $.get(timeoutChecker.timeoutUrl, function (data) {
                    if (data == true) {
                        location.href = timeoutChecker.logoutUrl;
                    }
                    else {
                        timeoutChecker.count = 0;
                    }
                });
            }

            timeoutChecker.tick(delay);
        }, delay);
    }
    , getCookie: function (name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value ? value[2] : null;
    }
    , activate: function (delay) {
        $("button , a[href]").mousedown(function () {
            $.get(timeoutChecker.timeoutUrl, function (data) {
                if (data == true) {
                    location.href = timeoutChecker.logoutUrl;
                }
            });

            timeoutChecker.count = 0;
        });

        timeoutChecker.tick(delay);
    }
}

$(function () {
    g.fnc.activateOnInput();
    timeoutChecker.activate(timeoutChecker.delay);
})

/**
 * 파일 Size 검증 함수
 * Web.config에서 설정한 FileUploadMaxSize보다 큰 Size의 파일이 업로드될 시
 * 경고 메시지가 표시되며 false를 return한다.
 * (파일이 업로드되지 않는다.)
 * */
function FileSizeValidation() {
    var validation = true;

    $("tbody.files tr").each(function (i, e) {
        if ($(e).find('td#tdText')?.text() == "Error File is too big") {
            var name = $(e).find('td:eq(1)').text()?.trim()
            GtDivMsg.OpenWarning("Please Check the file size of " + name); // Please Check the file size of filename
            validation = false;
        }
        else if ($(e).find('td#tdText')?.text() == "Error Filetype not allowed") {
            var name = $(e).find('td:eq(1)').text()?.trim()
            GtDivMsg.OpenWarning(name + " is an unallowable file type.");
            validation = false;
        }
        else if ($(e).find('td#tdText')?.text() == "Error Maximum number of files exceeded") {
            var name = $(e).find('td:eq(1)').text()?.trim()
            GtDivMsg.OpenWarning(name + " has an Error Maximum number of files exceeded.");
            validation = false;
        }
        //if ($(e).find('td span.label')?.text() == "Error File is too big") {
        //    var name = $(e).find('td:eq(1)').text()?.trim()
        //    GtDivMsg.OpenWarning(name + "의 파일 크기를 확인하여 주십시오.");
        //    validation = false;
        //}
        //else if ($(e).find('td span.label')?.text() == "Error Filetype not allowed") {
        //    var name = $(e).find('td:eq(1)').text()?.trim()
        //    GtDivMsg.OpenWarning(name + "은(는) 허용되지 않는 파일 형식입니다.");
        //    validation = false;
        //}
    });

    return validation;
}

/**
 * Summary : Ajax 오류 발생 시 Error 페이지 이동
 * */
function AjaxError(status, message) {
    let f = document.createElement('form');

    let objStatus;
    objStatus = document.createElement('input');
    objStatus.setAttribute('type', 'hidden');
    objStatus.setAttribute('name', 'ErrorCode');
    objStatus.setAttribute('value', status);
    f.appendChild(objStatus);

    let objMessage;
    objMessage = document.createElement('input');
    objMessage.setAttribute('type', 'hidden');
    objMessage.setAttribute('name', 'ErrorDetail');
    objMessage.setAttribute('value', message);
    f.appendChild(objMessage);

    f.setAttribute('method', 'post');
    f.setAttribute('action', '/Default/AjaxError');
    document.body.appendChild(f);
    f.submit();
}


/**
 * Summary : floating button : top
 * */
$(document).ready(function () {
    $(window).on("scroll", function () {
        var _scrollTop = Math.round($(window).scrollTop());
        var _scrollBtm = _scrollTop + $(window).height();
        var _height = parseInt($("footer").outerHeight());
        var _docValue = $(document).height() - _height;
        if ($(".floating_menu").length > 0) { 
            (_scrollTop < 150) ? $(".floating_menu .btn.top").fadeOut() : $(".floating_menu .btn.top").fadeIn();
            (_scrollBtm >= _docValue) ? $(".floating_menu .btn.top").addClass("btm").css("bottom", _height + 10) : $(".floating_menu .btn.top").removeClass("btm").css("bottom","");
        }
    }).trigger("scroll");

    $(".floating_menu .btn.top").on("click ", function(){
        $("html, body").stop().animate({scrollTop:0}, 200);
    });
});

//
/**
 * 쿠키 값 가져오기. nameofCookie와 같은 값이 있을 경우 해당 cookie의 value 리턴 / 없을 경우 "" 리턴
 * @param {any} name 쿠키 명
 */
function getCookie(name) {
    var nameOfCookie = name + "="; // Main_Notice_PopUp
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

// 쿠키 설정
/**
 * 쿠키 설정. 만료일은 익일 0시를 기준으로 한다. 
 * @param {any} name  쿠키 명
 * @param {any} value 쿠키 값
 */
function setCookie(name, value) {
    var todayDate = new Date();
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    var Dday = nextDate.getTime() - todayDate.getTime();
    document.cookie = name + "=" + escape(value) + "; path=/; max-age=" + Math.floor(Dday / 1000) + ";"
    /*document.cookie = "Main_Notice_PopUp=" + escape("expire") + "; path=/; expires=" + todayDate.toUTCString() + ";"*/
}

/**
 * 다른 데이터 입력 시 숫자, 소수점 숫자만 입력하도록 처리 (replace)
 * 숫자는 9자리까지, 소수점은 5자리까지 입력 가능
 * @param {any} obj
 */
function replaceNumDecimalPoint(obj) {
    obj.value = obj.value.replace(/^(\d{1,9}([.]\d{0,2})?)?$/g, "");
}

/**
 * PopOver를 통해 선택한 테이블 열을 목록으로 출력 하도록 처리
 *  
 * */
var pop = {
    // 필수 설정 사항
    // 1)테이블 id 값
    // 2)PopOver를 출력할 태그의 id 값
    // 3)테이블 th 의 title, name 값

    /**
     * PopOver 초기 설정 
     * @param {any} tableID  컬럼 편집을 진행할 테이블 ID    ex) #TBId
     * @param {any} popOverID PopOver를 출력할 태그의 ID    ex) #PopId
     */
    activate: function (tableID, popOverID) {
        //1)body에 PopoverDiv영역 그리기 (hidden으로 인해 실제 화면에 그려지지지 않는다.)
        if (!document.getElementById("DivPopOver")) { 
            // Dom객체 안에 DivPopOver 아이디가 있는지 체크 하여 없을 경우 그린다.
            $('body').append(pop.createHtml);
        }
       
        //2)PopOverHTML 체크 박스 동적 생성
        pop.InitPopOverHtml(tableID);
        
        //3)PopOver 설정 및 생성
        pop.SetPopOverOption(popOverID);

        //4)Popover 외 다른 영역 클릭 시 Popover 숨기기
        pop.hidePopover(popOverID);

        //5)초기 스토리지 설정
        pop.InitSetStorage(tableID);
    }
    //PopOver hidden 영역 html 세팅      
    , createHtml: `<div className="hidden d-none" id="DivPopOver">
                            <div className="popover-heading">
                                컬럼 편집
                            </div>
                           <div className="popover-body">
                            <!-- 테이블 th 만큼 동적으로 생성됨. InitPopoverHtml() 함수 참고-->
                            </div>
                           </div>
                        `
    //PopOverHTML 동적 생성 
    , InitPopOverHtml: function (tableId) {
        //테이블 TH 수 만큼 Popover에서 체크박스 생성
        for (var i = 0; i < $(tableId).find('th').length; i++) {

            var thTitle = $(tableId).find('th')[i].title;  // th 타이틀
            var thName = $(tableId).find('th')[i].attributes.name.value;    // th Name => check box id 값
            var index = i; // 열의 index ( 0 부터 시작 ) 은 EditColumn() 액션을 위해 필요

            //popover-body          
             $(".popover-body").append(`<div className="input-group"> <label style="padding-left:4px"> <input type="checkbox" id="${thName}" class='input_check' onclick="pop.EditColumn(this,${index},'${tableId}');" checked /> ${thTitle}</label></div>`);            
        }
    }
    //popover 설정 및 생성
    , SetPopOverOption: function (popOverID) {

        $(popOverID).popover({
            html: true,
            container: 'body',
            sanitize: false, // HTML 사용을 위해 설정
            content: function () {
                var content = $(this).attr("data-popover-content");
                return $(content).children(".popover-body").html();
            },
            title: function () {
                var title = $(this).attr("data-popover-content");
                return $(title).children(".popover-heading").html();
            }
        });
    }

    //Popover 외 영역 클릭 시 Popover 숨기기
    , hidePopover: function (popOverID) {
        $('html').on('click', function (e) {
            if (!$(e.target).is(popOverID) && $(e.target).closest('.popover-body').length == 0) {
                $(popOverID).popover('hide');
            }
        });
    }

    //PopOver 체크 박스 선택 시 이벤트
    , EditColumn: function (param, index, tableID) {
        //1.클릭한 요소가 체크 상태인 경우
        if (param.checked) {

            $('#' + param.id).attr('checked', true); //checkbox 속성 변경 (true)

            pop.setStorage();
            pop.showColumn(tableID, index);
        }
        //2.클릭한 요소가 체크 상태가 아닌 경우
        else {

            $('#' + param.id).attr('checked', false); //checkbox 속성 변경 (false)

            pop.setStorage();
            pop.hideColumn(tableID, index);
        }

        //스토리지에 체크박스(True) 데이터 저장
    }

    // 컬럼 보여주기
    , showColumn: function (tableID, nColIndex) {
        
        var table = $(tableID)[0];//HTML DOM Object 받기 위한 처리

        //1)col group > col 영역 보여주기
        $(tableID + ' colgroup col')[nColIndex].style.display = '';

        //2)tr 영역 숨기기
        for (var r = 0; r < table.rows.length; r++)
            table.rows[r].cells[nColIndex].style.display = '';
        // r번쨰 행의  nColIndex번 쨰 열의 style을 display('') 처리한다.
    }
    // 컬럼 숨기기
    , hideColumn: function (tableID, nColIndex) {

        var table = $(tableID)[0];//HTML DOM Object 받기 위한 처리

        //1)col group > col 영역 숨기기
        $(tableID + ' colgroup col')[nColIndex].style.display = 'none';

        //2)tr 영역 숨기기
        for (var r = 0; r < table.rows.length; r++)
            table.rows[r].cells[nColIndex].style.display = 'none';
        // r번쨰 행의  nColIndex번 쨰 열의 style을 display(none) 처리한다.
    }

    //스토리지 초기 생성
    , InitSetStorage: function (tableID) {
      
        var key = window.location.pathname; // ex)/Admin/InvoiceList
        var arrCheck = [];        
        var length = $('#DivPopOver .popover-body .input-group .input_check').length //PopOver 영역 안  체크 박스의 전체 갯수를 가져온다.

        if (!window.localStorage.hasOwnProperty(key)) { // 만약 키 조내
            for (index = 0; index < length; index++) {
                arrCheck.push($('#DivPopOver .popover-body .input-group .input_check')[index].checked) // 체크 Y = true , 체크 N = false
            }
        }
        

        //1)스토리지 설정        
        window.localStorage.setItem(key, arrCheck);  // 체크박스의 갯수와 스토리지에 설정된 true,false의 갯수가 서로 일치합니다.

        //2)체크박스 설정
        var chkString = window.localStorage.getItem(key); //스토리지에 저장된 checkbox 값을 가져온다.        
        var chkArr = chkString.split(","); // ',' 구분자로 배열 생성

        for (index = 0; index < chkArr.length; index++) {
            var chkId = $('#DivPopOver .popover-body .input-group .input_check')[index].id
            $('#' + chkId ).attr('checked', chkArr[index]); //체크박스 속성 값을 설정합니다 (T/F)
        }                               
    }

    // 스토리지 생성
    , setStorage: function () {
        if (window.localStorage.hasOwnProperty(key)) { // 만약 키값이 존재하면 해당 키의 값들을 삭제한다.
            window.localStorage.removeItem(key);
        }

        var key = window.location.pathname; // ex)/Admin/InvoiceList
        var arrCheck = [];
        var length = $('#DivPopOver .popover-body .input-group .input_check').length //PopOver 영역 안  체크 박스의 전체 갯수를 가져온다.

        for (index = 0; index < length; index++) {
            arrCheck.push($('#DivPopOver .popover-body .input-group .input_check')[index].checked) // 체크 Y = true , 체크 N = false
        }

        //1)스토리지 설정        
        window.localStorage.setItem(key, arrCheck);  // 체크박스의 갯수와 스토리지에 설정된 true,false의 갯수가 서로 일치합니다.

    }
}

/**
* 10자리 사업자등록번호에 '-' 을 붙여 형식을 변환한다.
*/
function setCompanyNumber(strNumber) {
    return strNumber.substr(0, 3) + '-' + strNumber.substr(3, 2) + '-' + strNumber.substr(5, 9);
}

/**
 * string형 데이터에 3자리마다 ,를 추가하여 반환한다.
 * @param {any} strNum
 */
function setStringNumberFormat(strNum) {
    return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 매개변수에 있는 특정 문자를 모두 제거한다.
 * @param {any} strNum 매개변수
 * @param {any} format 특정 문자
 */
function removeFormat(strNum, format) {
    return strNum.replaceAll(format, "");
}
/**
 * 금액 매개변수를 받아 ',' 를 제거하고 int형으로 변환한다.
 * 데이터가 NaN일 경우 0을 반환한다.
 * @param {any} strNum
 */
function setParseIntAmount(strNum) {
    var number = parseInt(strNum.replaceAll(",", ""));
    return isNaN(number) ? 0 : number;
}

/**
 * 금액 매개변수를 받아 string형으로 변환하고 3자리마다 ','를 추가한다.
 * @param {any} intNum
 */
function setParseStringAmount(intNum) {
    return intNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/**
 * 날짜 데이터를 받아 원하는 format으로 변경한다.
 * 예) setDateFormat(20221213,'-') = 2022-12-13
 * @param {any} strNum  날짜
 * @param {any} format  형식
 */
function setDateFormat(strNum, format) {
    return strNum.substr(0, 4) + format + strNum.substr(4, 2) + format + strNum.substr(6, 2);
}

/**
 * id값에 대해 해당 요소를 화면 가운데 표시한다.
 * @param {any} el id 
 */
function centerFocus(el) {
    var id = $('#' + el);
    id.get(0).scrollIntoView({ block: "center" });
    id.focus();
}