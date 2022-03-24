import React, { useEffect } from 'react';
import Particles from 'react-tsparticles';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  particleContainer: {
    overflow: 'hidden',
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    zIndex: -1,
    backgroundColor: "#222"
  }
}));

const particlesoptions = {
        particles: {
          number: {
            value: 140,
            density: {
              enable: true,
              value_area: 1200
            }
          },
          color: {
            value: "#fff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 3
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 130,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "repulse"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
  };

const Particle = () => {

  const classes = useStyles();

  useEffect(() => {

  }, []);


  return (
    <Particles params={particlesoptions} className={classes.particleContainer}/>
  )
}

export default Particle;