import React from "react";
import "../Css/Aboutus.css";

const Aboutus = () => {
  return (
    <div>
      {" "}
      <div className="about-us-container">
        <div className="heading-container">
          <h1 className="about-us-heading"></h1>
        </div>

        <div className="about-us-content">
          <div className="left-side">
            <div className="logo-container">
              <div className="logo1">Samasya</div>
              <div className="logo">Sewa</div>
            </div>

            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Ipsum mattis
              sociosqu tempus ante morbi. Himenaeos vel quis id ipsum inceptos
              montes sociosqu. Praesent tortor parturient potenti quam, leo mi.
              Efficitur egestas per mus erat integer, natoque ligula pretium.
              Commodo id quisque pharetra, sapien ultrices faucibus. Eget
              bibendum a; ad habitant maecenas ornare. Torquent fames purus
              justo aptent ligula magna vestibulum senectus mollis. Risus dictum
              habitasse cubilia elit tellus ullamcorper a. Blandit fames porta
              donec tellus convallis duis turpis. Eros hac ut neque orci,
              aliquet non felis molestie. Varius primis etiam pulvinar; ante
              rhoncus porta sapien praesent cras. Malesuada volutpat donec purus
              porttitor dui penatibus. Elementum vulputate condimentum odio
              accumsan, integer interdum. Torquent condimentum dictum nibh nec
              quisque. Venenatis laoreet dignissim posuere hendrerit, et
              efficitur auctor.
            </p>

            <br />

            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Ipsum mattis
              sociosqu tempus ante morbi. Himenaeos vel quis id ipsum inceptos
              montes sociosqu. Praesent tortor parturient potenti quam, leo mi.
              Efficitur egestas per mus erat integer, natoque ligula pretium.
              Commodo id quisque pharetra, sapien ultrices faucibus. Eget
              bibendum a; ad habitant maecenas ornare. Torquent fames purus
              justo aptent ligula magna vestibulum senectus mollis. Risus dictum
              habitasse cubilia elit tellus ullamcorper a. Blandndimentum odio
              accumsan, integer interdum. Torquent condimentum dictum nibh nec
              quisque. Venenatis laoreet dignissim posuere hendrerit, et
              efficitur auctor.
            </p>
          </div>
          <div className="right-side">
            <img
              src="https://via.placeholder.com/400"
              alt="About Samasya Sewa"
              className="about-us-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
