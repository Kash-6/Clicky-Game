//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import pic from "./pic.json";
import "./App.css";

//Sets state to 0 or empty
class App extends Component {
  state = {
    pic,
    clickedPic: [],
    score: 0
  };

//When you click on a card ... the pic is taken out of the array
  imageClick = event => {
    const currentPic = event.target.alt;
    const PicAlreadyClicked =
      this.state.clickedPic.indexOf(currentPic) > -1;

//If you click on a pic that has already been selected, the game is reset and cards reordered
    if (PicAlreadyClicked) {
      this.setState({
        pic: this.state.pic.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPic: [],
        score: 0
      });
        alert("You lose. Try again?");

//If you click on an available pic, your score is increased and cards reordered
    } else {
      this.setState(
        {
          pic: this.state.pic.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPic: this.state.clickedPic.concat(
            currentPic
          ),
          score: this.state.score + 1
        },
//If you get all 12 pics corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              pic: this.state.pic.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPic: [],
              score: 0
            });
          }
        }
      );
    }
  };

//The order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.pic.map(pic => (
            <FriendCard
              imageClick={this.imageClick}
              id={pic.id}
              key={pic.id}
              image={pic.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;