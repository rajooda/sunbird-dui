var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var SimpleToolbar = require('../Sunbird/core/SimpleToolbar');
var ChooseItem = require('../Sunbird/ChooseItem');
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var Space = require('@juspay/mystique-backend').androidViews.Space;
const transitParams = require('../../transitions');
const filterParams = require('../../FilterParams');

var _this;

class FilterItem extends View {

  constructor(props, children) {
    super(props, children);
    this.setIds([
      "filterCount",

    ]);
    this.content = this.props.data;

    this.filterList = this.content.values;
    this.filterLable = this.content.name;


    console.log("FITLER ITEM PARAMA", this.content);
  }


  handleClick = () => {

    console.log("SHOWING POPUP")
    console.log("FOR ", this.filterList);
    window.__FilterPopup.setContent(this.filterList, this.handleSelection)
    window.__FilterPopup.show()
  }


  getSelectedCount = (list) => {

    var count = 0;
    list.map((item) => {
      if (item.apply == true)
        count++;
    })
    return count;
  }


  handleSelection = (newList) => {
    console.log("handleSelection", newList)
    console.log("seected Length", this.getSelectedCount(newList))

    window.__FilterPopup.hide()
    this.filterList = newList;
    this.content.values = this.filterList;
    var cmd = this.set({
      id: this.idSet.filterCount,
      text: this.getSelectedCount(newList) + " added"
    });

    Android.runInUI(cmd, null);
    this.props.onUpdate(this.content)

  }

  render() {
    this.layout = (
      <LinearLayout
              width="match_parent"
              height="wrap_content"
              margin="16,16,16,0"
              gravity="center_vertical"
              onClick={this.handleClick}>
            
             <LinearLayout
              width="match_parent"
              height="match_parent"
              padding="10,10,0,10"
              gravity="center_vertical"
              background={window.__Colors.WHITE_F4}>

                <TextView
                width="wrap_content"
                height="wrap_content"
                text={this.filterLable}
                style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR}/>

                <ViewWidget 
                height = "1"
                width = "0"
                weight = "1"/>

                <TextView
                width="wrap_content"
                height="wrap_content"
                id={this.idSet.filterCount}
                style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR}/>

                <ImageView
                width="24"
                height="24"
                imageUrl="ic_chevron_right"/>

              </LinearLayout>
            </LinearLayout>

    )
    return this.layout.render();
  }


}

module.exports = FilterItem;
