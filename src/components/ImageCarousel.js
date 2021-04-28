import {Carousel} from "react-responsive-carousel";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const getConfigurableProps = () => ({
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  infiniteLoop: false,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: false,
  stopOnHover: false,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 56,
  selectedItem: 0,
  interval: 2000,
  transitionTime: 500,
  swipeScrollTolerance: 5
});

const useStyles = makeStyles({
  detailImage: {
    '& img': {
      display: 'block',
      maxWidth: '100%',
      width: '100%'
    }
  },
  detailCarousel: {
    '& ul': {
      margin: '0',
      padding: '0'
    },
    '& .carousel .thumbs-wrapper': {
      margin: 0,
      marginTop: '13px'
    },
    '& .carousel .thumb': {
      padding: 0
    }
  },
});

const ImageCarousel = ({recipe}) => {
  const classes = useStyles();

  return (
      <Carousel className={classes.detailCarousel} {...getConfigurableProps()}>
        {recipe.images.map((img) => {
          return (
            <div key={recipe.id} className={classes.detailImage}>
              <img src={img} alt="cuisine"/>
            </div>
          )
        })}
      </Carousel>
  )
};

export default ImageCarousel;