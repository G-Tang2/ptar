import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

type DotStepperProps = {steps: number, handleNext: () => void, handleBack: () => void, activeStep: number};

function DotsMobileStepper(props:any) {
  const theme = useTheme();

  return (
    <MobileStepper
      variant="dots"
      steps={props.steps}
      position="static"
      activeStep={props.activeStep}
      nextButton={
        <Button size="small" onClick={props.handleNext} disabled={props.activeStep === 2}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={props.handleBack} disabled={props.activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  );
}

export default DotsMobileStepper;