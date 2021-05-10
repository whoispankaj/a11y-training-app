import React, {useState} from 'react';
import styled from '@emotion/styled';
import './App.css';
import {Modal, useModal} from '@workday/canvas-kit-react-modal';
import {Button} from '@workday/canvas-kit-react-button';

const App = () => {
  const modal = useModal();
  const [state, setState] = useState({
    email: undefined,
    checked: false,
    showError: false,
    errorMessage: ''
  });

  const joinNowClickHandler = () => {
    if (!state.email) {
      setState(prev => {
        return {
          ...prev,
          showError: true,
          errorMessage: 'Please enter your email address'
        }
      });

    } else if (!state.checked) {
      setState(prev => {
        return {
          ...prev,
          showError: true,
          errorMessage: 'Please select the checkbox to join'
        }
      });
    } else {
      setState(prev => {
        return {
          ...prev,
          showError: false,
          errorMessage: ''
        }
      });
    }
  };

  const changeHandler = () => {
    setState(prev => {
      return {
        ...prev,
        checked: !prev.checked
      }
    });
  };

  const emailChangeHandler = (e: any) => {
    setState(prev => {
      return {
        ...prev,
        email: e.target.value
      }
    });
  };

  return (
    <Container>
      <Header>
        <h1>Welcome to Treasure Hunt - Bug Bounty for A11Y</h1>
      </Header>
      <MainSection>
        <Button {...modal.targetProps}>
          Start Treasure Hunt
        </Button>
        <Modal heading="Exclusive Access"  {...modal.modalProps} width={Modal.Width.m}>
          <ModalContentContainer>
            <ModalImg
                src="https://i.pinimg.com/originals/f7/f6/93/f7f6936b85dfee2b57ae7f3683a359a5.jpg"/>
            <ModalContent>
              <div className="header">Are you ready?</div>
              <p>Get Exclusive access to our next launch</p>
              <form>
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={state.email}
                    onChange={emailChangeHandler}
                    required/>
                <label>
                  <input type="checkbox" required onChange={changeHandler}/>
                  <span>I agree to terms & conditions</span>
                </label>
                {state.showError && (
                    <ErrorMessage>
                      {state.errorMessage}
                    </ErrorMessage>
                )}
              </form>
              <JoinNowButton onClick={joinNowClickHandler}>Join Now</JoinNowButton>
            </ModalContent>
          </ModalContentContainer>
        </Modal>
      </MainSection>
    </Container>
  );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 1fr;
    height: 100vh;
`;

const Header = styled.header`
  background-color: #8053ac;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainSection = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorMessage = styled.div`
        color: red;
`;

const JoinNowButton = styled.div`
  height: 50px;
  width: auto;
  padding: 5px 10px;
  background-color: lightgray;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalContentContainer = styled.div`
  height: 400px;
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

`;
export default App;
