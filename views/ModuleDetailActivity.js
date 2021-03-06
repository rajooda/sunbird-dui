var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var RelativeLayout = require("@juspay/mystique-backend/src/android_views/RelativeLayout");
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var callbackMapper = require("@juspay/mystique-backend/src/helpers/android/callbackMapper");
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var RatingBar = require("@juspay/mystique-backend/src/android_views/RatingBar");;
var objectAssign = require('object-assign');
window.R = require("ramda");
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');
var SimplePopup = require('../components/Sunbird/core/SimplePopup');
var CropParagraph = require('../components/Sunbird/CropParagraph');
var ProgressButton = require('../components/Sunbird/core/ProgressButton');
var CourseCurriculum = require('../components/Sunbird/CourseCurriculum');
var utils = require('../utils/GenericFunctions');


var _this;

class ModuleDetailActivity extends View {
    constructor(props, children, state) {
        super(props, children, state);
        this.setIds([
            'ratingBar',
            "downloadProgressText",
            "descriptionContainer",
            "playButtonContainer",
            "simpleToolBarOverFlow",
            "renderPage"
        ]);
        this.state = state;
        this.screenName = "ModuleDetailActivity"
        this.menuData = {
          url: [
            {}
          ]
        }
        this.menuData1 = {
            url: [
                { imageUrl: 'ic_action_overflow' }
            ]
        }
        this.simpleData={
              title:window.__S.DOWNLOAD_CONFIRMATION_TEXT,
              content:"",
              negButtonText : window.__S.NO,
              posButtonText : window.__S.YES
        }
        this.popupMenu = "Delete"
        this.shouldCacheScreen = false;

        this.moduleName = state.data.value0.moduleName;
        this.module = state.data.value0.moduleDetails;
        this.module = JSON.parse(this.module)
        this.localStatus = this.module.isAvailableLocally;
        this.localContent = null;
        _this = this;
        this.downloadList=[];

        //stack to maintain child traversal
        this.stack = [];
        this.stackPush(this.moduleName,this.module);
    }

    stackPush = (moduleName, module) => {
      this.stack.push({
        moduleName: moduleName,
        module: module
      });
    }

    stackPop = () => {
      if (this.stack.length > 0){
        var top = this.stack[0];
        if (this.stack.length == 1)
          this.stack.splice(0, 1);
        else
          this.stack.splice(this.stack.length - 1, 1);
        return top;
      } else {
        return null;
      }
    }

    stackTop = () => {
      return this.stack[this.stack.length - 1];
    }

    formatBytes = (bytes) => {
        if (bytes < 1024) return bytes + " Bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
        else return (bytes / 1073741824).toFixed(3) + " GB";
    };

    overFlowCallback = (params) => {
        if (params == 0) {
            var callback = callbackMapper.map(function(response) {
                if (response[0] == "successful") {
                    _this.onBackPressed();
                }
            });
            JBridge.deleteContent(this.module.identifier, callback);
        }
    }

    onPop = () => {
        window.__getDownloadStatus = this.getSpineStatus;
        Android.runInUI(
            this.animateView(),
            null
        );
    }

    getSpineStatus = (pValue) => {
        var data = JSON.parse(pValue);
        if (data.identifier != this.module.identifier)
            return;
        console.log("data in download",data)
        var textToShow = "";
        if(data.status == "NOT_FOUND"){
          window.__ContentLoaderDialog.hide();
          window.__Snackbar.show(window.__S.ERROR_CONTENT_NOT_AVAILABLE);
          this.onBackPressed();
          return;
        }
        data.downloadProgress = data.downloadProgress == undefined || isNaN(data.downloadProgress) ? 0 : data.downloadProgress;
        var downloadedPercent = data.downloadProgress;
        downloadedPercent = downloadedPercent < 0 ? 0 : downloadedPercent;
        if (downloadedPercent == 100) {
            // if(this.downloadList.indexOf(data.identifier) != -1){
            //     console.log("download success",this.downloadList)
            //     window.__Snackbar.show(window.__S.ERROR_CONTENT_NOT_AVAILABLE);
            //     this.onBackPressed();
            //     return;
            // }
            // else{
            //     console.log("second time download",this.downloadList)
            //     this.downloadList.push(data.identifier)
                this.checkContentLocalStatus(this.module);
            // }

            
        } else {
            var cmd = this.set({
                id: this.idSet.downloadProgressText,
                text: "Fetching Contents: " + downloadedPercent + "%"
            })
            Android.runInUI(cmd, 0);
        }
    }

    checkContentType = (type) =>{
        if(type.toLowerCase() == "story" || type.toLowerCase() == "worksheet" || type.toLowerCase() == "game")
            return true;
        else
            return false;
    }

    checkContentLocalStatus = (module) => {
        _this = this;
        console.log('module',module);
        if(this.checkContentType(module.contentType)){
            this.localStatus = false;
            window.__ProgressButton.setLocalStatus(false);
            console.log("content",module)
            window.__ProgressButton.setVisibility("visible");
            window.__ProgressButton.setContentDetails(module);
            window.__ProgressButton.checkContentLocalStatus(this.localStatus);
        }
        else{
                var callback = callbackMapper.map(function(data) {
                    _this.localContent = JSON.parse(utils.jsonifyData(utils.decodeBase64(data[0])))
                    if (_this.localContent.isAvailableLocally == true) {
                        var callback1 = callbackMapper.map(function(data) {
                            _this.module = JSON.parse(utils.jsonifyData(utils.decodeBase64(data[0])));
                            _this.renderModuleChildren(_this.module)
                        });
                        JBridge.getChildContent(module.identifier, callback1)
                    }
                     else {
                      if (JBridge.isNetworkAvailable()){
                                if(_this.downloadList.indexOf(module.identifier)== -1){
                                    _this.downloadList.push(module.identifier)
                                    console.log("module",module)
                                    // this.simpleData.content = module.contentData.size ? "Size : " + utils.formatBytes(module.contentData.size) : "";
                                    JBridge.importCourse(module.identifier, "true")
                                    // _this.simpleData.content =         
                                }
                                else{
                                        window.__Snackbar.show(window.__S.ERROR_CONTENT_NOT_AVAILABLE);
                                        _this.onBackPressed();
                                        return;
                                }
                                
                        
                        
                      }
                      else
                        window.__Snackbar.show(window.__S.ERROR_OFFLINE_MODE)
                    }
                });

                if (!module.isAvailableLocally || module.isUpdateAvailable) {
                    window.__getDownloadStatus = this.getSpineStatus;
                    JBridge.getContentDetails(module.identifier, callback);
                } else {
                    this.renderModuleChildren(module);
                }
            }
    }

    handleModuleClick = (moduleName, module) => {
        // var whatToSend = { "moduleName": moduleName, "moduleDetails": JSON.stringify(module) }
        // var event = { "tag": "OPEN_ModuleActivity", contents: whatToSend };
        // window.__runDuiCallback(event);
        // this.renderModuleChildren(module);
        window.__ProgressButton.setButtonFor(module.identifier);
        this.stackPush(moduleName, module);
        this.reRender(moduleName, module);
    }

    reRender = (moduleName, module) => {
      console.log("inside reRender, index : " + module.index);
      this.moduleName = moduleName;
      this.module = module;
       var layout = (
        <LinearLayout
            height = "match_parent"
            root="true"
            width = "match_parent"
            orientation = "vertical">

            { this.getHeader() }
            { this.getBody() }

        </LinearLayout>
      )
      this.replaceChild(this.idSet.renderPage, layout.render(), 0);
      this.checkContentLocalStatus(module);
    }

    renderModuleChildren = (module) => {
        var layout;

        if (module.children) {
            layout = ( <CourseCurriculum
                height = "match_parent"
                width = "match_parent"
                root = "true"
                margin = "0,0,0,12"
                brief = { true } title = ""
                currIndex = {module.index}
                onClick = { this.handleModuleClick }
                content = { module.children }  />
            )
            this.replaceChild(this.idSet.descriptionContainer, layout.render(), 0);
        } else {
            var cmd = this.set({
                id: this.idSet.downloadProgressText,
                visibility: "gone"
            });
            cmd = this.set({
              id: this.idSet.descriptionContainer,
              visibility: "gone"
            });
            Android.runInUI(cmd, 0);
            window.__ProgressButton.setButtonFor(module.identifier);
            window.__ProgressButton.setVisibility("visible");
        }
    }

    afterRender = () => {
        window.__SimplePopup.hide();
        window.__ProgressButton.setButtonFor(this.module.identifier);
        JBridge.logContentDetailScreenEvent(this.module.identifier);
        this.checkContentLocalStatus(this.module);
    }


    getLineSeperator = () => {
        return ( <LinearLayout width = "match_parent"
            height = "2"
            margin = "0,16,0,0"
            background = { window.__Colors.PRIMARY_BLACK_22 }/>
        )
    }

    getHeader = () => {
      var headerLayout = (
        <LinearLayout
          height = "wrap_content"
          width = "match_parent"
          orientation = "vertical">

          <LinearLayout
            height = "wrap_content"
            gravity = "center_vertical"
            margin = "0,12,0,12"
            width = "match_parent" >

            <TextView height = "wrap_content"
              width = "0"
              weight = "1"
              style = { window.__TextStyle.textStyle.CARD.TITLE.DARK }
              text = { this.moduleName }/>

          </LinearLayout>

          <TextView
            height = "wrap_content"
            margin = "0,0,0,12"
            width = "match_parent"
            text={this.module.contentData.hasOwnProperty("size")? window.__S.MODULE_SIZE.format(this.formatBytes(this.module.contentData.size)) : window.__S.MODULE_SIZE_UNAVAILABLE }/>

          <CropParagraph
            height = "wrap_content"
            margin = "0,0,0,12"
            width = "match_parent"
            headText = { this.module.contentData.description ? window.__S.DESCRIPTION : undefined }
            contentText = { this.module.contentData.description }/>

        </LinearLayout>)

      return headerLayout;
    }

    getBody = () => {
        var bodyLayout = (
            <LinearLayout
                height = "match_parent"
                width = "match_parent"
                root = "true"
                id = { this.idSet.descriptionContainer }
                orientation = "vertical">

                <TextView
                    id = { this.idSet.downloadProgressText }
                    test = "Fetching spine"
                    height = "match_parent"
                    gravity = "center"
                    width = "match_parent" />

            </LinearLayout>)


            return bodyLayout;
        }

    onBackPressed = () => {
        this.stackPop();
        var top = this.stackTop();
        if (!this.stack.length < 1 || top){
          this.reRender(top.moduleName, top.module);
          window.__ProgressButton.setVisibility("gone")
        } else {
          var whatToSend = []
          var event = { "tag": "BACK_ModuleDetailActivity", contents: whatToSend };
          window.__runDuiCallback(event);
        }
    }

    changeOverFlow = () =>{
      var toolbar =  (<SimpleToolbar
        width="match_parent"
        menuData={this.menuData1}
        popupMenu={this.popupMenu}
        onBackPress={onBackPressed}
        overFlowCallback = {this.overFlowCallback}
        showMenu="true"
        invert="true"/>)

      this.replaceChild(this.idSet.simpleToolBarOverFlow, toolbar.render(), 0);
    }
    onSimplePopClick=(type)=>{

      if(type=="negative"){
        //do something 
      }else if(type =="positive"){
        //do something

        JBridge.importCourse(module.identifier, "true")
      }
    }
    handleOverFlowClick = () =>{
        console.log("overflow")
    }

    render() {

        this.layout = (
        <RelativeLayout
          width="match_parent"
          height="match_parent"
          clickable="true"
          root="true">
            <LinearLayout
            root = "true"
            width = "match_parent"
            height = "match_parent"
            background = { window.__Colors.WHITE }
            clickable="true"
            orientation = "vertical">
                <LinearLayout
                    root = "true"
                    width="match_parent"
                    height="wrap_content"
                    id = {this.idSet.simpleToolBarOverFlow}>
                    <SimpleToolbar
                      width="match_parent"
                      menuData={this.menuData}
                      popupMenu={this.popupMenu}
                      onBackPress={onBackPressed}
                      overFlowCallback = {this.overFlowCallback}
                      showMenu="true"
                      invert="true"/>
                </LinearLayout>

                <ScrollView
                    height = "0"
                    weight = "1"
                    width = "match_parent"
                    fillViewport = "true" >

                    <LinearLayout height = "match_parent"
                    width = "match_parent"
                    padding = "16,0,16,0"
                    orientation = "vertical"
                    id = {this.idSet.renderPage}>

                        { this.getHeader() }
                        { this.getBody() }

                    </LinearLayout>

                </ScrollView>

                <ProgressButton
                    id = { this.idSet.playButtonContainer }
                    width = "match_parent"
                    visibility = "gone"
                    isCourse = "true"
                    playContent = {this.props.localContent}
                    contentDetails = { this.module }
                    changeOverFlowMenu = {this.handleOverFlowClick}
                    buttonText = {window.__S.DOWNLOAD}
                    localStatus = {this.localStatus}
                    identifier = { this.module.identifier }/>

            </LinearLayout>
            <SimplePopup
               buttonClick={this.onSimplePopClick}
               data={this.simpleData}
               />
        </RelativeLayout>
            );

            return this.layout.render();
        }
}

module.exports = Connector(ModuleDetailActivity);
