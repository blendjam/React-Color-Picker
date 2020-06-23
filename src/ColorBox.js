import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";

export default class ColorBox extends Component {
  state = {
    isCopied: false,
  };

  changeCopyState = () => {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  };

  findLuminence = color => {};

  render() {
    const { name, background, moreUrl, showMore } = this.props;
    const showClass = this.state.isCopied ? "show" : "";
    const isLightColor = chroma(background).luminance() >= 0.4;
    const darkTextClass = isLightColor ? "darkText" : "";
    const darkBgClass = isLightColor ? "darkBg" : "";

    return (
      <div className="ColorBox" style={{ background }}>
        <CopyToClipboard text={background}>
          <div className="copy-container" onClick={this.changeCopyState}>
            <div
              className={`copy-overlay ${showClass}`}
              style={{ background }}
            />
            <div className={`copy-overlay-msg ${showClass}`}>
              <h1 className={`copy-overlay-txt ${darkBgClass}`}>COPIED</h1>
              <p className={`copy-overlay-color ${darkTextClass}`}>
                {background}
              </p>
            </div>
            <span className={`color-name ${darkTextClass}`}>{name}</span>
            <button className={`copy-button ${darkTextClass}`}>Copy</button>
          </div>
        </CopyToClipboard>
        {showMore && (
          <Link to={moreUrl}>
            <span className={`see-more ${darkBgClass}`}>More</span>
          </Link>
        )}
      </div>
    );
  }
}
