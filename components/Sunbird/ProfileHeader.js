var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;

var _this;
class ProfileHeader extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([

    ]);
    _this=this;

  }

  profileBody(){
    return (<LinearLayout
              width="wrap_content"
              height="wrap_content"
              gravity="center_horizontal"
              orientation="vertical">

              <ImageView
              width="80"
              height="80"
              circularImageUrl={"20,"+"https://s-media-cache-ak0.pinimg.com/originals/b7/fd/99/b7fd9903db658b1a2d9824d17cdefd6b.jpg"}/>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text="Harish Bookwalla"
              padding="0,10,0,2"
              style={window.__TextStyle.textStyle.HEADING.DARK}/>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text="Jawahar Vidya Mandir, Pune"
              padding="0,0,0,8"
              style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR}/>

              <TextView
              padding="40,0,40,0"
              height="wrap_content"
              spanText="Lorem Ipsum is simply dummy text of the printing and typesetting industry… $#Read more#$"
              style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>


              </LinearLayout>
          )
  }


  render() {
    return this.profileBody().render();
  }
}



module.exports = ProfileHeader;
