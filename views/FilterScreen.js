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
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');
var FilterCard = require('../components/Sunbird/FilterCard');
var DoubleRadioList = require('../components/Sunbird/DoubleRadioList');
var FilterPopup = require('../components/Sunbird/FilterPopup');
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var Space = require('@juspay/mystique-backend').androidViews.Space;
var _this;



const filterParams = require('../FilterParams');



class FilterScreen extends View {
  constructor(props, children,state) {
    super(props, children,state);
    // this.filterData = [
    //   "Language",
    //   "Grade",
    //   "Domain",
    //   "Framework",
    //   "Concepts",
    //   "Type",
    //   "Subject",
    //   "Medium",
    //   "Ownership"
    // ]
    // this.data = filterParams.params[0];
    this.tempData = JSON.parse(state.data.value0.filterDetails);
    console.log("tempData in filter",this.tempData);
    this.data = JSON.parse(this.tempData.filterDetails);
    // this.data = JSON.parse(this.data);
    console.log("FILTER DATA", this.data)
    this.filterData = this.data.facetFilters;

    this.screenName = "FilterScreen";
    this.shouldCacheScreen = false;
  }


  handleFilterChange = (newData) => {
    this.filterData = newData;

    console.log("NEW LIST", newData)
  }


  getSortCard = () => {
    return (<LinearLayout
                    height="wrap_content"
                    width="match_parent"
                    padding="0,16,0,25"
                    background={window.__Colors.WHITE}
                    orientation="vertical">
                    
                      <LinearLayout
                      width="match_parent"
                      height="wrap_content">
                      
                          <ImageView
                          width="26"
                          height="21"
                          weight="1"
                          imageUrl="ic_star_ratings_blue"/>
                          
                          <ImageView
                          width="32"
                          height="27"
                          weight="1"
                          imageUrl="ic_action_done"/>
                          
                          <ImageView
                          width="26"
                          height="25"
                          weight="1"
                          imageUrl="ic_action_calendar"/>
                      </LinearLayout>

                      <LinearLayout
                      width="match_parent"
                      height="wrap_content"
                      gravity="center_horizontal"
                      margin="0,10,0,0">
                      
                          <TextView
                          width="match_parent"
                          height="wrap_content"
                          text="Star ratings"
                          gravity="center_horizontal"
                          style={window.__TextStyle.textStyle.FILTER.REGULAR_BLUE}
                          weight="1"/>
                        
                          <TextView
                          width="match_parent"
                          height="wrap_content"
                          text="Number of votes"
                          gravity="center_horizontal"
                          style={window.__TextStyle.textStyle.FILTER.REGULAR_BLACK}
                          weight="1"/>
                          
                          <TextView
                          width="match_parent"
                          height="wrap_content"
                          text = "Published date"
                          gravity="center_horizontal"
                          style={window.__TextStyle.textStyle.FILTER.REGULAR_BLACK}
                          weight="1"/>

                      </LinearLayout>
                  </LinearLayout>)
  }


  handleBackPress = () => {
    var searchDetails = {filterDetails: JSON.stringify(this.data),searchType: this.tempData.filterType}
    window.__runDuiCallback( {filterData:JSON.stringify(searchDetails)} );

  }


  render() {
    this.layout = (
      <RelativeLayout
      root="true"
      width="match_parent"
      height="match_parent">

      <LinearLayout
      root="true"
      width="match_parent"
      height="match_parent">


      <LinearLayout
        background={window.__Colors.WHITE_F7}
        orientation="vertical"
        width="match_parent"
        height="match_parent">

        <SimpleToolbar
          title="Filter"
          onBackPress={this.handleBackPress}
          invert="true"
          width="match_parent"/>
        
           
        
                <LinearLayout
                  height="match_parent"
                  width="match_parent"
                  gravity="center_vertical"
                  orientation="vertical">
                      <TextView
                      width="wrap_content"
                      height="28"
                      margin="16,6,0,6"
                      gravity="center_vertical"
                      style={window.__TextStyle.textStyle.FILTER.REGULAR_BLACK}
                      text="SORT BY"/>

                      {this.getSortCard()}
                      
                        
                      <TextView
                      width="wrap_content"
                      height="28"
                      gravity="center_vertical"
                      margin="16,6,0,6"
                      style={window.__TextStyle.textStyle.FILTER.REGULAR_BLACK}
                      text="FILTER BY"/>

                      <FilterCard
                      filterData={this.filterData}
                      onItemClick={this.showPopup}
                      onFilterUpdate={this.handleFilterChange}
                      />

               </LinearLayout>



      </LinearLayout>
     

      </LinearLayout>

      <FilterPopup
        height="match_parent"
        width="match_parent"/>

      </RelativeLayout>

    )
    return this.layout.render();
  }
}

module.exports = Connector(FilterScreen);
