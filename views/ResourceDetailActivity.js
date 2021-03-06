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
var HorizontalScrollView = require("@juspay/mystique-backend/src/android_views/HorizontalScrollView");
var RatingBar = require("@juspay/mystique-backend/src/android_views/RatingBar");;
var objectAssign = require('object-assign');
var SharePopup = require('../components/Sunbird/core/SharePopup');
var FlagPopup = require('../components/Sunbird/FlagPopup');
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');
var ProgressButton = require('../components/Sunbird/core/ProgressButton');
var utils = require('../utils/GenericFunctions');

window.R = require("ramda");

var _this;
class ResourceDetailActivity extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
      'ratingBar',
      "progressButtonContainer",
      "ratingContainer",
      "simpleToolBarOverFlow",
      "sharePopupContainer"
    ]);
    this.state = state;
    this.screenName = "ResourceDetailActivity"
    this.menuData = {
      url: [
        {imageUrl: "ic_action_share_black" },
      ]
    }
    this.menuData1 = {
      url: [
        {imageUrl: "ic_action_share_black" },
        {imageUrl:'ic_action_overflow'}
      ]
    }
    this.popupMenu = window.__S.DELETE + "," + window.__S.FLAG

    this.shouldCacheScreen = false;

    this.details = state.data.value0.resourceDetails;
    this.details = JSON.parse(this.details);
    this.playContent = "";
    console.log("RDA",this.details)

    this.localStatus = false;
    JBridge.logResourceDetailScreenEvent(this.details.identifier)

    _this = this;


  }

  checkLocalStatus = (data) => {

    var callback = callbackMapper.map(function(data) {
      _this.playContent = JSON.parse(utils.decodeBase64(data[0]))
      if (_this.playContent.isAvailableLocally == true) {
        _this.localStatus = true;
        var pButonLayout = (
              <ProgressButton
                 width="match_parent"
                 isCourse = "false"
                 playContent = {_this.playContent}
                 contentDetail = {_this.details.content}
                 buttonText={window.__S.PLAY}
                 localStatus = {_this.localStatus}
                 identifier = {_this.details.identifier}
                 changeOverFlowMenu = {_this.changeOverFlow}/>)
        _this.replaceChild(_this.idSet.progressButtonContainer, pButonLayout.render(), 0);
        _this.changeOverFlow();

      } else {
        var pButonLayout = (<ProgressButton
                 width="match_parent"
                 isCourse = "false"
                 contentDetail = {_this.details.content}
                 buttonText={window.__S.DOWNLOAD}
                 playContent = {null}
                 localStatus = {_this.localStatus}
                 identifier = {_this.details.identifier}
                 changeOverFlowMenu = {_this.changeOverFlow} />);
        _this.replaceChild(_this.idSet.progressButtonContainer, pButonLayout.render(), 0);

      }
    });
    JBridge.getContentDetails(data.content.identifier, callback);

  }


  onPop = () => {
    Android.runInUI(
      _this.animateView(),
      null
    );
  }

  onStop = () =>{
    window.__PermissionDeniedDialog.hide();
    window.__SharePopup.hide();
    console.log("ON STOP IN ResourceDetailActivity")
  }

  onPause = () =>{
    console.log("ON PAUSE IN ResourceDetailActivity")
  }

  shareContent = (isContentLocallyAvailable) =>{

        var shareCallback = callbackMapper.map(function(data) {

          if(data[0]!="failure"){
            var input;

              console.log("SHARE CALLBACK DATA", data[0]);
              if(isContentLocallyAvailable){
                            input = [{
                              type : "text",
                              data : window.__deepLinkUrl+"/public/#!/content/"+_this.details.identifier

                            },{
                              type : "file",
                              data : "file://"+data[0]

                            }];

              }else{
                            input = [{
                                        type : "text",
                                        data : window.__deepLinkUrl+"/public/#!/content/"+_this.details.identifier
                                    }];

              }
            } else {
              input = [{
                          type : "text",
                          data : window.__deepLinkUrl+"/public/#!/content/"+_this.details.identifier
                      }];
            }
                var sharePopUp = (
                  <SharePopup
                  data = {input}
                  identifier = {_this.details.identifier}
                  type = "RESOURCES"
                  />
                  )

              _this.replaceChild(_this.idSet.sharePopupContainer,sharePopUp.render(),0);


          window.__SharePopup.show();

          // }else{
          //
          //     JBridge.showToast(window.__S.ERROR_CANT_SHARE_TRY_AGAIN,"short");
          //
          //  }

        });

        JBridge.exportEcar(this.details.identifier, shareCallback);


  }

  afterRender = () => {

     this.checkLocalStatus(this.details);

    if(this.details && this.details.content && this.details.content.me_averageRating){
    JBridge.setRating(this.idSet.ratingBar, this.details.content.me_averageRating);
    }else if(this.details.content.hasOwnProperty("contentData") && this.details.content.contentData.hasOwnProperty("me_averageRating")){
      JBridge.setRating(this.idSet.ratingBar, this.details.content.contentData.me_averageRating);
    }
    else{
      // var layout=(<TextView
      //     text={window.__S.NO_RATING}
      //     style={window.__TextStyle.textStyle.HINT.TINY}/>)
      //
      //   this.replaceChild(this.idSet.ratingContainer,layout.render(),0)
      JBridge.setRating(this.idSet.ratingBar, 0);
    }

  }

  flagContent = (comment,selectedList) =>{

    window.__LoaderDialog.show();
    console.log("flag request",this.details)
    console.log(comment,selectedList)
    var versionKey;
    if(this.details.content.hasOwnProperty("versionKey")){
      versionKey = this.details.content.versionKey;
    }
    else if(this.details.content.hasOwnProperty("contentData") && this.details.content.contentData.hasOwnProperty("versionKey")){
      versionKey = this.details.content.contentData.versionKey
    }
    JBridge.logFlagClickInitiateEvent("RESOURCES",selectedList[0],comment,this.details.content.identifier);

    var request = {
                          "flagReasons":selectedList,
                          "flaggedBy":window.__userName,
                          "versionKey": versionKey,
                          "flags": [comment]
                     }

    var whatToSend = {
      "user_token" : window.__user_accessToken,
      "api_token" : window.__apiToken,
      "requestBody" : JSON.stringify(request),
      "identifier" : this.details.content.identifier
    }
    var event= { "tag": "API_FlagContent", contents: whatToSend };
    window.__runDuiCallback(event);

  }


  getLineSeperator = () => {
    return (<LinearLayout
            width="match_parent"
            height="2"
            margin="0,16,0,0"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }

  handlePreviewImageClick = (imgUrl) => {
    window.__PreviewImagePopup.show(imgUrl);
  }

  getPreviewLayout = () => {
    var cards ;
    if(this.details.screenshots== undefined || this.details.screenshots.length == 0){
      this.details.dummyUrl=[];
      cards= (
          <TextView
            margin="0,4,0,0"
            width="wrap_content"
            height="wrap_content"
            text={window.__S.NO_PREVIEW}
            style={window.__TextStyle.textStyle.HINT.REGULAR}/>)
    }else{
      cards = this.details.screenshots.map((item,i)=>{
        return (<LinearLayout
                  height="match_parent"
                  width="match_parent"
                  orientation="vertical"
                  padding="5,5,5,5"

                  onClick={()=>{_this.handlePreviewImageClick(item)}}>
                  <ImageView
                          width="156"
                          height="200"
                          padding="10,10,10,10"
                          stroke ={"3," + window.__Colors.PRIMARY_BLACK}
                          imageFromUrl = {item}/>

                </LinearLayout>)
    })

    }


    return (
    <LinearLayout
      height="wrap_content"
      width="match_parent"
      orientation="vertical">

      <TextView
        margin="0,16,0,0"
        width="wrap_content"
        height="wrap_content"
        text={window.__S.PREVIEWS}
        style={window.__TextStyle.textStyle.HINT.BOLD}/>

      <HorizontalScrollView
        width = "wrap_content"
        height = "wrap_content"
        scrollBarX="false"
        fillViewport="true">

        <LinearLayout
          width="match_parent"
          height="wrap_content"
          margin="0,8,0,0">

          {cards}

        </LinearLayout>

      </HorizontalScrollView>

    </LinearLayout>)
  }


  getBody = () => {
    var description = "Not Available";
    if(this.details.description)
        description = this.details.description
    else if(this.details.hasOwnProperty("content")){
      if(this.details.content.hasOwnProperty("description"))
          description  = this.details.content.description
      else if(this.details.content.hasOwnProperty("contentData") && this.details.content.contentData.description)
          description = this.details.content.contentData.description
    }

    return (
      <LinearLayout
        width="match_parent"
        height="wrap_content"
        orientation="vertical">

        <TextView
          margin="0,13,0,0"
          width="wrap_content"
          height="wrap_content"
          text={window.__S.ABOUT_MODULE}
          style={window.__TextStyle.textStyle.HINT.BOLD}/>

         <TextView
          margin="0,4,0,0"
          width="wrap_content"
          height="wrap_content"
          textFromHtml={description}
          style={window.__TextStyle.textStyle.CARD.TITLE.REGULAR_BLACK}/>


          { this.getPreviewLayout() }


          <TextView
            margin="0,16,0,0"
            width="wrap_content"
            height="wrap_content"
            text={window.__S.CREATED_BY}
            style={window.__TextStyle.textStyle.HINT.BOLD}/>


          <LinearLayout
            width="match_parent"
            height="wrap_content">

            <TextView
              margin="0,4,0,10"
              width="wrap_content"
              height="wrap_content"
              text={this.details.content.creator || window.__S.CREATOR_NAME_NOT_AVAILABLE}
              style={window.__TextStyle.textStyle.CARD.TITLE.REGULAR_BLACK}/>


            <ViewWidget
              width="0"
              height="0"
              weight="1"/>


            <ImageView
              width="20"
              height="12"
              imageUrl="ic_chat"/>

          </LinearLayout>
      </LinearLayout>

    )
  }


  getHeader = () => {

    return (

      <LinearLayout
        width="match_parent"
        height="wrap_content"
        margin="0,16,0,0"
        orientation="vertical">


          <LinearLayout
          width="match_parent"
          height="wrap_content">

            <LinearLayout
            width="80"
            height="50"
            cornerRadius="4"
            background={window.__Colors.PRIMARY_BLACK_66}>

                <ImageView
                width="80"
                height="50"
                circularImageUrl={"4,"+ (this.details.imageUrl?this.details.imageUrl:"ic_launcher")}/>

            </LinearLayout>

            <TextView
            width="wrap_content"
            height="wrap_content"
            padding="8,0,0,0"
            style={window.__TextStyle.textStyle.CARD.TITLE.DARK}
            text={this.details.title}/>

          </LinearLayout>

          <LinearLayout
          margin="0,12,0,0"
          width="match_parent"
          height="wrap_content"
          >

            <TextView
            width="wrap_content"
            height="wrap_content"
            text={this.details.headFooterTitle}
            style={window.__TextStyle.textStyle.HINT.REGULAR}/>

            <ViewWidget
            width="0"
            weight="1"
            height="0"/>

            <TextView
            width="wrap_content"
            height="wrap_content"
            visibility = {this.details.hasOwnProperty("content")&& this.details.content.hasOwnProperty("me_totalDownloads") ? "visible" : "gone"}
            text={this.details.hasOwnProperty("content")&& this.details.content.hasOwnProperty("me_totalDownloads") ? parseInt(this.details.content.me_totalDownloads) : "0"}
            style={window.__TextStyle.textStyle.HINT.DULL}/>

          </LinearLayout>

        <LinearLayout
          margin="0,2,0,0"
          width="match_parent"
          height="wrap_content">

            <LinearLayout
              id={this.idSet.ratingContainer}>

              <RatingBar
               id = {this.idSet.ratingBar}
               width="wrap_content"
               height="wrap_content"/>
            </LinearLayout>
            <ViewWidget
              width="0"
              weight="1"
              height="0"/>

            <TextView
              width="wrap_content"
              height="wrap_content"
              text={window.__S.DOWNLOADS}
              visibility = {this.details.hasOwnProperty("content")&& this.details.content.hasOwnProperty("me_totalDownloads") ? "visible" : "gone"}
              style={window.__TextStyle.textStyle.HINT.REGULAR}/>

        </LinearLayout>
        </LinearLayout>

    )

  }
  handleStateChange = (state) =>{
    var res = utils.processResponse(state);
    if(res.code!=504){
        var response = res.data;
        var responseCode = res.code;
        if(responseCode == "200"){

          var callback = callbackMapper.map(function(response){
            if(state.responseFor == "API_FlagContent" && response[0] == "successful"){
              JBridge.logFlagClickEvent(_this.details.identifier,"RESOURCES");
              setTimeout(function(){
                window.__Snackbar.show(window.__S.CONTENT_FLAGGED_MSG)
                window.__BNavFlowRestart();
                _this.onBackPressed();
                window.__LoaderDialog.hide();
              }, 2000)
            }
          });
          JBridge.deleteContent(this.details.identifier,callback);

        } else {
          window.__LoaderDialog.hide();
          window.__Snackbar.show(window.__S.CONTENT_FLAG_FAIL);
          _this.onBackPressed();
        }
        console.log(response)
    }else{
      window.__LoaderDialog.hide();
      window.__Snackbar.show(window.__S.TIME_OUT)
      _this.onBackPressed();
    }
  }



  overFlowCallback = (params) => {
    window.__LoaderDialog.show();
     if(params == 0){
      var callback = callbackMapper.map(function(response){
        window.__LoaderDialog.hide();

        if(response[0] == "successful"){
          window.__Snackbar.show(window.__S.MSG_RESOURCE_DELETED)
          _this.onBackPressed();
        }
      });
      JBridge.deleteContent(this.details.identifier,callback);
    }
    else if(params == 1){
      console.log("in flag rda")
      JBridge.logFlagScreenEvent("RESOURCES");
      window.__LoaderDialog.hide();
      window.__FlagPopup.show();
    }
  }


  onBackPressed = () => {

    if(window.__PermissionDeniedDialog.getVisibility() == "visible"){
      window.__PermissionDeniedDialog.hide();
      return;
    }else if(window.__PreviewImagePopup.getVisibility()){
      window.__PreviewImagePopup.hide();
      return
    }else{
      var whatToSend = [];
      var event= { "tag": "BACK_ResourceDetailActivity", contents: whatToSend };
      window.__runDuiCallback(event);
    }

  }

  changeOverFlow = () =>{
    var toolbar =  (<SimpleToolbar
          width="match_parent"
          menuData={this.menuData1}
          popupMenu={this.popupMenu}
          onBackPress={onBackPressed}
          onMenuItemClick={this.handleMenuClick}
          overFlowCallback = {this.overFlowCallback}
          showMenu="true"
          invert="true"/>)

    this.replaceChild(this.idSet.simpleToolBarOverFlow, toolbar.render(), 0);
    this.localStatus=true;
  }

  handleMenuClick = (url) =>{
    if(url == "ic_action_share_black"){

     if (JBridge.getKey("isPermissionSetWriteExternalStorage", "false") == "true") {
       this.shareContent(this.localStatus);
       JBridge.logShareContentInitiateEvent("RESOURCES",this.details.identifier)

     }else{
        this.setPermissions();
      }
    }
  }



  setPermissions = () => {

   var callback = callbackMapper.map(function(data) {

      if (data == "android.permission.WRITE_EXTERNAL_STORAGE") {
        JBridge.setKey("isPermissionSetWriteExternalStorage", "true");
      }
      if(data == "DeniedPermanently"){
        console.log("DENIED DeniedPermanently");
        window.__PermissionDeniedDialog.show("ic_warning_grey",window.__S.STORAGE);
      }

    });

    JBridge.setPermissions(callback,"android.permission.WRITE_EXTERNAL_STORAGE");

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
        background={window.__Colors.WHITE}
        orientation="vertical"
        width="match_parent"
        height="match_parent">
        <LinearLayout
          root = "true"
          width="match_parent"
          height="wrap_content"
          id = {this.idSet.simpleToolBarOverFlow}>
          <SimpleToolbar
            width="match_parent"
            menuData={this.menuData}
            popupMenu={this.popupMenu}
            onMenuItemClick={this.handleMenuClick}
            onBackPress={onBackPressed}
            overFlowCallback = {this.overFlowCallback}
            showMenu="true"
            invert="true"/>
        </LinearLayout>

              <ScrollView
                height="0"
                weight="1"
                width="match_parent"
                fillViewport="true">

                <LinearLayout
                  height="match_parent"
                  width="match_parent"
                  padding="16,0,16,0"
                  orientation="vertical">


                  {this.getHeader()}

                  {this.getLineSeperator()}

                  {this.getBody()}



                </LinearLayout>

                </ScrollView>

               <LinearLayout
                height="wrap_content"
                width="match_parent"
                id={this.idSet.progressButtonContainer}
                root="true"/>



      </LinearLayout>
      <FlagPopup
      onConfirm  = {this.flagContent}
      />
      <LinearLayout
       width="match_parent"
       height="match_parent"
       id={this.idSet.sharePopupContainer}/>


      </RelativeLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(ResourceDetailActivity);
