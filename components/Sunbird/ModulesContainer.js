var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var HorizontalScrollView = require("@juspay/mystique-backend").androidViews.HorizontalScrollView;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;

import ModuleCard from '../Sunbird/ModuleCard';

class ModulesContainer extends View {
  constructor(props, children) {
    super(props, children);

    this.props.appendText = this.props.appendText || "";
    this.setIds([
      'modulesContainer'
    ]);
  }


  afterRender = () => {
    this.indexItems = this.props.moduleData;
    this.tmpArr = [];
    this.imageUrls = this.props.imageUrls;
    var _this = this;
    for (var i = 0; i < this.indexItems.length; i++) {

      var dat = {
        moduleBackground: (i % 2 == 0 ? "#22007aff" : "#229012FE"),
        moduleName: _this.indexItems[i],
        moduleImage: _this.imageUrls[i]
      }
      console.log("ADDING")
      _this.tmpArr.push(dat)
    }
    console.log("SENDING THIS ", this.tmpArr)

    var cards = this.tmpArr.map((item, i) => {
      return (
        <ModuleCard 
          item={item} 
          index={i} 
          _onClick={this.handleIndexMenu} />)
    });

    var renderItem = (<LinearLayout 
                        height="match_parent" 
                        root="true"
                        padding="0,16,20,20"
                        orientation="horizontal"
                        layout_gravity="center_horizontal"
                        width="match_parent">
                          {cards}
                    </LinearLayout>);
    console.log(renderItem)
    this.replaceChild(this.idSet.modulesContainer, renderItem.render(), 0);
  }


  render() {


    this.layout = (

      <LinearLayout
      width="match_parent"
      height="135"
      margin = "0,0,0,0"
      afterRender={this.afterRender}
      orientation="vertical"
      gravity="center"
      >
          
          <TextView 
          width="match_parent"
          height="wrap_content"
          margin="10,0,0,0"
          style={window.__TextStyle.textStyle.CARD.TITLE.DARK}
          text="Modules"/>

           <HorizontalScrollView
            width = "match_parent"
            height = "match_parent"
            scrollBarX="false"
            fillViewport="true">
              <LinearLayout
                id={this.idSet.modulesContainer}
                orientation="vertical"
                height="wrap_content"
                width="match_parent"
                >
              </LinearLayout>
          </HorizontalScrollView>
                        
                    
       </LinearLayout>


    )

    return this.layout.render();
  }
}

module.exports = ModulesContainer;
