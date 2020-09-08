import React, { Component } from "react";
import Slider from "react-slick";
import './style.css'

const dataSource = [
  {
    pic:
      "https://p1.meituan.net/gpa/5ee6d6d00d942804557c73abff79b855116489.jpg%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "For the adventure seeker...",
    url:
      "http://www.cardrona.com/"
  },
  {
    pic:
      "https://p0.meituan.net/gpa/387438cef7e2bb9eff5b701dde173f27268549.png%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "New Zealand's ultimate mountain playground",
    url:
      "http://www.cardrona.com/"
  },
  {
    pic:
      "https://p1.meituan.net/gpa/fbd325713d43366810452c38fc0e32e1945185.png%40100w_100h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D20%26y%3D20",
    title: "A Queenstown family ski holiday",
    url:
      "http://www.cardrona.com/"
  }
];

class Headline extends Component {
  render() {
    const settings = {
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true,
      vertical: true
    };

    return (
      <div className="headline">
        <div className="headline__logo" />
        <div className="headline__slider">
          <Slider {...settings}>
            {dataSource.map((item, index) => {
              return (
                <a
                  key={index}
                  className="headline__sliderInner"
                  href={item.url}
                >
                  <div className="headline__sliderTitle">{item.title}</div>
                  <div className="headline__sliderImgWrapper">
                    <img alt="" className="headline__sliderImg" src={item.pic} />
                  </div>
                </a>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Headline;
