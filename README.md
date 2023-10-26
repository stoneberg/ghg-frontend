
# centero
Centero 2.0 Nextjs Frontend


## 개발환경 
- Node.js v18.18.0 

## 사용 라이브러리
	* NextAuth.js : 인증 처리 라이브러리 
	* AG Library : 차트 라이브러리 
	* Next : React Framework 
	* Ant Design: React UI Framework
	* DayJs: moment.js 경량화 라이브러리
	* Framer-motion:  animation library 
	* Ky : http fetch api 
	* Lucide-react: icon library
	* Numeral.js: number formatting library
	* Qs: querystring parser library 
	* Swr: data fetch react hook library
	* Quill: rich text editor
	* Next-intl: 다국어
	* ActiveReportJS: 리포팅 툴
	* React-Slick: react slick 
	* Slick-carousel: react slick css

## 디렉토리 구조
```

┌─ src
│  ├─ client       # API 호출 코드
│  ├─ components
│  │  ├─ layout   # 기본 레이아웃
│  │  ├─ page     # 페이지별 세부 컴포넌트
│  │  └─ shared   # 공통 컴포넌트
│  ├─ fonts        # 웹폰트
│  ├─ enums 	   # 상수 
│  ├─ lib
│  │  ├─ auth     # 인증 관련 코드
│  │  └─ hooks    # react hooks
│  ├─ pages        # 페이지
│  ├─ stories      # 스토리북 
│  ├─ styles       # 기본 스타일
│  │   ├─ centero # 센테로 기본 스타일시트
│  │   ├─ Common  # 기타 
│  │   ├─ vendor  # 외부 스타일시트
│  └─ types        # 타입 정의
├─ public           # 이미지등 정적 파일
│  ├─ images   # 기본 이미지
├─ messages # 다국어 메시지
```


## 샘플 페이지 
>  http://localhost:3000/admin/SampleGrid

>  스토리북(컴포넌트 테스트)
>1.  npm run storybook 실행
>2.  [해당 주소로 이동](http://localhost:6006/) 



  

