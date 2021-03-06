var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var RelativeLayout = require("@juspay/mystique-backend/src/android_views/RelativeLayout");
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var ProgressBar = require("@juspay/mystique-backend").androidViews.ProgressBar;


class LoaderDialog extends View {
  constructor(props, children, state) {
    super(props, children, state);

    this.setIds([
      'parentContainer'
    ]);
    this.state = state;
    window.__LoaderDialog = this;

}

  

  show = () => {
    this.setVisibility("visible");
  }

  hide = () => {
    this.setVisibility("gone");
  }

  setVisibility = (data) => {
    var cmd = this.set({
      id: this.idSet.parentContainer,
      visibility: data
    })

    Android.runInUI(cmd, 0)
  }


  
  afterRender = () => {
   
  }


  render() {
    this.layout = (
      <LinearLayout
        root = "true"
        background={window.__Colors.PRIMARY_BLACK_DD}
        orientation="vertical"
        id={this.idSet.parentContainer}
        gravity="center"
        visibility="gone"
        clickable="true"
        width="match_parent"
        height="match_parent">

               
        <LinearLayout
          background={window.__Colors.WHITE}
          width="match_parent"
          padding="30,20,30,20"
          margin="24,0,24,0"
          gravity="center">

          <TextView
            style ={window.__TextStyle.textStyle.LOADING_TEXT}
            text = {window.__S.WAIT_REQUEST}/>

          <ProgressBar
            margin="20,0,0,0"
            height="40"
            width="40"/>

        </LinearLayout>

       
      </LinearLayout>
    );

    return this.layout.render();
  }
}

module.exports = LoaderDialog;



