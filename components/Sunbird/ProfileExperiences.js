var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;

var _this;
class ProfileExperiences extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([

    ]);
    _this = this;
    this.isEditable = this.props.editable;

    this.jobs = (this.props.data != undefined)? this.props.data : [];

  }


  getHeader() {
    return (<LinearLayout
              width="wrap_content"
              height="wrap_content">

              <TextView
                width="wrap_content"
                height="wrap_content"
                text={this.props.heading}
                style={window.__TextStyle.textStyle.CARD.TITLE.DARK}/>

              <ViewWidget
                height="0"
                weight="1"/>

              <TextView
              width="wrap_content"
              height="wrap_content"
              text="Add"
              onClick = {window.__ExperiencePopUp.show}
              visibility = {(this.isEditable == "true") ? "visible" : "gone"}
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

  getEditButton = (item) =>{
    if(this.editable){
    return (
      <LinearLayout
      height="wrap_content"
      width="wrap_content"
      gravity="center">
      <ViewWidget
        height="0"
        weight="1"/>
        <ImageView
        width="18"
        height="18"
        imageUrl="ic_action_edit_blue"
        onClick={()=>{this.showPopUp(item)}}/>
      </LinearLayout>
    )
   }

   else {
     return (<LinearLayout
       height="wrap_content"
       width="wrap_content"/>)
   }
  }

  showPopUp = (item) =>{
    console.log(item, "showPopUp");

    window.__ExperiencePopUp.data=item;
    window.__ExperiencePopUp.show();
  }

  getBody(input) {
    var date = "";
    if (this.props.heading == "Education"){
      if (input.yearOfPassing)
        date = "Year of passing : " + input.yearOfPassing;
    } else {
      var dateOptions = {month: "short", year: "2-digit"};
      var endDate = new Date(input.endDate);
      var endDateString = endDate.toLocaleDateString("en-us", dateOptions);
      var joiningDate = new Date(input.joiningDate);
      var joiningDateString = joiningDate.toLocaleDateString("en-us", dateOptions);
      if(input.hasOwnProperty("joiningDate") && input.joiningDate != ""){
        var val = Math.abs(joiningDate.getUTCFullYear() - endDate.getUTCFullYear());
        if (val == 0)
          var noOfYears = "";
        else
          var noOfYears = " (" + val + " YRS)";
      } else {
        var noOfYears = "";
      }
      date = joiningDateString + " - " + endDateString + noOfYears;
    }

    var address = "";
    if(input.hasOwnProperty("address")){
      if(input.address.hasOwnProperty("city")){
        address = input.address.city ? input.address.city : "";
      }
      if(input.address.hasOwnProperty("country")){
        if (input.address.country)
          address  = (address == "") ? input.address.country : address + "," +input.address.country;
      }
    }



    return (<LinearLayout
              width="wrap_content"
              height="wrap_content"
              orientation="vertical"
              margin="12,0,0,0">

                    <TextView
                    width="wrap_content"
                    height="wrap_content"
                    text={input.jobName ? input.jobName : input.name}
                    style={window.__TextStyle.textStyle.CARD.HEADING}/>

                    <TextView
                    width="wrap_content"
                    height="wrap_content"
                    visibility = {address == "" ? "gone" : "visible"}
                    text={address}
                    style={window.__TextStyle.textStyle.HINT.REGULAR}/>

                    <TextView
                    width="wrap_content"
                    height="wrap_content"
                    text={date}
                    style={window.__TextStyle.textStyle.HINT.REGULAR}/>

                </LinearLayout>)
  }

  experienceBody = () => {

    var cards = this.jobs.map((item, i) => {
      return (<LinearLayout
                width="wrap_content"
                height="wrap_content"
                gravity="center_vertical"
                margin="0,16,0,0">

                <LinearLayout
                  background={window.__Colors.WHITE_F4}
                  width="44"
                  height="44"/>

                {this.getBody(item)}
                {this.getEditButton(item)}

                </LinearLayout>)

    });

    return cards;

  }

  getLineSeperator = () => {
    return (<LinearLayout
            width="match_parent"
            height="1"
            margin="0,0,0,24"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }


  render() {
    this.layout = (

      <LinearLayout
                width="wrap_content"
                height="match_parent"
                margin="0,16,0,0"
                orientation="vertical"
                visibility = {(this.jobs.length > 0) ? "visible" : "gone"}>

                {this.getLineSeperator()}

                {this.getHeader()}

                {this.experienceBody()}

              </LinearLayout>



    )
    return this.layout.render();
  }
}



module.exports = ProfileExperiences;
