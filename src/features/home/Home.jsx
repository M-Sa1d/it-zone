import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="welcome">
        <div className="welcome-row">
          <div className="welcome-col">
            <h1>
              Hello, Ibrohim!
            </h1>
            <p>
              Home you have a good day
            </p>
          </div>
          <div className="welcome-col">

          </div>
        </div>
      </div>
      <div className="home-content">
        <div className="home-content-left">
          <div className="home-info-row">
            <div className="home-info-col">
              <div className="home-info-col-content">
                <div className="home-info-col-left">
                <i className="bi bi-people"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    Total Students 450
                  </p>
                </div>
              </div>
            </div>
            <div className="home-info-col">
              <div className="home-info-col-content">
                <div className="home-info-col-left">
                <i className="bi bi-person"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    New Students 50
                  </p>
                </div>
              </div>
            </div>
            <div className="home-info-col">
              <div className="home-info-col-content">
                <div className="home-info-col-left">
                <i className="bi bi-layers"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    All Courses <br /> 80
                  </p>
                </div>
              </div>
            </div>
            <div className="home-info-col">
              <div className="home-info-col-content">
                <div className="home-info-col-left">
                <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="home-info-col-right">
                  <p>
                    Total Earnings 450$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
