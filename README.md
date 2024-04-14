# vue-nest-chat

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://v3.vuejs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/200px-Vue.js_Logo_2.svg.png" width="200" alt="Vue.js Logo" /></a>
</p>

<!--
<p align="center">
  <a href="https://socket.io/" target="blank"><img src="https://socket.io/css/images/logo.svg" width="200" alt="Socket.IO Logo" /></a>
</p>
-->


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

socketio를 이용한 간단한 채팅앱 vue + nestjs 로 만듬 
websocket에 대해 공부를 하다가 Node.js맞춤형 버전인 socket.io를 공부할 목적으로 만듬 
찾아보니까 socketio대부분을 express.js로만 하던데 암만 찾아봐도 Nestjs로 만든곳을 찾기 힘들어서 한번 찾아가면서 만들어봤다 국내는 거의 없더라 <br>
주 기능 <br>
- 오픈 채팅방 만듬 유저가 들어가기
- 실시간으로 방목록 초기화 http로 갱신가능
- 닉네임기능
- socket auth기능 토큰사용 => fake token
- 서버쪽에 test코드 만듬 (진행중) 

----- 

즉흥적으로 시작한것도 있고 간단하게 만들 예정이였어서 DB연결도 안했고 token발행 코드도 없다 

중간에 REDIS Stream코드가 있는데 socket이랑 비슷한 기능인가? 싶어서 연결해봤다 내가 생각한 기능은 아니여서 주기능에서 제외함 

---- 

Redis Stream의 주요 특징 및 WebSocket과의 차이점

1. 이벤트 스트림: Redis Stream은 이벤트 스트림을 저장하고 처리하기 위한 자료구조로 설계되었습니다. 이벤트 스트림은 실시간으로 발생하는 이벤트를 처리하는 데 사용됩니다.

2. 다양한 데이터 타입: Redis Stream은 다양한 데이터 타입을 지원하며, 이벤트 데이터를 JSON, 문자열 또는 바이너리 데이터 등 다양한 형식으로 저장할 수 있습니다.

3. 소비자 그룹: Redis Stream은 여러 소비자 그룹을 지원하여 다수의 애플리케이션이 동일한 이벤트 스트림을 동시에 처리할 수 있습니다. 각 소비자 그룹은 각각의 소비자에게 메시지를 분배하고 처리 상태를 추적합니다.

4. 백프레셔: Redis Stream은 백프레셔(backpressure) 메커니즘을 지원하여 소비자가 처리 속도를 조절할 수 있습니다. 이를 통해 소비자의 처리 능력을 초과하는 메시지 유입을 방지할 수 있습니다.

5. 확장성: Redis는 클러스터링을 지원하여 대규모 이벤트 처리를 위한 확장성을 제공합니다. Redis 클러스터는 고가용성 및 장애 복구 기능도 제공하여 안정적인 서비스 운영이 가능합니다.

WebSocket과의 차이점:

1. 데이터 구조: Redis Stream은 이벤트 스트림을 저장하는 데이터 구조이고, WebSocket은 양방향 통신을 위한 프로토콜입니다.

2. 목적: Redis Stream은 이벤트 스트림을 처리하는 데 주로 사용되며, WebSocket은 실시간 양방향 통신을 위한 메커니즘으로 사용됩니다.

3. 통신 방식: Redis Stream은 비동기적인 이벤트 기반의 통신을 지원하며, WebSocket은 실시간 양방향 통신을 위한 연결 기반의 프로토콜입니다.

4. 데이터 전송: Redis Stream은 데이터를 이벤트 단위로 저장하고 처리하는 반면, WebSocket은 클라이언트와 서버 간에 양방향으로 데이터를 전송합니다.

5. 구현 및 사용: Redis Stream은 Redis 서버에서 지원하는 데이터 구조이며, WebSocket은 웹 애플리케이션에서 브라우저와 서버 간에 사용되는 프로토콜입니다.


// ******************************************* <br>
// xrange는 똑같은 클라이언트로 xadd와 xrange읽기 모두 처리할수있지만 <br>
// ******  <br>

// => 정정 근본적으로 클라이언트 때문은 아님  <br>
// => xread는 보통 특정 streamId의 최신 데이터를 읽을때 많이 사용되는데 <br>
// => 하나의 redis객체가 xadd와 xread를 모두 한다면 결국 하나가 멈추는데  <br>
// => => 서로 다른 매서드 임에도 xadd와 xread가 모두 this.redis라면 readStream 실행시 xadd가 멈추게된다  <br>
// => 새로운 stream data가 없어서 가져오지 못하는것 block가 > 0 이라면 null을 반환한다  <br>
// 어찌보면 당연했던 수순 <br>
// block가 없어도 결과는 null로 값을 가져오지 못해 근본적으로 같다 <br>
// ****** <br>
// ******************************* <br>
// xread 명령은 블로킹(blocking) 방식으로 실행 즉, 데이터가 도착할 때까지 블록되어 대기 <br>
// 이때, xread 명령이 실행된 순간에는 Redis 서버에서  <br>
// 스트림에 새로운 데이터가 도착할 때까지 xadd 명령이 일시 중지되고, xread 명령이 완료된 후에 다시 xadd 명령이 실행 <br>
//  Redis의 블로킹 명령은 동시에 여러 명령을 실행하는 것을 제한 <br>
// 여러스트림 연결등 장점은 존재  <br>
// ******************** <br>
// xread가 실행되는순간 xadd의 return값이 실행되지 않는데  <br>
// 이때 xread의 "$"는 그 이후 추가적인 stream이 발생하지 않아 <br>
// 항상 null을 가져오거나 혹은 동작을 멈춘상태로 대기한다 <br>
// block가 0일때 아무런 콘솔이 나오지 않은것은 어떠한 stream도 발생하지 않아서이다<br>
// ************************************************ <br>
