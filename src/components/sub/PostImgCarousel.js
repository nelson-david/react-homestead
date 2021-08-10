import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView } from "mdbreact";
import ProgressiveImage from "react-progressive-graceful-image";
//import * as AiIcons from "react-icons/ai";
//import {useState} from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const PostImgCarousel = (props) => {
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <MDBCarousel
        activeItem={1}
        length={props.imageData.length}
        showControls={true}
        showIndicators={true}
        interval={false}
        slide
        style={{
          borderRadius: "6px",
          marginTop:"10px",
          alignItems:"center"
        }}
      >
        <MDBCarouselInner
          style={{
            alignItems:"center"
          }}
        >
          {props.imageData.map((value, index) => {
            return (
              <MDBCarouselItem
                itemId={index + 1}
                key={index}
                style={{
                  borderRadius: "6px"
                }}
              >
                <MDBView>
                  <ProgressiveImage
                    src="large-image.jpg"
                    placeholder="tiny-image.jpg">
                    {(src) => 
                      <img
                        src={`${props.devURL}img/${value.name}`}
                        alt={`${value.name}`}
                        className="post_carouselimg"
                        height={props.height}
                      />
                    }
                  </ProgressiveImage>
                </MDBView>
              </MDBCarouselItem>
            )
          })}
        </MDBCarouselInner>
      </MDBCarousel>
    </FullScreen>
  )
}

export default PostImgCarousel;
