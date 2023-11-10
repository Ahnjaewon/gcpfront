import React, {useEffect, useState,startTransition, useTransition} from 'react';
import styled from 'styled-components';
import logo from './playdata.png';
import {api, exceptionApi} from "./Api";
import {useNavigate} from "react-router";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {roleSelector, tokenAtom} from "./LoginAtom";
import cookie from 'react-cookies';
const Logo = styled.img`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #1e90ff, #0073e6);
`;

const FormContainer = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 80px;
  width: 40%;
  height: 60%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #ccc;
  width: ${props => (props.$emailInput ? '84%' : '100%')};
  font-size: 16px;
  outline: none;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Label = styled.label`
  font-size: 12px;
  color: #008ecf;
  text-align: left;
  margin-top: 5px;
`;

const SmallText = styled.span`
  font-size: 10px;
  color: #555;
`;

const Divider = styled.div`
  height: 10px;
  width: 2px;
  background: #ccc;
  margin: 0 10px;
`;

const TextForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 25px;
`

const LeftAligned = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RightAligned = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #008ecf;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

const Modal = styled.div`
  display: ${props => (props.$show ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  padding: 10px 50px 50px 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  text-align: center;
  overflow: auto;
`;

const ModalButton = styled(Button)`
  background: ${({selected}) => (selected ? '#008ecf' : '#ccc')};
  margin-right: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
  padding: 10px;
`;

const AuthButton = styled.button`
  padding: 5px 10px;
  margin-left: 15px;
  background: #008ecf;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Test2() {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showFindModal, setShowFindModal] = useState(false);
    const [switchButton, setSwitchButton] = useState(true);
    const [isVerification, setIsVerification] = useState(false);
    const setToken = useSetRecoilState(tokenAtom);
    const role = useRecoilValue(roleSelector);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userId : "",
        password : "",
        name : "",
        status : "NORMAL",
        role : "STUDENT",
        email : "",
        phNumber : "",
        verificationNumber : ""
    });

    const onChangeHandler = (e) => {
        const { value, id } = e.target
        setUser({ ...user, [id]: value })
    }


    const openModal = (type) => {
        setShowSignUpModal(type);
        setShowFindModal(!type);
    };
    const closeModal = () => {
        setShowSignUpModal(false);
        setShowFindModal(false);
        setIsVerification(false);
    };

    const modalSwitch = (change) => {
        setSwitchButton(change);
        if(change) {
            setUser({ ...user, role : "STUDENT" })
        } else {
            setUser({ ...user, role : "PROFESSOR" })
        }
    }
    const login = async (e) => {
        e.preventDefault();
        const request = {
            userId : user.userId,
            password : user.password
        };
        try {
            await exceptionApi('/api/v1/auth/login', 'POST', request )
        } catch (error) {

        }
    }

    const signUp = async (e) => {
        e.preventDefault();
        try {
            if(isVerification) {
                await exceptionApi('/api/v1/auth', 'POST', user )
                window.location.reload();
            } else {
                alert("이메일 인증 해주세요.")
            }
        } catch (error) {

        }
    }

    const getVerificationNumber = async (e) => {
        e.preventDefault();
        const request = {
            email : user.email
        };
        try {
            await api('/api/v1/auth/send','POST',request)
        } catch (error) {
            console.log(error)
        }
    }

    const postVerificationNumber = async (e) => {
        e.preventDefault();
        const request = {
            email : user.email,
            verificationNumber : user.verificationNumber
        };
        try {
            const response = await exceptionApi('/api/v1/auth/check','POST',request)
            if(response.data) {
                setIsVerification(true);
            } else {
                setIsVerification(false);
            }
        } catch (error) {

        }
    }
    const login2 = async () => {
        const myCookieValue = cookie.load('AccessToken');
        console.log(myCookieValue+'ss');

        if (myCookieValue !== null) {
            setToken(myCookieValue);
            console.log('ㄱㄱ')
        }
        console.log("role" + role);

        // await api('/api/v1/auth/info','POST')
    }
    // useEffect(() => {
    //     // 쿠키의 'myCookie' 값을 가져옵니다.
    //     const myCookieValue = cookie.load('AccessToken');
    //     console.log(myCookieValue+'ss');
    //
    //     if (myCookieValue !== null) {
    //         setToken(myCookieValue);
    //         console.log('ㄱㄱ')
    //     }
    //     console.log("role" + role);
    // }, [setToken]); // 여기서는 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 합니다.

    return (
        <>
            <Container>
                <FormContainer>
                    <Logo src={logo} alt="Logo"/>
                    <Form>
                        <Label htmlFor="userId">아이디</Label>
                        <Input type="text" id="userId" name="userId" required minLength={4} onChange={onChangeHandler}/>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input type="password" id="password" required minLength={4} onChange={onChangeHandler}/>
                        <TextForm>
                            <LeftAligned>
                                <SmallText onClick={()=>openModal(true)}>회원가입</SmallText>
                            </LeftAligned>
                            <RightAligned>
                                <SmallText onClick={()=>openModal(false)}>아이디 찾기</SmallText>
                                <Divider/>
                                <SmallText onClick={()=>openModal(false)}>비밀번호 찾기</SmallText>
                            </RightAligned>
                        </TextForm>
                        <Button onClick={login}>Login</Button>
                        <Button onClick={login2}>Login</Button>
                    </Form>
                </FormContainer>
            </Container>
            <Modal $show={showSignUpModal}>
                <CloseButton onClick={closeModal}>X</CloseButton>
                <ButtonsContainer>
                    <ModalButton
                        selected={switchButton}
                        onClick={() => modalSwitch(true)}>
                        학생 회원가입
                    </ModalButton>
                    <ModalButton
                        selected={!switchButton}
                        onClick={() => modalSwitch(false)}>
                        교직원 회원가입
                    </ModalButton>
                </ButtonsContainer>
                <Form>
                    <Label htmlFor="userId">아이디</Label>
                    <Input type="text" id="userId"  required minLength={4} onChange={onChangeHandler}/>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input type="password" id="password" required minLength={4} onChange={onChangeHandler}/>
                    <Label htmlFor="name" >이름</Label>
                    <Input type="text" id="name" required minLength={4} onChange={onChangeHandler}/>
                    <Label htmlFor="major">전공</Label>
                    <Input type="text" id="major" onChange={onChangeHandler}/>
                    <Label htmlFor="email">이메일</Label>
                    <InputContainer>
                        <Input type="email" id="email" $emailInput="true" required minLength={4} onChange={onChangeHandler}/>
                        <AuthButton onClick={getVerificationNumber}>인증 요청</AuthButton>
                    </InputContainer>
                    <Label htmlFor="verificationNumber">인증번호</Label>
                    <InputContainer>
                        <Input type="text" id="verificationNumber" $emailInput="true" required minLength={4} onChange={onChangeHandler}/>
                        <AuthButton onClick={postVerificationNumber}>인증 하기</AuthButton>
                    </InputContainer>
                    <Label htmlFor="phNumber">전화번호</Label>
                    <Input type="text" id="phNumber" onChange={onChangeHandler}/>
                    <Button onClick={signUp}>가입하기</Button>
                </Form>
            </Modal>
            <Modal $show={showFindModal}>
                <CloseButton onClick={closeModal}>X</CloseButton>
                <ButtonsContainer>
                    <ModalButton
                        selected={switchButton}
                        onClick={() => modalSwitch(true)}>
                        아이디 찾기
                    </ModalButton>
                    <ModalButton
                        selected={!switchButton}
                        onClick={() => modalSwitch(false)}>
                        비밀번호 찾기
                    </ModalButton>
                </ButtonsContainer>
                <Form>
                    <Label htmlFor="name">이름</Label>
                    <Input type="text" id="name"/>
                    <Label htmlFor="phNumber">전화번호</Label>
                    <Input type="text" id="phNumber"/>
                    {switchButton ? (
                        <Button>아이디 찾기</Button>
                    ):(
                        <>
                            <Label htmlFor="email">이메일</Label>
                            <InputContainer>
                            <Input type="text" id="email" emailInput={true}/>
                                <AuthButton>인증하기</AuthButton>
                            </InputContainer>
                            <Button>비밀번호 재설정</Button>
                        </>
                    )}
                </Form>
            </Modal>
        </>
    );
}

export default Test2;