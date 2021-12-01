//import functions from React library
import React, { Component } from "react";
// import css for the App Component
import "./App.css";
//import css for the antd design for react
import "antd/dist/antd.css";
//import image assets
import duplicate from "./assets/duplicate-ant-design_copy-twotone.png";
import edit from "./assets/edit-ant-design_edit-twotone.png";
import deleteButton from "./assets/delete-ant-design_delete-twotone.png";
import deleteButtonGray from "./assets/delete-grey-ant-design_delete-twotone.png";
//import components from antd
import { Button } from "antd";
//import components
import Header from "./Components/Header";
import Aside from "./Components/Aside";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asideOpen: false,
      cards: [
        {
          titleText: 'Custom title',
          bodyText: 'Custom body text',
          cardId: 0,
        },
      ],
    };
  }

  //Duplicate card on click
  addNewCard = (id) => {
    let newCard = [...this.state.cards];
    newCard.push(
      {
        titleText: 'Custom title',
        bodyText: 'Custom body text',
        cardId: id
      },
    );
    this.setState({ cards: newCard });
    console.log("from new card", this.id)
  };

  removeCard = (index) => {
    if (this.state.cards.length === 1) {
      return;
    } else {
      const currentCards = [...this.state.cards];
      currentCards.splice(index, 1);
      this.setState({ cards: currentCards });
      this.checkCardsLeft();
    }
  };

    //define gray out options for the delete card button if there is only 1 card; gray-out the trash can.
    checkCardsLeft = () => {
      if (this.state.cards.length === 1) {
        this.deleteButtonOptions = deleteButtonGray;
      } else {
        this.deleteButtonOptions = deleteButton;
      }
    };

    //functionality codes here:

    //function to slide drawer on click
    // function to slide the aside in and out.
    toggleAside = () => {
      //***alternative method:
      // if (this.state.asideOpen === false) {
      //   let newState = {
      //     asideOpen: true,
      //     cards: [...this.state.cards],
      //   };
      //   this.setState(newState);
      // } else {
      //   let newState = {
      //     asideOpen: false,
      //     cards: [...this.state.cards],
      //   };
      //   this.setState(newState);
      // }
      this.setState({ asideOpen: !this.state.asideOpen });
    };

    //set toggle off when clicking off the aside only if the aside is open.
    toggleOff = () => {
      if (this.state.asideOpen === true) {
        this.toggleAside()
      } else {
        return;
      };
    }

    //callback function to pull form input data from aside form child components.
    handleChangeValue = (e, newContent) => {
      console.log(newContent)
      // this.setState({
        
      // })
    }




  render() {
    this.checkCardsLeft();

    //collect card id
    let id;

    //define cards and duplicate based on array in state
    let cards;
    cards = this.state.cards.map((card, index) => {
      id = {index};
      console.log(id);
      console.log(this.state.cards);
      return (
        <div className="card" key={index} id={'card-'+index} data-id={index}>
          {/* {this.handleChange} */}
          <div className="cardTitle">
            <h2>{this.state.cards[index].titleText}</h2>
            <div class="cardOptions">
              <Button
                type="link"
                size="small"
                onClick={this.toggleAside}
                icon={<img src={edit} alt="click here to style your card" />}
              ></Button>
              <Button
                type="link"
                size="small"
                onClick={() => {this.addNewCard(id.index + 1)}}
                icon={
                  <img src={duplicate} alt="click here to add a new card" />
                }
              ></Button>
              <Button
                type="link"
                size="small"
                onClick={this.removeCard}
                icon={
                  <img
                    src={this.deleteButtonOptions}
                    alt="click here to delete card"
                  />
                }
              ></Button>
            </div>
          </div>
          <div className="cardBody">
            {/* This will be a component that recieves input via props */}
            <p>{this.state.cards[index].bodyText}</p>
          </div>
        </div>
      );
    });

    //written ternary syntax alternative to conditional if statement
    let drawer = this.state.asideOpen === true ? <Aside onChangeValue={this.handleChangeValue} /> : null;




    return (
      <div className="app">
        <header>
          <Header />
        </header>

        {drawer}

        <main onClick={() => {this.toggleOff()}}>{cards}</main>
      </div>
    );
  }

  //pencil to edit content
}

export default App;
