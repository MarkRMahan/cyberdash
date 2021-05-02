import React, { Component } from "react";
import ImageDataService from "../services/image.service";
import ImageArea from './image-area.component';
import '../nightcity.css';
import ImageMapper from 'react-img-mapper';

export default class NightCityMap extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setListeners()
    this.setImage("NightCityPresentation");
  }

  async getImage(name) {
    return await ImageDataService.getImgByName(name)
      .then(response => {
        if (response[0].image.data) {
          return new Buffer(response[0].image.data).toString('base64');
        }
      })
      .catch(err => {
        console.log(`Error retrieving Night City img: ${err}`);
      });
  }

  setImage(name) {
    this.getImage(name)
      .then((img) => {
          //console.log(`${name} IMG: ${img}`);
          this.setState({
            [name]: img
          });
      })
      .catch(err => {
        console.log(`Error setting img ${name}: ${err}`);
      });
  }

  setModalImage(name, modalImg) {
    this.getImage(name)
      .then((img) => {
          this.setState({
            [name]: img
          },
          () => {
            this.changeCurrentImg(name, modalImg);
          });
          console.log("Finished modal image");
      })
      .catch(err => {
        console.log(`Error setting img ${name}: ${err}`);
      });
  }

  changeCurrentImg(name, modalImg) {
    modalImg.setAttribute("src", `data:image/png;base64,${this.state[name]}`)
  }

  logToConsole() {
    console.log("Clicked");
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }

  logZoneName(zoneName) {
    console.log(zoneName);
  }

  setListeners() {
    const nightCityAreas = document.querySelectorAll("area");

    const myModal = document.getElementById("nightCityZoneModal");
    const closeModal = document.getElementsByClassName("closeModal")[0];
    const modalImg = document.getElementById("modalImg");

    nightCityAreas.forEach((area) => {
      let areaAlt = area.getAttribute('alt');
      area.addEventListener('click', (event) => {
        event.preventDefault();
        if (!this.state[areaAlt]) {
          console.log(`Target: ${areaAlt}`);
          this.setModalImage(areaAlt, modalImg);
        } else {
          this.changeCurrentImg(areaAlt, modalImg);
        }
        //this.setState({ currentImage: this.state[name] });
        myModal.style.display = "block";
        console.log(JSON.stringify(this.state.currentImage));
      });
    });

    closeModal.addEventListener('click', (event) =>{
      myModal.style.display = "none";
    });

  }



  render() {
    return (
      <div className="h-100 nc-row">
        <div id="nightCityZoneModal">
          <img id="modalImg" src={`data:image/png;base64,${this.state.currentImage}`}/>
          <span id="modalText">THIS IS A TEST TO SEE THE MODAL</span>
          <span className="closeModal">&times;</span>
        </div>
        <div className="nc-col img-container">
          <div id="night-city-container">
            <img src={`data:image/png;base64,${this.state.NightCityPresentation}`} className="night-city-img" useMap="#nightcitymap"/>
            <map name="nightcitymap">
              <area alt="ExecutiveZone" href="#" coords="568,280,583,271,589,260,611,260,631,285,631,315,626,329,611,340,595,340,568,307,568,280" shape="poly"/>
              <area alt="TheOpenRoad" href="#" coords="526,1,501,109,553,174,568,207,601,209,614,212,629,224,634,238,628,275,633,291,636,296,635,302,632,307,626,329,611,339,598,340,619,362,635,417,679,509,693,526,693,558,719,561,731,557,731,0" shape="poly"/>
              <area alt="TheReclaimedPerimeter" href="#" coords="731,615,718,636,705,676,694,785,682,825,658,864,637,885,610,904,586,909,732,909" shape="poly"/>
              <area alt="PacificaPlayground" href="#" coords="0,892,5,895,31,893,54,877,45,864,50,858,36,842,37,826,54,818,56,797,71,794,81,786,93,781,98,773,113,775,119,779,129,769,142,762,146,753,151,750,181,764,212,760,248,766,246,791,235,813,194,869,170,881,148,909,0,910" shape="poly"/>
              <area alt="HeywoodIndustrialZone" href="#" coords="395,698,465,734,540,643,484,586,446,625,433,651" shape="poly"/>
              <area alt="RanchoCoronado" href="#" coords="247,791,194,870,170,883,149,909,495,910,418,866,377,838,333,793,315,799" shape="poly"/>
              <area alt="SantoDomingo" href="#" coords="249,765,247,790,314,797,333,792,377,836,496,909,585,908,609,902,639,882,658,863,681,824,693,786,704,676,717,636,731,613,732,559,719,562,693,559,692,527,677,509,652,458,593,468,486,584,542,642,466,736,394,698,355,749,292,769" shape="poly"/>
              <area alt="NewWestbrook" href="#" coords="594,468,654,458,633,415,619,363,567,305,568,281,584,270,588,261,610,261,626,276,634,240,628,224,614,213,603,209,571,209,551,172,501,108,525,1,331,1,347,61,348,96,343,139,380,154,393,156,408,169,418,187,418,204,432,231,452,259,463,275,480,287,491,306,499,326,510,338,515,346,519,379,514,388,512,399" shape="poly"/>
              <area alt="WatsonDevelopment" href="#" coords="330,1,346,61,347,99,342,139,343,176,337,204,322,216,308,238,245,227,207,210,193,205,176,187,177,160,176,150,166,147,164,136,155,113,152,105,145,96,140,83,132,77,124,39,114,36,94,12,84,10,76,0,148,1,215,31,228,53,279,42,284,15" shape="poly"/>
              <area alt="NorCalMilitaryBase" href="#" coords="150,1,216,31,229,52,278,41,283,15,330,1" shape="poly"/>
              <area alt="MorroRock" href="#" coords="78,153,88,150,106,152,116,171,122,173,114,215,94,233,89,238,76,243,52,242,36,251,31,247,35,233,27,215,29,207,18,199,19,190,30,178,26,167,36,145,45,143,66,155" shape="poly"/>
              <area alt="UpperMarina" href="#" coords="343,141,378,156,392,157,405,170,415,188,415,205,430,233,461,275,480,290,497,327,513,347,517,379,512,388,510,398,498,407,433,407,402,423,392,397,343,359,331,356,315,342,309,324,283,324,276,317,232,318,215,331,219,279,235,269,247,270,264,275,273,281,290,278,300,282,326,281,336,285,342,289,361,285,370,293,400,293,415,300,424,316,433,319,447,332,463,354,469,370,482,362,478,348,443,306,384,235,373,187,345,178" shape="poly"/>
              <area alt="LittleChina" href="#" coords="402,425,432,408,500,408,522,425,428,539,401,496,397,446,402,441" shape="poly"/>
              <area alt="OldJapanTown" href="#" coords="428,540,401,571,372,553,312,552,299,543,303,524,299,473,307,470,312,465,333,458,361,476,368,466,387,465,394,447,396,447,396,447,400,497" shape="poly"/>
              <area alt="OldCombatZone" href="#" coords="401,572,372,554,312,553,309,588,302,615,290,630,275,640,260,645,280,664,297,691,311,685" shape="poly"/>
              <area alt="SouthNightCity" href="#" coords="296,691,290,692,205,693,198,690,180,689,166,693,159,690,145,701,128,701,112,700,105,695,99,695,85,690,79,686,74,678,68,674,63,665,61,657,57,651,62,640,60,629,58,620,60,612,65,606,61,593,50,593,36,586,39,548,20,537,21,530,15,521,10,503,14,487,32,493,83,482,153,500,156,538,178,546,183,561,196,572,206,622,229,645,248,648,258,644,280,666" shape="poly"/>
              <area alt="UniversityDistrict" href="#" coords="233,482,229,490,182,461,155,462,154,499,83,481,33,492,13,485,13,463,17,456,17,448,21,438,22,424,43,426,84,428,85,438,189,443,196,458,215,477" shape="poly"/>
              <area alt="TheGlen" href="#" coords="234,481,229,491,182,463,156,464,155,501,157,537,179,546,184,560,197,571,207,621,228,643,247,647,260,644,275,639,289,629,301,615,309,584,311,553,298,543,302,525,297,473,259,484" shape="poly"/>
              <area alt="LittleEurope" href="#" coords="22,423,85,428,86,437,184,440,188,386,201,351,206,348,209,336,214,331,219,279,209,274,198,273,153,289,134,288,123,281,108,293,92,301,80,299,74,305,66,305,57,310,54,318,46,319,30,325,22,332,14,347,27,364,23,370,54,401,22,407" shape="poly"/>
              <area alt="OldBankBlock" href="#" coords="285,414,329,356,343,360,391,398,398,416" shape="poly"/>
              <area alt="OldMedicalCenter" href="#" coords="399,417,401,424,401,440,396,446,393,446,387,463,368,466,361,475,332,457,326,446,321,416" shape="poly"/>
              <area alt="OldCorpCenter" href="#" coords="320,416,326,448,331,457,310,465,305,470,260,483,233,481,215,476,198,459,187,441,187,414" shape="poly"/>
              <area alt="OldCityCenter" href="#" coords="187,413,283,414,329,356,314,343,308,326,282,325,276,319,232,319,210,337,208,347,202,352,189,387" shape="poly"/>          
            </map>
          </div>
        </div>
        <div  className="nc-col">
          Get this text on the right
        </div>
      </div>
    );
  }

}