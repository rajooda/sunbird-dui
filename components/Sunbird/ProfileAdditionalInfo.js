

var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;

var _this;
class ProfileAdditionalInfo extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([

    ]);
    _this = this;

    this.data = this.props.data;
    this.languages = "";
    this.data.language.map((item, i) => {
      var append = ",";
      if (i == this.data.language.length - 1) append = "";
      this.languages += item + append;
    })
    this.address = (this.data.address.length > 0) ? this.data.address : ""
    this.info = [{
      name: "LANGUAGES",
      value : this.languages
    },
    {
      name: "EMAIL",
      value : this.data.email
    },
    {
      name: "PHONE",
      value : this.data.phone
    },
    {
      name: "CURRENT LOCATION",
      value : this.address
    }]

  //   this.data = [{
  //     name: "LANGUAGES",
  //     date: "English, Hindi, Marathi"
  //   },
  //   {
  //     name: "E-MAIL",
  //     date: "harish.bookwala@gmail.com"
  //   },
  //   {
  //     name: "PHONE",
  //     date: "+91 80808 88888"
  //   },
  //   {
  //     name: "CURRENT LOCATION",
  //     date: "Pune, Maharashtra"
  //   }
  // ]
  this.hobbies = "Books, cycling, music, sports, browsing, teaching"
  }

  getRows = (input)=> {
    var rows = this.info.map((item, i) => {
      return (<LinearLayout
              width="wrap_content"
              height="wrap_content"
              margin="0,16,0,0"
              visibility = {(item.value && item.value != "") ? "visible" : "gone"}>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text={item.name}
              style={window.__TextStyle.textStyle.HINT.SEMI}/>

              <ViewWidget
              height="0"
              weight="1"/>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text={item.value}
              style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>

              </LinearLayout>)
    });

    return rows;
  }

  getBody = () => {
    return (<LinearLayout
            width="wrap_content"
            height="wrap_content"
            margin="0,0,0,0"
            orientation="vertical">

            {this.getRows()}
            

            </LinearLayout>)
  }

  getHeader = () =>{
    return (<LinearLayout
              width="wrap_content"
              height="wrap_content"
              >

              <ViewWidget
              height="0"
              weight="1"/>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text="View all"
              visibility = "gone"
              style={window.__TextStyle.textStyle.CARD.ACTION.BLUE}/>

              </LinearLayout>)
  }

  getLineSeperator = () => {
    return (<LinearLayout
            width="match_parent"
            height="1"
            margin="0,0,0,24"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }

  getHobbies = () => {
    return (
      <LinearLayout
        orientation = "horizontal"
        width = "match_parent"
        margin="0,16,0,0">
        <TextView
        width="wrap_content"
        height="wrap_content"
        text="HOBBIES"
        style={window.__TextStyle.textStyle.HINT.SEMI}/>

        <ViewWidget
        height="0"
        weight="2"/>

        <LinearLayout
          orientation = "vertical"
          width = "wrap_content"
          height = "wrap_content"
          weight = "1">
          <TextView
          width="wrap_content"
          height="wrap_content"
          text={this.hobbies}
          gravity = "right"
          style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>
        </LinearLayout>
      </LinearLayout>
    )
  }

  render() {
    this.layout = (
      <LinearLayout
                width="wrap_content"
                height="wrap_content"
                margin="0,16,0,0"
                orientation="vertical">

                {this.getLineSeperator()}

                {this.getHeader()}
                {this.getBody()}

              </LinearLayout>
    )
    return this.layout.render();
  }
}



module.exports = ProfileAdditionalInfo;
