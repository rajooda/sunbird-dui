

var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var ScrollView = require("@juspay/mystique-backend/src/android_views/ScrollView");
var SimpleToolbar = require('../Sunbird/core/SimpleToolbar');
var ChooseItem = require('../Sunbird/ChooseItem');
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var Space = require("@juspay/mystique-backend/src/android_views/Space");
const transitParams = require('../../transitions');


var _this;

class FilterItem extends View {

  constructor(props, children) {
    super(props, children);
    this.setIds([
      "filterCount",
    ]);
    this.content = this.props.data;
    console.log(this.content)

    this.selectedList=this.content.selected==undefined ? [] : this.content.selected;
    this.filterList = this.content.values;
    this.filterLable = this.content.name;

    this.isForPageApi= this.props.forPage ? this.props.forPage:false;
    console.log("FITLER ITEM PARAMA", this.content);
    console.log("count",this.getSelectedCount(this.filterList));
  }


  handleClick = () => {

    console.log("SHOWING POPUP",this.isForPageApi)
    console.log("FOR ", this.filterList);
    if(this.isForPageApi){
        window.__PageFilterChooser.setContent(this.filterList,this.handleSelection,this.selectedList);
        window.__PageFilterChooser.show();
    }else{
    window.__FilterPopup.setContent(this.filterList, this.handleSelection)
    window.__FilterPopup.show()

    }
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
    if(this.isForPageApi){
      this.selectedList=newList;
      this.props.onUpdate(this.filterLable,this.selectedList)
      var cmd = this.set({
          id: this.idSet.filterCount,
          text: (newList.length > 0 ? newList.length + " added":"")
        });

      Android.runInUI(cmd, null);

    }else{
      console.log("seected Length", this.getSelectedCount(newList))
      window.__FilterPopup.hide()
      this.filterList=newList;
      this.content.values = this.filterList;
      this.props.onUpdate(this.content)
      var cmd = this.set({
          id: this.idSet.filterCount,
          text: (this.getSelectedCount(this.filterList)!=0?this.getSelectedCount(this.filterList) + " added":"")
        });

      Android.runInUI(cmd, null);
    }



  }

  getPrettifiedLabel = () =>{
    var unformatted = this.filterLable.charAt(0).toUpperCase() + this.filterLable.substring(1,this.filterLable.length);

    var formatted = [];
    for(var i= 0;i<unformatted.length;i++){
        if(unformatted[i] == unformatted[i].toUpperCase()){
          formatted.push(" "+unformatted[i]);  
        }else{
          formatted.push(unformatted[i]);    
        }
        
      }
      return formatted.join("");
    }

  render() {

      
      var label = this.getPrettifiedLabel();

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
                text={label}
                style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR}/>

                <ViewWidget
                height = "1"
                width = "0"
                weight = "1"/>

                <TextView
                width="wrap_content"
                height="wrap_content"
                id={this.idSet.filterCount}
                text={this.selectedList.length!=0 ? this.selectedList.length + " added":""}
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
