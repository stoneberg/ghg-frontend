// 2012.10.10 성정오 ==========================================
// 전역에서 사용되어지는 레이어 관련 명칭들 정리 
var MSGDIV_ID_Inline_Message_Div = "_MESSAGE_INLINE_MESSAGE_"; // MESSAGE LAYER를 열때 가장 최상위가 되는 DIV명
var MSGDIV_ID_Message_Div_Block = "_MESSAGE_DIV_BLOCK_";
var MSGDIV_ID_Message_Div_Message = "_MESSAGE_DIV_MESSAGE_";
var MSGDIV_ID_Message_Desc_Holder = "_MESSAGE_DESC_HOLDER_";
var MSGDIV_ID_Message_Detail_Holder = "_MESSAGE_DETAIL_HOLDER_";
var MSGDIV_ID_Mosti_Message = "_MOSTI_MESSAGE_";
var MSGDIV_ID_Mosti_Message_CallBack = "_MOSTI_MESSAGE_CALLBACK_";
var MSGDIV_ID_Mosti_Message_Detail = "_MOSTI_MESSAGE_DETAIL_";
var MSGDIV_ID_Mosti_Escaping = "false";
// ============================================================

// 스크립트 중복방지를 위한 object 생성
var GtDivMsg = {};
// 포커스를 위한 변수
var FocusControl;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 윈도우가 Resize가 될 때 마다 PopupLayer 오퍼레이션 방지 Div Size도 재조정 한다.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
GtDivMsg.AddWindowResizeMessageEventHandler = function () {
    // 2019-11-08 : jquery.ui의 onresize를 사용하므로 아래 이벤트는 삭제한다.
    //window.onresize = GtDivMsg.WindowResizeMessage;
}

GtDivMsg.WindowResizeMessage = function () {
    /// <summary>
    /// 윈도우가 Resize가 될 때 마다 PopupLayer 오퍼레이션 방지 Div Size도 재조정 한다.
    /// </summary>
    //var msgDivBlock = document.getElementById(MSGDIV_ID_Message_Div_Block);

    //if (msgDivBlock != undefined && msgDivBlock != null) {
    //    //msgDivBlock.style.width = document.documentElement.scrollWidth + "px";
    //    //msgDivBlock.style.height = document.documentElement.scrollHeight + "px";
    //    msgDivBlock.style.width = document.documentElement.clientWidth;
    //    msgDivBlock.style.height = document.documentElement.scrollHeight + "px";
    //}

    //윈도우 resize일 경우 팝업 위치 재조정
    var msgDivMessage = document.getElementById(MSGDIV_ID_Message_Div_Message);
    //console.log('This is some text');
    if (msgDivMessage != undefined && msgDivMessage != null) {
        GtDivMsg.ResetCurrentPostionMessage();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 레이어 팝업을 Display 합니다.
// 레이어 팝업을 생성하기 위한 메인 함수 입니다.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
GtDivMsg.ShowMessage = function (url, width, height, msg, detailMsg, callbackFn, focusContorl, isProcessing) {
    /// <summary>
    /// 레이어 팝업을 Display 합니다.
    // 레이어 팝업을 생성하기 위한 메인 함수 입니다.
    /// </summary>
    /// <param name="param">파라미터로 전달할 개체 입니다.</param>
    /// <param name="url">Layer에 로드 될 페이지 경로 입니다.</param>
    /// <param name="width">PopupLayer 가로 길이 입니다.</param>
    /// <param name="height">PopupLayer 세로 길이 입니다.</param>
    /// <param name="focusContorl">메세지 창이 닫힌 후 포커스 줄 컨트롤</param>
    /// <param name="isProcessing">처리중.. 메세지인지 확인</param>
    try {
        var isProcessingMode = false;
        if (isProcessing != undefined && isProcessing != null && isProcessing == true) {
            isProcessingMode = true;
        }

        //포커스를 줄 컨트롤이 있으면 FocusControl 변수에 컨트롤 값을 넣어준다.
        if (focusContorl != null) {
            FocusControl = focusContorl;
        }

        // 모두 삭제후 다시 생성시킨다.
        GtDivMsg.RemoveCurrentMessage(false);

        if (document.getElementById(MSGDIV_ID_Inline_Message_Div) == undefined) {

            //페이지오퍼레이션 금지를 위한 Layer크기 자동 설정
            GtDivMsg.AddWindowResizeMessageEventHandler();

            var nWidth = width;
            var nHeight = height;

            //2015.02.26 이규희 주임
            //새 팝업창이 메세지박스 창일 때 창의 너비가 기본너비보다 크면 기본너비로 새 창을 생성
            if (url.indexOf("Common/Messages/Confirm.htm") > -1 || url.indexOf("Common/Messages/Error.htm") > -1
                || url.indexOf("Common/Messages/Inform.htm") > -1 || url.indexOf("Common/Messages/Warning.htm") > -1)
                if (nWidth > _defaultW) nWidth = _defaultW;

            if (nHeight < 0) nHeight = _defaultH;
            var sUrl = url;

            var windowHeight = document.documentElement.clientHeight;
            var windowWidth = document.documentElement.clientWidth;

            if (windowHeight < document.documentElement.scrollHeight)
                windowHeight = document.documentElement.scrollHeight;

            if (windowWidth < document.documentElement.scrollWidth)
                windowWidth = document.documentElement.scrollWidth;



            var divMessage = document.createElement('div');
            divMessage.id = MSGDIV_ID_Message_Div_Message;
            divMessage.style.position = "absolute";
            divMessage.style.width = nWidth + "px";
            divMessage.style.height = nHeight + "px";
            divMessage.style.zIndex = 999998;
            // 2015-10-15 - 팝업에 그림자 추가.
            divMessage.style.boxShadow = "0px 27px 24px 0px rgba(0,0,0,0.2), 0px 40px 77px 0px rgba(0,0,0,0.22)";

            if (isProcessingMode) {
                divMessage.style.top = parseInt((document.documentElement.clientHeight - 30) / 2 + document.documentElement.scrollTop) + "px";
                divMessage.style.left = parseInt((document.documentElement.clientWidth - 300) / 2 + document.documentElement.scrollLeft) + "px";
                //var msgProcessing = "처리중 입니다. 잠시만 기다려 주세요.";
                var msgProcessing = "<img src='/Images/LayerPopup/layer_Process_Msg.gif' />";
                var msgProcessingImg = "<img src='/Images/LayerPopup/layer_Process_LoadingInfo.gif' /> ";
                if (msg == undefined || msg == null || msg == "")
                    msg = msgProcessing;

                divMessage.innerHTML = "<table id='S_Sub_search' width=300 height=50 border=0 cellspacing=1 style='background:#ffffff'><tr><td width='33'>&nbsp;" + msgProcessingImg + "</td><td><center><b><font color='#FF8033'>" + msg + "</font></b></center></td></tr></table>";
            }
            else {
                // 기존 레이어 팝업 위치 - 스크롤 없는 화면일 때
                //divMessage.style.top = parseInt((document.documentElement.clientHeight - nHeight) / 2 + document.scrollingElement.scrollTop ) + "px"; // IE11버전에서는 안됨
                /*divMessage.style.left = parseInt((document.documentElement.clientWidth - nWidth) / 2 + document.documentElement.scrollLeft ) + "px";*/
                divMessage.style.left = parseInt((document.documentElement.clientWidth - nWidth) / 2) + "px";
                divMessage.style.top = parseInt((document.documentElement.clientHeight - nHeight) / 2) + "px";

                // window의 가운데 기준으로 뜨도록 변경
                var message = $(divMessage);
                if (message.outerHeight() < $(window).height()) {
                    // 드래그 기능을 위한 주석처리
                    //message.css('top', '50%');
                    //message.css('transform', 'translate(-50%,-50%)');
                    //message.css('margin-top', '-' + message.outerHeight() / 2 + 'px');
                    message.css('bottom', 'auto');
                }
                else {
                    message.css('top', '0px');
                    message.css('margin-top', '0px');
                    message.css('bottom', 'auto');
                }
                if (message.outerWidth() < $(window).width()) {
                    // 드래그 기능을 위한 주석처리
                    //message.css('left', '50%');
                    //message.css('transform', 'translateX(-50%)');
                    //message.css('margin-left', '-' + message.outerWidth() / 2 + 'px');
                }
                else {
                    message.css('left', '0px'); message.css('margin-left', '0px');
                }


                var ifrMessage = document.createElement('iframe');
                ifrMessage.id = "_MESSAGE_IFR_MESSAGE_";
                ifrMessage.name = "_MESSAGE_IFR_MESSAGE_";
                ifrMessage.src = sUrl;
                ifrMessage.scrolling = "no";
                ifrMessage.frameBorder = "0";
                ifrMessage.style.width = "100%";
                ifrMessage.style.height = "100%";
                divMessage.appendChild(ifrMessage);
            }

            //divMessage.style.top = 50 + "%";
            //divMessage.style.left = 10 + "px";
            //divMessage.style.marginTop = -143 + "px";

            var divBlock = document.createElement('div');
            divBlock.id = MSGDIV_ID_Message_Div_Block;
            //divBlock.style.position = "absolute";
            //divBlock.style.top = "0%";
            //divBlock.style.left = "0%";
            divBlock.style.position = "fixed";
            divBlock.style.top = "0px";
            divBlock.style.left = "0px";
            //divBlock.style.overflowY = "hidden";
            //divBlock.style.width = windowWidth + "px";
            //divBlock.style.height = windowHeight + "px";
            divBlock.style.width = "100%";
            divBlock.style.height = "100%";

            //divBlock.style.marginLeft = 10 + "0px";
            //divBlock.style.marginRight = 10 + "10px";
            //divBlock.style.width = 100 + "%";
            //msgDivBlock.style.height = document.documentElement.scrollHeight + "px";
            //divBlock.style.minHeight = 99 + "%";
            //divBlock.style.height = 99 + "%";


            divBlock.style.zIndex = 999996;
       
            // Div BackGround Iframe 추가 ( Object 파일이 위로 올라오는 것 방지 ) / 2012.09.27 성정오 =====
            var iDivBlock = document.createElement('iframe');
            iDivBlock.id = "_MESSAGE_DIVBLOCK_MESSAGE_";
            iDivBlock.name = "_MESSAGE_DIVBLOCK_MESSAGE_";
            iDivBlock.src = "about:blank";
            iDivBlock.scrolling = "no";
            iDivBlock.frameBorder = "0";
            iDivBlock.style.width = "100%";
            iDivBlock.style.height = "100%";

            iDivBlock.style.background = "#707070";
            iDivBlock.style.filter = "alpha(opacity=60)";

            divBlock.appendChild(iDivBlock);
            // ============================================================================================


            IE6 = false
            /*@cc_on @*/
            /*@
                IE6 = @_jscript_version < 5.7;
            @*/
            //divBlock.style.backgroundColor = "#aaa";
            //divBlock.style.background="hsla(41,44%44%,0.5)"
            //divBlock.style.filter = "alpha(opacity=85,style:0);Opacity:.85";


            if (browser.msie || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) {
                //IE     
                // 색상변경 : 2012.09.26 성정오 / 일단 기본 Explorer만 적용을 합니다.

                if (navigator.appVersion.indexOf("MSIE 9") != -1) {
                    divBlock.style.background = "#707070";
                    divBlock.style.filter = "alpha(opacity=60)";
                    divBlock.style.opacity = 0.5
                }
                else {
                    divBlock.style.background = "#000000";
                    divBlock.style.filter = "alpha(opacity=80)";
                    divBlock.style.opacity = 0.5
                }
            }
            else if (browser.safari) {
                //Chrome || Safari     
                divBlock.style.background = "rgba(112,112,112,0.6)";
                divBlock.style.opacity = 0.5
            }
            else if (browser.firefox) {
                // Firefox || NS     
                divBlock.style.background = "hsla(112,112,112,0.6)";
            }
            else if (browser.opera) {
                divBlock.style.background = "hsla(112,112,112,0.6)";
            }
            else {
                //지원하지 않는 브라우져!! ( ie 기본 )
                divBlock.style.background = "#707070";
                divBlock.style.filter = "alpha(opacity=30)";
            }

            if (IE6) {
                divBlock.style.backgroundColor = "#fff";
                divBlock.style.filter = "alpha(opacity=10,style:0);Opacity:.1";
            }

            var inLineMessage = document.createElement('div');
            inLineMessage.id = MSGDIV_ID_Inline_Message_Div;
            //inLineMessage.style.position = "absolute";
            //inLineMessage.style.top = "0%";
            //inLineMessage.style.left = "0%";
            inLineMessage.style.position = "fixed";
            inLineMessage.style.top = "0px";
            inLineMessage.style.left = "0px";
            inLineMessage.style.width = "100%";
            inLineMessage.style.height = "100%";
            inLineMessage.style.zIndex = 999999;

            inLineMessage.appendChild(divMessage);
            document.body.appendChild(divBlock);
            document.body.appendChild(inLineMessage);

            if (msg == null && msg == undefined) {
                msg = "";
            }

            if (detailMsg == null && detailMsg == undefined) {
                detailMsg = "";
            }

            if (callbackFn == null && callbackFn == undefined) {
                callbackFn = "";
            }

            //MESSAGE
            var messageHolder = document.createElement('span');
            messageHolder.id = MSGDIV_ID_Mosti_Message;
            messageHolder.innerHtml = msg;
            messageHolder.style.display = "none";
            document.body.appendChild(messageHolder);

            //DETAIL MESSAGE
            var detailHolder = document.createElement('span');
            detailHolder.id = MSGDIV_ID_Mosti_Message_Detail;
            detailHolder.innerHtml = detailMsg;
            detailHolder.style.display = "none";
            document.body.appendChild(detailHolder);

            //Callback Function
            var callbackHolder = document.createElement('span');
            callbackHolder.id = MSGDIV_ID_Mosti_Message_CallBack;
            callbackHolder.innerText = callbackFn;
            callbackHolder.style.display = "none";
            document.body.appendChild(callbackHolder);
        }
    }
    catch (e) { }


    return false;
}

//=======================================================
//  레이어 팝업을 닫습니다.
//=======================================================
GtDivMsg.CloseMessage = function (args) {
    /// <summary>
    /// 레이어 팝업을 닫습니다.
    /// </summary>
    GtDivMsg.DisableMessage();

    GtDivMsg.OnClosingMessage(args);

    GtDivMsg.RemoveLayerMessage();
}

//=======================================================
//  레이어 팝업이 닫히기 전에 호출 됩니다.
//  개발자는 이 함수를 오버라이드 해서 구현 할 수 있습니다.
//=======================================================
GtDivMsg.OnClosingMessage = function (args) {
    /// <summary>
    /// LayerPopup이 닫기전에 호출 됩니다.
    /// 개발자는 이 함수를 오버라이드 해서 구현 할 수 있습니다.
    /// </summary>
    /// <param name="args">파라미터 값 입니다.</param>
}

//=======================================================
//	팝업 레이어를 Invisible 시킵니다.
//=======================================================
GtDivMsg.DisableMessage = function () {
    /// <summary>
    /// 팝업 레이어를 Invisible 시킵니다.
    /// </summary>
    var div = parent.document.getElementById(MSGDIV_ID_Message_Div_Message);
    div.style.visibility = "hidden";
}

//=======================================================
//	팝업 레이어를 제거 합니다.
//=======================================================
GtDivMsg.RemoveCurrentMessage = function (isCheck) {
    /// <summary>
    /// Layer Popup을 제거 합니다.
    /// </summary>
    try {
        if (document.getElementById(MSGDIV_ID_Inline_Message_Div) != undefined) {
            document.body.removeChild(document.getElementById(MSGDIV_ID_Inline_Message_Div));

            if (document.getElementById(MSGDIV_ID_Message_Div_Block) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Message_Div_Block));
            if (document.getElementById(MSGDIV_ID_Message_Desc_Holder) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Message_Desc_Holder));
            if (document.getElementById(MSGDIV_ID_Message_Detail_Holder) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Message_Detail_Holder));
            if (document.getElementById(MSGDIV_ID_Mosti_Message) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Mosti_Message));
            if (document.getElementById(MSGDIV_ID_Mosti_Message_Detail) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Mosti_Message_Detail));
            if (document.getElementById(MSGDIV_ID_Mosti_Message_CallBack) != undefined)
                document.body.removeChild(document.getElementById(MSGDIV_ID_Mosti_Message_CallBack));
        }        
        else if (isCheck) {
            window.self.close();
        }

        //2012.08.06 고동남 주임 추가
        if (FocusControl != null && FocusControl != "" && FocusControl != undefined) {
            FocusControl.focus(); //컨트롤 포커스를 지정했을 경우 포커스가 가게끔 해준다.
        }
    }
    catch (e) { }
}

//=======================================================
//	팝업 레이어를 제거 합니다.
//=======================================================
GtDivMsg.RemoveMessage = function () {
    /// <summary>
    /// 팝업 레이어를 제거 합니다.
    /// </summary>
    parent.GtDivMsg.RemoveCurrentMessage(true);
}


//=======================================================
//	레이어 팝업 사이즈를 변경 합니다.
//=======================================================
GtDivMsg.ResizeCurrentMessage = function (width, height, resetPosionYN) {
    /// <summary>
    /// 레이어 팝업 사이즈를 변경 합니다.
    /// </summary>
    /// <param name="width">변경할 가로 길이 입니다.</param>
    /// <param name="height">변경할 세로 길이 입니다.</param>
    /// <param name="resetPosionYN">사이즈를 변경한 후 Position을 재배치 하려면 true 그렇지 않으면 false 입니다.</param>
    var div = document.getElementById("_MESSAGE_DIV_MESSAGE_");
    if (div != null && div != undefined) {
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.left = 10 + "px";
        div.style.top = 50 + "%";

        if (resetPosionYN == true)
            GtDivMsg.ResetCurrentPostionMessage();
    }
}

//=======================================================
//	레이어 팝업 사이즈를 변경 합니다.
//=======================================================
GtDivMsg.ResizeMessage = function (width, height, resetPosionYN) {
    /// <summary>
    /// 레이어 팝업 사이즈를 변경 합니다.
    /// </summary>
    /// <param name="width">변경할 가로 길이 입니다.</param>
    /// <param name="height">변경할 세로 길이 입니다.</param>
    /// <param name="resetPosionYN">사이즈를 변경한 후 Position을 재배치 하려면 true 그렇지 않으면 false 입니다.</param>
    parent.GtDivMsg.ResizeCurrentMessage(width, height, resetPosionYN);
}

//=======================================================
//	레이어 팝업 사이즈를 최대화합니다. TODO :TEST
//=======================================================
GtDivMsg.FullScreen = function (resetPosionYN) {
    var div = document.getElementById("_MESSAGE_DIV_MESSAGE_");
    var width = document.getElementById('_MESSAGE_INLINE_MESSAGE_').width();
    var height = document.getElementById('_MESSAGE_INLINE_MESSAGE_').height();

    if (div != null && div != undefined) {
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.left = 10 + "px";
        div.style.top = 50 + "%";
    }

    parent.GtDivMsg.ResizeCurrentMessage(width, height, resetPosionYN)
}

//=======================================================
//	레이어 팝업 위치를 재 설정 합니다.
//=======================================================
GtDivMsg.ResetCurrentPostionMessage = function () {
    /// <summary>
    /// 레이어 팝업 위치를 재 설정 합니다.
    /// </summary>
    var div = document.getElementById(MSGDIV_ID_Message_Div_Message);

    if (div != null && div != undefined) {
        var nWidth = parseInt(div.style.width);
        var nHeight = parseInt(div.style.height);
        //div.style.top = parseInt((document.documentElement.clientHeight - nHeight) / 2 + document.documentElement.scrollTop) + "px";
        //div.style.left = parseInt((document.documentElement.clientWidth - nWidth) / 2 + document.documentElement.scrollLeft) + "px";
        var message = $(div);
        if (message.outerHeight() < $(window).height()) {
            message.css('top', '50%');
            message.css('margin-top', '-' + message.outerHeight() / 2 + 'px');
            message.css('bottom', 'auto');
        }
        else {
            message.css('top', '0px');
            message.css('margin-top', '0px');
            message.css('bottom', 'auto');
        }
        if (message.outerWidth() < $(window).width()) {
            message.css('left', '50%');
            message.css('margin-left', '-' + message.outerWidth() / 2 + 'px');
        }
        else {
            message.css('left', '0px'); message.css('margin-left', '0px');
        }
    }
}

//=======================================================
//	레이어 팝업 위치를 재 설정 합니다.
//=======================================================
GtDivMsg.ResetPostionMessage = function () {
    /// <summary>
    /// 레이어 팝업 위치를 재 설정 합니다.
    /// </summary>
    parent.GtDivMsg.ResetCurrentPostionMessage();
}


//=======================================================
//	레이어 팝업 위치를 변경 합니다
//=======================================================
GtDivMsg.MoveCurrentMessage = function (posX, posY) {

    /// <summary>
    /// 레이어 팝업 위치를 변경 합니다
    /// </summary>
    /// <param name="posX">현재 설정된 좌표값을 기준으로 추가할 상대 X 좌표 값 입니다.</param>
    /// <param name="posY">현재 설정된 좌표값을 기준으로 추가할 상대 Y 좌표 값 입니다.</param>
    try {
        var frameTop = parseInt(document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.top.replace("px", ""));
        var frameLeft = parseInt(document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.left.replace("px", ""));
        var nWidth = parseInt(document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.width.replace("px", ""));
        var nHeight = parseInt(document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.height.replace("px", ""));

        //var marginTop = document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.marginTop;
        //var marginLeft = document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.marginLeft;
        document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.margin = "0px";

        if ((posX >= 0 || frameLeft >= -posX) && (posX <= 0 || frameLeft + posX + nWidth <= document.documentElement.clientWidth))
            document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.left = frameLeft + posX + "px";
        if ((posY >= 0 || frameTop >= -posY) && (posY <= 0 || frameTop + posY + nHeight <= document.documentElement.clientHeight))
            document.getElementById(MSGDIV_ID_Inline_Message_Div).children[0].style.top = frameTop + posY + "px";
    }
    catch (e) { }
}

//=======================================================
//	레이어 팝업 위치를 변경 합니다
//=======================================================
GtDivMsg.MoveMessage = function (posX, posY) {
    /// <summary>
    /// 레이어 팝업 위치를 변경 합니다
    /// </summary>
    /// <param name="posX">현재 설정된 좌표값을 기준으로 추가할 X 좌표 값 입니다.</param>
    /// <param name="posY">현재 설정된 좌표값을 기준으로 추가할 Y 좌표 값 입니다.</param>
    parent.GtDivMsg.MoveCurrentMessage(posX, posY);
}



//=======================================================
//	c#의 String.Format을 구현 합니다.
//=======================================================
String.prototype.format = function () {
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function (capture) { return args[capture.match(/\d+/)]; });
}

GtDivMsg.format = function (text) {
    if (arguments.length <= 1) {
        return text;
    }
    var tokenCount = arguments.length - 2;
    for (var token = 0; token <= tokenCount; token++) {
        text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
    }

    return text;
}

//=======================================================
//	레이어 메세지 호출 함수들...
//=======================================================
var _InformUrl = "/Common/Messages/Inform.htm";
var _WarningUrl = "/Common/Messages/Warning.htm";
var _ConfirmUrl = "/Common/Messages/Confirm.htm";
var _ErrorUrl = "/Common/Messages/Error.htm";
var _defaultW = 450;
var _defaultH = 218;

GtDivMsg.GetDefaultWidth = function () {
    return _defaultW;
}
GtDivMsg.GetDefaultHeight = function () {
    return _defaultH;
}
GtDivMsg.OpenInform = function (_Msg, _CallBack) {
    GtDivMsg.CallMessageBox(_InformUrl, _Msg, "", _CallBack, GetDefaultWidth(), _defaultH);
}

//2012.08.06 _focus 고동남 주임 추가
GtDivMsg.OpenInform = function (_Msg, _CallBack, _w, _h, _foucs) {
    if (_w == undefined) _w = this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;

    GtDivMsg.CallMessageBox(_InformUrl, _Msg, "", _CallBack, _w, _h, _foucs);
}


GtDivMsg.OpenWarning = function (_Msg, _CallBack) {
    GtDivMsg.CallMessageBox(_WarningUrl, _Msg, "", _CallBack, GetDefaultWidth(), _defaultH);
}

GtDivMsg.OpenWarning = function (_Msg, _CallBack, _w, _h) {
    if (_w == undefined) _w =  this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;

    GtDivMsg.CallMessageBox(_WarningUrl, _Msg, "", _CallBack, _w, _h);
}


GtDivMsg.OpenConfirm = function (_Msg, _CallBack) {
    GtDivMsg.CallMessageBox(_ConfirmUrl, _Msg, "", _CallBack, GetDefaultWidth(), _defaultH);
}

GtDivMsg.OpenConfirm = function (_Msg, _CallBack, _w, _h) {
    if (_w == undefined) _w =  this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;

    GtDivMsg.CallMessageBox(_ConfirmUrl, _Msg, "", _CallBack, _w, _h);
}

GtDivMsg.OpenError = function (_Msg, _Detail, _CallBack) {
    GtDivMsg.CallMessageBox(_ErrorUrl, _Msg, _Detail, _CallBack, GetDefaultWidth(), _defaultH);
}

GtDivMsg.OpenError = function (_Msg, _Detail, _CallBack, _w, _h) {
    if (_w == undefined) _w =  this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;
    GtDivMsg.CallMessageBox(_ErrorUrl, _Msg, _Detail, _CallBack, _w, _h);
}


//2012.08.06 _focus 고동남 주임 추가
GtDivMsg.CallMessageBox = function (_url, _Msg, _Detail, _CallBack, _w, _h, _focus) {

    if (_w == undefined) _w =  this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;
    //MostiLoading.Fn_CloseLoading();
    //2012.08.06 _focus 고동남 주임 추가
    GtDivMsg.ShowMessage(_url, _w, _h, _Msg, _Detail, _CallBack, _focus);
}

//2012.08.06 고동남 주임 추가 // 처리중 입니다.. 표시
GtDivMsg.OpenProcessing = function (_Msg, _url, _Detail, _CallBack, _w, _h, _focus) {
    var _url;
    var _Detail;
    var _CallBack;
    var _w;
    var _h;
    var _focus;

    if (_w == undefined) _w =  this.GetDefaultWidth();
    if (_h == undefined) _h = _defaultH;
    GtDivMsg.ShowMessage(_url, _w, _h, _Msg, _Detail, _CallBack, _focus, true);
}

var userAgent = navigator.userAgent.toLowerCase();
var browser = {
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    safari: /webkit/.test(userAgent),
    firefox: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
    opera: /opera/.test(userAgent)
};