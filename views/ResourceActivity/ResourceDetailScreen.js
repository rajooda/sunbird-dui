/*
Copyright (c) 2012-2017 "JUSPAY Technologies"
JUSPAY Technologies Pvt. Ltd. [https://www.juspay.in]

This file is part of JUSPAY Platform.

JUSPAY Platform is free software: you can redistribute it and/or modify
it for only educational purposes under the terms of the GNU Affero General
Public License (GNU AGPL) as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
For Enterprise/Commerical licenses, contact <info@juspay.in>.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  The end user will
be liable for all damages without limitation, which is caused by the
ABUSE of the LICENSED SOFTWARE and shall INDEMNIFY JUSPAY for such
damages, claims, cost, including reasonable attorney fee claimed on Juspay.
The end user has NO right to claim any indemnification based on its use
of Licensed Software. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/agpl.html>.


*/

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
var RatingBar = require('@juspay/mystique-backend').androidViews.RatingBar;
var objectAssign = require('object-assign');
window.R = require("ramda");
var SimpleToolbar = require('../../components/Sunbird/core/SimpleToolbar');
var CropParagraph = require('../../components/Sunbird/CropParagraph');
var ProgressButton = require('../../components/Sunbird/core/ProgressButton');


class ResourceDetailScreen extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
      'ratingBar'
    ]);
    this.state = state;
    this.screenName = "ResourceDetailScreen"
      this.menuData = {
      url: [
        { imageUrl: "ic_action_share"},
        { imageUrl: "ic_action_bookmark"},
        { imageUrl: "ic_action_overflow"},
      ]
      }

    this.shouldCacheScreen = false;


      this.details = JSON.parse(state.data.value0.resourceDetails);
    
      console.log("Got Title",state)

  }


  onPop = () => {
    Android.runInUI(
      this.animateView(),
      null
    );
  }

  afterRender = () => {

         JBridge.setRating(this.idSet.ratingBar,"3.3");   
  }


  getLineSeperator = () =>{
    return (<LinearLayout
            width="match_parent"
            height="2"
            margin="0,16,0,0"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }


  getBody = () =>{
    return (
      <LinearLayout
      width="match_parent"
      height="wrap_content"
      orientation="vertical">

        <TextView
        margin="0,13,0,0"
        width="wrap_content"
        height="wrap_content"
        text="ABOUT THIS MODULE"
        style={window.__TextStyle.textStyle.HINT.BOLD}/>

       <TextView
        margin="0,4,0,0"
        width="wrap_content"
        height="wrap_content"
        text={this.details.description}
        style={window.__TextStyle.textStyle.CARD.TITLE.REGULAR_BLACK}/>

        <TextView
        margin="0,16,0,0"
        width="wrap_content"
        height="wrap_content"
        text="PREVIEWS"
        style={window.__TextStyle.textStyle.HINT.BOLD}/>


       <LinearLayout
        width="match_parent"
        height="wrap_content"
        visibility="gone"
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



        <TextView
        margin="0,4,0,0"
        width="wrap_content"
        height="wrap_content"
        text="No preview available"
        style={window.__TextStyle.textStyle.HINT.REGULAR}/>


        <TextView
        margin="0,16,0,0"
        width="wrap_content"
        height="wrap_content"
        text="CREATED BY"
        style={window.__TextStyle.textStyle.HINT.BOLD}/>


        <LinearLayout
        width="match_parent"
        height="wrap_content">

        <TextView
        margin="0,4,0,10"
        width="wrap_content"
        height="wrap_content"
        text="Rajesh Kumar"
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


  getHeader = () =>{

      return (

        <LinearLayout
        width="match_parent"
        height="wrap_content"
        margin="0,16,0,0"
        orientation="vertical"
        >

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
        circularImageUrl={"4,"+this.details.imageUrl}/>

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
        height="wrap_content">

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
        text="1870"
        style={window.__TextStyle.textStyle.HINT.DULL}/>

        </LinearLayout>

        <LinearLayout
          margin="0,2,0,0"
          width="match_parent"
          height="wrap_content">

          <RatingBar
           id = {this.idSet.ratingBar}
           width="wrap_content"
           height="wrap_content"/>

          <ViewWidget
            width="0"
            weight="1"
            height="0"/>

          <TextView
            width="wrap_content"
            height="wrap_content"
            text="downloads"
            style={window.__TextStyle.textStyle.HINT.REGULAR}/>

        </LinearLayout>
        </LinearLayout>

        )

  }


  onBackPressed = () => {
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
          onBackPress={onBackPressed}
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


                  {this.getHeader()}

                  {this.getLineSeperator()}

                  {this.getBody()}
                  

                </LinearLayout>

                </ScrollView>

               <ProgressButton
                 width="match_parent"
                 buttonItems={buttonList}
                 identifier = {this.details.identifier}/>
       
      </LinearLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(ResourceDetailScreen);


