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
var objectAssign = require('object-assign');
window.R = require("ramda");
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');


class NotificationScreen extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
    ]);
    this.state = state;
    this.screenName = "NotificationScreen"
     this.menuData = {
      url: []
    }


    this.data = [
        {
          imageUrl: "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
          content : "<b><font color='#000000'>Kiran Bookwala</font></b> has invited you to create content on <b><font color='#000000'>'A Pretty Big Course Name'</font></b>",
          read : "false"
        },
        {
          imageUrl: "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
          content : "<b><font color='#000000'>Kiran Bookwala</font></b> has invited you to create content on <b><font color='#000000'>'A Pretty Big Course Name'</font></b>",
          read : "true"
        },
        {
          imageUrl: "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
          content : "<b><font color='#000000'>Kiran Bookwala</font></b> has invited you to create content on <b><font color='#000000'>'A Pretty Big Course Name'</font></b>",
          read : "true"
        },
        {
          imageUrl: "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
          content : "<b><font color='#000000'>Kiran Bookwala</font></b> has invited you to create content on <b><font color='#000000'>'A Pretty Big Course Name'</font></b>",
          read : "false"
        },{
          imageUrl: "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
          content : "<b><font color='#000000'>Kiran Bookwala</font></b> has invited you to create content on <b><font color='#000000'>'A Pretty Big Course Name'</font></b>",
          read : "false"
        }
    ]
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
            margin="16,13,16,0"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }

  getRow = (input) =>{
    return (<LinearLayout
                width="match_parent"
                height="wrap_content"
                orientation="vertical"
                padding="0,13,0,0"
                gravity="center_vertical"
                background={input.read=="false" ? window.__Colors.FADE_BLUE : window.__Colors.WHITE}
                >

                  <LinearLayout
                  width="match_parent"
                  height="wrap_content"
                  padding="0,0,0,13"
                  padding="16,0,16,0"
                  gravity="center_vertical"
                  >


                      <ImageView
                      width="48"
                      height="48"
                      gravity="center_vertical"
                      circularImageUrl={"0,"+input.imageUrl} />
                     

                      <TextView
                      width="wrap_content"
                      height="wrap_content"
                      margin="12,0,0,0"
                      gravity="center_vertical"
                      style={window.__TextStyle.textStyle.CARD.HEADING_LIGHT}
                      textFromHtml={input.content}/>



                  </LinearLayout>

                  {this.getLineSeperator()}

                </LinearLayout>)
  }



  getEmptyNotification = () =>{

    return (<LinearLayout
              width="match_parent"
              height="match_parent"
              orientation="vertical"
              gravity="center">

                <ImageView
                width="55"
                height="66"
                imageUrl = "ic_empty_notification"/>

                <TextView
                width="wrap_content"
                height="wrap_content"
                text="No new notifications"
                margin="0,20,0,0"
                style={window.__TextStyle.textStyle.CARD.TITLE.FADE_DARK}/>


            </LinearLayout> )

  }

  getBody = () =>{

   var rows ;

      if(this.data != ""){
        rows = this.data.map((item, i) => {
          return (this.getRow(item));
        });

      }else{
        rows = this.getEmptyNotification();
      }

    return rows;
  }


  onBackPressed = () => {
    window.__changePureScriptFlow();
    window.__runDuiCallback({ action: "showMainFlow" });
  }

  render() {
    this.layout = (
      <LinearLayout
        root = "true"
        background={window.__Colors.WHITE}
        orientation="vertical"
        width="match_parent"
        height="match_parent">
        <SimpleToolbar
          title="Notifications"
          afterRender={this.afterRender}
          width="match_parent"
          onBackPress={this.onBackPressed}
          invert="true"/>

              <ScrollView
                height="match_parent"
                width="match_parent"
                fillViewport="true"
                >

                <LinearLayout
                  height="match_parent"
                  width="match_parent"
                  orientation="vertical">

                  {this.getBody()}

                </LinearLayout>

                </ScrollView>
       
      </LinearLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(NotificationScreen);
