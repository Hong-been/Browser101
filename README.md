# Browser101
- 자바스크립트 강의를 들으며 작성한 코드노트입니다.

### 쇼핑몰 앱
- [깃허브 주소](https://github.com/Hong-been/Browser101/tree/WebAPI/DOM/shopping-list)
- [구현 영상](https://sulfuric-lunge-ed9.notion.site/Shopping-List-561008354b2d421eb09451c170af42f5)
- BEM convention에 대해 알고 적용해볼 수 있었습니다.
- 자바스크립트로 애니메이션을 추가하고, async-await를 적용하였습니다.
- 커서가 어디에 있던지 엔터를 누르면 입력창으로 포커스되도록 설정하여 사용성을 높였습니다.
- 리스트 추가, 삭제 시 부드러운 애니메이션을 적용하여 자연스럽게 동작하도록 구현하였습니다.


### 당근게임
- [당근게임 url✨](https://hong-been.github.io/Browser101/)
- [깃허브 주소](https://github.com/Hong-been/Browser101/tree/carrot)
- 10개의 당근을 5초내에 모두 클릭하면 성공하는 게임입니다.
- 일시정지, 일시정지 혹은 게임완료 시 리플레이할 수 있습니다.
- 자바스크립트로만 구현하였으며, 기능별로 js파일을 분할하여 모듈화하여 사용하였습니다.
- game모듈은 builder pattern을 사용하여 생성하였습니다.
- 수정이 필요한 내용: 
  - 화면에 있는 마지막 당근을 클릭하여 없어졌음에도 실패로 결과창이 나온다.
  - 당근클릭 후 점수확인하는 쓰레드와 웹API에서 시간초과를 확인하는 쓰레드가 각각 동작하는데,
  - 당근클릭 후 점수확인하는 쓰레드를 하나의 함수로 atomic하게 만드는 과정이 필요한 것 같다.
   <img width="800" alt="마지막 당근 클릭할 때 버그" src="https://user-images.githubusercontent.com/65804460/137137673-74269e32-9a14-41b9-afbc-0e352da0f26d.png" margin="auto" style="margin:auto">
