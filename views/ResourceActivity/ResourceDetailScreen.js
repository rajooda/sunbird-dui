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
var SimpleToolbar = require('../../components/Sunbird/SimpleToolbar');
var CropParagraph = require('../../components/Sunbird/CropParagraph');
var ProgressButton = require('../../components/Sunbird/ProgressButton');


class ResourceDetailScreen extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
    ]);
    this.state = state;
    this.screenName = "ResourceDetailScreen"
      this.menuData = {
      url: [
        { imageUrl: "ic_action_overflow"}
      ]
      }


    
  }

  onPop = () => {
    Android.runInUI(
      this.animateView(),
      null
    );
  }

  afterRender = () => {
   
  }


  getLineSeperator = () =>{
    return (<LinearLayout
            width="match_parent"
            height="1"
            margin="0,16,0,0"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }


  

  handleBackPress = () => {
    window.__changePureScriptFlow();
    window.__runDuiCallback({ action: "showMainFlow" });
  }

  render() {
    var buttonList = ["ENROLL FOR THIS COURSE"];
    this.layout = (
      <LinearLayout
        root = "true"
        background={window.__Colors.WHITE}
        orientation="vertical"
        width="match_parent"
        height="match_parent">
        <SimpleToolbar
          afterRender={this.afterRender}
          width="match_parent"
          menuData={this.menuData}
          onBackPress={this.handleBackPress}
          showMenu="true"
          invert="true"/>

              <ScrollView
                height="0"
                weight="1"
                width="match_parent"
                fillViewport="true"
                >

                <LinearLayout
                  height="match_parent"
                  width="match_parent"
                  padding="16,0,16,0"
                  orientation="vertical">

                  <LinearLayout
                  margin="0,16,0,0"
                  width="match_parent"
                  height="wrap_content">

                    <TextView
                    width="wrap_content"
                    height="wrap_content"
                    style={window.__TextStyle.textStyle.CARD.TITLE.DARK}
                    text="Practice exam paper- 01"/>

                    <ViewWidget
                    width="0"
                    weight="1"
                    height="0"/>

                    <ImageView
                     width="14"
                     height="18"
                     imageUrl="ic_action_bookmark"/>


                     <ImageView
                     width="16"
                     height="18"
                     margin="24,0,0,0"
                     imageUrl="ic_action_share"/>

                  </LinearLayout>

                  <TextView
                  width="wrap_content"
                  height="wrap_content"
                  margin="0,6,0,0"
                  style={window.__TextStyle.textStyle.HINT.REGULAR}
                  text="PDF file [207 KB]"/>


                  <LinearLayout
                  width="match_parent"
                  height="wrap_content"
                  margin="0,14,0,0">

                  <CropParagraph
                  height="wrap_content"
                  margin="0,0,0,12"
                  width="match_parent"
                  contentText="This is the course description, which will be created by someone who has advanced. This is the course description, which will be created by someone who has advanced. This is the course description, which will be created by someone who has advanced. This is the course description, which will be created by someone who has advanced"
                  />
                  
                  </LinearLayout>

                  {this.getLineSeperator()}

                  <TextView
                  width="wrap_content"
                  height="wrap_content"
                  text="Preview: "
                  margin="0,16,0,0"
                  style={window.__TextStyle.textStyle.CARD.TITLE.DARK}/>

                  <LinearLayout
                  width="match_parent"
                  height="wrap_content"
                  margin="0,8,0,0">
                

                    <ImageView
                    width="156"
                    height="200"
                    stroke ={"3," + window.__Colors.PRIMARY_BLACK}
                    imageFromUrl = "https://pbs.twimg.com/media/CRafzhtWIAEQ2c9.png"/>

                    <ImageView
                    width="156"
                    height="200"
                    margin="16,0,0,0"
                    stroke ={"3," + window.__Colors.PRIMARY_BLACK}
                    imageFromUrl = "https://pbs.twimg.com/media/CRafzhtWIAEQ2c9.png"/>

                  </LinearLayout>


                </LinearLayout>

                </ScrollView>

               <ProgressButton
                 width="match_parent"
                 buttonItems={buttonList}/>
       
      </LinearLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(ResourceDetailScreen);
