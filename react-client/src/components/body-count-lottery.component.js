import React, { Component } from "react";
import SeedRandom from "seedrandom";

export default class BodyCountLottery extends Component {
  constructor(props) {
    super(props);

    this.randomizeLotto = this.randomizeLotto.bind(this);
    this.trimDownByAvg = this.trimDownByAvg.bind(this);
    this.overallCount = this.overallCount.bind(this);

    this.state = {
      dailyZoneDeathAvg: 11,
      lotteryNumbers: [
        13,
        56,
        2,
        24,
        5,
        9
      ],
      totalBodyCount: 0,
      runningCount: 0,
      runningSize: 0,
      runningAvg: 0
    };

  }

  componentDidMount() {
    this.randomizeLotto();
    this.setState({
      totalBodyCount: this.state.lotteryNumbers.reduce((overall, next) => overall + next)
    });
  }

  randomizeLotto() {
    const random = SeedRandom();
    this.setState({
      lotteryNumbers: [
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random),
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random),
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random),
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random),
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random),
        this.trimDownByAvg(Math.abs(random.double() * this.state.dailyZoneDeathAvg * 100), random)
      ],
      runningCount: this.state.runningCount + 6
    }, function() {
      this.setState({
        runningSize: (this.state.runningSize + this.overallCount()),
        totalBodyCount: this.overallCount(),
        runningAvg: this.state.runningSize / this.state.runningCount
      }, () => { console.log(this.state.runningSize / this.state.runningCount) });
    });
  }

  trimDownByAvg(num, random) {
    const bonus = random.double() * 10 / this.state.dailyZoneDeathAvg;
    const bigNumChance = Math.floor(random.double() * 100);
    const percentChance = 5;
    if (num <= this.state.dailyZoneDeathAvg || (bigNumChance <= percentChance && num < this.state.dailyZoneDeathAvg * 5)) {
      return num ? Math.round(num) : random.double() > 0.5 ? 1 : 0;
    }
    return this.trimDownByAvg(Math.round(num * random.double()), random);
  }

  overallCount() {
    return this.state.lotteryNumbers.reduce((overall, next) => overall + next)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row title-row">
          <div className="col-md-6">
            Welcome to the Body Count Lotto! Today's lottery numbers are:
          </div>
        </div>
        <div className="container-fluid lotto-ticket">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 lotto-info">
                Ticket
              </div>
            </div>
            <div className="container-fluid lotto-border">
              <div className="row">
                <div className="col-md-10">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        Testing
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12" id="lotto-ticket-nums">
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[0]}</span>
                        </div>
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[1]}</span>
                        </div>
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[2]}</span>
                        </div>
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[3]}</span>
                        </div>
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[4]}</span>
                        </div>
                        <div className="col-md-1 lotto-ticket-num">
                          <span>{this.state.lotteryNumbers[5]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12 lotto-ticket-num" id="total-body-count">
                        <span>{this.state.totalBodyCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
              <button className="btn btn-outline-secondary" type="button" onClick={this.randomizeLotto}>
                New Lotto
              </button>
          </div>
        </div>
        <div>
          For an overall body count of {this.state.totalBodyCount}!
        </div>
      </div>
    );
  }
}