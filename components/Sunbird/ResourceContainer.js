var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var RelativeLayout = require("@juspay/mystique-backend/src/android_views/RelativeLayout");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var HorizontalScrollView = require("@juspay/mystique-backend/src/android_views/HorizontalScrollView");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var Button = require('../Sunbird/Button');
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var Space = require("@juspay/mystique-backend/src/android_views/Space");
var _this;
var callbackMapper = require("@juspay/mystique-backend/src/helpers/android/callbackMapper");
var CardComponent = require('../Sunbird/core/CardComponent');
var utils = require('../../utils/GenericFunctions');



class ResourceContainer extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([]);
    console.log(this.props.data, "data");
    this.count = (this.props.data != undefined) ? this.props.data.length : 0;
  }


  getRows = () => {
      this.data = this.props.data;
      if(this.data==undefined)
          this.data=[];
      var rows = this.data.map((item, i) => {

      var size = item.hasOwnProperty("size") ? " ["+ utils.formatBytes(item.size)+"]" : "";
      var footerTitle = item.contentType + size;

      console.log("adad",item)
      var temp = {};
      temp['imageUrl'] = item.hasOwnProperty("appIcon")?item.appIcon:"ic_action_resource";
      temp['title'] = item.name;
      temp['footerSubTitle'] = item.contentType;
      temp['footerTitle'] = "";
      temp['screenshots'] = item.screenshots || [] ;
      temp['stars'] = item.hasOwnProperty("me_averageRating")? item.me_averageRating+ "" : "0";
      temp['actionText'] = window.__S.OPEN;

      return (<CardComponent
                 data={temp}
                 content={item}
                 index = {i}
                 onCardClick = {this.handleCardClick}/>)
    });


    var layout = (<LinearLayout
                    height="wrap_content"
                    width="match_parent"
                    root="true">

                    {rows}

                  </LinearLayout>);
    return layout;

  }



  getHeader() {
    return (<LinearLayout
              width="match_parent"
              height="wrap_content"
              margin="16,16,16,16"
              orientation="horizontal">

              <TextView
                width="wrap_content"
                height="wrap_content"
                text={this.props.title}
                style={window.__TextStyle.textStyle.CARD.TITLE.DARK}/>

              <ViewWidget
                weight="1"
                height="0"/>

              <TextView
                width="wrap_content"
                height="wrap_content"
                text={window.__S.VIEW_ALL}
                visibility = {(this.count <= 0)? "gone" : "visible"}
                padding="8,8,8,8"
                onClick={()=>{this.handleViewAllClick()}}
                style={window.__TextStyle.textStyle.TABBAR.SELECTED}/>

            </LinearLayout>)
  }


  handleCourseClick = (courseName) => {
    this.props.onCourseOpenClick(courseName);
  }

  handleCardClick = (item, type , index) => {
      console.log("index clicked" , index)
      JBridge.logCardClickEvent("RESOURCES",index+1,"RESOURCES",item.identifier)
       if(item.contentType.toLowerCase() == "course" || item.contentType.toLowerCase() == "collection" || item.contentType.toLowerCase() == "textbook"){
        var whatToSend={course:JSON.stringify(item)}
        var event ={tag:"OPEN_EnrolledCourseActivity",contents:whatToSend}
        window.__runDuiCallback(event);
      }
      else
      {
        var headFooterTitle = item.contentType + (item.hasOwnProperty("size") ? " ["+utils.formatBytes(item.size)+"]" : "");
        var resDetails = {};
        console.log("ITEM Clicked",item)
        resDetails['imageUrl'] = item.appIcon;
        resDetails['title'] = item.name;
        resDetails['description'] = item.description;
        resDetails['headFooterTitle'] = headFooterTitle;
        resDetails['identifier'] = item.identifier;
        resDetails['content'] = item;
        resDetails['screenshots'] = item.screenshots;

        var whatToSend = {resourceDetails:JSON.stringify(resDetails)}
        var event = {tag:"OPEN_ResourceDetailActivity",contents:whatToSend}
        window.__runDuiCallback(event);
      }
  }

  handleViewAllClick =()=> {
    JBridge.logViewAllClickEvent("RESOURCES",this.props.title);
    this.props.onViewAllClick(this.data,this.props.title,this.props.searchQuery,"visible");
  }

  render() {
    this.layout = (
      <LinearLayout
          height="match_parent"
          width="match_parent"
          orientation="vertical"
          visibility = {this.props.data ? "visible" : "gone"}
          >

          {this.getHeader()}

          <HorizontalScrollView
           width = "wrap_content"
           height = "wrap_content"
           scrollBarX="false"
           fillViewport="true">

            <LinearLayout
              padding="0,0,16,0"
              width="match_parent"
              height="wrap_content">

              {this.getRows()}

            </LinearLayout>



          </HorizontalScrollView>

         </LinearLayout>
    )

    return this.layout.render();
  }
}

module.exports = ResourceContainer;
