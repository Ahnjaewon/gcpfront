import React, {useState} from 'react';
import axios from "axios";

const Test = () => {
    const [redirectUrl, setRedirectUrl] = useState('');

// axios 인스턴스 생성
    const api = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true, // 쿠키 전송을 활성화
        // 기타 설정...
    });

// 요청 인터셉터 설정
    api.interceptors.request.use(
        (config) => {
            // 요청을 수정할 수 있습니다.
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    const handle401Error = (error) => {
        if (error.response.data === "Unauthorized: Expired JWT token") {
            // 401 에러와 특정 에러 메시지일 경우 특별한 처리
            // 예를 들어, 리다이렉트
            window.location.href = '/reissue';
            console.log(error.response.data);
        } else {
            // 다른 경우에 다른 처리를 수행
            // 예를 들어, 다른 경로로 이동
            window.location.href = '/login';
            console.log(error.response.data);
        }
    };

    api.interceptors.response.use(
        (response) => {
            // 응답을 처리할 수 있습니다.
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                handle401Error(error);
            }
            return Promise.reject(error);
        }
    );




// API 호출
    const fetchDataFromAPI = () => {
        api.get('/api/v1/test')
            .then(response => {
                // 성공한 경우의 동작
            })
            .catch(error => {
                // 401 에러 처리는 인터셉터에서 수행됩니다.
                console.error('API 호출 중 오류 발생:', error);
            });
    };

    return (
        <div>
            <button onClick={fetchDataFromAPI}>API 호출</button>
            <div>
                <h2>API 응답:</h2>
            </div>
        </div>
    );
};

export default Test;