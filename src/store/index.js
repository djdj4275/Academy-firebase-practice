import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

// 초기화한 파이어베이스 불러옴
import '@/datasources/firebase';
// 9버전을 사용한 방법
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithPopup,
        GoogleAuthProvider
      } from "firebase/auth";
// 파이어베이스 인증을 위한 객체
const auth = getAuth();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oUser : null // 사용자 정보를 담을 객체
  },
  getters: {
    // 사용자 객체반환
    fnGetUser(state) {
      return state.oUser;
    },
    // 사용자 객체값의 유무로 로그인 여부 판단
    fnGetAuthStatus(state) {
      return state.oUser != null;
    }
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },
  actions: {
    // 파이어베이스의 인증을 이용하여 이메일회원 생성 및 저장
    fnRegisterUser( {commit}, payload ) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
      .then((pUserInfo) => {
        // 신규 회원 이메일 정보를 스토어에 저장
        commit('fnSetUser', {
          email : pUserInfo.user.email,
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      });
    },
    // 파이어베이스의 인증을 이용하여 이메일 회원 로그인
    DoLogin( {commit}, payload ) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
      .then( (pUserInfo)=>{
        commit('fnSetUser', {
          id : pUserInfo.user.uid,
          name : pUserInfo.user.displayName,
          email : pUserInfo.user.email,
          photoURL : pUserInfo.user.photoURL
        });
        router.push('/main');
      } )
      .catch( (err)=>{
        console.log(err.message);
      } )
    },
    // 파이어베이스 구글 인증
    fnDoGoogleLogin_Popup( {commit} ) {
      const oProvider = new GoogleAuthProvider(); // 구글 인증객체 생성
      oProvider.addScope('profile');
      oProvider.addScope('email');

      signInWithPopup(auth, oProvider)
      .then( (pUserInfo)=>{
        commit('fnSetUser', {
          id : pUserInfo.user.uid,
          name : pUserInfo.user.displayName,
          email : pUserInfo.user.email,
          photoURL : pUserInfo.user.photoURL
        });
        router.push('/main');
      } )
      .catch( (err)=>{
        console.log(err.message);
      } )
    }
  },
  modules: {
  }
})
