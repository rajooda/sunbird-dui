var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var callbackMapper = require("@juspay/mystique-backend/").helpers.android.callbackMapper;
var ScrollView = require('@juspay/mystique-backend').androidViews.ScrollView;
var objectAssign = require('object-assign');
window.R = require("ramda");
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');
var CropParagraph = require('../components/Sunbird/CropParagraph');
var ProgressButton = require('../components/Sunbird/core/ProgressButton');
var LargeCardComponent = require('../components/Sunbird/core/LargeCardComponent');
var utils = require('../utils/GenericFunctions'); 

var _this;

class ResourceViewAllActivity extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
      "listItems",
      "viewMoreButton"
    ]);
    this.state = state;
    this.screenName = "ResourceViewAllActivity";
      this.menuData = {
      url: [
      ]
      }
    this.shouldCacheScreen = false;
    this.totalDetails = JSON.parse(state.data.value0.resourceDetails);

    console.log(this.totalDetails,"TOTAL")
    
    _this = this;
    this.start_index = 0;
    this.details = this.totalDetails.resourceDetails;
    this.appbarTitle = this.totalDetails.title;

    console.log("DETAILS IN ResourceViewAllActivity",this.details)

    this.size;
    this.fileImageUrl;
    this.cType;
    this.name;
    this.time;
    this.displayContent = [];

    setTimeout(function() {
      Android.runInUI(
        _this.animateView(),
        null
      );
    },100)
  }


getRows = (data) =>{

    var rows = data.map((item,i) => {

      if(item.contentType != "course"){

                if(item.hasOwnProperty("contentData")){

                  var appIconExist = item.contentData.hasOwnProperty("appIcon");

                  this.fileImageUrl = appIconExist?("file://"+item.basePath + "/" +item.contentData.appIcon):"ic_action_resource";
                  this.size = item.hasOwnProperty("size") ? " ["+ utils.formatBytes(item.size)+"]" : "";
                  this.cType = item.contentData.contentType;
                  this.name = item.contentData.name;
                  this.time = utils.prettifyDate(item.lastUpdatedTime);
                }
                else{
                   this.size = " [" + utils.formatBytes(item.size) + "]";
                   this.fileImageUrl = item.appIcon?item.appIcon:"ic_action_resource";
                   this.cType = item.contentType
                   this.name = item.name;
                    if(item.hasOwnProperty("createdOn")){
                     var d =  new Date(item.createdOn);
              
                   }
                   else{
                    var d = new Date();
                   }
                  this.time = d.getDay() + "-" + d.getMonth()+ "-" + d.getUTCFullYear();
                }

                console.log("FILE IMAGE URL ",this.fileImageUrl)

                var temp = {};
                temp['imageUrl'] = this.fileImageUrl;
                temp['name'] = this.name;
                temp['progress'];
                temp['footerTitle'] = this.time;
                temp['actionText'] = "OPEN";
                temp["footerSubTitle"] = this.cType + this.size;

         return (<LargeCardComponent
                 data={temp}
                 content={item}
                 onResourceClick = {this.handleResourceClick}/>)

     }
     else {
         return  (<LinearLayout
                  width ="0"
                  height = "0"/>)
    }

    });

    var layout = (<LinearLayout
                    width="match_parent"
                    root="true"
                    height="wrap_content"
                    orientation = "vertical"
                    >

                    {rows}

                  </LinearLayout>);
    return layout;

  }


    handleResourceClick = (item)=>{


       if(item.contentType.toLowerCase() == "course"){
        var whatToSend = {resourceDetails:JSON.stringify(item)}
        var event = {tag:"OPEN_ResourceViewAllDetail",contents:whatToSend}
        window.__runDuiCallback(event);
      }
      else if(item.contentType.toLowerCase() == "collection" || item.contentType.toLowerCase() == "TextBook"){
      var whatToSend={course:JSON.stringify(item)};
      var event={tag:"OPEN_CourseEnrolled",contents:whatToSend}
      window.__runDuiCallback(event);
    }
      else
      {
        var headFooterTitle = item.contentType + (item.hasOwnProperty("size") ? " ["+utils.formatBytes(item.size)+"]" : "");
        var resDetails = {};

        resDetails['imageUrl'] = item.hasOwnProperty("contentData") ?"file://"+item.basePath+"/"+item.contentData.appIcon : item.appIcon;
        resDetails['title'] = item.name;
        resDetails['description'] = item.description;
        resDetails['headFooterTitle'] = headFooterTitle;
        resDetails['identifier'] = item.identifier;
        resDetails['content'] = item;

        var whatToSend = {resourceDetails:JSON.stringify(resDetails)}
        var event = {tag:"OPEN_ResourceInfo",contents:whatToSend}
        window.__runDuiCallback(event);
      }
    }

  onPop = () => {
    Android.runInUI(
      this.animateView(),
      null
    );
  }

  afterRender= () => {
      
      this.appendChild(this.idSet.listItems,this.getRows(this.details).render(),this.start_index)
  }


  getLineSeperator = () =>{
    return (<LinearLayout
            width="match_parent"
            height="1"
            margin="0,16,0,0"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }

  onBackPressed = () => {
    var whatToSend = []
    var event = {tag:"BACK_ResourceViewAllActivity",contents: whatToSend}
    window.__runDuiCallback(event);
  }

  handleViewMoreClick = () =>{
    console.log("handle more")
    var listContent = [];
    window.__LoaderDialog.show();
    if(this.displayContent == "[]" || this.displayContent.length == 0){
        var callback = callbackMapper.map(function(data){
          data[0] = JSON.parse(utils.decodeBase64(data[0]));
          _this.displayContent=data[0];
          _this.displayContent.map(function(item,index){
            if(index > _this.start_index*10 && index<(_this.start_index+1)*10)
              listContent.push(item)
          })
          _this.start_index++;
          _this.appendChild(_this.idSet.listItems,_this.getRows(listContent).render(),_this.start_index)
          window.__LoaderDialog.hide();

          });
          JBridge.searchContent(callback, JSON.stringify(this.details.searchQuery), "", "Resource", false,100);
    }
    else{
          this.displayContent.map(function(item,index){
            if(index > _this.start_index*10 && index<(_this.start_index+1)*10)
              listContent.push(item)
          })
          _this.start_index++;
          _this.appendChild(_this.idSet.listItems,_this.getRows(listContent).render(),_this.start_index)
          window.__LoaderDialog.hide();

    }



     if(this.start_index >= 9){
      var cmd = this.set({
        id: this.idSet.viewMoreButton,
        visibility: "gone"
      });
      Android.runInUI(cmd, 0);
     }

  }



  render() {
    var buttonList = ["ENROLL FOR THIS COURSE"];
    this.layout = (
      <LinearLayout
        root = "true"
        background={window.__Colors.WHITE}
        orientation="vertical"
        width="match_parent"
        height="match_parent"
        >
        <SimpleToolbar
          afterRender={this.afterRender}
          width="match_parent"
          menuData={this.menuData}
          onBackPress={this.onBackPressed}
          showMenu="true"
          invert="true"
          title= {this.appbarTitle}/>


              <ScrollView
                height="match_parent"
                weight="1"
                width="match_parent"
                fillViewport="true"
                >
                  <LinearLayout
                  height = "match_parent"
                  width = "match_parent"
                  orientation = "vertical"
                  layouTransition="true"
                  >
                      <LinearLayout
                        height="match_parent"
                        width="match_parent"
                        orientation="vertical"
                        layouTransition="true"
                        id = {this.idSet.listItems}
                        orientation = "vertical"
                        >
                      </LinearLayout>

                      <LinearLayout
                        width = "match_parent"
                        height = "50"
                        margin = "16,16,16,16"
                        layouTransition="true"
                        id = {this.idSet.viewMoreButton}
                        background = {window.__Colors.PRIMARY_DARK}
                        gravity = "center"

                        >
                        <TextView
                          height = "match_parent"
                          width = "match_parent"
                          gravity="center"
                          onClick = {this.handleViewMoreClick}
                          text = "VIEW MORE"
                          style={window.__TextStyle.textStyle.CARD.ACTION.LIGHT}
                          />
                      </LinearLayout>     
                  
                  </LinearLayout>
                </ScrollView>



      </LinearLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(ResourceViewAllActivity);
