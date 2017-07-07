var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var HorizontalScrollView = require("@juspay/mystique-backend").androidViews.HorizontalScrollView;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var Button = require('../Sunbird/Button');
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var Space = require('@juspay/mystique-backend').androidViews.Space;
var _this;
var callbackMapper = require("@juspay/mystique-backend/").helpers.android.callbackMapper;
var CardComponent = require('../Sunbird/core/CardComponent');


class ResourceContainer extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([]);

  }


  getRows = () => {
    this.data = this.props.data; //JSON.parse(this.props.data);
    var rows = this.data.map((item, i) => {

      var temp = {};
      temp['imageUrl'] = item.appIcon;
      temp['title'] = item.name;
      temp['type'] = item.contentType;
      temp['footerTitle'] = "";
      temp['footerSubTitle'] = "";
      temp['actionText'] = "OPEN";

      return (<CardComponent 
                 data={temp}
                 content={item}
                 onCardClick = {this.handleCardClick}/>)
    });


    var layout = (<LinearLayout
                    width="match_parent"
                    root="true"
                    height="wrap_content">

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
            text="View all"
            onClick={()=>{this.handleViewAllClick()}}
            style={window.__TextStyle.textStyle.CARD.ACTION.BLUE}/>

            </LinearLayout>)
  }


  handleCourseClick = (courseName) => {
    this.props.onCourseOpenClick(courseName);
  }

  handleCardClick = (content, type) => {
    window.__runDuiCallback({ tag: "StartResourceDetailFlow", contents: { resourceDetails: JSON.stringify(content) } });
  }

  handleViewAllClick() {
    this.props.onViewAllClick();
  }

  render() {
    this.layout = (
      <LinearLayout
          height="match_parent"
          width="match_parent"
          orientation="vertical">

          {this.getHeader()}

          <HorizontalScrollView
           width = "wrap_content"
           height = "wrap_content"
           scrollBarX="false"
           fillViewport="true">

           <LinearLayout
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
