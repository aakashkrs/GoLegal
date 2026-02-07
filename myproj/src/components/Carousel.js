import React from 'react';
import '../css/style.css'; // Import your CSS file

const Carousel = () => {
    return (
        <div id="carousel" className="carousel slide" data-ride="carousel">
            {/* Carousel content */}
            <ol class="carousel-indicators">
                    {/* <li data-target="#carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel" data-slide-to="1"></li>
                    <li data-target="#carousel" data-slide-to="2"></li> */}
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="img/banner1.jpeg" alt="Carousel"/>
                        <div class="carousel-caption">
                            <h1 class="animated fadeInLeft">We fight for your justice</h1>
                            <p class="animated fadeInRight">Dedicated advocacy to uphold fairness and lawful rights.</p>
                            <a class="btn animated fadeInUp" href="#">Grievance Portal</a>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <img src="img/banner2.jpeg" alt="Carousel"/>
                        <div class="carousel-caption">
                            <h1 class="animated fadeInLeft">We prepared to oppose for you</h1>
                            <p class="animated fadeInRight">Ready and equipped to challenge on your behalf.</p>
                            <a class="btn animated fadeInUp" href="#">Legal Education</a>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <img src="img/banner3.jpeg" alt="Carousel"/>
                        <div class="carousel-caption">
                            <h1 class="animated fadeInLeft">We fight for your privilege</h1>
                            <p class="animated fadeInRight">Committed to defending and securing your entitlements.</p>
                            <a class="btn animated fadeInUp" href="#">Judicial Services</a>
                        </div>
                    </div>
                </div>

                <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
        </div>
    );
};

export default Carousel;
